import{_ as s,c as n,o as a,O as l}from"./chunks/framework.0fe354fd.js";const d=JSON.parse('{"title":"Wayland下的窗口管理器： Hyprland","description":"","frontmatter":{"title":"Wayland下的窗口管理器： Hyprland","date":"2023-01-26T03:04:48.000Z","layout":"post","tags":["linux","wm"]},"headers":[],"relativePath":"content/posts/2023-01-26-hyprland.md"}'),p={name:"content/posts/2023-01-26-hyprland.md"},o=l(`<p>今天简单尝试了一下 <a href="https://hyprland.org/" target="_blank" rel="noreferrer">Hyprland</a>,它的功能类似于 <a href="/content/posts/2022-09-29-dwm.html">DWM</a> + picom 的组合.只是粗略的尝试了一下,发现还是有一些问题:</p><ol><li>分屏的时候,扩展屏幕的光标不显示 <ul><li>设置 <code>WLR_NO_HARDWARE_CURSORS=1</code> 即可解决</li></ul></li><li>扩展屏幕不时有一些黑块闪烁 <ul><li>替换安装包为 <code>hyprland-nvidia-git</code> 即可解决</li></ul></li><li>waybar 有一点用的不爽,它的 workspaces 不是每个屏幕都是独立的(DWM 中的 tag 功能)</li></ol><p>当然它还是有一些好处的:</p><ol><li>不打任何补丁就有很好的可用性</li><li>自带了一些动画效果</li><li>配置文件热加载(即每次修改就会立即生效) <ul><li>这一点好评,DWM 是每次修改了配置都要重新 <code>make</code></li></ul></li></ol><p>但是我还是选择继续使用 DWM,因为它没有什么必须切换的理由,而且有一些我常用的功能在 Hyprland 中没有找到替代的,加上我的 DWM 的配置也趋于稳定了,也新增了可以点击的 status bar（Hyprland 下使用waybar 可以做到这个功能）.</p><details class="details custom-block"><summary>相关代码</summary><p>安装脚本:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 hyperland</span></span>
<span class="line"><span style="color:#FFCB6B;">yay</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-S</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hyprland-nvidia-git</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 waybar</span></span>
<span class="line"><span style="color:#FFCB6B;">yay</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-S</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">waybar-hyprland-git</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 hyprland share</span></span>
<span class="line"><span style="color:#FFCB6B;">yay</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-S</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xdg-desktop-portal-hyprland-git</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 rofi for wayland</span></span>
<span class="line"><span style="color:#FFCB6B;">yay</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-S</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rofi-lbonn-wayland-git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 壁纸切换</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/Horus645xx/swww</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swww</span></span>
<span class="line"><span style="color:#FFCB6B;">cargo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--release</span></span>
<span class="line"><span style="color:#FFCB6B;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/target/release/swww</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/bin</span></span>
<span class="line"><span style="color:#FFCB6B;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/target/release/swww-daemon</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/bin</span></span>
<span class="line"><span style="color:#FFCB6B;">swww</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"><span style="color:#FFCB6B;">swww</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">img</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--transition-type</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">left</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">~/Pictures/bg/0494e945880511ebb6edd017c2d2eca2.png</span></span>
<span class="line"></span></code></pre></div><p>供参考的启动脚本:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> LIBVA_DRIVER_NAME</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">nvidia</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> XDG_SESSION_TYPE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">wayland</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> GBM_BACKEND</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">nvidia-drm</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> __GLX_VENDOR_LIBRARY_NAME</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">nvidia</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> WLR_NO_HARDWARE_CURSORS</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># fix cursor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Example IME Support: fcitx5</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> GTK_IM_MODULE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">fcitx5</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> QT_IM_MODULE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">fcitx5</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> XMODIFIERS</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">@im=fcitx5</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> SDL_IM_MODULE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">fcitx5</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> GLFW_IM_MODULE</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">ibus</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">exec</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Hyprland</span></span>
<span class="line"></span></code></pre></div><p>~/.config/hypr/hyprland.conf:</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">########################################################################################</span></span>
<span class="line"><span style="color:#A6ACCD;">AUTOGENERATED HYPR CONFIG.</span></span>
<span class="line"><span style="color:#A6ACCD;">PLEASE USE THE CONFIG PROVIDED IN THE GIT REPO /examples/hypr.conf AND EDIT IT,</span></span>
<span class="line"><span style="color:#A6ACCD;">OR EDIT THIS ONE ACCORDING TO THE WIKI INSTRUCTIONS.</span></span>
<span class="line"><span style="color:#A6ACCD;">########################################################################################</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># Please note not all available settings / options are set here.</span></span>
<span class="line"><span style="color:#A6ACCD;"># For a full list, see the wiki</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># See https://wiki.hyprland.org/Configuring/Monitors/</span></span>
<span class="line"><span style="color:#A6ACCD;">monitor=,preferred,auto,auto</span></span>
<span class="line"><span style="color:#A6ACCD;">#monitor=eDP-1-1, 1920x1080@144, 1920x0, 1</span></span>
<span class="line"><span style="color:#A6ACCD;">#monitor=HDMI-0, 1920x1080@60, 0x0, 1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># See https://wiki.hyprland.org/Configuring/Keywords/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Execute your favorite apps at launch</span></span>
<span class="line"><span style="color:#A6ACCD;"># exec-once = waybar &amp; hyprpaper &amp; firefox</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exec-once = fcitx5</span></span>
<span class="line"><span style="color:#A6ACCD;">exec-once = flameshot</span></span>
<span class="line"><span style="color:#A6ACCD;">exec-once = /opt/clash/cfw</span></span>
<span class="line"><span style="color:#A6ACCD;">exec-once = waybar</span></span>
<span class="line"><span style="color:#A6ACCD;">#exec-once = dunst</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Source a file (multi-file configs)</span></span>
<span class="line"><span style="color:#A6ACCD;"># source = ~/.config/hypr/myColors.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#misc {</span></span>
<span class="line"><span style="color:#A6ACCD;">#    no_vfr = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">#}</span></span>
<span class="line"><span style="color:#A6ACCD;"># For all categories, see https://wiki.hyprland.org/Configuring/Variables/</span></span>
<span class="line"><span style="color:#A6ACCD;">input {</span></span>
<span class="line"><span style="color:#A6ACCD;">    kb_layout = us</span></span>
<span class="line"><span style="color:#A6ACCD;">    kb_variant =</span></span>
<span class="line"><span style="color:#A6ACCD;">    kb_model =</span></span>
<span class="line"><span style="color:#A6ACCD;">    kb_options =</span></span>
<span class="line"><span style="color:#A6ACCD;">    kb_rules =</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    follow_mouse = 1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    touchpad {</span></span>
<span class="line"><span style="color:#A6ACCD;">        natural_scroll = no</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    sensitivity = 0 # -1.0 - 1.0, 0 means no modification.</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">general {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See https://wiki.hyprland.org/Configuring/Variables/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    gaps_in = 5</span></span>
<span class="line"><span style="color:#A6ACCD;">    gaps_out = 20</span></span>
<span class="line"><span style="color:#A6ACCD;">    border_size = 2</span></span>
<span class="line"><span style="color:#A6ACCD;">    col.active_border = rgba(33ccffee) rgba(00ff99ee) 45deg</span></span>
<span class="line"><span style="color:#A6ACCD;">    col.inactive_border = rgba(595959aa)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    layout = dwindle</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">decoration {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See https://wiki.hyprland.org/Configuring/Variables/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    rounding = 10</span></span>
<span class="line"><span style="color:#A6ACCD;">    blur = yes</span></span>
<span class="line"><span style="color:#A6ACCD;">    blur_size = 3</span></span>
<span class="line"><span style="color:#A6ACCD;">    blur_passes = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">    blur_new_optimizations = on</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    drop_shadow = yes</span></span>
<span class="line"><span style="color:#A6ACCD;">    shadow_range = 4</span></span>
<span class="line"><span style="color:#A6ACCD;">    shadow_render_power = 3</span></span>
<span class="line"><span style="color:#A6ACCD;">    col.shadow = rgba(1a1a1aee)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">animations {</span></span>
<span class="line"><span style="color:#A6ACCD;">    enabled = yes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # Some default animations, see https://wiki.hyprland.org/Configuring/Animations/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    bezier = myBezier, 0.05, 0.9, 0.1, 1.05</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    animation = windows, 1, 7, myBezier</span></span>
<span class="line"><span style="color:#A6ACCD;">    animation = windowsOut, 1, 7, default, popin 80%</span></span>
<span class="line"><span style="color:#A6ACCD;">    animation = border, 1, 10, default</span></span>
<span class="line"><span style="color:#A6ACCD;">    animation = fade, 1, 7, default</span></span>
<span class="line"><span style="color:#A6ACCD;">    animation = workspaces, 1, 6, default</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">dwindle {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See https://wiki.hyprland.org/Configuring/Dwindle-Layout/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;">    pseudotile = yes # master switch for pseudotiling. Enabling is bound to mainMod + P in the keybinds section below</span></span>
<span class="line"><span style="color:#A6ACCD;">    preserve_split = yes # you probably want this</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">master {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See https://wiki.hyprland.org/Configuring/Master-Layout/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;">    new_is_master = true</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">gestures {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See https://wiki.hyprland.org/Configuring/Variables/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;">    workspace_swipe = off</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Example per-device config</span></span>
<span class="line"><span style="color:#A6ACCD;"># See https://wiki.hyprland.org/Configuring/Keywords/#executing for more</span></span>
<span class="line"><span style="color:#A6ACCD;">device:epic mouse V1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">    sensitivity = -0.5</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Example windowrule v1</span></span>
<span class="line"><span style="color:#A6ACCD;"># windowrule = float, ^(kitty)$</span></span>
<span class="line"><span style="color:#A6ACCD;"># Example windowrule v2</span></span>
<span class="line"><span style="color:#A6ACCD;"># windowrulev2 = float,class:^(kitty)$,title:^(kitty)$</span></span>
<span class="line"><span style="color:#A6ACCD;"># See https://wiki.hyprland.org/Configuring/Window-Rules/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span></span>
<span class="line"><span style="color:#A6ACCD;"># 定义 class 带 float 的都初始为 float 启动</span></span>
<span class="line"><span style="color:#A6ACCD;">windowrulev2 = float,class:^(float)$</span></span>
<span class="line"><span style="color:#A6ACCD;">windowrulev2 = noborder,class:^(noborder)$</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># See https://wiki.hyprland.org/Configuring/Keywords/ for more</span></span>
<span class="line"><span style="color:#A6ACCD;">$mainMod = SUPER</span></span>
<span class="line"><span style="color:#A6ACCD;">$term = wezterm</span></span>
<span class="line"><span style="color:#A6ACCD;">$term_float = wezterm start --class float</span></span>
<span class="line"><span style="color:#A6ACCD;">$rofi = rofi -show window -show-icons</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># start term</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod,       Return,       exec, $term</span></span>
<span class="line"><span style="color:#A6ACCD;"># start float term</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod,   minus,        exec, $term_float</span></span>
<span class="line"><span style="color:#A6ACCD;"># start launch</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = ALT,        SPACE,        exec, $rofi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># kill window</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, Q, killactive,</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, P, pseudo, # dwindle</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, J, togglesplit, # dwindle</span></span>
<span class="line"><span style="color:#A6ACCD;"># super + f 全屏窗口</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=$mainMod,F,fullscreen,0</span></span>
<span class="line"><span style="color:#A6ACCD;"># super + space 将窗口切换为浮动</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=$mainMod,SPACE,togglefloating,active</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 切换聚焦窗口</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPER,left,movefocus,l</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPER,right,movefocus,r</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPER,up,movefocus,u</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPER,down,movefocus,d</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 将当前窗口移动 可以一直移动</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPERSHIFT,left,movewindow,l</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPERSHIFT,right,movewindow,r</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPERSHIFT,up,movewindow,u</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPERSHIFT,down,movewindow,d</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 切换工作空间</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=SUPER,TAB,workspace,previous</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 1, workspace, 1</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 2, workspace, 2</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 3, workspace, 3</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 4, workspace, 4</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 5, workspace, 5</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 6, workspace, 6</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 7, workspace, 7</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 8, workspace, 8</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 9, workspace, 9</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, 0, workspace, 10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># alt+super + 方向键 控制窗口大小</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=$mainMod,comma,resizeactive,-20 0</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=$mainMod,period,resizeactive,20 0</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=ALT_SUPER,up,resizeactive,0 -20</span></span>
<span class="line"><span style="color:#A6ACCD;">bind=ALT_SUPER,down,resizeactive,0 20</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Move active window to a workspace with mainMod + SHIFT + [0-9]</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 1, movetoworkspace, 1</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 2, movetoworkspace, 2</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 3, movetoworkspace, 3</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 4, movetoworkspace, 4</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 5, movetoworkspace, 5</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 6, movetoworkspace, 6</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 7, movetoworkspace, 7</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 8, movetoworkspace, 8</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 9, movetoworkspace, 9</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT, 0, movetoworkspace, 10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># shift + super + left/right 移动窗口 到下一个或上一个工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT,Left,movetoworkspace,e-1</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod SHIFT,right,movetoworkspace,e+1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Scroll through existing workspaces with mainMod + scroll</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, mouse_down, workspace, e+1</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = $mainMod, mouse_up, workspace, e-1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Move/resize windows with mainMod + LMB/RMB and dragging</span></span>
<span class="line"><span style="color:#A6ACCD;">bindm = $mainMod, mouse:272, movewindow</span></span>
<span class="line"><span style="color:#A6ACCD;">bindm = $mainMod, mouse:273, resizewindow</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></details>`,6),e=[o];function c(i,t,r,C,A,y){return a(),n("div",null,e)}const m=s(p,[["render",c]]);export{d as __pageData,m as default};
