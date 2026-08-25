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

## 不同背景颜色

通过属性 `data-bg` 配置：`light`（默认）、`white`、`grey`、`dark`、`transBlack`、`transWhite`。

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
| `data-bg` | 背景色：`grey`, `dark`, `light`, `white`, `transBlack`, `transWhite` |
| `por-section-merge-spacing-top/bottom` | 去除楼层上下间距 |
| `por-section-title-left` | 标题居左布局 |
