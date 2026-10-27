# 楼层

来源：Tiny PortalUI floor 规范

通过楼层可以将页面分割成一个一个独立的章节。

## 居中容器

默认布局，楼层内容居中显示。

```html
<div class="por-section">
    <div class="por-container">
        <div class="por-section-head">
            <h3 class="por-section-title">楼层主标题</h3>
            <div class="por-section-subtitle">楼层副标题</div>
        </div>
        <div class="por-section-body">
            楼层内容...
        </div>
    </div>
</div>
```

## 官网楼层版式（1600 内容区）

官网楼层与门户楼层的差别在内容区宽度：官网用 `1600px`，门户用 `1280px`。楼层上下 padding 两者都是 `76px`。

```html
<!-- 官网楼层：背景铺满，内容居中 1600 -->
<div class="por-section hc-section" data-bg="grey">
    <div class="hc-section-inner">
        <div class="por-section-head">
            <h3 class="por-section-title">楼层主标题（32 / 36px）</h3>
            <div class="por-section-subtitle">楼层副标题（16px，辅助色 #595959）</div>
        </div>
        <div class="por-section-body">
            <!-- 卡片组：gap 24 / 28 / 40，见 cards.md -->
        </div>
    </div>
</div>
```

```css
.hc-section { padding: 76px 0; }                 /* 楼层上下留白恒为 76px */
.hc-section-inner { width: 1600px; max-width: 100%; margin: 0 auto; }

@media (max-width: 1599px) { .hc-section-inner { width: 1384px; } }  /* 1536 − 76×2 */
@media (max-width: 1279px) { .hc-section-inner { width: 1128px; } }  /* 1280 − 76×2 */
@media (max-width: 1023px) { .hc-section-inner { width: 872px; } }   /* 1024 − 76×2 */
```

- 楼层标题到内容区的间距为 `40px`（`--por-section-head-padding-bottom-pc-l`）；
- 楼层灰底用 `#F5F5F5`，卡片灰底用 `#FAFAFA`，两级别混用同一个灰；
- 相邻楼层若为同底色，用 `por-section-merge-spacing-top/bottom` 收掉其中一个的 76px。

## 不同背景颜色

通过属性 `data-bg` 配置：`light`（默认）、`white`、`grey`、`dark`、`blue`、`transBlack`、`transWhite`、`transparent`。

```html
<div class="por-section" data-bg="dark">
    <div class="por-container">
        <div class="por-section-head" data-theme="light">
            <h3 class="por-section-title">深色背景楼层</h3>
        </div>
        <!-- ... -->
    </div>
</div>
```

## 标题居左

为 `por-section` 添加 `por-section-title-left` 类。

```html
<div class="por-section por-section-title-left">
    <!-- ... -->
</div>
```

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-section` | 楼层最外层类 |
| `por-container` | 楼层居中容器 |
| `por-section-head` | 楼层头部，可配 `data-theme="light/dark"` |
| `por-section-title` | 楼层主标题 |
| `por-section-subtitle` | 楼层副标题 |
| `por-section-body` | 楼层内容区域 |
| `data-bg` | 背景色：`grey`, `dark`, `blue`, `light`, `white`, `transBlack`, `transWhite`, `transparent` |
| `por-section-merge-spacing-top/bottom` | 去除楼层上下间距 |
| `por-section-title-left` | 标题居左布局 |
