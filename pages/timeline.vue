<script setup lang="ts">

import useTimeline from "~/composables/useTimeline";
import {parseDate} from "../.nuxt/imports";

const {next, data, setPageSize} = useTimeline();

const floor = ref();

onMounted(() => {
  setPageSize(100)
  next();
});

watch(data, () => {
  floor.value.innerHTML = data.value?.repository.discussion.bodyHTML;
});

</script>

<template>
  <div class="m-center timeline">
    <div class="m-con">
      <div class="floor mb-5" ref="floor"/>
      <div class="comments">
        <div v-for="item in data?.repository.discussion.comments.edges">
          <div class="comment p-5 mt-2 cursor-default hover:bg-zinc-100 rounded">
            <div class="">
              <div class="flex flex-row mb-2">
                <img class="w-[40px] h-[40px] mr-2" :src="item.node.author.avatarUrl" alt="avatar"/>
                <div class="m-center">
                  <a :href="item.node.author.url">{{ item.node.author.login }}</a>
                  <span class="mx-1"></span>
                  <a :href="item.node.url" class="text-stone-500">{{ parseDate(item.node.createdAt) }}</a>
                </div>
              </div>
              <div v-html="item.node.bodyHTML"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.floor a {
  @apply no-underline text-just hover:text-just-dark
}


.comment li {
  display: list-item;
}

.comment ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}


</style>
