---
name: huawei-cloud-web-ui
description: 华为云官网 UI 设计规范 Skill，生成符合华为云官网（huaweicloud.com）与开发者官网（developer.huaweicloud.com）视觉规范的 HTML/CSS 页面。覆盖设计 Token 系统（por- 前缀 CSS 变量）、组件库（按钮/卡片/导航/Banner/页脚/弹窗/链接/Tabs）、布局规范（页面结构/栅格）、响应式设计（5 档断点）与完整示例。当用户需要生成或改造华为云风格页面（技术文档页、API 文档页、产品介绍页、营销落地页、后台管理页、表单页）时使用。
---

# 华为云官网 UI 设计规范 Skill

## 概述

本 Skill 封装了华为云官网（huaweicloud.com）和华为云 Developer Portal（developer.huaweicloud.com）的完整 UI 设计规范，用于生成符合现有官网视觉规范的页面代码。

**主要聚焦**：华为云 Developer Portal（developer.huaweicloud.com）
**辅助参考**：华为云主站（huaweicloud.com）

## 设计体系来源

- 设计 Token 系统：`cnpm-baseui` (portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css)
- 开发者站公共样式：`developer-common.css`
- 主站公共样式：`cnpm-global-resources`
- 前缀规范：所有 CSS 变量和组件类名均以 `por-` 为前缀（Portal 缩写）

## 前置条件

### 1. 基础知识
- 熟悉 HTML5 和 CSS3
- 了解 CSS 变量（Custom Properties）的使用方法
- 了解响应式设计基础

### 2. 外部依赖
```html
<!-- 设计 Token（必须） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css">

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
    ├── tokens/                 # 设计 Token
    │   ├── colors.md           # 色彩体系（灰阶、品牌色、功能色、状态色）
    │   ├── typography.md       # 字体排版（字体族、字号、行高、字重）
    │   ├── spacing.md          # 间距系统（基础尺寸、容器宽度、响应式断点）
    │   └── shadows-radii.md    # 阴影与圆角
    ├── components/             # 组件库
    │   ├── buttons.md          # 按钮组件
    │   ├── cards.md            # 卡片组件
    │   ├── navigation.md       # 导航/页头
    │   ├── banner.md           # Banner 轮播
    │   ├── footer.md           # 页脚
    │   ├── modal.md            # 弹窗
    │   ├── links.md            # 链接
    │   └── tabs.md             # 标签页
    ├── layouts/                # 布局系统
    │   ├── page-structure.md   # 页面结构规范
    │   └── grid.md             # 栅格系统
    └── examples/               # 示例代码
        ├── homepage-dev.html   # 开发者官网首页示例
        └── homepage-main.html  # 主站首页示例
```

## 使用指南

### 1. 当用户需要生成华为云风格页面时

1. 先读取 `references/tokens/` 下所有文件了解设计变量
2. 根据页面类型参考 `references/layouts/page-structure.md` 确定页面骨架
3. 从 `references/components/` 中选取所需组件
4. 参考 `references/examples/` 中的示例代码生成完整页面
5. 所有样式使用 CSS 变量（`var(--por-xxx)`）确保与官网设计系统一致

### 2. 快速开始

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>华为云风格页面</title>
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css">
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
    <h1 style="color: var(--por-color-text-primary);">华为云标题</h1>
    <p style="color: var(--por-color-text-secondary);">正文内容</p>
  </div>
</body>
</html>
```

### 3. 设计原则

- **克制**：大量留白，内容呼吸感强
- **信息层级清晰**：标题 > 副标题 > 正文 > 辅助文字，层级分明
- **色彩克制**：以灰阶为主，红色品牌色仅用于强调和按钮
- **圆角极小**：按钮圆角 2px，卡片圆角 4-8px
- **阴影轻微**：只在 hover 和弹窗中使用极轻阴影
- **响应式**：支持 PC / Pad / Mobile 三端自适应

### 4. 关键设计数字速查

| 属性 | 值 |
|------|-----|
| 品牌红色 | `#C7000B` |
| 主文字色 | `#191919`（灰90） |
| 辅助文字色 | `#595959`（灰60） |
| 弱化文字色 | `#C2C2C2`（灰40） |
| 页面背景 | `#FFFFFF` / `#F5F5F5` |
| 容器最大宽 | `1280px`（1440 以下 `1200px`） |
| 主字体 | HuaweiSans, PingFang SC, Microsoft YaHei |
| 正文字号 | `14px` |
| 行高 | `22px`（14px 正文） |
| 按钮 CTA 圆角 | `2px` |
| 卡片圆角 | `4px`（radius-m） |

## 最佳实践

### 1. 颜色使用
- **优先使用 CSS 变量**：所有颜色应通过 `var(--por-xxx)` 引用，便于主题切换和维护
- **克制使用品牌红**：`#C7000B` 仅用于 CTA 按钮、链接 hover 状态、错误提示
- **灰阶为主**：界面以灰阶系统为基础，保持克制和专业的视觉风格
- **功能色有明确语义**：成功、警告、错误、信息色严格按照语义使用

### 2. 间距与布局
- **统一使用基础尺寸**：间距应基于 `--por-base-size-*` 变量（4px、8px、16px、24px、32px）
- **容器居中**：主要内容使用 `.por-container` 容器，最大宽度 1280px/1200px
- **响应式内边距**：移动端使用 15px，桌面端使用 20px
- **留白充足**：区块之间保持足够间距（至少 32px），确保内容呼吸感

