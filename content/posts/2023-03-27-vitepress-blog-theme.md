---
title: "一个 VitePress 博客主题"
date: "2023-03-27T19:53:12+08:00"
layout: "post"
tags: [project, front]
---

> 这两天写了一个 `vitepress` blog 主题, 用来替换掉 `hugo`, 原本的[博客存档](https://github.com/fzdwx/blog-history)

在功能上尽可能的和原本的主题一致,比如说:

1. `post`, 用于存放普通的博客
2. `issue`, 一种可以动态更新的博客, 个人以前用来存放一些资料和收藏夹等
   - 现在跟以前一样都是用 Gtihub action 来实现的, 不同点是现在直接提供了一个 cli 工具, 用户可以随时拉取
   - 以前则全部都是用 action 实现的 - [相关介绍](/content/posts/2022-10-15-about-github-action)
3. `docs`, 用于存放文档/笔记. 得益于使用 vitepress, 所以文档的功能很强大, 有侧边栏,大纲等
   - 大纲是自动生成的, 可以根据一个 `group` 来进行分组
   - 而原主题的 `docs` 跟 `post` 是一样的

我还提供了一个 cli 工具, 它可以同来辅助使用 `vitepress-blog-theme`:

1. 初始化主题: `bang init`
2. 同步 issue: `bang sync`
3. 创建 page: `bang new`
4. 同步主题: `bang update`

---

主题地址: https://github.com/fzdwx/vitepress-blog-theme
