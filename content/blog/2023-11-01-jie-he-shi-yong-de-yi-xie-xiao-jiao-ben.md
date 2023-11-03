---
title: gum 结合 kubectl 使用的一些小脚本
date: 2023-11-01 10:27:25
tags: [ kubectl ]
---

> gum 安装
> ```shell
> go install github.com/charmbracelet/gum@latest
> ```

## 1. 查看某个 pod 的日志

```shell
#!/bin/sh

export kube_log_namespace=$(gum input --placeholder "Please input k8s namespace")
export kube_log_pod=$(kubectl get pods -n ${kube_log_namespace} | gum filter | awk '{print $1}')
kubectl logs -f $kube_log_pod -n $kube_log_namespace
```

配合 `ripgrep` 使用, 假设这个脚本叫 klog, 则 `klog | rg hello -C 5`

## 2. 获取某个 pod 的 deploy

```shell
#!/bin/sh

export kube_log_namespace=$(gum input --placeholder "Please input k8s namespace")
export kube_log_pod=$(kubectl get pods -n ${kube_log_namespace} | gum filter | awk '{print $1}')
kubectl get -o json -n $kube_log_namespace pod $kube_log_pod 
```

同样可以配合 `fx` 来使用： `kde | fx`



