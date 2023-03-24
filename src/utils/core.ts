import dayjs from "dayjs";
//@ts-ignore
import { data as contents, Page } from "@/utils/content.data";

export const inBrowser = typeof document !== "undefined";
export const HASH_RE = /#.*$/;
export const EXT_RE = /(index)?\.(md|html)$/;
export const EXTERNAL_URL_RE = /^[a-z]+:/i;

const init = () => {
  const pageMap = new Map<string, Page>();
  const pageGroupByLayout = new Map<string, Page[]>();
  contents.forEach((content: Page) => {
    pageMap.set(content.url, content);
    const layout = content.frontmatter.layout;
    if (!layout) {
      return;
    }

    pageGroupByLayout.get(layout)?.push(content) ||
      pageGroupByLayout.set(layout, [content]);
  });

  const posts: Page[] = pageGroupByLayout.get("post") || [];
  return {
    pageMap,
    posts,
    pageGroupByLayout,
  };
};

const { pageMap, posts, pageGroupByLayout } = init();

/**
 * get path by route path
 * @param path route path
 * @returns Page
 */
const getPage = (path: string) => {
  return pageMap.get(path);
};

const getPages = (layout: string) => {
  return pageGroupByLayout.get(layout) || [];
};

const defaultDataFormat = "YYYY-MM-DD HH:mm:ss";

const formatDate = (time: string | number, pattern?: string) => {
  if (pattern === undefined) {
    pattern = defaultDataFormat;
  }

  return dayjs(time).add(-8, "hour").format(pattern);
};

const tagsUrl = (layout: string, tag: string) => {
  return `/tags?layout=${layout}&tag=${tag}`;
};

export function isActive(
  currentPath: string,
  matchPath: string,
  asRegex = false
) {
  if (matchPath === undefined) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }
  if (normalize(matchPath) !== currentPath) {
    return false;
  }
  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) {
    return (inBrowser ? location.hash : "") === hashMatch[0];
  }
  return true;
}

export function normalize(path: string) {
  return decodeURI(path).replace(HASH_RE, "").replace(EXT_RE, "");
}
export function isExternal(path: string) {
  return EXTERNAL_URL_RE.test(path);
}
const formatDesc = (desc: string) => {
  var res = stripHtmlTags(desc);
  if (res.length > 100) {
    res = res.slice(0, 200) + "...";
  }
  return res;
};

const stripHtmlTags = (html: string) => {
  html = html.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
  return html;
};

export {
  contents as pages,
  posts,
  pageMap,
  pageGroupByLayout,
  formatDate,
  getPage,
  getPages,
  tagsUrl,
  formatDesc,
};
