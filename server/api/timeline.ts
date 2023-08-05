import {Octokit} from "octokit";
import {TimelineRoot} from "~/types";
import {QueryValue} from "ufo";

const octokit = new Octokit({
    auth: process.env.GH_TOKEN || 'required_gh_token',
    timeZone: 'Asia/Shanghai',
});

const config = useAppConfig();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const resp = await octokit.graphql(`
query {
  repository(owner: "${config.github.owner}", name: "${config.github.repo}") {
    discussion(number: ${config.github.timeline.discussions}) {
        id,
        body,
        bodyHTML,
        bodyText,
        
        category {
         createdAt,
         slug,
         description,
         emoji,
         emojiHTML,
         name,
         updatedAt,
        },
        
        comments(last:${query.pageSize}${genCursor(query.before)}) {
            pageInfo {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage,
            },
            edges {
                cursor,
                node {
                    author {
                        avatarUrl,
                        login,
                    },
                    body,
                    bodyHTML,
                    bodyText,
                    createdAt,
                    updatedAt,
                    publishedAt,
                    url,
                    reactions (last:100) {
                        pageInfo {
                            startCursor,
                            endCursor,
                            hasNextPage,
                            hasPreviousPage,
                        },
                        totalCount,
                        edges {
                            cursor,
                            node {
                                content,
                                createdAt,
                                user {
                                    avatarUrl,
                                    login,
                                    bio,
                                }
                            }
                        },                    
                    },
                },
            }
        },
        
        author {
            avatarUrl,
            login,
        }
    }
  }
}
    `);

    return resp as TimelineRoot;
})

function genCursor(before: string | number | Record<string, any> | null | undefined | QueryValue[]) {
    if (before) {
        return `, before: "${before}"`;
    }
    return '';
}
