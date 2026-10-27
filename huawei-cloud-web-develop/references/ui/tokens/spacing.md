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
| `16px` | 中间距（small 尺寸按钮左右 padding） |
| `20px` | 桌面端容器左右 padding |
| `24px` | 卡片内边距、按钮（default）左右 padding |
| `32px` | 按钮（medium）左右 padding |
| `40px` | Section 头部间距 |
| `48px` | 按钮（large）左右 padding |
| `76px` | Section 上下间距（PC） |
| `15px` | 移动端容器左右 padding |

## 3. 容器宽度

**两套容器并存，按页面来源选择，不要混用**：

| 场景 | 内容区宽度 | 说明 |
| --- | --- | --- |
| 官网页面（huaweicloud.com 首页/产品页） | `1600px` | 设计稿实测主力宽度，占全部楼层画板的绝大多数 |
| 门户组件（PortalUI 默认 `.por-container`） | `1280px` | 通用后台/门户页面 |

### 3.1 官网内容区（1600px）

官网楼层的实测关系是「楼层外框 `1752px` = 内容区 `1600px` + 左右 `76px` 安全边距」：

```css
/* 官网楼层容器 */
.hc-section-inner {
  width: 1600px;
  max-width: 100%;
  margin: 0 auto;
}

/* 整屏楼层（背景铺满，内容居中） */
.hc-section-full {
  width: 100%;
  padding: 76px 0;          /* 楼层上下 padding 恒为 76px */
}
.hc-section-full > .hc-section-inner { width: 1600px; }
```

大屏断点下内容区收窄（实测 1536 屏对应内容区约 `1384px`，即 `1536 − 76×2`）。

```css
@media (max-width: 1599px) { .hc-section-inner { width: 1384px; } }
@media (max-width: 1279px) { .hc-section-inner { width: 1128px; } }  /* 1280 − 76×2 */
@media (max-width: 1023px) { .hc-section-inner { width: 872px; } }   /* 1024 − 76×2 */
```

### 3.2 门户容器（1280px）

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

## 6. 官网楼层与卡片实测间距

以下数值来自官网设计稿节点树实测（非推断），可直接用于还原官网版式。

### 6.1 楼层

| 项 | 实测值 | 说明 |
| --- | --- | --- |
| 楼层上下 padding | `76px` | 全文档最统一的一个值，所有楼层一致 |
| 楼层左右安全边距 | `76px`（1600 内容区）/ `159~164px`（1920 满宽楼层） | 随断点变化 |
| 楼层标题区下间距 | `40px` | 与 `--por-section-head-padding-bottom-pc-l` 一致 |

### 6.2 卡片组（同排多卡）

| 项 | 实测值 | 使用场景 |
| --- | --- | --- |
| 卡组 gap | `40px` | 1920 满宽楼层（每排 4 卡） |
| 卡组 gap | `28px` | 中等密度（每排 3 卡） |
| 卡组 gap | `24px` | 常规（1600 内容区） |
| 卡组 gap | `16px` | 紧凑排布（每排 5 卡以上） |
| 卡组上下与标题 gap | `24px` | 有页签时降为 `12px` |

### 6.3 卡片内

| 项 | 实测值 | 使用场景 |
| --- | --- | --- |
| 卡片 padding | `48px` | 插画卡（窄卡/宽卡） |
| 卡片 padding | `32px` | 通用卡片（主力档） |
| 卡片 padding | `28px` | 小信息卡（新闻、文档） |
| 卡片 padding | `24px` | 紧凑卡、1280 断点下的卡 |
| 卡片内元素 gap | `24px` | 灰底卡（`#FAFAFA`） |
| 卡片内元素 gap | `20px` | 白底卡 |

### 6.4 按钮组

| 项 | 实测值 |
| --- | --- |
| 按钮组内 gap（纯文字） | `8px` |
| 按钮组内 gap（带图标） | `4px` |

> 所有间距实测基于 1600px 内容区。切换断点时优先调整**卡组 gap** 与**卡片 padding**，楼层 padding 保持 76px 不变。
