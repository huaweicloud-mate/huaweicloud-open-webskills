# 间距系统

来源：`cnpm-baseui` (3.0.17) Tiny PortalUI design-tokens + 页面分析

## 1. 尺寸百分比

| 变量名 | 值 | 说明 |
| :--- | :--- | :--- |
| `--por-base-size-percent-small` | `25%` | 1/4 |
| `--por-base-size-percent-middle` | `50%` | 1/2 |
| `--por-base-size-percent-large` | `75%` | 3/4 |
| `--por-base-size-percent-extra-large` | `100%` | 全宽 |

## 2. 常用间距数值

| 值 | 用途 |
|------|------|
| `2px` | 基准单位（`--por-base-size-2`） |
| `4px` | 基础间距 |
| `8px` | 小间距 |
| `16px` | 中间距（默认按钮左右 padding） |
| `20px` | 桌面端容器左右 padding |
| `24px` | 卡片内边距、按钮（default）左右 padding |
| `32px` | 按钮（medium）左右 padding |
| `40px` | Section 头部间距 |
| `48px` | 按钮（large）左右 padding |
| `76px` | Section 上下间距（PC） |
| `15px` | 移动端容器左右 padding |

## 3. 容器宽度

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

## 4. 响应式断点（栅格专用）

栅格系统按以下屏幕尺寸划分（见 `layouts/grid.md`）：

| 屏幕类型 | 尺寸范围 | 类前缀 |
| --- | --- | --- |
| 超大屏 | >1600px | `.por-col-` |
| 大屏 | ≤1600px | `.por-col-lg` |
| 中屏 | ≤1280px | `.por-col-md` |
| 小屏 | ≤1024px | `.por-col-sm` |
| 超小屏 | ≤768px | `.por-col-xs` |

## 5. Section 间距

```css
--por-section-padding-top-pc-l: 76px;
--por-section-padding-bottom-pc-l: 76px;
--por-section-head-padding-bottom-pc-l: 40px;
```

- 去除楼层上下间距：`por-section-merge-spacing-top` / `por-section-merge-spacing-bottom`
