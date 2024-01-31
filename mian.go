package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/fzdwx/infinite"
	"github.com/fzdwx/infinite/components/input/text"
	"github.com/mmcdole/gofeed"
	"github.com/mozillazg/go-pinyin"
	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
)

var (
	Version = "0.0.3"
)

func main() {
	time.LoadLocation("Asia/Shanghai")
	cmd := root()
	cmd.AddCommand(genFeedsCmd())
	cmd.AddCommand(newContent())
	cmd.AddCommand(genTimelineCmd())

	perr("run", cmd.Execute())
}

func root() *cobra.Command {
	return &cobra.Command{
		Use:     "bang",
		Version: Version,
		Short:   "website helper",
	}
}

func newContent() *cobra.Command {
	var template = `---
title: {{Title}}
date: {{Date}}
tags: [{{Tags}}]
---

# {{Title}}
`
	var makeContent = func(title, tags string) string {
		tags = strings.Join(strings.Split(tags, " "), ", ")
		return strings.ReplaceAll(
			strings.ReplaceAll(
				strings.ReplaceAll(
					template,
					"{{Title}}", title,
				),
				"{{Date}}", time.Now().Format("2006-01-02 15:04:05"),
			),
			"{{Tags}}", tags)
	}

	var makeFileName = func(title string) string {
		a := pinyin.NewArgs()
		a.Style = pinyin.Normal
		a.Heteronym = false

		titlePinyin := strings.Join(pinyin.LazyPinyin(title, a), "-")
		if titlePinyin == "" {
			titlePinyin = title
		}

		return "content/blog/" + time.Now().Format("2006-01-02") + "-" + titlePinyin + ".md"
	}

	return &cobra.Command{
		Use:   "new",
		Short: "新建博客",
		Run: func(_ *cobra.Command, args []string) {
			blogName, err := infinite.NewText(
				text.WithPrompt("请输入博客名"),
				text.WithRequired(),
				text.WithRequiredMsg("博客名不能为空"),
			).Display()
			if err != nil {
				perr("new content", err)
				return
			}

			tags, err := infinite.NewText(text.WithPrompt("请输入标签(多个使用空格隔开)")).Display()
			if err != nil {
				perr("new content", err)
				return
			}

			os.WriteFile(makeFileName(blogName), []byte(makeContent(blogName, tags)), 0644)
		},
	}
}

func genFeedsCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "feed",
		Short: "读取 content/sub-feeds.md 中的 feeds 字段生成 links.json",
		Run: func(_ *cobra.Command, _ []string) {
			f, err := os.Open("content/sub-feeds.md")
			if err != nil {
				perr("open links.md", err)
				return
			}
			defer f.Close()
			bytes, err := io.ReadAll(f)
			if err != nil {
				perr("read links.md", err)
				return
			}
			linksMd := string(bytes)
			pairs := strings.Split(linksMd, "---")
			if len(pairs) < 3 {
				fmt.Println("links.md 格式错误")
				return
			}

			var links Links
			err = yaml.Unmarshal([]byte(pairs[1]), &links)
			if err != nil {
				perr("unmarshal links.md", err)
			}
			err = genFeeds(links)
			if err != nil {
				perr("gen feeds", err)
			}
		},
	}
}

func genTimelineCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "timeline",
		Aliases: []string{"tl"},
		Short:   "",
		Run: func(cmd *cobra.Command, args []string) {
			// 获取所有的评论
			hasNextCommentPage := true
			endCommentCursor := ""
			comments := &CommentPage{}
			dis := &Discussion{
				Comments: comments,
			}
			owner := os.Getenv("user")
			name := os.Getenv("repo")
			token := os.Getenv("token")
			timeline := os.Getenv("timeline")
			for hasNextCommentPage {
				commentPage, err := getCommentPage(owner, name, token, timeline, endCommentCursor)
				if err != nil {
					panic(err)
					return
				}
				copydata(dis, commentPage)

				if 0 < commentPage.Comments.TotalCount {
					comments.Nodes = append(comments.Nodes, commentPage.Comments.Nodes...)
					comments.PageInfo = commentPage.Comments.PageInfo
				}

				// 是否有下一页评论
				hasNextCommentPage = commentPage.Comments.PageInfo.HasNextPage
				endCommentCursor = commentPage.Comments.PageInfo.EndCursor
			}
			dis.Comments.TotalCount = len(dis.Comments.Nodes)

			commentSorter := CommentSorter(dis.Comments.Nodes)
			sort.Sort(commentSorter)
			dis.Comments.Nodes = commentSorter

			parseMeta(dis)
			_ = os.RemoveAll("./public/timeline.json")
			f, err := os.Create("./public/timeline.json")
			if err != nil {
				perr("create timeline.json", err)
				return
			}
			defer f.Close()

			err = json.NewEncoder(f).Encode(dis)
			if err != nil {
				perr("encode timeline.json", err)
				return
			}
		},
	}
}

