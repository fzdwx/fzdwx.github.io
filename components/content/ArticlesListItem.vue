<script setup lang="ts">
import {useContentPreview} from '#imports';
import {PropType} from "@vue/runtime-core";
import {Post} from "~/types";

const props = defineProps({
  article: {
    type: Object as PropType<Post>,
    required: true
  },
})

const id = computed(() => {
  // @ts-ignore
  return (process.dev || useContentPreview()?.isEnabled()) ? props.article?._id : undefined
})


</script>

<template>
  <div>
    <NuxtLink :to="article._path" :alt="article.title" class="flex w-full flex-col my-4 gap-4 overflow-clip">
      <nuxt-img loading="lazy" quality="80" v-if="article.cover" :src="article.cover.image" alt="image"/>
      <p class="mx-4 text-xl opacity-90">
        {{ article.title }}
      </p>
      <p v-if="article.description" class="line-clamp-3 md:line-clamp-4 mx-4 text-xl opacity-60">
        {{ article.description }}
      </p>
      <div class="mx-4 mb-4 text-sm opacity-50" :title="formatDate(article.date)">
        {{ formatDate(article.date) }}
        <span :key="tag"
              class="mx-1 rounded py-[0.2rem] px-[0.3rem] bg-just-light/20 font-bold text-just-dark"
              v-if="article.tags" v-for="(tag,idx) in article.tags">
                    {{ tag }}
                </span>
      </div>
    </NuxtLink>
  </div>
</template>


<style scoped>

img {
  @apply object-cover rounded-md;
}

.image {
  flex: 1;
}

.content {
  @apply flex flex-col;
  flex: 1;
}

.headline {
  @apply text-2xl mb-2 line-clamp-2;

}
</style>
