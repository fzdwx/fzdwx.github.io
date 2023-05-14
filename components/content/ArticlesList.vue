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
    },
    showTagList: {
        type: Boolean,
        default: true
    }
})

// @ts-ignore
const {data: _articles} = await useAsyncData('articles', async () => await queryContent<Post>(withTrailingSlash(props.path))
    .sort({date: -1})
    .where({hidden: {$ne: true}})
    .find(),
)

const currentTag = ref('')
const changeTag = (tag: string) => {
    if (currentTag.value === tag) {
        currentTag.value = ''
        return
    }
    currentTag.value = tag
}

const tags = computed(() => {
    const tags = new Set<string>()
    _articles.value?.forEach((article) => {
        article.tags?.forEach((tag) => {
            tags.add(tag)
        })
    })
    return Array.from(tags)
})

const articles = computed(() => {
    if (currentTag.value === '') {
        return _articles.value
    }
    return _articles.value?.filter((article) => {
        return article.tags?.includes(currentTag.value)
    })
})

</script>

<template>
    <cd v-if="showCd"/>

    <div v-if="showTagList" class="pt-10">
        <span v-for="tag in tags"
              class="break-words rounded py-[0.2rem] px-[0.5rem] text-lg cursor-pointer" @click="changeTag(tag)"
              :class="{'bg-just-light/20 text-just-dark': currentTag === tag}"
        >
             {{ tag }}
        </span>

        <div class="py-10">
            <hr>
        </div>
    </div>

    <div class="space-y-7 mb-10">
        <div class="space-y-10">
            <div v-for="(post,key) in articles" :key="key">
                <articles-list-item :article="post"/>
            </div>
        </div>
    </div>
</template>
