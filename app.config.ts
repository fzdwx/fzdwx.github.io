export default defineAppConfig({
    header: {
        title: "fzdwx",
        icon: "https://avatars.githubusercontent.com/u/65269574?v=4",
        description: "fzdwx's blog",
        slogan: "这个人很懒，什么都没带走",
        // emoji: "https://github.githubassets.com/images/icons/emoji/shipit.png"
        emoji: "/images/status.png"
    },
    baseUrl:"https://fzdwx.vercel.app/",
    footer: {
        copyRight: "2023 | <a class='text-just-dark' href='https://github.com/fzdwx' target='_blank'>fzdwx</a> All Rights Reserved.",
    },
    github: {
        owner: "fzdwx",
        repo: "fzdwx.github.io",
    },
    links: [
        {
            title: "Home",
            url: "/",
            icon: "fluent-emoji:derelict-house",
        },
        {
            title: "Blog",
            url: "/blog",
            icon: "fluent-emoji:pencil",
        },
        {
            title: "Feeds",
            url: "/sub-feeds",
            icon: "fluent-emoji:bookmark"
        },
        {
            title: "Timeline",
            url: "/timeline",
            icon: "fluent-emoji:brain"
        }
    ]
})
