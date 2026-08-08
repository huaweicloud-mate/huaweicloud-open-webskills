# 间距系统

来源：`cnpm-baseui` theme-token.css + developer-common.css

## 基础尺寸

所有尺寸基于 `--por-base-size-2: 2px` 的倍数系统：

| Token | 计算值 | 等效 px |
|-------|--------|---------|
| `--por-base-size-0` | 0 | 0px |
| `--por-base-size-1` | 1 | 1px |
| `--por-base-size-2` | — | **2px**（基准单位） |
| `--por-base-size-3` | 3 | 3px |
| `--por-base-size-4` | 2×2 | 4px |
| `--por-base-size-6` | 2×3 | 6px |
| `--por-base-size-8` | 2×4 | 8px |
| `--por-base-size-10` | 2×5 | 10px |
| `--por-base-size-12` | 2×6 | 12px |
| `--por-base-size-14` | 2×7 | 14px |
| `--por-base-size-16` | 2×8 | **16px** |
| `--por-base-size-20` | 2×10 | 20px |
| `--por-base-size-24` | 2×12 | **24px** |
| `--por-base-size-32` | 2×16 | 32px |
| `--por-base-size-40` | 2×20 | **40px** |
| `--por-base-size-48` | 2×24 | 48px |
| `--por-base-size-60` | 2×30 | 60px |
| `--por-base-size-64` | 2×32 | 64px |
| `--por-base-size-72` | 2×36 | 72px |
| `--por-base-size-76` | 2×38 | **76px**（Section 上下间距） |
| `--por-base-size-100` | 2×50 | 100px |

## 容器宽度

```css
/* 主容器 */
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

## 响应式断点

| 名称 | 范围 | 说明 |
|------|------|------|
| PC 大屏 | ≥1440px | 容器 1280px |
| PC 标准 | 1025px ~ 1439px | 容器 1200px |
| Pad | 769px ~ 1024px | 容器流式（3% padding） |
| Mobile | ≤768px | 容器流式（15px padding） |

### 断点 Token

```css
--por-container-xl-min: 1776px;   /* 超大屏 */
--por-container-lg-max: 1775px;
--por-container-lg-min: 1025px;   /* 大屏（PC） */
--por-container-md-max: 1024px;
--por-container-md-min: 769px;    /* 中屏（Pad） */
--por-container-xs-min: 768px;    /* 小屏起始 */
```

## Section 间距

```css
/* 页面区块上下间距 */
--por-section-padding-top-pc-l: 76px;
--por-section-padding-bottom-pc-l: 76px;
--por-section-head-padding-bottom-pc-l: 40px;
```

## 栅格系统

使用 24 列栅格（从 HTML 中的 `por-col-24` 推断）：

```html
<div class="por-row">
  <div class="por-col-24">整行</div>
</div>
<div class="por-row">
  <div class="por-col-12">半行</div>
  <div class="por-col-12">半行</div>
</div>
<div class="por-row">
  <div class="por-col-8">1/3</div>
  <div class="por-col-8">1/3</div>
  <div class="por-col-8">1/3</div>
</div>
```

## 常用间距速查

| 场景 | 间距值 |
|------|--------|
| Section 上下 padding | 76px（PC）/ 40px（移动） |
| 标题与内容间距 | 40px |
| 卡片内边距 | 24px ~ 32px |
| 按钮左右 padding | 24px（默认）/ 32px（medium）/ 48px（large） |
| 列表项间距 | 16px ~ 24px |
| 移动端容器左右 | 15px |
