# 栅格系统

来源：Tiny PortalUI grid 规范

一套响应式、大屏设备优先的流式栅格系统，随着屏幕尺寸增加，会自动分为最多 24 列。

## 简介

栅格系统通过行（row）与列（column）的组合来创建布局。列跨越范围为 1 到 24。

## 栅格参数

| 屏幕类型 | 尺寸范围 | 类前缀 |
| --- | --- | --- |
| 超大屏 | >1600px | `.por-col-` |
| 大屏 | ≤1600px | `.por-col-lg` |
| 中屏 | ≤1280px | `.por-col-md` |
| 小屏 | ≤1024px | `.por-col-sm` |
| 超小屏 | ≤768px | `.por-col-xs` |

## 基础布局

列应当放置在 `.por-row` 内。

```html
<div class="por-row">
    <div class="por-col-6 por-col-sm-12">单元格内容</div>
    <div class="por-col-6 por-col-sm-12">单元格内容</div>
    <div class="por-col-6 por-col-sm-12">单元格内容</div>
    <div class="por-col-6 por-col-sm-12">单元格内容</div>
</div>

<div class="por-row">
    <div class="por-col">等分单元格</div>
    <div class="por-col">等分单元格</div>
</div>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-row` | 行容器 |
| `por-col` | 等分列 |
| `por-col-*` | 指定跨越列数的列（1-24） |
| `por-col-[size]-*` | 响应式列，[size] 可选 lg, md, sm, xs |

## 容器系统

```html
<div class="por-section">
  <div class="por-container">
    <!-- 内容 -->
  </div>
</div>
```

```css
.por-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1439px) {
  .por-container { max-width: 1200px; }
}

@media (max-width: 1279px) {
  .por-container { padding-left: 3%; padding-right: 3%; }
}

@media (max-width: 767px) {
  .por-container { padding-left: 15px; padding-right: 15px; }
}
```

## Section 区块

```css
--por-section-padding-top-pc-l: 76px;
--por-section-padding-bottom-pc-l: 76px;
--por-section-head-padding-bottom-pc-l: 40px;
```

Section 背景色可通过 `data-bg` 配置（见 `layouts/floor.md`）：`light`（默认）、`white`、`grey`、`dark`、`transBlack`、`transWhite`。

```html
<!-- 灰色背景 Section -->
<div class="por-section" data-bg="grey">
  <div class="por-container">...</div>
</div>
```
