---
title: 如何配置 OpenCode
date: 2025-12-27 10:00:00
tags: [opencode, ai, cli]
---

OpenCode 是一个强大的 AI agent 框架，采用计划优先的开发工作流。

## 安装步骤

### 步骤 1: 安装 OpenCode CLI

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 步骤 2: 安装 Superpowers

启动 opencode 并输入：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

### 步骤 3: 安装 OpenAgents

```bash
curl -fsSL https://raw.githubusercontent.com/darrenhinde/OpenAgents/main/install.sh | bash -s advanced
```

## 开始使用

```bash
opencode --agent openagent
```

## 相关链接

- [OpenCode 官方文档](https://opencode.ai/docs/)
- [OpenAgents GitHub](https://github.com/darrenhinde/OpenAgents)
- [Superpowers GitHub](https://github.com/obra/superpowers)
