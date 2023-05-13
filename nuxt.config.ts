// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "nuxt-icon"
    ],
    // @ts-ignore
    extends: [
        '@nuxt-themes/elements'
    ],
    devtools: {
        position: "left"
    },
    content: {
        highlight: {
            theme: "github-light"
        }
    }
})
