# 顶部广告横幅（Ad Banner）

来源：活动促销横条（自定义组件）

> ⚠️ `.ad-banner` 为**自定义组件，非 baseui 类**，`cnpm-baseui` 中未定义，样式需业务自行实现（本页给出参考实现）。纯原生 HTML + CSS，无框架依赖。

## 使用场景

页面顶部的促销 / 活动横幅：整条可点击跳转活动页，可关闭，≤1024px 自动隐藏；背景粉橙暖色渐变、左侧红点装饰 + 主标题、中间副标题、右侧按钮 + 配图 + 关闭按钮。

## 结构

```html
<aside class="ad-banner" role="region" aria-label="开年采购季 活动横幅">
  <!-- 背景层：等比缩放，两边裁切 -->
  <img class="ad-banner__bg" src="banner-bg.jpg" alt="">

  <div class="ad-banner__inner">
    <!-- 左：红点装饰 + 主标题 -->
    <span class="ad-banner__lead">
      <i class="ad-banner__dot" aria-hidden="true"></i>
      <h2 class="ad-banner__title">开年采购季</h2>
    </span>

    <!-- 中：副标题（可选） -->
    <p class="ad-banner__subtitle">实惠更实用，省心一整年</p>

    <!-- 右：按钮 —24px— 配图 —12px— 关闭 -->
    <span class="ad-banner__actions">
      <span class="ad-banner__btn">立即前往</span>
      <img class="ad-banner__art" src="banner-art.png" alt="活动配图">
      <button type="button" class="ad-banner__close" aria-label="关闭横幅">×</button>
    </span>
  </div>
</aside>
```

## 样式

> **统一样式隔离**：以下选择器统一以当前项目 id 前缀（示例用 `#my-project`）作为最外层作用域，避免被 `global.min.css` / `developer-common.css` / PortalUI 等公共样式污染。

```css
/* 容器 */
#my-project .ad-banner {
  position: relative;
  height: 72px;                 /* 见「响应式规格」 */
  overflow: hidden;
  cursor: pointer;
  /* 背景兜底：图片未加载时可见 */
  background: linear-gradient(90deg, #FFE4E1 0%, #FFF8F0 50%, #FFE4CC 100%);
}

/* 背景层：等比缩放，两边裁切 */
#my-project .ad-banner__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* 内容层 */
#my-project .ad-banner__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;            /* 两侧边距跟随现网容器 */
  margin: 0 auto;
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

/* 左：红点 + 主标题 */
#my-project .ad-banner__lead { display: flex; align-items: center; gap: 8px; }

#my-project .ad-banner__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #C7000B;          /* 华为品牌红 */
  flex: none;
}

#my-project .ad-banner__title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1A1A1A;
  font-family: HuaweiSans, "PingFang SC", "Microsoft YaHei", sans-serif; /* 特殊字体按现网替换 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;      /* 标题不限长度，超长省略 */
}

/* 中：副标题（可选） */
#my-project .ad-banner__subtitle {
  flex: 1;
  margin: 0 16px;
  font-size: 14px;
  line-height: 22px;
  color: #666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 右：按钮 / 配图 / 关闭 */
#my-project .ad-banner__actions { display: flex; align-items: center; margin-left: auto; flex: none; }

#my-project .ad-banner__btn {
  margin-right: 24px;           /* 按钮 —24px— 配图 */
  padding: 6px 18px;
  border: 1px solid #1A1A1A;
  border-radius: 9999px;        /* 胶囊形大圆角 */
  background: transparent;      /* 透明底 + 深色边框（次要按钮） */
  color: #1A1A1A;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
}

#my-project .ad-banner__art {
  margin-right: 12px;           /* 配图 —12px— 关闭 */
  height: 48px;                 /* 3D 玻璃质感配图，按素材调整 */
  width: auto;
}

#my-project .ad-banner__close {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #1A1A1A;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
```

## 响应式规格（desktop-first）

| 视口宽度 | 横幅高度 | 关闭按钮 | 状态 |
|---|---|---|---|
| 1920~1601px | 72px | 24×24px | 显示 |
| 1600~1281px | 58px | 20×20px | 显示 |
| 1280~1025px | 48px | 20×20px | 显示 |
| 1024px 以下 | — | — | 隐藏 |

```css
@media (max-width: 1600px) {
  #my-project .ad-banner { height: 58px; }
  #my-project .ad-banner__close { width: 20px; height: 20px; font-size: 16px; }
  #my-project .ad-banner__art { height: 40px; }
}

@media (max-width: 1280px) {
  #my-project .ad-banner { height: 48px; }
  #my-project .ad-banner__title { font-size: 18px; }
  #my-project .ad-banner__art { height: 34px; }
}

@media (max-width: 1024px) {
  #my-project .ad-banner { display: none; }
}
```

## 配色

| 元素 | 值 | 说明 |
|---|---|---|
| 背景渐变 | `#FFE4E1 → #FFF8F0 → #FFE4CC` | 粉橙暖色，促销调 |
| 主标题 | `#1A1A1A` | 近纯黑 |
| 副标题 | `#666666` | 深灰 |
| 装饰红点 | `#C7000B` | 华为品牌红（`--por-base-color-red-huawei`） |
| 按钮 | 透明底 + `#1A1A1A` 边框 | 次要按钮，胶囊大圆角 |

## 交互

```js
var banner = document.querySelector('.ad-banner');
if (banner) {
  // 点击整条横幅跳转活动页
  banner.addEventListener('click', function () {
    window.location.href = 'https://www.huaweicloud.com/activity/'; // 活动页地址
  });

  // 关闭按钮：阻止冒泡，独立关闭横幅
  banner.querySelector('.ad-banner__close').addEventListener('click', function (e) {
    e.stopPropagation();
    banner.style.display = 'none';        // 或 banner.remove();
    // 可选：记住本次会话不再显示
    // sessionStorage.setItem('adBannerClosed', '1');
  });
}
```

- 点击**整条横幅**跳转活动页。
- **关闭按钮** `event.stopPropagation()` 阻止冒泡，避免误跳转。
- 背景图 `object-fit: cover` 等比缩放、两边裁切。
- 可选：用 `sessionStorage` 记住「本次会话不再显示」。

## 无障碍

- 容器 `role="region"` + `aria-label` 描述横幅用途。
- 装饰红点 `aria-hidden="true"`，不进入无障碍树。
- 配图提供有意义的 `alt`。
- 关闭按钮用原生 `<button>`，可键盘聚焦，附 `aria-label="关闭横幅"`。
- 标题用 `<h2>`，保持语义化层级。

## 设计原则

1. **两侧边距** — 跟随现网适配（`.ad-banner__inner` 用 `max-width: 1280px` + `padding: 0 20px`）。
2. **标题** — 必选，可特殊字体，不限长度（超长省略）。
3. **副标题** — 可选。
4. **按钮** — 必选，靠右，推荐次要按钮（透明底 + 深色边框）。
5. **配图** — 可选，位于按钮右侧，推荐单元素主体。
6. **关闭按钮** — 必选，点击关闭横幅。
