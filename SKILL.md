---
name: huawei-cloud-web-ui
description: 华为云官网 UI 设计规范 Skill，基于 Tiny PortalUI（cnpm-baseui 3.0.17）生成符合华为云官网（huaweicloud.com）与开发者官网（developer.huaweicloud.com）视觉规范的 HTML/CSS 页面。覆盖设计 Token 系统（por- 前缀 CSS 变量）、完整组件库（按钮/链接/输入框/下拉选择/单选复选/日期选择/弹窗/提示/标签/面包屑/分页/轮播/评分/价格/倒计时/滚动条/播放器/页签/锚点/折叠/卡片/图片查看器/服务表格/固定表头表格/文本/图标）、布局规范（楼层/栅格）、XTemplate 模板语法与完整示例。当用户需要生成或改造华为云风格页面（技术文档页、API 文档页、产品介绍页、营销落地页、后台管理页、表单页）时使用。
---

# 华为云官网 UI 设计规范 Skill

## 概述

本 Skill 封装了华为云官网（huaweicloud.com）和华为云 Developer Portal（developer.huaweicloud.com）的完整 UI 设计规范，基于 **Tiny PortalUI** 轻量基础组件库，用于生成符合现有官网视觉规范的页面代码。

**主要聚焦**：华为云 Developer Portal（developer.huaweicloud.com）
**辅助参考**：华为云主站（huaweicloud.com）

## 设计体系来源

- 组件库 / 设计 Token：Tiny PortalUI（`cnpm-baseui`，版本 `3.0.17`，`portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css`）
- 交互脚本：`theme-token.js`（依赖 jQuery）
- 开发者站公共样式：`developer-common.css`
- 前缀规范：所有 CSS 变量和组件类名均以 `por-` 为前缀（Portal 缩写）

## 前置条件

### 1. 基础知识
- 熟悉 HTML5 和 CSS3
- 了解 CSS 变量（Custom Properties）的使用方法
- 了解响应式设计基础
- 了解 jQuery（PortalUI 交互组件依赖）

### 2. 外部依赖
```html
<!-- 设计 Token + 组件样式（必须） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css">

<!-- 交互脚本（依赖 jQuery，组件交互必需） -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.js"></script>

<!-- 产品图标（可选，图标组件使用） -->
<link rel="stylesheet" href="https://res-static3.huaweicloud.com/content/dam/cloudbu-site/archive/china/static/v2_resources/css/product-icons.css">

<!-- 主站公共样式（可选） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-global-resources/1.2.9/css/global.min.css">
```

### 3. 浏览器支持
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器（iOS Safari 14+, Android Chrome 90+）

## 使用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| 开发者官网页面 | 生成符合开发者站视觉规范的页面 | 技术文档页、API 文档页 |
| 产品介绍页 | 华为云产品展示页面 | 产品特性页、价格页 |
| 营销落地页 | 符合品牌调性的营销页面 | 活动页、专题页 |
| 后台管理页 | 简单的管理界面 | 控制台页面、数据看板 |
| 表单页面 | 符合设计规范的表单 | 注册页、配置页 |

## 文件结构

```
huawei-cloud-web-ui/
├── SKILL.md                    # 本文件 — Skill 入口
└── references/                 # 参考文档
    ├── getting-started.md      # 快速开始（引入方式、Token 使用规范）
    ├── xtemplate.md            # XTemplate 模板语法指南
    ├── tokens/                 # 设计 Token
    │   ├── colors.md           # 色彩体系（基础调色板、文字/背景/边框/功能色）
    │   ├── typography.md       # 字体排版（字体族、字重、语义化字号类名）
    │   ├── spacing.md          # 间距系统（尺寸、容器宽度、响应式断点）
    │   ├── shadows-radii.md    # 阴影与圆角
    │   ├── level.md            # 层级规范（z-index）
    │   └── utils.md            # 样式工具类（radius/shadow class）
    ├── components/             # 组件库
    │   ├── text.md             # 文本规范
    │   ├── icon.md             # 字体图标 / 产品图标
    │   ├── buttons.md          # 按钮
    │   ├── links.md            # 链接
    │   ├── input.md            # 输入框
    │   ├── select.md           # 下拉选择框
    │   ├── checkbox.md         # 单选 / 复选
    │   ├── datepicker.md       # 日期选择器
    │   ├── modal.md            # 弹窗
    │   ├── tips.md             # 提示 Tips
    │   ├── label.md            # 标签
    │   ├── breadcrumb.md       # 面包屑
    │   ├── pagination.md       # 分页
    │   ├── carousel.md         # 轮播
    │   ├── rate.md             # 评分
    │   ├── price.md            # 价格
    │   ├── countdown.md        # 倒计时
    │   ├── scrollbar.md        # 滚动条
    │   ├── player.md           # 视频播放
    │   ├── tabs.md             # 页签
    │   ├── anchor.md           # 锚点导航
    │   ├── collapse.md         # 折叠组件
    │   ├── cards.md            # 卡片
    │   ├── img-viewer.md       # 图片查看器
    │   ├── service-table.md    # 支持与服务风格表格
    │   ├── fixed-table.md      # 固定表头表格
    │   ├── navigation.md       # 导航 / 页头
    │   ├── banner.md           # Banner 轮播
    │   └── footer.md           # 页脚
    ├── layouts/                # 布局系统
    │   ├── page-structure.md   # 页面结构规范
    │   ├── grid.md             # 栅格系统
    │   └── floor.md            # 楼层（Section）容器
    └── examples/               # 示例代码
        ├── homepage-dev.html   # 开发者官网首页示例
        └── homepage-main.html  # 主站首页示例
```

