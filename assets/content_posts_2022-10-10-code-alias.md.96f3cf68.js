import{_ as s,c as a,o,O as e}from"./chunks/framework.2b537b2f.js";const h=JSON.parse('{"title":"Code:alias","description":"","frontmatter":{"title":"Code:alias","date":"2022-10-10T14:43:27.000Z","tags":["idea"],"layout":"post"},"headers":[],"relativePath":"content/posts/2022-10-10-code-alias.md"}'),l={name:"content/posts/2022-10-10-code-alias.md"},n=e(`<h2 id="idea" tabindex="-1">idea <a class="header-anchor" href="#idea" aria-label="Permalink to &quot;idea&quot;">​</a></h2><p>目前有一个想法,是在命令行下管理脚本的工具.</p><p>例如说我有一些常用的脚本:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">find</span><span style="color:#C3E88D;"> . -name </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> -type d </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>然后通过命令行添加</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cli</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">load</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cd </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">find</span><span style="color:#C3E88D;"> . -name </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> -type d </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">fzf</span><span style="color:#89DDFF;">)&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-alias</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cdf</span></span>
<span class="line"></span></code></pre></div><p>然后使用cdf进行运行</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cli</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cdf</span></span>
<span class="line"></span></code></pre></div><h2 id="后续" tabindex="-1">后续 <a class="header-anchor" href="#后续" aria-label="Permalink to &quot;后续&quot;">​</a></h2><blockquote><p>2022-10-18 22:47</p></blockquote><p>刚刚找到了一个跟我这个想法很契合的项目: <a href="https://github.com/denisidoro/navi" target="_blank" rel="noreferrer">https://github.com/denisidoro/navi</a>.</p><p>今天一晚上都在调研技术的可行性,但是都达不到我想要的效果.还是这个例子,<code>cd $(find . -name &quot;*&quot; -type d | fzf)</code>, 主要有两种思路:</p><ol><li>在运行程序的使用利用shell的tab键盘补全,直接替换成这段命令,然后运行.比如说程序叫<code>qwe</code>,在shell里面输入<code>qwe cdf&lt;TAB&gt;</code> ,然后就直接替换为上面的命令.我在go里面找到<code>cobra</code>这个包,它能动态补全命令,有点效果,但还不够,不能做到全部替换,遂搁置.</li><li>直接在程序里面运行这段命令,我试了之后还是不行,<code>cd</code>执行后没有生效,应该还是跟<code>fork</code>有关.</li></ol><p>然后就到github里面找别人的实现,没想到找到了一个,但是试过之后还是不支持,但确实做的还不错.</p><p>想要做成我想要的效果就是实现:</p><ol><li>在shell中补全能直接替换所有,而不是一段.</li><li>在程序中不用<code>fork</code>运行.</li></ol><p>还需要在看看.</p>`,17),p=[n];function t(c,r,i,d,y,D){return o(),a("div",null,p)}const F=s(l,[["render",t]]);export{h as __pageData,F as default};
