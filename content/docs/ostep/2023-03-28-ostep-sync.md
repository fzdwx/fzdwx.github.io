---
group: "ostep"
title: "并发控制-同步"
date: "2023-03-28T20:55:51+08:00"
layout: "doc"
tags: [os, sync]
order: 10000
---

## 怎么实现一个并发安全的计数器

这是一个并发安全的计数器, 它遵循了简单,正确,易懂的原则, 但有一个致命缺陷就是 **性能**

::: details 简单的并发安全的计数器代码实现

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

跑一个 benchmark, 可以看到加锁和不加锁之间差了近 50 倍

<Gist user="fzdwx" id="3e9dd948b38f12ef39ae760374a1a016" height="h-[400px]" />

### 分段加锁

通过多个局部计数器和一个全局计数器来实现一个逻辑计数器. 比如说在一个有 8 个 CPU 的计算机中, 共有 8 个局部计数器和一个全局计数器, 并且每个计数器都有一把锁

原理是,如果某个核心要增加就修改它们对应的局部计数器的值(并用当前 CPU 上的锁),所以不会有不同 CPU 的线程的竞争.然后间隔一段时间就同步到全局计数器上,并把当前的局部计数器重置.

这种实现的问题是: 间隔越长性能越好但准确性就越低

::: details 代码实现

```go
type Counter struct {
	global    int
	glock     sync.Mutex
	local     []int
	llock     []sync.Mutex
	threshold int
}

func NewCounter(threshold int, threadNum int) *Counter {
	var llock []sync.Mutex
	var local []int
	for i := 0; i < threadNum; i++ {
		llock = append(llock, sync.Mutex{})
		local = append(local, 0)
	}
	return &Counter{
		global:    0,
		glock:     sync.Mutex{},
		local:     local,
		llock:     llock,
		threshold: threshold,
	}
}

func (c *Counter) Add(threadId int) {
	c.llock[threadId].Lock()
	defer c.llock[threadId].Unlock()

	c.local[threadId]++
	if c.local[threadId] >= c.threshold {
		c.glock.Lock()
		c.global += c.local[threadId]
		c.glock.Unlock()
		c.local[threadId] = 0
	}
}

func (c *Counter) Get() int {
	c.glock.Lock()
	defer c.glock.Unlock()

	for i := range c.local {
		c.llock[i].Lock()
		c.global += c.local[i]
		c.local[i] = 0
		c.llock[i].Unlock()
	}

	global := c.global
	return global
}

const N = 1000000
const threadCount = 16

func BenchmarkCounter(b *testing.B) {
	for i := 0; i < b.N; i++ {
		b.StopTimer()
		c := NewCounter(100000, threadCount)
		b.StartTimer()
		var wg sync.WaitGroup
		for i := 0; i < threadCount; i++ {
			wg.Add(1)
			go func(threadId int) {
				defer wg.Done()
				for j := 0; j < N; j++ {
					c.Add(threadId)
				}
			}(i)
		}
		wg.Wait()
		assert.Equal(b, N*threadCount, c.Get())
	}
}
```

:::

这就是一种分段锁的思想的体现, 把 `(N-1) x threshold` 到 `N x threshold` 分别加锁

## 条件变量

在多线程的情况下, 我们可能经常需要等待某一个条件生效, 比如说父线程等待所有子线程都运行完毕( join )

假定下面的程序实现完全正确(count 会按照实现进行正确的--), 下面使用了一个共享变量来记录还在工作的线程的数量,这种实现显而易见是浪费 CPU 的,那么怎么进行改进?

```go
func main(){
	var count = 2
	for i = 0; i < count; i++ {
			go func(){
				time.sleep(xxx)
				count--
			}()
	}

	for{
		if count == 0{
			return
		}
	}
}
```

### wait 与 singal

条件变量有两种操作, wait 和 signal, wait 会阻塞当前线程,直到条件变量被 signal 为止, signal 会唤醒一个等待在条件变量上的线程

这是一个用 Java 使用条件变量的例子, 它实现了一个顺序打印 A,B,C 的功能, 通过一把锁和三个条件变量来实现

核心代码就是 run 方法里面, 通过 while 来不断的运行

1. 首先获取锁
2. 输出 message
3. 唤醒下一个线程 singal (其他线程就会运行到获取锁的步骤)
4. 将自己睡眠 await (释放锁)

<Gist user="fzdwx" id="d8c7836d3367f0f114f5d7310130cb3d" height="h-[450px]" />

这个一个用条件变量实现 join 的例子, `Print` 启动了一个 Daemon 的线程,正常情况下这个程序启动后会立即结束, 但我们实现了一个 join 的功能, 使得主线程会等待子线程结束后才结束

<Gist user="fzdwx" id="c0279b33be19f1136bdb465e9df5ba1e" height="h-[450px]" />
