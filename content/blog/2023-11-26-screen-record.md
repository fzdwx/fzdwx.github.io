---
title: 使用 webrtc + ffmpeg 实现屏幕录制以及区域剪裁
date: 2023-11-26 13:30:43
tags: [ linux, project ]
---

> #### 为什么不用 obs ?
>
> 在 linux 上唯一支持比较好的软件是 obs, 但是它有一个致命缺陷就是不支持选框录制, 有时候我只想录制某一块区域,
> 但是它会把整个屏幕录制下来。
>
> > 我刚刚去搜了一下，居然是支持的，只需要 `alt` 拖动就可以了... 写都写了, 还是记录一下吧


实现原理就是就是调用 `navigator.mediaDevices.getDisplayMedia` 获取屏幕的流, 调用后端接口上传视频流, 后端运行 ffmpeg
进行区域剪裁, 最后将剪裁好的文件返回给前端下载

![img](/images/img_15.png)

后端使用 `go + embed fs`, 用户只需要一个二进制就可以了（当然 ffmpeg 还是需要自己安装

项目地址: [fzdwx/screenrd](https://github.com/fzdwx/screenrd)
