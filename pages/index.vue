<!-- copy from https://github.com/yzh990918/evan-yang -->
<script lang="ts" setup>
import {Command} from 'vue-command-palette'
const config = useAppConfig()
</script>

<template>
  <div class=" m-center jet text-sm">
    <div class="m-con text-xl px-6">
      <div class="m-center px-5 sm:px-8 lg:px-16 space-x-6 sm:space-x-8 items-center w-full">
        <nuxt-link to="/" class="" title="Go Home">
          <nuxt-img
              v-if="config.header.icon"
              :src="config.header.icon"
              :alt="config.header.title"
              width="150"
              height="150"
              class="rounded-full object-cover overflow-hidden"
          />
        </nuxt-link>

        <div class="flex-1 min-w-0 relative space-y-2 sm:space-y-3">
          <div aria-label="title" class="logo-title font-bold text-3xl sm:text-4xl text-just-dark ">
            {{ config.header.title }}
          </div>
          <div class="text-gray-500">
            {{ config.header.slogan }}
          </div>
          <div class="flex space-x-0 sm:space-y-0 sm:space-x-2.5 flex-col sm:flex-row">
            <Github name="fzdwx"/>
            <Email email="likelovec@gmail.com"/>
          </div>
        </div>
      </div>

      <div class="m-center main-font pt-10">
        <div class="m-con">
          <articles-list :showCd="false" :show-tag-list="false" path="/blog"/>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full mx-auto">
    <cmdk placeholder="Jump to">

    </cmdk>
  </div>
</template>

<style scoped>
p {
  @apply py-2
}
</style>