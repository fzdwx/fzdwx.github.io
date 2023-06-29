package main

import (
	"encoding/json"
	"fmt"
	"github.com/fzdwx/infinite"
	"github.com/fzdwx/infinite/components/input/text"
	"github.com/mmcdole/gofeed"
	"github.com/mozillazg/go-pinyin"
	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
	"io"
	"os"
	"strings"
	"time"
)

var (
	Version = "0.0.2"
)

func main() {
	time.LoadLocation("Asia/Shanghai")
	cmd := root()
	cmd.AddCommand(genFeedsCmd())
	cmd.AddCommand(newContent())

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
