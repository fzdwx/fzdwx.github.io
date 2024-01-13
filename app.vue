<script setup lang="ts">
const config = useAppConfig();

useSeoMeta({
  title: config.header.title,
  description: config.header.description,
  ogDescription: config.header.description,
  ogTitle: config.header.title,
  ogType: 'website',
  ogImageUrl: "https://gist.githubusercontent.com/fzdwx/b18ed3d40ce56468d149e63d0f58fe3d/raw/7e3ad34c650c77f65ceadef0ba096b2a25713f12/177021515-71aa6c94-7d68-4e12-a191-8d6cc73b8a83.gif"
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: config.header.icon,
    },
    {rel: 'preload', as: 'font', href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/400.css"},
    {
      rel: 'preload',
      as: 'font',
      href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/400-italic.css"
    },
    {rel: 'preload', as: 'font', href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/500.css"},
    {
      rel: 'preload',
      as: 'font',
      href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/500-italic.css"
    },
    {rel: 'preload', as: 'font', href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/700.css"},
    {rel: 'preload', as: 'font', href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/800.css"},
    {
      rel: 'preload',
      as: 'font',
      href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/700-italic.css"
    },
    {
      rel: 'preload',
      href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@4.5.11/800-italic.css"
    },
    {
      rel: 'stylesheet',
      href: "https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-webfont/1.7.0/style.css"
    }
  ]
})

</script>

<template>

  <Body autofocus>
  <main class="container lg:px-0 md:pb-20 md:px-8 sm:pb-16 sm:px-6 mx-auto px-7 py-10 pb-10 pt-24 l">
    <NuxtPage transition/>
  </main>
  <footer class="px-5 sm:px-7 md:px-10 my-5  text-center">
    <p class="" v-html="config.footer.copyRight">
    </p>
  </footer>
  </Body>
</template>

<style>
</style>
