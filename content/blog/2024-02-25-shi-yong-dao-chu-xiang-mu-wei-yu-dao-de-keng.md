---
title: 使用 gitbook 导出 docsify 项目为电子书遇到的坑
date: 2024-02-25 00:17:15
tags: [ linux ]
---

1.安装 `gitbook`

```shell
pnpm install -g gitbook-cli
gitbook install
```

在运行 `gitbook install` 时会遇到如下错误, 需要将 node 版本降级到 10 以下 `nvm install 9.11.2`

```
/home/xxx/.npm-global/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287
      if (cb) cb.apply(this, arguments)
```

2.安装 `calibre`

```shell
yay -S calibre
```

使用 yay 安装的有问题，推荐使用官网脚本进行安装

```shell
sudo -v && wget --no-check-certificate -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sudo sh /dev/stdin
```

## 导出为电子书

```shell
git clone https://github.com/Vonng/ddia.git
cd ddia
echo '{
  "title":"DDIA",
  "author":"Martin Kleppmann",
  "description":"设计数据密集型应用 - 中文翻译"
}' > book.json
gitbook epub
```