## 使用指南

### 1. 当用户需要生成华为云风格页面时

1. 先读取 `references/getting-started.md` 了解引入方式，读取 `references/tokens/` 下所有文件了解设计变量
2. 根据页面类型参考 `references/layouts/page-structure.md` 确定页面骨架，用 `references/layouts/floor.md` 组织楼层
3. 从 `references/components/` 中选取所需组件
4. 需要可参数化模板时，参考 `references/xtemplate.md` 使用 XTemplate 语法
5. 参考 `references/examples/` 中的示例代码生成完整页面
6. 所有样式使用 CSS 变量（`var(--por-xxx)`）确保与官网设计系统一致
7. 涉及交互的组件（轮播、页签、折叠、弹窗等）需引入 `theme-token.js` 并调用对应 jQuery 初始化方法

### 2. 快速开始

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>华为云风格页面</title>
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css">
  <style>
    body {
      font-family: HuaweiSans, PingFang SC, Microsoft YaHei, sans-serif;
      color: var(--por-color-text-primary);
      background: var(--por-color-background-white);
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3 class="por-text-title-t3" style="color: var(--por-color-text-primary);">华为云标题</h3>
    <p class="por-text-body-t3" style="color: var(--por-color-text-secondary);">正文内容</p>
  </div>
</body>
</html>
```

### 3. 设计原则

- **克制**：大量留白，内容呼吸感强
- **信息层级清晰**：标题 > 副标题 > 正文 > 辅助文字，层级分明
- **色彩克制**：以黑灰色阶为主，避免过度装饰
- **圆角适中**：按钮圆角 999px（胶囊形），卡片圆角 4-8px
- **阴影轻微**：只在 hover 和弹窗中使用极轻阴影
- **响应式**：支持 PC / Pad / Mobile 三端自适应

### 4. 关键设计数字速查

| 属性 | 值 |
|------|-----|
| 品牌色 | `#191919`（`--por-color-text-huawei`） |
| 主文字色 | `#191919`（灰90） |
| 辅助文字色 | `#595959`（灰60） |
| 弱化文字色 | `#C2C2C2`（灰40） |
| 页面背景 | `#FFFFFF` / `#F5F5F5` |
| 容器最大宽 | `1280px`（1440 以下 `1200px`） |
| 主字体 | HuaweiSans, PingFang SC, Microsoft YaHei |
| 正文字号 | `14px`（`por-text-body-t3`） |
| 行高 | `22px`（14px 正文） |
| 按钮圆角 | `999px`，TinyButton 使用 `round` 属性 |
| 卡片圆角 | `4px`（`--por-radius-m`） |
| 栅格 | 24 列响应式 |

### 5. 组件交互初始化速查

| 组件 | 初始化方法 |
|------|-----------|
| 轮播 Carousel | `$('#carousel1').porCarousel({...})` |
| 页签 Tab | `$('.por-tab-container').porTab()` |
| 折叠 Collapse | `data-toggle="por-collapse"` 或 `$().porCollapse()` |
| 弹窗 Modal | `data-toggle="modal" data-target="#id"` 或 `Modal.show(resetOptions)` |
| 分页 Pagination | `$('#pagination').porPagination({...})` |
| 评分 Rate | `$('#rate').porRate({...})` |
| 单选/复选组 | `$('.por-checkbox-card-group').porCheckboxGroup()` |
| 下拉 Select | `$().porSelect('getVal')` 等 |
| 锚点 Anchor | `$("#anchor1").porAnchor()` |
| 固定表头表格 | `$('#table1').porFixedtable()` |
| 倒计时 | `$('#countDown').countDown({ endTime: '...' })` |
| 日期选择 | `new $.fn.porDatePicker($el, config)` |
| 提示 Tips | `window.BaseUI.Info({...})` / `BaseUI.Tips($el, {...})` |

## 最佳实践

### 1. 颜色使用
- **优先使用 CSS 变量**：所有颜色应通过 `var(--por-xxx)` 引用，便于主题切换和维护
- **禁止直接使用基础变量**：`--por-base-*` 为底层变量，业务中优先使用语义变量（`--por-color-*`）
- **克制使用品牌红**：`#C7000B` 仅用于 CTA 按钮、链接 hover 状态、错误提示
- **灰阶为主**：界面以灰阶系统为基础，保持克制和专业的视觉风格
- **功能色有明确语义**：成功、警告、错误、信息色严格按照语义使用

### 2. 间距与布局
- **统一使用基础尺寸**：间距应基于 4px、8px、16px、24px、32px 等基础尺寸
- **楼层组织页面**：用 `.por-section` + `.por-container` 组织区块，通过 `data-bg` 控制背景
- **容器居中**：主要内容使用 `.por-container` 容器，最大宽度 1280px/1200px
- **响应式内边距**：移动端使用 15px，桌面端使用 20px
- **留白充足**：区块之间保持足够间距（至少 32px），确保内容呼吸感

### 3. 字体排版
- **使用语义化类名**：标题用 `por-text-title-t1/t2/t3`，正文用 `por-text-body-t1/t2/t3`
- **行高适中**：14px 正文使用 22px 行高
- **字重克制**：标题使用 700，正文使用 400，避免过度使用粗体
- **英文优先使用系统字体**：HuaweiSans、PingFang SC、Microsoft YaHei 作为降级

### 4. 响应式设计
- **移动优先**：先设计移动端，再向上扩展
- **断点统一**：栅格使用 `por-col-*` / `por-col-lg/md/sm/xs-*`，屏幕尺寸见 `layouts/grid.md`
- **图片自适应**：使用 `max-width: 100%; height: auto;`
- **字体流式**：使用相对单位（rem、%）或媒体查询调整字号

### 5. 交互状态
- **明确的 hover 反馈**：按钮、链接 hover 时背景色或边框色变化
- **禁用状态可见**：使用灰色背景和文字，降低不透明度
- **加载状态**：使用 spinner 或骨架屏
- **错误提示**：使用红色功能色和 alpha 背景

### 6. 性能优化
- **减少外部资源**：只引入必要的 CSS/JS 文件
- **使用 CSS 变量**：便于浏览器优化和减少重复代码
- **避免深层嵌套**：CSS 选择器不超过 3 层
- **使用 transform 和 opacity**：动画优先使用这两个属性

## 常见问题（FAQ）

### Q1: CSS 变量不生效怎么办？
A: 检查以下几点：
1. 确认已引入 theme-token.css（建议 3.0.17 及以上版本）
2. 检查变量名拼写（`--por-xxx`）
3. 使用浏览器开发者工具查看变量是否定义
4. 确认作用域是否正确

### Q2: 组件交互不生效怎么办？
A: PortalUI 交互组件依赖 jQuery 和 `theme-token.js`：
1. 确认已引入 jQuery 和 `theme-token.js`
2. 确认已调用对应组件的初始化方法（见"组件交互初始化速查"）
3. 异步加载的内容需在加载完成后手动初始化

### Q3: 如何自定义主题颜色？
A: 可以在引入 theme-token.css 后覆盖 CSS 变量：
```css
:root {
  --por-base-color-red-huawei: #your-color;
}
```

### Q4: 移动端适配需要注意什么？
A: 关键点：
1. 使用 `viewport` meta 标签
2. 字号不小于 14px
3. 按钮高度不小于 44px（触控友好）
4. 横向滚动仅在必要时使用
5. 图片使用响应式属性

### Q5: 如何添加自定义组件？
A: 建议遵循以下步骤：
1. 使用设计 Token 定义样式变量
2. 参考 `references/components/` 中的组件结构
3. 添加交互状态（hover、active、disabled）
4. 确保响应式适配
5. 添加使用示例

### Q6: 为什么有些样式需要内联编写？
A: 这是由于主题 Token 某些属性未完整覆盖，临时解决方案：
1. 优先使用 CSS 变量
2. 内联样式仅用于调试和快速原型
3. 正式项目应提取到 CSS 文件

### Q7: 如何确保无障碍访问（Accessibility）？
A: 遵循以下实践：
1. 使用语义化 HTML 标签
2. 图片添加 alt 属性
3. 链接和按钮有清晰的文本描述
4. 颜色对比度符合 WCAG 2.1 AA 标准（至少 4.5:1）
5. 键盘导航可用

## 版本说明

| 版本 | 日期 | 更新内容 |
|------|------|---------|
| 2.0.0 | 2026-08-17 | 依据 Tiny PortalUI 官方文档全面更新：升级 baseui 至 3.0.17、补齐全部组件（图标/文本/输入框/下拉/单选复选/日期选择/提示/标签/面包屑/分页/轮播/评分/价格/倒计时/滚动条/播放器/锚点/折叠/图片查看器/服务表格/固定表头表格）、新增 XTemplate 语法与楼层布局、更新设计 Token |
| 1.0.0 | 2024-04-27 | 初始版本，提取华为云官网 UI 设计规范 |

## 参考文档

| 文档 | 说明 |
|------|------|
| [快速开始](references/getting-started.md) | 引入方式、Token 使用规范 |
| [XTemplate 指南](references/xtemplate.md) | 模板引擎语法 |
| [色彩体系](references/tokens/colors.md) | 基础调色板、文字/背景/边框/功能色 |
| [字体排版](references/tokens/typography.md) | 字体族、字重、语义化字号类名 |
| [间距系统](references/tokens/spacing.md) | 基础尺寸、容器宽度、响应式断点 |
| [阴影与圆角](references/tokens/shadows-radii.md) | 阴影系统、圆角系统 |
| [层级规范](references/tokens/level.md) | z-index 层级定义 |
| [样式工具类](references/tokens/utils.md) | radius/shadow 工具类 |
| [文本](references/components/text.md) | 文本字体规范 |
| [图标](references/components/icon.md) | 字体图标、产品图标 |
| [按钮组件](references/components/buttons.md) | 按钮尺寸、类型、状态、HTML 模板 |
| [链接组件](references/components/links.md) | 文字链接、锚点 |
| [输入框](references/components/input.md) | 单行/多行/关联输入框 |
| [下拉选择框](references/components/select.md) | 原生 select 封装 |
| [单选/复选](references/components/checkbox.md) | 选择组、卡片选择组 |
| [日期选择器](references/components/datepicker.md) | PC/Mobile 双端日期选择 |
| [弹窗组件](references/components/modal.md) | 模态框、对话框 |
| [提示 Tips](references/components/tips.md) | 告警提示、箭头 tips |
| [标签](references/components/label.md) | 标签尺寸、颜色 |
| [面包屑](references/components/breadcrumb.md) | 导航层级指示 |
| [分页](references/components/pagination.md) | 动态/静态分页 |
| [轮播](references/components/carousel.md) | 轮播图配置、方法、事件 |
| [评分](references/components/rate.md) | 星级评分 |
| [价格](references/components/price.md) | 价格展示 |
| [倒计时](references/components/countdown.md) | 活动倒计时 |
| [滚动条](references/components/scrollbar.md) | 自定义滚动条 |
| [视频播放](references/components/player.md) | 视频播放器 |
| [页签组件](references/components/tabs.md) | Tabs 切换 |
| [锚点导航](references/components/anchor.md) | 页面内锚点 |
| [折叠组件](references/components/collapse.md) | 折叠/展开 |
| [卡片组件](references/components/cards.md) | 卡片类型、样式、布局 |
| [图片查看器](references/components/img-viewer.md) | 图片放大查看 |
| [服务表格](references/components/service-table.md) | 支持与服务风格表格 |
| [固定表头表格](references/components/fixed-table.md) | 常规表格 |
| [导航组件](references/components/navigation.md) | 页头、导航栏 |
| [Banner 组件](references/components/banner.md) | Hero Banner、轮播图 |
| [页脚组件](references/components/footer.md) | 页脚布局、链接 |
| [页面结构](references/layouts/page-structure.md) | 页面骨架、区块划分 |
| [栅格系统](references/layouts/grid.md) | 栅格布局、响应式栅格 |
| [楼层](references/layouts/floor.md) | Section 楼层容器 |
| [开发者站首页示例](references/examples/homepage-dev.html) | 完整的 HTML 示例代码 |
| [主站首页示例](references/examples/homepage-main.html) | 完整的 HTML 示例代码 |

## 注意事项

- 本 Skill 基于华为云 Tiny PortalUI 官方文档整理，CSS 变量前缀为 `por-`
- 设计 Token / 组件库位于 `https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css`，交互脚本为 `theme-token.js`（依赖 jQuery）
- 所有样式应使用 CSS 变量（`var(--por-xxx)`）而非硬编码值，确保与官网设计系统一致
- 以 `--por-base-` 开头的底层基础变量不建议在业务中直接引用，应优先使用语义变量
- 主站公共样式为可选引入，仅提供基础重置和工具类
- 栅格系统遵循 5 档断点：超大屏（>1600px）、大屏（≤1600px）、中屏（≤1280px）、小屏（≤1024px）、超小屏（≤768px）
- 华为云设计风格强调克制和留白，避免过度装饰
- 品牌色 `#191919` 仅用于强调和按钮，不宜大面积使用
- 所有组件和布局规范详见 `references/` 下的详细文档