func parseMeta(dis *Discussion) {
	if dis == nil || dis.Comments == nil || dis.Comments.Nodes == nil || len(dis.Comments.Nodes) == 0 {
		return
	}

	re := regexp.MustCompile(`\[[^\]]+\]`)
	for i := range dis.Comments.Nodes {
		comment := dis.Comments.Nodes[i]

		src := comment.BodyHTML
		result := re.ReplaceAllStringFunc(src, func(match string) string {
			return ""
		})

		comment.BodyHTML = result

		// 获取匹配到的数据
		tags := []string{}
		matches := re.FindAllStringSubmatch(src, -1)
		for _, match := range matches {
			tags = append(tags, parseTag(match[0])...)
		}

		comment.Tags = tags
	}
}

func parseTag(s string) []string {
	// [tags:#MySQL]
	res := []string{}
	if strings.HasPrefix(s, "[tags:") {
		tag := strings.TrimPrefix(s, "[tags:")
		tag = strings.TrimSuffix(tag, "]")
		tag = strings.TrimSpace(tag)
		tags := strings.Split(tag, ",")
		for _, tag := range tags {
			tag = strings.TrimSpace(tag)
			if tag != "" {
				res = append(res, tag)
			}
		}
	}
	return res
}

func copydata(dis *Discussion, page *Discussion) {
	dis.Title = page.Title
	dis.Body = page.Body
	dis.BodyHTML = page.BodyHTML
	dis.GitHubURL = page.GitHubURL
	dis.CreatedAt = page.CreatedAt
	dis.UpdatedAt = page.UpdatedAt
	dis.Author = page.Author
}

func getCommentPage(owner, name, token, discussionNumber, afterCursor string) (*Discussion, error) {
	queryFormat := `{
		repository(owner: "%v", name: "%v") {
			discussion(number: %v) {
				id,
				body,
				bodyHTML,
				bodyText,
				url,
				
				category {
					createdAt,
					slug,
					description,
					emoji,
					emojiHTML,
					name,
					updatedAt,
				},				
				comments(first: 100, %v) {
					totalCount
					nodes {
						databaseId
						body
						bodyHTML
						createdAt
						author {
							avatarUrl
							login
							url
						}
						authorAssociation
						updatedAt
						upvoteCount
						url
						reactionGroups {
							content
							reactors(first: 1) {
								totalCount
							}
						}
					}
					pageInfo {
						hasNextPage
						endCursor
					}
				}
			}
		}
	}`
	var result Body
	if err := query(fmt.Sprintf(queryFormat, owner, name, discussionNumber, afterQuery(afterCursor)), token, &result); err != nil {
		return nil, err
	}
	return result.Data.Repository.Discussion, nil
}

func query(body string, token string, result *Body) error {
	req, err := http.NewRequest("POST", "https://api.github.com/graphql", strings.NewReader(queryf(body)))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "bearer "+token)

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	resBodyBytes, err := ioutil.ReadAll(response.Body)

	if http.StatusOK != response.StatusCode {
		return fmt.Errorf("GraphQL query failed: %v\n%v", response.Status, string(resBodyBytes))
	}

	if err = json.Unmarshal(resBodyBytes, &result); err != nil {
		return err
	}

	if result.Data == nil {
		return fmt.Errorf("GraphQL query error: %v", string(resBodyBytes))
	}

	return nil
}

func genFeeds(links Links) error {
	fp := gofeed.NewParser()
	var feedItems []FeedItem
	for i := range links.Feeds {
		f := links.Feeds[i]
		feed, err := fp.ParseURL(f.Url)
		if err != nil {
			return err
		}
		var name = feed.Title
		if name == "" && len(feed.Authors) > 0 {
			name = feed.Authors[0].Name
		}

		var feedItemInfoList []FeedItemInfo
		for j := range feed.Items {
			item := feed.Items[j]
			feedItemInfoList = append(feedItemInfoList, FeedItemInfo{
				Name:  name,
				Title: item.Title,
				Url:   item.Link,
				Time:  item.Published,
			})
		}
		feedItems = append(feedItems, FeedItem{
			Name:   name,
			Avatar: f.Avatar,
			Info:   feedItemInfoList,
		})
	}

	_ = os.RemoveAll("./public/links.json")
	f, err := os.Create("./public/links.json")
	if err != nil {
		return err
	}
	defer f.Close()
	feeds := Feeds{
		Items: feedItems,
	}

	return json.NewEncoder(f).Encode(feeds)
}

type Links struct {
	Feeds []LiksFeeds `yaml:"feeds"`
}

