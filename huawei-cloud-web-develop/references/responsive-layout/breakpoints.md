# 断点体系与布局模式

## 默认断点（移动优先）

| 断点 | 范围 | 适用 |
| --- | --- | --- |
| mobile | < 768px | 手机（360–430px 为主） |
| tablet | 768–1279px | 平板、1024px 笔记本 |
| desktop | 1280–1535px | 1280/1440/1600/1920 屏 |
| wide | ≥ 1536px | 1920/2560 超宽屏 |

## PC 常见尺寸对照

| 屏幕 | 命中档位 | 建议处理 |
| --- | --- | --- |
| 2560 | wide | 内容区 max-width 居中；仪表盘/栅格可用更多列（isWide） |
| 1920 | wide | 同上 |
| 1600 | desktop | 桌面布局，栅格 3–4 列 |
| 1280 | desktop | 桌面布局基准宽度 |
| 1024 | tablet | 属平板档；若业务希望 1024 用桌面导航，把 desktop 起点改为 1024px |

- 超宽屏避免内容拉伸：内容容器 `max-width: 1200px; margin-inline: auto;`。
- 1024 归桌面还是平板是业务决策：多数官网取「1024 起桌面」，管理后台取「1024 起平板」。

## 手机主流机型视口宽度（CSS px）

| 品牌 | 代表机型 | 视口宽 |
| --- | --- | --- |
| Apple | iPhone SE（2/3 代） | 375 |
| Apple | iPhone 12–16 标准版/Pro | 390–393 |
| Apple | iPhone Pro Max / Plus | 414–430 |
| 华为 | Mate 60 / Pura 70 / nova 系列 | 360–393 |
| 小米 | 14 / 15 / 红米 K 系列 | 360–412 |
| OPPO | Find X / Reno / A 系列 | 360–393 |
| vivo | X / iQOO / Y 系列 | 360–393 |

- 以 360px 为最窄保底，375px 为主基准，393/412/430 逐档验证流体布局。
- 布局用百分比、minmax、clamp，禁止固定 px 宽度，即可覆盖上述全部机型。

## 移动端设备级适配

- viewport meta 需含 `viewport-fit=cover`，刘海屏才能全屏沉浸：
  `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
- 安全区：顶部刘海 `env(safe-area-inset-top)`、底部 Home 条 `env(safe-area-inset-bottom)`，固定栏/抽屉/底部导航必须处理。
- 动态视口高度：移动浏览器地址栏伸缩，优先 `height: 100dvh`，旧浏览器回退 `100vh`。
- 输入框字号 ≥ 16px，否则 iOS 聚焦时自动放大页面。
- 防止横屏字体缩放：`html { -webkit-text-size-adjust: 100%; }`。
- 触控目标 ≥ 44×44px；hover 效果在触屏需配 `:active` 反馈。
- 测试矩阵：360 / 375 / 393 / 412 / 430 五档各过一遍关键页面。

## 媒体查询写法（移动优先）

- 一律 `min-width`：默认样式为移动端，逐级增强。
- 建议用 CSS 变量集中管理断点，便于统一调整：

```css
:root {
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1280px;
  --breakpoint-wide: 1536px;
}

@media (min-width: var(--breakpoint-tablet)) { /* ... */ }
@media (min-width: var(--breakpoint-desktop)) { /* ... */ }
@media (min-width: var(--breakpoint-wide)) { /* ... */ }
```

- 注意：旧浏览器不支持媒体查询内的 CSS 变量，需兼容时用字面量。

## 常见布局模式

### 卡片栅格
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;`
- 自动换列无需 JS；需要限列数时用 `auto-fill` + `max-width` 约束。

### 工具栏 / 操作区
- Flex + `flex-wrap: wrap`，`gap` 基准 8px；溢出时允许换行而非挤压。

### 导航
- 移动端抽屉或底部导航，桌面顶部导航；结构性切换见 `vue3-patterns.md`。

### 表格
- 窄屏改为卡片式堆叠，或容器内横向滚动（`overflow-x: auto`）。

### 表单
- 移动端单列；桌面可两列：`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`。

### 弹窗 / 抽屉
- 移动端全屏抽屉（底部滑出），桌面居中模态；配合 `<Teleport>`。

## 流体排版与间距

- 标题：`font-size: clamp(20px, 2vw + 14px, 32px)`。
- 内容容器：`max-width: 1200px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 32px)`。
- 间距遵循 4px 基准网格，按断点覆盖或使用 clamp。

## 触控与安全区

- 触控目标 ≥ 44×44px，相邻热区间距 ≥ 8px。
- 底部固定栏：`padding-bottom: calc(16px + env(safe-area-inset-bottom))`。
- 横向滚动治理：根因是子元素最小宽度——flex/grid 子项加 `min-width: 0`；`overflow-x: hidden` 仅作兜底。
- 防止图片撑破布局：`max-width: 100%; height: auto;` 或 `aspect-ratio`。
