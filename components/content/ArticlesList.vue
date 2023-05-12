<script setup lang="ts">
import {withTrailingSlash} from 'ufo';
import {Post} from "types"

const props = defineProps({
    path: {
        type: String,
        default: 'articles'
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
    <div class="max-w-[90%] sm:w-[560px] lg:w-[780px]">
        <div class="space-y-7 mb-10">
            <div v-for="year in yearKeys" :key="year">
                <div class="space-y-10">
                    <div v-for="(post,key) in articles[year]" :key="key">
                        <articles-list-item :article="post"/>
                    </div>
                </div>
            </div>
        </div>
        <cd/>
    </div>
</template>
