<script setup lang="ts">
const config = useAppConfig();

useSeoMeta({
    title: config.header.title,
    description: config.header.description,
    ogDescription: config.header.description,
    ogTitle: config.header.title,
    ogType: 'website',
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
        }
    ],
})

</script>

<template>
    <Body autofocus class="">
    <Nav/>
    <main class="container lg:px-0 md:max-w-700px md:pb-20 md:px-8 sm:pb-16 sm:px-6 mx-auto max-w-full px-7 py-10 pb-10 pt-24 l">
        <NuxtPage/>
    </main>
    <footer class="px-5 sm:px-7 md:px-10 my-5  text-center">
        <div class="invisible">123</div>
        <p class="mt-5" v-html="config.footer.copyRight">
        </p>
    </footer>
    </Body>
</template>
