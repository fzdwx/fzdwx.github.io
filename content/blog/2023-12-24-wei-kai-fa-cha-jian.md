---
title: 为 launcher 开发扩展
date: 2023-12-24 10:07:03
tags: [ launcher ]
---

[launcher](https://github.com/fzdwx/launcher) 是我开发的一款开源的 Application launcher,
目前只支持 linux 系统(我现在只用 linux).

它的扩展机制是通过 Electron 中的 BrowserView 来实现的:

1. 当你需要加载一个扩展时, 主窗口会挂载一个 BrowserView
2. 调用 `view.loadUrl($backendUrl?ext=path/to/your/extension)`
3. 这会请求到 launcher 的后端, 后端根据 ext 指定的 extension 路径, 来加载对应的 extension 下的 dist 目录

相关代码实现: [electron/api.ts](https://github.com/fzdwx/launcher/blob/e40d4422c9c8bdbe177dc5664f24a33970dcc148/electron/api.ts#L43)
以及 [launcher-native/extension.go](https://github.com/fzdwx/launcher/blob/fee466993f89a7027955bee4b64a751abb6705cd/launcher-native/extension.go#L11)

### 0x00 从模板开始

进入 [launcher-extension-sample](https://github.com/fzdwx/launcher-extension-sample) 项目, 点击 Use this template,
生成一个新的项目.

![img](/images/img_16.png)

### 0x01 编写扩展

clone 项目并启动:

```shell
git clone https://github.com/fzdwx/launcher-extension-sample.git
cd launcher-extension-sample
pnpm i
pnpm run dev
```

这是一个搜索 github 上面 repo 的扩展, 你可以在搜索框中输入关键字, 它就会去搜索 github 上面的 repo, 并在窗口中展示

### 0x02 在 launcher 加载本地扩展

在 launcher 输入 dev mode 并回车, 就会加载你刚刚运行的程序

![img](/images/img_17.png)

### 0x03 launcher 提供的 API

在 [launcher-api](https://github.com/fzdwx/launcher-api) 提供了一些常用的接口，比如粘贴板的控制, 读写配置, 执行命令等等

### 0x04 发布扩展

1. 首先运行 `pnpm run build` 来构建你的扩展
2. `git add dist` 并推送到 github 上
3. 发起一个 PR 到 [launcher-extension](https://github.com/fzdwx/launcher-extension), 在 extensions.json 中添加你的扩展的相关信息

格式如下:

```json
{
  "name": "Devv",
  "description": "最懂程序员的新一代 AI 搜索引擎",
  "author": "fzdwx",
  "icon": "https://raw.githubusercontent.com/fzdwx/launcher-devv/main/public/logo.png",
  "github": "https://github.com/fzdwx/launcher-devv",
  "actions": [
    {
      "name": "Devv - 复制粘贴板并搜索",
      "command": "devv-clipboard"
    }
  ]
}
```

其中 `name`, `description`, `author`, `icon`, `github` 是必填的,
`actions` 是可选的, 每个 action 都会在 launcher 中单独展示为一项, 可以通过 `launcher-api`
提供的 `getActionCommand` 方法来获取进入插件时的 `command`, 从而 执行对应的操作/渲染对应的页面

![img](/images/img_18.png)


---
