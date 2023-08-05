export interface TimelineRoot {
    repository: Repository
}

export interface Repository {
    discussion: Discussion
}

export interface Discussion {
    id: string
    url: string
    body: string
    bodyHTML: string
    bodyText: string
    category: Category
    comments: Comments
    author: Author2
}

export interface Category {
    createdAt: string
    slug: string
    description: string
    emoji: string
    emojiHTML: string
    name: string
    updatedAt: string
}

export interface Comments {
    pageInfo: PageInfo
    edges: Edge[]
}

export interface PageInfo {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface Edge {
    cursor: string
    node: Node
}

export interface Node {
    author: Author
    body: string
    bodyHTML: string
    bodyText: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    url: string
    reactions: Reactions
}

export interface Author {
    avatarUrl: string
    login: string
    url: string
}

export interface Reactions {
    pageInfo: PageInfo2
    totalCount: number
    edges: Edge2[]
}

export interface PageInfo2 {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface Edge2 {
    cursor: string
    node: Node2
}

export interface Node2 {
    content: string
    createdAt: string
    user: User
}

export interface User {
    avatarUrl: string
    login: string
    bio: string
}

export interface Author2 {
    avatarUrl: string
    login: string
}
