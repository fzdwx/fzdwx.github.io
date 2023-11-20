---
title: 在 linux 上实现即时选中并翻译
date: 2023-11-20 22:00:44
tags: [ linux,launcher ]
---

> 这是我写的 [launcher](/blog/2023-06-12-launcher) 原生支持的一个功能, 今天稍微优化了一下

![qwe](/images/2023-11-20-22-00-44.gif)

效果就是上面的 gif 演示的那样, 这样就不用每次都手动复制粘贴后在翻译了(当然也不支持手动输入了), 鼠标选中哪里就翻译哪里

接口是直接调用的 google 的接口, 这个可能需要翻墙. 大概实现原理的话是偷了个懒:

1. 获取用户选中的文本是直接 go 后端调用 `xclip -o` 获取的
2. 前端就用了一个类似定时器的东西, 每隔 500ms 就调用一次后端接口
3. 在加上一个 debounce, 防止用户选中的文本太快, 导致后端接口调用太多次

有兴趣可以查看代码: [fzdwx/launcher#79109f4](https://github.com/fzdwx/launcher/commit/79109f438ec6d3b0865a84b094cd3aeb49581e09)


