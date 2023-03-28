import { getRssFeed } from "./theme/rss";
import { defineConfigWithTheme, PageData } from "vitepress";
import { ThemeConfig } from "../src/utils/config.type";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: "fzdwx",
  description: "What your say ?",
  themeConfig: {
    outline: {
      level: "deep",
    },
    icon: "https://raw.githubusercontent.com/fzdwx/blog-history/main/static/images/party_parrot.gif",
    dateFormat: "YYYY-MM-DD HH:mm:ss",
    editLink: {
      text: "✍",
      pattern: (path) => {
        return `https://github.com/fzdwx/fzdwx.github.io/blob/main/${path}`;
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Notes",
        link: "/tags?layout=issue",
      },
      {
        text: "Docs",
        link: "/tags?layout=doc",
      },
      { text: "Tags", link: "/tags?layout=post", activeMatch: "" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/fzdwx/fzdwx.github.io" },
    ],
  },
  head: [
    [
      "script",
      { src: "https://www.googletagmanager.com/gtag/js?id=G-DGKZ9K6GHW" },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-DGKZ9K6GHW');`,
    ],
  ],
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: getRssFeed({
    links,
    baseUrl: "https://fzdwx.github.io",
    copyright: "© 2023-forever fzdwx",
  }),
});
