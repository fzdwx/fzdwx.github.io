// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    app: {},
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "nuxt-icon",
        "@nuxt/image",
    ],
    devtools: {
        position: "left"
    },
    content: {
        highlight: {
            theme: "github-light"
        }
    },
    typescript: {
        includeWorkspace: true
    },
})
