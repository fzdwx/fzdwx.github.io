---
title: "字体压缩"
date: "2023-04-20T18:50:35+08:00"
layout: "post"
tags: [font]
---

先对比一下压缩前后的效果：

![压缩前](/images/2023-04-20-18-53-12.png)
![压缩后](/images/2023-04-20-18-58-22.png)

主要是压缩了 f1 与 jinkai 这两个字体, f1 这个字体由于我之用到了几个字符所以很小, 大概思路:

1. 定义一个常用的字符集,里面包含你需要的字符
2. 使用 pyftsubset 命令对字体进行压缩
3. 使用 woff2 继续压缩为 woff2 格式

```shell
pyftsubset input.ttf --output-file=output.ttf --text-file=subset.txt
woff2_compress output.ttf
```
