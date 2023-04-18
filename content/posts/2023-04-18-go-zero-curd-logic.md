---
title: "go-zero 生成 curd 的逻辑"
date: "2023-04-18T14:29:40+08:00"
layout: "post"
tags: [go]
---

go-zero 提供了一个很好用的工具 goctl, 可以用来生成一些模板代码, 比如根据 .api 文件生成 type, route, handle, logic 以及根据 table 生成 model 代码.

但却少了一个对我们这些 curd boy 更需要的功能, 就是根据 table dsl 生成 curd 的逻辑, 而这在 Java 生态中是一个很基础的功能(Mybatis).

个人猜测这可能跟 go 中各种 ORM 框架百花齐放的原因有关, 且 go-zero 也并没有强制使用某个 ORM 框架, 所以社区就没有实现这个功能.

**如何实现?**

其实很简单, goctl 已经提供了解析 .api 文件以及读取 table dsl 的功能, 我们只需要结合一下就可了.

1. 解析 .api 文件
2. 读取 table 信息
3. 通过 table 信息映射出 add, update, delete, page, get 等功能的 request 以及 response 的类型并放入 apiSpec 中
4. 添加 route 到 apiSpec 中
5. 定义 logic template, 这个是跟 ORM 强相关的, 需要根据情况来实现
6. 生成 type, handle, logic 等代码
7. 生成替换原有的 .api 文件
8. 生成 route

还可以加一些扩展功能, 比如根据 请求类型的 tag 来生成 where 条件, 目前我这边是默认为 eq, 但是可以根据 tag 来生成 like, gt, lt 等条件.

大概思路就是这样, 代码就不放出来丢人了...
