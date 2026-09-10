# 登录模式页头（自研页头可选模式）

> 适用场景：页面不使用官方 `<hd-header>` 动态组件（见 [navigation.md](navigation.md)），而是**自研页头**时，右侧登录区（登录/用户菜单）的交互与视觉规范。提炼自华为云开放能力闯关活动页（huaweicloud_open_activity）的实际实现，移动端交互对齐 developer.huaweicloud.com/grow 页 `header-tools` 官方效果。
>
> 作为**可选模式**集成：使用官方 `<hd-header>` 时无需本规范；自研页头时按本文实现登录区。

## 交互模式总览

| 端 | 未登录 | 已登录 |
|------|--------|--------|
| PC（>768px） | 文字「登录」链接，点击走登录流程 | 用户名 + 下拉箭头，hover/click 展开小下拉面板（账号中心 / 开放能力官网 / 退出登录） |
| Mobile（≤768px） | 24px 人形图标（login.svg），点击展开**全宽面板**：账号中心 / 开放能力 / 注册+登录胶囊按钮 | 24px 圆形头像（用户名首字母），点击展开**全宽面板**：账号中心 / 开放能力 / 用户名(左)+退出登录(右) |

- 登录/注册地址：`https://auth.huaweicloud.com/authui/login.html`（登录）、`https://account.huaweicloud.com/usercenter/#/register?locale=zh-cn`（注册）、`https://account.huaweicloud.com/usercenter/#/accountindex/accountInfo`（账号中心）、`https://open.huaweicloud.com/`（开放能力）
- 汉堡菜单与登录区相互独立：登录面板展开不影响汉堡菜单

## 移动端规格（≤768px）

### 触发器

| 属性 | 值 |
|------|-----|
| 尺寸 | 24×24 图标（人形）或圆形头像（首字母，背景 `#191919`、文字白、font-size 13px、加粗） |
| 容器 | 左右 `padding: 0 10px`，`margin: 0` |
| 与汉堡菜单间距 | **0px**（图标盒右缘紧贴汉堡按钮左缘；导航行 flex `gap: 0`） |
| 垂直对齐 | 触发器 `li` 用 `display: flex; align-items: center` 与汉堡中线对齐 |
| 图标资源 | 官方 login.svg（24×24 圆环人形，描边 `#252b3a` 2px） |

### 全宽展开面板

```css
/* 锚定：移动端导航行需 position: relative，触发器 li 需 position: static */
.header-tools-mobile .header-user-info {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #191919;
  font-size: 14px;
  padding: 10px 0;
  border-radius: 0; /* 全宽面板无圆角 */
  z-index: 1000;
}
```

| 元素 | 规格 |
|------|------|
| 行链接 | `display: block; padding: 6px 20px; line-height: 20px; color: #252b3a` |
| 分割线 | `height: 1px; background: #dfe1e6; margin: 10px 15px` |
| 注册胶囊按钮 | 高 48px、`border-radius: 24px`、font-size 16px、背景 `#191919`、边框 `1px solid #595959`、文字白 |
| 登录胶囊按钮 | 高 48px、`border-radius: 24px`、font-size 16px、透明底、边框 `1px solid #595959`、文字 `#191919` |
| 按钮排布 | `button-container` flex，两按钮 `flex: 1` 等分，间距 `margin-left: 17px`，容器 `padding: 15px 20px` |
| 退出行 | 左右分栏：用户名（左 50%，`font-weight: 600`，ellipsis）+ 退出登录（右 50%，`text-align: right`） |
| 文字居中 | 胶囊按钮用 `display: flex; align-items: center; justify-content: center; padding: 0`（勿用 line-height 撑） |

### 面板结构模板

```html
<!-- 未登录 -->
<ul class="header-tools-mobile">
  <li class="header-login-mobile" :class="{ show: open }">
    <span class="header-icon-user" role="button" aria-label="登录菜单">
      <img src="login.svg" width="24" height="24" alt="" />
    </span>
    <div class="header-user-info" v-show="open">
      <ul class="header-user-info-list">
        <li><a class="account-center" href="...accountInfo" target="_blank">账号中心</a></li>
        <li class="header-user-info-split"></li>
        <li><a href="https://open.huaweicloud.com/" target="_blank">开放能力</a></li>
        <li class="header-user-info-split"></li>
        <li class="button-container">
          <a class="header-user-info-button-red" href="...register" target="_blank">注册</a>
          <a class="header-user-info-button-common" href="#" @click="login">登录</a>
        </li>
      </ul>
    </div>
  </li>
</ul>

<!-- 已登录 -->
<ul class="header-tools-mobile">
  <li class="header-user" :class="{ 'header-user-info-show': open }">
    <div class="header-user-avator" role="button" aria-label="用户菜单">
      <span class="header-tool-user-avator-img">{{ username.charAt(0).toUpperCase() }}</span>
    </div>
    <div class="header-user-info" v-show="open">
      <ul class="header-user-info-list">
        <li class="header-user-info-item-account"><a class="account-center" href="...accountInfo" target="_blank">账号中心</a></li>
        <li class="header-user-info-split"></li>
        <li><a href="https://open.huaweicloud.com/" target="_blank">开放能力</a></li>
        <li class="header-user-info-split"></li>
        <li class="logout">
          <a class="bottom-username" href="javascript:;">{{ username }}</a>
          <a class="logout-btn" href="#" @click="logout">退出登录</a>
        </li>
      </ul>
    </div>
  </li>
</ul>
```

