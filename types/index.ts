import type {ParsedContent} from '@nuxt/content/dist/runtime/types'

export interface Post extends ParsedContent {
    title: string
    description: string
    date: string
    update: string
    path: string
    tags?: string[]
    hidden?: boolean
    cover?: Cover
}

export interface Cover {
    image: string
}


export interface SubFeedsInfo {
    items: FeedsInfo[]
}

export interface FeedsInfo {
    name: string
    info: FeedsItem[]
}

export interface FeedsItem {
    name: string
    title: string
    time: string
    url: string
}
