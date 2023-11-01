---
title: gum 结合 kubectl 使用的一些小脚本
date: 2023-11-01 10:27:25
tags: [kubectl]
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


