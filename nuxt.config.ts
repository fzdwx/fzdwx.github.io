// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        documentDriven: true,
        highlight: {
            theme: "github-light"
        }
    },
    typescript: {
        includeWorkspace: true
    },
})
