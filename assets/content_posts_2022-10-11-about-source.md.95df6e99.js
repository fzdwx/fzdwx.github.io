import{_ as s,c as a,o as l,O as n}from"./chunks/framework.2b537b2f.js";const F=JSON.parse('{"title":"在shell脚本中执行cd后改变main shell的路径","description":"","frontmatter":{"title":"在shell脚本中执行cd后改变main shell的路径","date":"2022-10-11T08:55:35.000Z","tags":["linux","idea"],"layout":"post"},"headers":[],"relativePath":"content/posts/2022-10-11-about-source.md"}'),e={name:"content/posts/2022-10-11-about-source.md"},o=n(`<h2 id="起因" tabindex="-1">起因 <a class="header-anchor" href="#起因" aria-label="Permalink to &quot;起因&quot;">​</a></h2><p>昨天晚上想用fzf与cd联动,就是fzf的结果传递给cd来执行于是有了这么一条命令:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">fd</span><span style="color:#C3E88D;"> --type d </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>这个命令也确实能完成任务,但是问题有两个:</p><ol><li>如果直接退出的话会回到家目录,因为<code>$(..)</code>的执行结果为空</li><li>每次都要输入这么多会很麻烦</li></ol><h2 id="用alias" tabindex="-1">用alias <a class="header-anchor" href="#用alias" aria-label="Permalink to &quot;用alias&quot;">​</a></h2><p>然后尝试用alias来试试,所以就往<code>.zshrc</code>里面添加:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> cdf</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cd </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">fd</span><span style="color:#C3E88D;"> --type d </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span></code></pre></div><p>结果是直接不能运行,因为它直接识别了<code>$(..)</code>这一段,然后直接运行了,但是后面就不会运行.</p><h2 id="用shell脚本" tabindex="-1">用shell脚本 <a class="header-anchor" href="#用shell脚本" aria-label="Permalink to &quot;用shell脚本&quot;">​</a></h2><p>然后就写了这个文件:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">fd</span><span style="color:#C3E88D;"> --type d --strip-cwd-prefix --hidden --follow --exclude .git --exclude node_modules </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-z</span><span style="color:#89DDFF;"> &quot;</span><span style="color:#A6ACCD;">$path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">];</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">then</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">exit</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">$path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">||</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">exit</span></span>
<span class="line"></span></code></pre></div><p>结果也是不行,后面我在最下面加了一行<code>echo &quot;$PWD&quot;</code>,我看到是执行了的,但是程序退出了就失效了.</p><h2 id="解决" tabindex="-1">解决 <a class="header-anchor" href="#解决" aria-label="Permalink to &quot;解决&quot;">​</a></h2><p>最后我搜索到可以使用<code>source xxx</code>或者<code>. xxx</code>来解决,最后是alias+shell脚本来完成这个操作的:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">alias</span><span style="color:#A6ACCD;"> cdf</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">source /path/to/cdf</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><p>同时它也解决我上面提到的两个问题.</p><h2 id="source为什么能解决" tabindex="-1">source为什么能解决？ <a class="header-anchor" href="#source为什么能解决" aria-label="Permalink to &quot;source为什么能解决？&quot;">​</a></h2><p>之所以直接用shell脚本直接运行会不行,是因为它不是在当前shell环境中运行的,而是一个子shell,所以结果就不能改变当前的文件目录了.</p><p>而<code>source</code>或者<code>.</code>就代表着在当前的shell环境中执行,所以就能成功.</p><h2 id="更新" tabindex="-1">更新 <a class="header-anchor" href="#更新" aria-label="Permalink to &quot;更新&quot;">​</a></h2><h3 id="_2022-11-18" tabindex="-1">2022/11/18 <a class="header-anchor" href="#_2022-11-18" aria-label="Permalink to &quot;2022/11/18&quot;">​</a></h3><p>今天发现一种更容易解决的办法,就是在写一个 shell 方法:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cd()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>把它加入到<code>.zshrc</code>(我用的是 zsh)中,然后在命令行中输入 <code>cd</code> 就好了.</p>`,25),p=[o];function t(c,r,i,d,y,h){return l(),a("div",null,p)}const C=s(e,[["render",t]]);export{F as __pageData,C as default};
