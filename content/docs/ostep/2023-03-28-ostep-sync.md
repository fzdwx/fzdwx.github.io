---
group: "ostep"
title: "并发控制-同步"
date: "2023-03-28T20:55:51+08:00"
layout: "doc"
tags: [os, sync]
order: 10000
---

## 怎么实现一个并发安全的计数器

这是一个简单的并发安全的计数器, 它是一个简单,正确,易懂的实现. 它有一个致命缺陷就是 **性能**

:::  details 简单的并发安全的计数器代码实现

```go
type Add struct {
    sync.Mutex
    count int
}

func (a *Add) Get() int {
    a.Lock()
    defer a.Unlock()
    return a.count
}

func (a *Add) incr() {
    a.Lock()
    defer a.Unlock()
    a.count++
}

func (a *Add) decr() {
    a.Lock()
    defer a.Unlock()
    a.count--
}
```

:::
