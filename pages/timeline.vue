<script setup lang="ts">

import {parseDate} from "../.nuxt/imports";
import timeline from "~/public/timeline.json";

import {Command} from 'vue-command-palette'

import {useMagicKeys} from '@vueuse/core'

const keys = useMagicKeys()
const MetaK = keys['Meta+K']
const CmdK = keys['CTRL+K']
const escape = keys['Escape']
const visible = ref(false)

const comments = ref(timeline.comments.nodes)
const currentTag = ref('')

const allTags = new Set(timeline.comments.nodes.map(item => item.tags).flat().map(item => item.replace('#', '')))

const filterComments = (tag: string) => {
  if (tag === '') {
    comments.value = timeline.comments.nodes
  } else {
    comments.value = timeline.comments.nodes.filter(item => item.tags.includes(`#${tag}`))
  }
}

watch(currentTag, (v) => {
  filterComments(v)
})

onMounted(() => {
  document.addEventListener("keydown", function (event) {
    // 按下 Ctrl+K
    if (event.ctrlKey && event.keyCode === 75) {
      event.preventDefault();
    }
  });

  filterComments(currentTag.value)
})

watch(escape, v => {
  if (v && visible.value) {
    visible.value = false
  }
})

watch(CmdK, (v) => {
  if (v) {
    changeVisible()
  }
})
watch(MetaK, (v) => {
  if (v) {
    changeVisible()
  }
})

const changeVisible = () => {
  visible.value = !visible.value
}

const changeTag = (tag: string) => {
  if (tag == currentTag.value) {
    tag = ''
  }
  currentTag.value = tag
  visible.value = false
}
</script>

<template>
  <div class="w-full mx-auto">
    <Command.Dialog :visible="visible" theme="raycast" autofocus>
      <template #header>
        <Command.Input placeholder="Filter tags..."/>
      </template>
      <template #body>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Commands">
            <Command.Item
                data-value='reset'
                @select="changeTag('')"
            >
              reset
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Tgas">
            <Command.Item v-for="tag in allTags" :data-value="tag"
                          @select="changeTag(tag)"
            >
              {{ tag }}
            </Command.Item>
          </Command.Group>
        </Command.List>
      </template>
    </Command.Dialog>
  </div>

  <div class="m-center timeline">
    <div class="m-con">
      <div class="floor mb-5" ref="floor" v-html="timeline.bodyHTML"/>
      <div class="comments">
        <div v-for="item in comments">
          <div class=" p-5 mt-2 cursor-default hover:bg-zinc-100 rounded">
            <div class="">
              <div class="flex flex-row mb-2">
                <nuxt-img class="w-[40px] h-[40px] mr-2" :src="item.author.avatarUrl" alt="avatar"/>
                <div class="m-center">
                  <a :href="item.author.url">{{ item.author.login }}</a>
                  <span class="mx-1"></span>
                  <a :href="item.url" class="text-stone-500">{{ parseDate(item.createdAt) }}</a>
                  <p class="mx-1">
                    <span class="bg-just-light/20 text-just-dark  mx-1 px-2 py-1 rounded"
                          @click="changeTag(tag.replace('#',''))" v-for="tag in item.tags">
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

<style lang="scss">

@import "../assets/css/raycast.scss";

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
