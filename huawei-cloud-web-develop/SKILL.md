---
name: huawei-cloud-web-develop
description: 华为云前端开发 Skill（合并版），面向 Vue 3 + TypeScript + Vite + OpenTiny 项目的端到端开发：工程脚手架、华为云官网 UI 规范与组件库、页头/页脚、IAM SSO 登录、通用表单、响应式布局、Vue3 代码规范。内置两条强制规则：能用 OpenTiny 组件实现的不要用 HTML 标签手写；项目内部 CSS 统一加 #当前项目id 前缀隔离样式。当需要从零搭建或开发华为云风格前端页面/组件时使用。
---

# 华为云前端开发 Skill

## 概述

本 Skill 由以下开发阶段 skill 合并而成，供「一个阶段只加载一个 skill」的平台在**开发阶段**统一加载：

`huawei-cloud-web-scaffold`、`huawei-cloud-web-ui`、`huawei-cloud-web-nav-footer`、`huawei-cloud-web-login`、`huawei-cloud-web-form`、`huawei-cloud-web-responsive-layout`、`huawei-cloud-web-code-style`。

`SKILL.md` 只放工作流、强制规则与资源索引，所有细则以 `references/` 下的文件为准。

## 强制规则（贯穿全程）

1. **组件优先**：凡 OpenTiny（TinyVue）能覆盖的 UI 能力（按钮、表格、表单、弹窗、提示、分页、布局等），一律用 `@opentiny/vue` 组件实现，**禁止用原生 HTML 标签手写同等能力**；仅在 OpenTiny 未提供对应组件时，才退回 HTML / Tiny PortalUI 静态结构。
2. **样式隔离**：项目内部自研 CSS 必须加上当前项目 id 前缀（例如以 `#my-project` 作为最外层作用域），避免被 `global.min.css` / `developer-common.css` / PortalUI 等公共样式污染；**禁止全局裸选择器**（如 `.card`、`header`、`body`）。
3. **文件约束**：本 skill 文件夹内仅包含平台支持的文件类型（`.md` / `.js` / `.yaml`），**不含 `.html` / `.vue` / `.css`**。原本的整页 HTML 示例、`.vue` 组件与 `.css` 样式均已转为 Markdown 下的代码块，内容原样保留（见 `references/ui/examples/`、`references/forms/template-index.md` 及 `assets/**/*.md`）；复制使用时另存为对应源文件即可。
4. **OpenTiny 组件 API 以官方 Skill 为准**：`npx skills add opentiny/agent-skills --list`，全局安装 `tiny-vue-skill`（`npx skills add opentiny/agent-skills -g --skill tiny-vue-skill --agent claude-code`）。

## 开发工作流

按顺序执行，每一步的细节读取对应资源。

### 0. 起项目 / 工程脚手架

从零创建或迁移 Vue 3 + TypeScript + Vite + OpenTiny + Pinia 工程（目录结构、vite/tsconfig、环境变量、路由守卫、store、i18n、axios、工具函数）。
→ 读取 `references/scaffold.md`

### 1. UI 规范与组件库

华为云官网 / 开发者官网视觉规范：设计 Token（`por-` CSS 变量）、组件库、布局（楼层/栅格）、XTemplate 模板语法与示例。开发者官网场景默认接入公共页头 `hd-header`。
→ 读取 `references/ui/overview.md`，细则见 `references/ui/`（tokens / components / layouts / examples）

### 2. 页头 NavBar 与页脚 Footer

即插即用的 Vue 3 SFC：白色吸顶导航栏 + 黑色「中国站」顶栏 + 移动端汉堡菜单 + 华为云营销页尾。
→ 读取 `references/nav-footer/overview.md`；组件在 `assets/nav-footer/`（`Header.md` / `Footer.md`，内含 `.vue` 源码）

### 3. 登录 / 登出（IAM SSO）

华为云 IAM SSO 登录全流程：`islogin` 判断登录态 → IAM 登录页 → ticket 换 token → cookie 管理 → 登出。
→ 读取 `references/login.md`

### 4. 通用表单

表单目标与字段设计、字段校验、提交流程（防重复提交）、防刷与安全、埋点、可访问性与上线自检清单。
→ 读取 `references/forms/overview.md`；校验规则 `references/forms/validation-rules.md`、提交流程 `references/forms/submission-flow.md`；模板在 `assets/forms/`

### 5. 响应式布局

断点体系（mobile/tablet/desktop/wide）、PC 多尺寸与主流手机机型适配、容器查询、流体排版、Vue 3 组合式实现与验收清单。
→ 读取 `references/responsive-layout/overview.md`；断点 `references/responsive-layout/breakpoints.md`、Vue3 写法 `references/responsive-layout/vue3-patterns.md`；模板在 `assets/responsive-layout/`

### 6. 代码与组件规范

SFC 结构、目录与命名、组件设计（props/emits、单向数据流、插槽、透传）、代码风格（script setup、TS 类型、computed/watch）、scoped 样式与类名规范。
→ 读取 `references/code-style/overview.md`；细则 `references/code-style/code-style.md`、`references/code-style/component-rules.md`；示例组件 `assets/code-style/ExampleCard.md`（内含 `.vue` 源码）

## 资源索引

| 资源 | 说明 |
|------|------|
| `references/scaffold.md` | 工程脚手架完整步骤与文件模板 |
| `references/ui/overview.md` | UI 规范总览与索引 |
| `references/ui/tokens/` | 设计 Token（色彩/排版/间距/阴影圆角/层级/工具类） |
| `references/ui/components/` | 组件库（按钮/输入/下拉/复选/日期/弹窗/提示/标签/面包屑/分页/轮播/评分/价格/倒计时/滚动条/播放器/页签/锚点/折叠/卡片/表格/文本/图标） |
| `references/ui/layouts/` | 页面结构、栅格、楼层 |
| `references/ui/examples/` | 整页示例（原 `.html`，现为 Markdown 代码块） |
| `references/nav-footer/overview.md`、`customization.md` | 页头/页脚用法与定制 |
| `references/login.md` | IAM SSO 登录/登出 |
| `references/forms/` | 表单工作流、校验规则、提交流程、模板入口页 |
| `references/responsive-layout/` | 响应式布局工作流、断点、Vue3 写法 |
| `references/code-style/` | 代码规范工作流、代码风格、组件规则 |
| `assets/` | 可复制的组件与工具：`.js` 原件 + `.md` 包裹的 `.vue` / `.css` 源码（不含 `.html` / `.vue` / `.css` 文件） |

## 注意事项

- 所有样式优先使用 CSS 变量（`var(--por-xxx)`），勿硬编码颜色；以 `--por-base-` 开头的底层变量不在业务中直接引用。
- 交互类组件（轮播、页签、折叠、弹窗等）依赖 jQuery 与 `theme-token.js`。
- 涉及华为云视觉规范时，Token / 组件以 `references/ui/` 为准；涉及组件实现时，优先使用 OpenTiny 组件。
- 本 skill 文件夹不含 `.html` / `.vue` / `.css` 文件（平台仅接受 `.md` / `.js` / `.yaml`）；相关源码均以 Markdown 代码块形式内嵌。
