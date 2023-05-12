// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/content", "@nuxtjs/tailwindcss","pinceau/nuxt"],
    // @ts-ignore
    extends: [
        '@nuxt-themes/elements'
    ],
    devtools: {
        position: "left"
    },
    pinceau:{

    },
    content: {
        highlight: {
            theme: "github-light"
        }
    }
})
