---
name: huawei-cloud-web-nav-footer
description: 华为云官网风格页头 NavBar 与页尾 Footer 的 Vue 3 SFC 组件，提炼自 HDSkillPortal 项目。覆盖黑色「中国站」顶栏、白色吸顶导航栏（logo、导航项、当前页高亮）、移动端汉堡菜单，以及完整华为云营销页尾。当需要为 Vue 3 + Vite 项目新增、替换或改造站点页头页尾时使用，直接复制组件即可复用，无 router/API 依赖。
---

# 华为云页头 NavBar 与页尾 Footer（Vue 3）

提炼自 `HDSkillPortal` 的即插即用 Vue 3 单文件组件：白色吸顶导航栏 + 黑色
「中国站」顶栏 + 移动端汉堡菜单，以及完整华为云营销页尾。

## 包含内容

- `assets/Header.vue` — 泛化后的页头 NavBar。可通过 props 配置导航项、logo、
  品牌文案、当前页高亮与是否显示顶栏；无 router 或 API 依赖。
- `assets/Footer.vue` — HDSkillPortal 原版页尾，完全自包含（scoped 样式 + 内嵌
  二维码图片）。唯一依赖是 Vue。

## 安装

1. 复制 `assets/Header.vue` → `<项目>/src/components/SiteHeader.vue`
2. 复制 `assets/Footer.vue` → `<项目>/src/components/SiteFooter.vue`

## 接入应用

在 `App.vue`（或任意布局组件）中：

```vue
<script setup>
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";

const navLinks = [
  ["AI Agent路线图", "ai-agent-roadmap.html", "roadmap"],
  ["Icons库", "icons.html", "icons"],
  ["开发文档", "docs.html", "docs"]
];
</script>

<template>
  <SiteHeader :nav-links="navLinks" active-page="home" />
  <main>...</main>
  <SiteFooter />
</template>
```

## 适配

- **导航项**：通过 `navLinks` 传入 `[[label, href, pageKey], ...]`，`pageKey` 用于和
  `activePage` prop 匹配实现当前页高亮。
- **当前页**：从 `window.location` 推导后传给 `activePage`（示例见
  `references/customization.md`）。
- **Logo / 品牌**：`logoUrl`（相对 Vite `BASE_URL` 或绝对路径）、`brandText`
  （如「开放能力」）、`homeHref`（品牌链接）。
- **隐藏中国站顶栏**：`show-site-bar="false"`。
- **页尾**：完全自包含，唯一外部动作 `openApp()` 会打开华为云 App 下载页，需要时
  自行替换 URL。

## 要求

- Vue 3 `<script setup>` + Vite 项目，无额外 npm 依赖。
- 页尾 CSS 使用原生嵌套语法，需要 Chrome 120+、Safari 17.2+ 或 Firefox 120+。
- 两个组件均使用 `<style scoped>`，不依赖项目全局样式。

## 完整参考

完整的 props 表、当前页检测、视觉 token（颜色、高度、断点）与页尾裁剪说明见
`references/customization.md`。