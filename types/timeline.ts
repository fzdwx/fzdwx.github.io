interface Timeline {
    repository: Repository
}

interface Repository {
    discussion: Discussion
}

interface Discussion {
    id: string
    body: string
    bodyHTML: string
    bodyText: string
    category: Category
    comments: Comments
    author: Author2
}

interface Category {
    createdAt: string
    slug: string
    description: string
    emoji: string
    emojiHTML: string
    name: string
    updatedAt: string
}

interface Comments {
    pageInfo: PageInfo
    edges: Edge[]
}

interface PageInfo {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}

interface Edge {
    cursor: string
    node: Node
}

interface Node {
    author: Author
    body: string
    bodyHTML: string
    bodyText: string
    createdAt: string
    publishedAt: string
    url: string
    reactions: Reactions
}

interface Author {
    avatarUrl: string
    login: string
}

interface Reactions {
    pageInfo: PageInfo2
    totalCount: number
    edges: Edge2[]
}

interface PageInfo2 {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}

interface Edge2 {
    cursor: string
    node: Node2
}

interface Node2 {
    content: string
    createdAt: string
    user: User
}

interface User {
    avatarUrl: string
    login: string
    bio: string
}

interface Author2 {
    avatarUrl: string
    login: string
}