## PC 端规格（>768px）

| 元素 | 规格 |
|------|------|
| 登录链接 | 14px、`#252b3a`，hover `#191919` |
| 用户名区 | 文字最多 120px（ellipsis）+ 6px 下拉三角（border 三角实现，展开时 `rotate(180deg)` 过渡 0.2s） |
| 下拉面板 | `position: absolute; top: calc(100% + 4px); right: 0; min-width: 160px`，白底、圆角 `var(--por-radius-m)`、阴影 `0 4px 8px rgba(0,0,0,.1)`、`padding: 8px 0` |
| 面板行 | `padding: 8px 20px; line-height: 20px`，hover 加粗 |
| 用户名辅助行 | 12px、`#808080`、`padding: 0 20px 8px` |
| 分割线 | `1px #dfe1e6; margin: 4px 20px` |
| 退出登录 | `padding: 8px 20px`，hover `#191919` |

## 关键实现要点（踩坑记录）

1. **图标与汉堡对齐**：触发器 `li` 不能保持 `inline-block` + 图标 `inline-flex`（inline 基线对齐会使图标偏高 8px），必须 `li { display: flex; align-items: center }`。
2. **全宽面板定位锚**：移动端导航行容器需 `position: relative`，触发器 `li` 必须 `position: static`——否则面板宽度塌缩为触发器宽度。
3. **滚动条宽度补偿**：classic 滚动条设备（部分安卓 webview、DevTools 模拟）下，`position: fixed` 全屏层的宽度 = `innerWidth`（含滚动条槽），可见宽度只有 `clientWidth`，两者差 11~22px 会导致「弹窗/面板贴右偏移」。解法：把差值实时写入 CSS 变量并补偿到 right/padding：

   ```js
   // App 入口挂载 + resize + ResizeObserver(documentElement) 时同步
   const sbw = window.innerWidth - document.documentElement.clientWidth
   document.documentElement.style.setProperty('--hc-sbw', `${Math.max(0, sbw)}px`)
   ```
   ```css
   .tiny-modal__wrapper.type__alert .tiny-modal__box,
   .tiny-modal__wrapper.type__confirm .tiny-modal__box {
     left: 16px !important;
     right: calc(16px + var(--hc-sbw, 0px)) !important;
     width: auto !important;
     transform: none !important;
     margin: 0 !important;
   }
   ```
4. **双 UL 结构**：桌面登录区与移动端登录区分成两个 `<ul>` 渲染（面板结构差异大），用媒体查询互斥显隐（桌面 `@media (min-width: 769px)` 隐藏移动 UL，移动 `@media (max-width: 768px)` 隐藏桌面 UL）。
5. **外部点击关闭**：`document` click 监听中用 `closest('.header-user') || closest('.header-login-mobile')` 判断，两个触发器都要豁免；触发器自身 `@click.stop`。
6. **下拉面板 hover 链路（悬停桥）**：桌面面板与触发器之间若有间隙（如 `top: calc(100% + 4px)` 的 4px），鼠标从用户名移向面板途中会经过空隙触发 `mouseleave`，面板在鼠标到达前就隐藏。需给面板加透明桥接伪元素覆盖空隙，保持 hover 链路连续：

   ```css
   .header-user-info::before {
     content: '';
     position: absolute;
     top: -8px;
     left: 0;
     right: 0;
     height: 8px;
   }
   ```

   面板隐藏（`display: none`）时伪元素不渲染，不会挡住面板下方区域的点击。
7. **TinyVue 表单校验提示**：提示展示方式由 `validate-type` 控制（不是 `message-type`）；移动端用 `validate-type="text"` 渲染输入框下方块级文字（`tiny-form-item__error`），并用 CSS 隐藏遮挡输入框的气泡：

   ```css
   @media (max-width: 768px) {
     .tiny-tooltip__popper.tiny-form__valid { display: none !important; }
   }
   ```

## 断点与显隐约定

| 断点 | 桌面登录区 | 移动登录区 |
|------|-----------|-----------|
| ≥769px | 显示 | `display: none !important` |
| ≤768px | `display: none` | `display: flex` |

移动端导航行高度 47px，`.site-info-bar`（中国站顶栏）隐藏；面板展开锚定导航行底边（y = 48px 起）。
