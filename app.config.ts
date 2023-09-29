export default defineAppConfig({
    header: {
        title: "fzdwx",
        icon: "https://avatars.githubusercontent.com/u/65269574?v=4",
        description: "fzdwx's blog",
        slogan: "Just for fun!",
    },
    footer: {
        copyRight: "2023 ~ forever | <a class='text-just-dark' href='https://github.com/fzdwx' target='_blank'>fzdwx</a> All Rights Reserved.",
    },
    github: {
        owner: "fzdwx",
        repo: "fzdwx.github.io",
    },
    links: [
        {
            title: "Home",
            url: "/",
            icon: "ph:house-line-duotone",
        },
        {
            title: "Blog",
            url: "/blog",
            icon: "mdi:text-box-multiple-outline",
        },
        {
            title: "Feeds",
            url: "/sub-feeds",
            icon: "icon-park-outline:rss"
        },
        {
            title: "Timeline",
            url: "/timeline",
        }
    ]
})
