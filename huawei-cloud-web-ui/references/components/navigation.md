# 导航 / 页头

来源：华为云开发者公共页头实测（developer.huaweicloud.com）

## 接入策略（优先公共开发者页头）

开发者站页面**优先接入华为云开发者公共页头**（`<hd-header>` 动态组件，含站点信息栏 / 主导航 / 用户菜单，页脚自动生成），保证导航结构、登录态、多语言与官网一致；**仅当无法接入公共页头时**才退回自研页头。

| 方案 | 适用场景 | 说明 |
|------|---------|------|
| ✅ 公共开发者页头 `<hd-header>` | 部署在 developer.huaweicloud.com 或其子路径下的页面 | 本文「公共页头接入」 |
| ⚠️ 自研页头（备选） | 独立域名、无法加载官方脚本、需高度定制 | [登录模式页头](header-login.md) |

## 公共页头接入（推荐）

### 1. `<head>` 内按固定顺序加载（顺序不可调换）

```html
<!-- ① 基础组件样式（公共页头依赖 cnpm-baseui，此处固定为 2.8.11） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/2.8.11/index.css?sttl=202202241920" />
<!-- ② jQuery -->
<script src="https://res-static.hc-cdn.cn/aem/content/dam/cloudbu-develop/archive/china/zh-cn/developer/developer-page/js/jquery.min.js?sttl=1.0.77&ttr=1.0.5"></script>
<!-- ③ 页头预取脚本：?url= 指向页头 fragment -->
<script src="https://developer.huaweicloud.com/portal-res-static/developer-preload-header.js?url=https://developer.huaweicloud.com/common/hwcheader2026.html"></script>
<!-- ④ 双通道之二：与 ③ 的 ?url= 必须完全一致 -->
<script>window.developerHeaderUrl = 'https://developer.huaweicloud.com/common/hwcheader2026.html';</script>
<!-- ⑤ 模板脚本：渲染页头，并在页尾自动 append 页脚 -->
<script src="https://res-static.hc-cdn.cn/aem/content/dam/cloudbu-develop/archive/china/zh-cn/developer/developer-page/js/developer-pep2-template.js"></script>
```

### 2. `<body>` 内放置挂载点

```html
<body>
  <hd-header></hd-header>
  <!-- 页脚由 developer-pep2-template.js 自动 append 到 body，无需手动放置 -->
  <div id="app"></div>
</body>
```

### 关键约束（踩坑记录）

1. **双通道 URL 必须一致**：`developer-preload-header.js?url=` 与 `window.developerHeaderUrl` 必须指向同一 fragment，否则页头空白或重复加载。
2. **fragment 名随版本演进**（`hwcheader2023.html` → `hwcheader2026.html` …），以官方当前线上为准，勿沿用旧名。
3. **登录/登出链接兜底**：`developer-pep2-template.js` 加载后约 1s 用 jQuery 给页头登录/登出链接赋 `href`；当页头内容是异步注入、晚于该时刻时链接无 `href`、点击无响应，需自行轮询补齐（见下）。
4. **自研页头需隐藏**：接入公共页头后，隐藏/移除自研 `SiteHeader`/`SiteFooter`，避免出现两个页头；组件代码可保留以备回退。
5. **旧版 baseui 副作用**：公共页头引入 `cnpm-baseui@2.8.11`，其 `.por-btn` 为 `2px` 直角（≠ 3.0.17 的胶囊），且 `.btn` 等类名会污染全局样式，需做作用域收口。

### 登录/登出链接兜底

```js
const logoutHref = `${LOGOUT_URL}?service=${encodeURIComponent(location.href)}`
const loginHref = `${LOGIN_URL}?service=${encodeURIComponent(location.href)}&locale=zh-cn`
let tries = 0
const timer = setInterval(() => {
  tries++
  document.querySelectorAll('.header-user-info .account-nav .logout a.logout-btn, #login-out')
    .forEach((a) => { const c = a.getAttribute('href'); if (!c || c.includes('undefined')) a.setAttribute('href', logoutHref) })
  document.querySelectorAll('.header-login .js-login')
    .forEach((a) => { const c = a.getAttribute('href'); if (!c || !c.startsWith('http')) a.setAttribute('href', loginHref) })
  if (tries >= 20) clearInterval(timer)   // ≤10s 后停止
}, 500)
```

> 登录态判定用 `fetchUserInfo()`：返回含 `username` 即视为已登录。详见 [登录模式页头](header-login.md)。

## 主站（huaweicloud.com）页头

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

## 备选：自研简化页头模板

当无法接入公共页头时，可用以下模板（右侧登录区见 [登录模式页头](header-login.md)）：

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