### 3. 字体排版
- **层级清晰**：通过字号、字重、颜色区分信息层级
- **行高适中**：14px 正文使用 22px 行高（1.57 倍）
- **字重克制**：标题使用 700，正文使用 400，避免过度使用粗体
- **英文优先使用系统字体**：HuaweiSans、PingFang SC、Microsoft YaHei 作为降级

### 4. 响应式设计
- **移动优先**：先设计移动端，再向上扩展
- **断点统一**：使用标准断点（375px、768px、1024px、1775px）
- **图片自适应**：使用 `max-width: 100%; height: auto;`
- **字体流式**：使用相对单位（rem、%）或媒体查询调整字号

### 5. 交互状态
- **明确的 hover 反馈**：按钮、链接 hover 时背景色或边框色变化
- **禁用状态可见**：使用灰色背景和文字，降低不透明度
- **加载状态**：使用 spinner 或骨架屏
- **错误提示**：使用红色功能色和 alpha 背景

### 6. 性能优化
- **减少外部资源**：只引入必要的 CSS 文件
- **使用 CSS 变量**：便于浏览器优化和减少重复代码
- **避免深层嵌套**：CSS 选择器不超过 3 层
- **使用 transform 和 opacity**：动画优先使用这两个属性

## 常见问题（FAQ）

### Q1: CSS 变量不生效怎么办？
A: 检查以下几点：
1. 确认已引入 theme-token.css
2. 检查变量名拼写（`--por-xxx`）
3. 使用浏览器开发者工具查看变量是否定义
4. 确认作用域是否正确

### Q2: 如何自定义主题颜色？
A: 可以在引入 theme-token.css 后覆盖 CSS 变量：
```css
:root {
  --por-base-color-red-huawei: #your-color;
}
```

### Q3: 移动端适配需要注意什么？
A: 关键点：
1. 使用 `viewport` meta 标签
2. 字号不小于 14px
3. 按钮高度不小于 44px（触控友好）
4. 横向滚动仅在必要时使用
5. 图片使用响应式属性

### Q4: 如何添加自定义组件？
A: 建议遵循以下步骤：
1. 使用设计 Token 定义样式变量
2. 参考 `references/components/` 中的组件结构
3. 添加交互状态（hover、active、disabled）
4. 确保响应式适配
5. 添加使用示例

### Q5: 为什么有些样式需要内联编写？
A: 这是由于主题 Token 某些属性未完整覆盖，临时解决方案：
1. 优先使用 CSS 变量
2. 内联样式仅用于调试和快速原型
3. 正式项目应提取到 CSS 文件

### Q6: 如何确保无障碍访问（Accessibility）？
A: 遵循以下实践：
1. 使用语义化 HTML 标签
2. 图片添加 alt 属性
3. 链接和按钮有清晰的文本描述
4. 颜色对比度符合 WCAG 2.1 AA 标准（至少 4.5:1）
5. 键盘导航可用

## 版本说明

| 版本 | 日期 | 更新内容 |
|------|------|---------|
| 1.0.0 | 2024-04-27 | 初始版本，提取华为云官网 UI 设计规范 |

## 参考文档

| 文档 | 说明 |
|------|------|
| [色彩体系](references/tokens/colors.md) | 灰阶系统、品牌色、功能色、文字色、背景色、边框色 |
| [字体排版](references/tokens/typography.md) | 字体族、字号、行高、字重 |
| [间距系统](references/tokens/spacing.md) | 基础尺寸、容器宽度、响应式断点 |
| [阴影与圆角](references/tokens/shadows-radii.md) | 阴影系统、圆角系统 |
| [按钮组件](references/components/buttons.md) | 按钮尺寸、类型、状态、HTML 模板 |
| [卡片组件](references/components/cards.md) | 卡片类型、样式、布局 |
| [导航组件](references/components/navigation.md) | 页头、导航栏、面包屑 |
| [Banner 组件](references/components/banner.md) | Hero Banner、轮播图 |
| [页脚组件](references/components/footer.md) | 页脚布局、链接 |
| [弹窗组件](references/components/modal.md) | 模态框、对话框 |
| [链接组件](references/components/links.md) | 文字链接、锚点 |
| [标签页组件](references/components/tabs.md) | Tabs 切换 |
| [页面结构](references/layouts/page-structure.md) | 页面骨架、区块划分 |
| [栅格系统](references/layouts/grid.md) | 栅格布局、响应式栅格 |
| [开发者站首页示例](references/examples/homepage-dev.html) | 完整的 HTML 示例代码 |
| [主站首页示例](references/examples/homepage-main.html) | 完整的 HTML 示例代码 |

## 注意事项

- 本 Skill 基于华为云官网实际 CSS 变量系统提取，CSS 变量前缀为 `por-`
- 设计 Token 系统位于 `https://portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css`
- 所有样式应使用 CSS 变量（`var(--por-xxx)`）而非硬编码值，确保与官网设计系统一致
- 主站公共样式为可选引入，仅提供基础重置和工具类
- 响应式设计遵循 5 个断点：超宽屏（>1775px）、宽屏端（≤1775px）、桌面端（≤1024px）、平板端（≤768px）、移动端（≤375px）
- 华为云设计风格强调克制和留白，避免过度装饰
- 红色品牌色 `#C7000B` 仅用于强调和按钮，不宜大面积使用
- 所有组件和布局规范详见 `references/` 下的详细文档
