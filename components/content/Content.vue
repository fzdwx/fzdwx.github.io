<template>
    <ContentDoc v-slot="{doc}">
        <div class="m-center">
            <div class="m-con">
                <div class="mb-10">
                    <cd/>
                    <header class="mt-5">
                        <h1 class="text-2xl ">{{ doc.title }}</h1>
                    </header>

                    <div class="pt-3"/>
                    <span class="text-[#97948F]">
                            Updated {{ formatDate(date(doc)) }} ,
                    </span>
                    by
                    <span class="text-[#97948F]">
                        {{ config.header.title }}
                    </span>
                    |
                    <NuxtLink :key="tag" :id="idx"
                              class="mx-1 rounded py-[0.2rem] px-[0.3rem] cursor-pointer bg-just-light/20 text-just-dark"
                              v-if="doc.tags" v-for="(tag,idx) in doc.tags"
                              :to="goTag(tag)"
                    >
                        {{ tag }}
                    </NuxtLink>
                </div>

                <ContentRender :doc="doc"/>
            </div>
        </div>
    </ContentDoc>

</template>
<script setup lang="ts">
import {Post} from "~/types";

const config = useAppConfig();

const date = (doc: Post) => {
    if (doc.update) {
        return doc.update
    }
    return doc.date
}

const route = useRoute();

const goTag = (tag: string) => {
    const path = route.path.split('/').slice(0, -1).join('/');
    if (path){
        return `${path}?tag=${tag}`
    }
    return '/'
}

</script>