type LiksFeeds struct {
	Avatar string `yaml:"avatar"`
	Url    string `yaml:"url"`
}

type Feeds struct {
	Items []FeedItem `json:"items"`
}

type FeedItem struct {
	Name   string         `json:"name"`
	Avatar string         `json:"avatar"`
	Info   []FeedItemInfo `json:"info"`
}

type FeedItemInfo struct {
	Name  string `json:"name"`
	Title string `json:"title"`
	Url   string `json:"url"`
	Time  string `json:"time"`
}

func perr(msg string, err error) {
	if err != nil {
		fmt.Println("Error:", msg, ", cause", err)
	}
}

// Discussion is Github Discussion scheme
type Discussion struct {
	Number         int              `json:"number"`
	Title          string           `json:"title"`
	Body           string           `json:"body"`
	BodyHTML       string           `json:"bodyHTML"`
	Locked         bool             `json:"locked"`
	UpvoteCount    int              `json:"upvoteCount"`
	GitHubURL      string           `json:"url"`
	CreatedAt      time.Time        `json:"createdAt"`
	UpdatedAt      time.Time        `json:"updatedAt"`
	Author         *User            `json:"author"`
	Comments       *CommentPage     `json:"comments"`
	ReactionGroups []*ReactionGroup `json:"reactionGroups"`
}

// CommentPage is Github Discussion Comment page scheme
type CommentPage struct {
	TotalCount int        `json:"totalCount"`
	Nodes      []*Comment `json:"nodes"`
	PageInfo   *PageInfo  `json:"pageInfo"`
}

// Comment is Github Discussion comment scheme
type Comment struct {
	DatabaseId        int64            `json:"databaseId"`
	Body              string           `json:"body"`
	BodyHTML          string           `json:"bodyHTML"`
	UpvoteCount       int              `json:"upvoteCount"`
	GitHubURL         string           `json:"url"`
	AuthorAssociation string           `json:"authorAssociation"`
	CreatedAt         time.Time        `json:"createdAt"`
	UpdatedAt         time.Time        `json:"updatedAt"`
	Author            *User            `json:"author"`
	ReactionGroups    []*ReactionGroup `json:"reactionGroups"`

	Tags []string `json:"tags"`
}

type CommentSorter []*Comment

func (a CommentSorter) Len() int           { return len(a) }
func (a CommentSorter) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a CommentSorter) Less(i, j int) bool { return a[i].CreatedAt.After(a[j].CreatedAt) }

// ReactionGroup is Github Discussion Reaction group scheme
type ReactionGroup struct {
	Content  string        `json:"content"`
	Reactors *ReactionPage `json:"reactors"`
}

// ReactionPage is Github Discussion Reaction page scheme
type ReactionPage struct {
	TotalCount int `json:"totalCount"`
}

// PageInfo is Github GraphQL api page data info
type PageInfo struct {
	HasNextPage bool   `json:"hasNextPage"`
	EndCursor   string `json:"endCursor"`
	HasPrevPage bool   `json:"-"`
	StartCursor string `json:"-"`
}

// Body is Github GraphQL api response body
type Body struct {
	Data *GithubData `json:"data"`
}

// GithubData is Github GraphQL api data
type GithubData struct {
	Repository *Repository `json:"repository"`
	Viewer     *User       `json:"user"`
}

// Repository is Github repository scheme
type Repository struct {
	Name       string      `json:"name"`
	URL        string      `json:"url"`
	Discussion *Discussion `json:"discussion"`
}

// User is Github user scheme
type User struct {
	Login     string `json:"login"`
	AvatarURL string `json:"avatarUrl"`
	GitHubURL string `json:"url"`
	Bio       string `json:"bio"`
	Email     string `json:"email"`
	Company   string `json:"company"`
	Location  string `json:"location"`
	Name      string `json:"name"`
	Twitter   string `json:"twitterUsername"`
}

// ShowName 返回该用户的对外显示的名字
func (u *User) ShowName() string {
	if u.Name != "" {
		return u.Name
	}
	return u.Login
}

func afterQuery(afterCursor string) string {
	after := ""
	if afterCursor != "" {
		after = fmt.Sprintf(`after: "%v"`, afterCursor)
	}
	return after
}

// queryf 参数的值来源 https://docs.github.com/zh/graphql/overview/explorer
func queryf(query string) string {
	query = strings.ReplaceAll(query, "\n", "")
	query = strings.ReplaceAll(query, "\t", " ")
	query = strings.ReplaceAll(query, `"`, `\"`)
	fields := strings.FieldsFunc(query, func(c rune) bool {
		return c == ' '
	})
	return fmt.Sprintf(`{"query": "query %v" }`, strings.Join(fields, " "))
}
