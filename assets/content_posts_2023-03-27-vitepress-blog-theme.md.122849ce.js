import{_ as s,c as e,o as t,O as a}from"./chunks/framework.0fe354fd.js";const g=JSON.parse('{"title":"一个 VitePress 博客主题","description":"","frontmatter":{"title":"一个 VitePress 博客主题","date":"2023-03-27T19:53:12+08:00","layout":"post","tags":["project","front"]},"headers":[],"relativePath":"content/posts/2023-03-27-vitepress-blog-theme.md"}'),l={name:"content/posts/2023-03-27-vitepress-blog-theme.md"},o=a(`<blockquote><p>这两天写了一个 vitepress blog 主题, 用来替换掉 hugo, 原本的<a href="https://github.com/fzdwx/blog-history" target="_blank" rel="noreferrer">博客存档</a></p></blockquote><p>在功能上尽可能的和原本的主题一致,比如说:</p><ol><li>post, 用于存放普通的博客</li><li>issue, 一种可以动态更新的博客, 个人以前用来存放一些资料和收藏夹等 <ul><li>现在跟以前一样都是用 Gtihub action 来实现的, 不同点是现在直接提供了一个 cli 工具, 用户可以随时拉取</li><li>以前则全部都是用 action 实现的 - <a href="/content/posts/2022-10-15-about-github-action.html">相关介绍</a></li></ul></li><li>docs, 用于存放文档/笔记. 得益于使用 vitepress, 所以文档的功能很强大, 有侧边栏,大纲等 <ul><li>并且添加了大纲自动生成功能, 根据一个 <code>group</code> 来进行分组</li></ul></li></ol><p>我还提供了一个 cli 工具, 它可以同来辅助使用 vitepress-blog-theme:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bang</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 初始化主题</span></span>
<span class="line"><span style="color:#FFCB6B;">bang</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sync</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 同步 issue</span></span>
<span class="line"><span style="color:#FFCB6B;">bang</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">new</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 创建 page</span></span>
<span class="line"><span style="color:#FFCB6B;">bang</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 同步主题</span></span>
<span class="line"></span></code></pre></div><hr><p>主题地址: <a href="https://github.com/fzdwx/vitepress-blog-theme" target="_blank" rel="noreferrer">https://github.com/fzdwx/vitepress-blog-theme</a></p>`,7),n=[o];function p(c,r,i,h,_,y){return t(),e("div",null,n)}const u=s(l,[["render",p]]);export{g as __pageData,u as default};
