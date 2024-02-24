<script lang="ts" setup>
const config = useAppConfig();
</script>

<template>
  <div class="m-center text-sm">
    <div class="m-con px-6">
      <div
          class="m-center px-5 space-x-4 sm:space-x-8 w-full"
      >
        <nuxt-link to="/" class="cursor-default" title="Go Home">
          <div>
            <nuxt-img
                v-if="config.header.icon"
                :src="config.header.icon"
                :alt="config.header.title"
                width="180"
                height="180"
                class="rounded-full object-cover overflow-hidden"
            />
            <div class="relative">
              <div
                  class="absolute bottom-5 left-[80%] inline-block p-2 w-[40px] h-[40px] bg-white rounded-full shadow-xl"
              >
                <nuxt-img
                    class="m-0 justify-between h-[24px]"
                    :src="config.header.emoji"
                />
              </div>
            </div>
          </div>
        </nuxt-link>

        <div class="flex-1 min-w-0 relative space-y-2 sm:space-y-3">
          <div
              aria-label="title"
              class="invisible sm:visible logo-title text-xl sm:text-2xl text-just-dark"
          >
            {{ config.header.title }}
          </div>
          <div class="invisible sm:visible text-gray-500 text-base">
            {{ config.header.slogan }}
          </div>
          <div
              class="absolute right-20 sm:bottom-0 invisible sm:visible pb-3 sm:pb-0 sm:right-0 sm:relative flex sm:flex-row text-xl space-x-2 sm:space-y-0 sm:space-x-2.5"
          >
            <Github name="fzdwx"/>
            <Email email="likelovec@gmail.com"/>
          </div>
        </div>
      </div>

      <div class="m-center main-font sm:pt-10">
        <articles-list :showCd="false" :show-tag-list="false" path="/blog"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  @apply py-2;
}
</style>
