<script setup lang="ts">
import {withTrailingSlash} from 'ufo';
import {Post} from "~/types"

const props = defineProps({
    path: {
        type: String,
        default: 'articles'
    },
    showCd: {
        type: Boolean,
        default: true
    }
})

// @ts-ignore
const {data: _articles} = await useAsyncData('articles', async () => await queryContent<Post>(withTrailingSlash(props.path)).sort({date: -1}).find(), {
    transform: posts => groupBy(posts, p => new Date(p.date).getFullYear())
})

const articles = computed(() => _articles.value || [])
const yearKeys = Object.keys(unref(articles)).reverse()
</script>

<template>
    <div class="m-con">
        <cd v-if="showCd"/>
        <div class="space-y-7 mb-10">
            <div v-for="year in yearKeys" :key="year">
                <div class="space-y-10">
                    <div v-for="(post,key) in articles[year]" :key="key">
                        <articles-list-item :article="post"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
