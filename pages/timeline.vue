<script setup lang="ts">

import {parseDate} from "../.nuxt/imports";
import timeline from "~/public/timeline.json";

</script>

<template>
  <div class="m-center timeline">
    <div class="m-con">
      <div class="floor mb-5" ref="floor" v-html="timeline.bodyHTML"/>
      <div class="comments">
        <div v-for="item in timeline.comments.nodes">
          <div class=" p-5 mt-2 cursor-default hover:bg-zinc-100 rounded">
            <div class="">
              <div class="flex flex-row mb-2">
                <nuxt-img class="w-[40px] h-[40px] mr-2" :src="item.author.avatarUrl" alt="avatar"/>
                <div class="m-center">
                  <a :href="item.author.url">{{ item.author.login }}</a>
                  <span class="mx-1"></span>
                  <a :href="item.url" class="text-stone-500">{{ parseDate(item.createdAt) }}</a>
                  <p class="mx-1">
                    <span class="bg-just-light/20 text-just-dark  mx-1 px-2 py-1 rounded" v-for="tag in item.tags">
                    {{ tag }}
                  </span>
                  </p>
                </div>
              </div>
              <div class="comment" v-html="item.bodyHTML"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.floor a, .comment a {
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

.comment ul ul, .comment ul ol, .comment ol ol, .comment ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.comment ul, .comment ol {
  padding-left: 2em;
}

.comment ol ul {
  list-style-type: circle;
  margin-block-start: 0;
  margin-block-end: 0;
}

.comment code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
}

.comment p, .comment blockquote, .comment ul, .comment ol, .comment dl, .comment table, .comment pre, .comment details {
  margin-top: 0;
  margin-bottom: 16px;
}

.comment p a:has( img) {
  @apply flex justify-center items-center
}
</style>
