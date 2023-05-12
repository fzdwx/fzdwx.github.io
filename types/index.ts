import type {ParsedContent} from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
    description: string
    date: string
    update: string
    path: string
    tags?: string[]
    cover?: Cover
}

export interface Cover {
    image: string
}
