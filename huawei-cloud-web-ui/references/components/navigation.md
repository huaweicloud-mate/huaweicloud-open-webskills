# 导航/页头

来源：HTML 结构分析

## 页头结构

两个站点共用统一的页头组件 `<hd-header>`，通过 JS 动态加载：

```html
<!-- 页头由外部脚本渲染 -->
<hd-header></hd-header>

<!-- 加载脚本 -->
<script src="https://developer.huaweicloud.com/portal-res-static/developer-preload-header.js?url=https://developer.huaweicloud.com/common/hwcheader2023.html"></script>
```

## 主站页头

```html
<!-- CSS 引入 -->
<link rel="stylesheet"
  href="https://portal.hc-cdn.com/cpage-pep-header-and-footer-china/2.0.50/index.css">

<!-- 主站隐藏移动端页头 -->
<style>
  @media(max-width:768px) {
    #header { display: none; }
  }
</style>
```

## 导航样式特征

从 CSS 分析得出的导航样式：

```css
/* 页头背景：默认透明或白色 */
/* 导航项文字 */
color: #252b3a;
font-size: 14px;

/* 导航项 hover */
color: #c7000b;

/* 子导航下拉 */
background: #FFFFFF;
box-shadow: 0 0 6px 0 rgba(174, 186, 208, 0.27);
width: 168px;

/* 子导航分割线 */
border-bottom: 1px solid #DFE1E6;
margin: 0 20px 0 16px;

/* 消息提示红点 */
background-color: #c7000b;
border-radius: 50%;
width: 6px;
height: 6px;

/* 消息徽标 */
background-color: #c7000b;
padding: 0 4px;
border-radius: 10px;
font-size: 12px;
line-height: 16px;
color: #fff;
min-width: 16px;
```

## 用户菜单

```css
/* 用户菜单下拉 */
.menu-user-title-customize {
  padding: 10px 0;
  background: #FFFFFF;
  box-shadow: 0 0 6px 0 rgba(174, 186, 208, 0.27);
}

/* 菜单项 */
.menu-user-list {
  font-size: 14px;
  color: #252b3a;
  height: 32px;
  line-height: 32px;
}

/* 菜单项 hover */
color: #c7000b;

/* 菜单展开箭头 */
background: url(arrow-down.png);
transform-origin: 0 6px;
transition: .5s;

/* 展开状态 */
transform: rotateX(180deg);
```

## 简化页头 HTML 模板

当无法使用官方页头组件时，可用以下模板：

```html
<header id="header">
  <div class="header-container">
    <div class="header-main">
      <!-- Logo -->
      <a href="/" class="header-logo">
        <img src="https://www.huaweicloud.com/favicon.ico" alt="HWC">
        <span>HWC</span>
      </a>

      <!-- 导航 -->
      <nav class="header-nav">
        <a href="#">产品</a>
        <a href="#">解决方案</a>
        <a href="#">定价</a>
        <a href="#">文档</a>
        <a href="#">开发者</a>
      </nav>

      <!-- 右侧工具 -->
      <div class="header-tools">
        <a href="#" class="btn-login">登录</a>
        <a href="#" class="developer-btns btn-red btn-small">注册</a>
      </div>
    </div>
  </div>
</header>
```

## 页头 CSS 要点

```css
#header {
  position: fixed;       /* 或 sticky */
  top: 0;
  width: 100%;
  z-index: 1030;         /* --por-base-zindex-fixed */
  background: #fff;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
}
```
