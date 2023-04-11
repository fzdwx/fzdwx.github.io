import{_ as s,c as a,o as l,O as n}from"./chunks/framework.76b8e124.js";const _=JSON.parse('{"title":"调节linux屏幕的亮度","description":"","frontmatter":{"title":"调节linux屏幕的亮度","date":"2022-10-04T02:07:28.000Z","tags":["linux"],"layout":"post","summary":"由于使用DWM,它不能像KDE那样之间有图形化的亮度调节功能,所以记录一下."},"headers":[],"relativePath":"content/posts/2022-10-04-backlight.md"}'),t={name:"content/posts/2022-10-04-backlight.md"},e=n(`<p><strong>查看当前backlight由什么控制:</strong></p><blockquote><p>一般都是<code>intel</code>.</p></blockquote><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ls</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/sys/class/backlight</span></span>
<span class="line"></span></code></pre></div><p><strong>查看当前的亮度:</strong></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/sys/class/backlight/intel_backlight/max_brightness</span></span>
<span class="line"></span></code></pre></div><p><strong>修改亮度:</strong></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5000</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tee</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/sys/class/backlight/intel_backlight/brightness</span></span>
<span class="line"></span></code></pre></div>`,7),o=[e];function p(c,i,r,h,d,g){return l(),a("div",null,o)}const y=s(t,[["render",p]]);export{_ as __pageData,y as default};