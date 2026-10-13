# Customization Guide

Components distilled from `HDSkillPortal` (`src/components/NavBar.vue`, `Footer.vue`).
`assets/Header.vue` is a generalized, dependency-light version of NavBar (search API and
router logic removed). `assets/Footer.vue` is the original HDSkillPortal footer, self-contained.

## Header

### Props

| Prop          | Type    | Default                         | Description                                                        |
| ------------- | ------- | ------------------------------- | ------------------------------------------------------------------ |
| `navLinks`    | Array   | `[]`                            | `[[label, href, pageKey], ...]` rendered as desktop + mobile links  |
| `activePage`  | String  | `""`                            | Current page key; matched against link `pageKey` for highlighting   |
| `logoUrl`     | String  | `"assets/huaweicloud-logo.svg"` | Logo image; relative paths resolve against Vite `BASE_URL`          |
| `brandText`   | String  | `""`                            | Brand text next to the logo (e.g. `开放能力`); hidden when empty    |
| `homeHref`    | String  | `"index.html"`                  | Brand link target                                                   |
| `showSiteBar` | Boolean | `true`                          | Show the black `中国站` top bar                                     |

External URLs (`https://...`, `//...`) and root-absolute paths (`/...`) are used as-is;
other relative paths are prefixed with `import.meta.env.BASE_URL`.

### Wiring example

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
  <SiteHeader :nav-links="navLinks" active-page="home" brand-text="开放能力" />
  <main>...</main>
  <SiteFooter />
</template>
```

### Active page detection

Derive `activePage` from the URL and pass it in. Example:

```js
const BASE = import.meta.env.BASE_URL;
const pathname = window.location.pathname;
const pageName = (BASE.startsWith("/") ? pathname.slice(BASE.length) : pathname).split("/").pop() || "index.html";
const activePage =
  pageName === "docs.html" ? "docs" :
  pageName === "icons.html" ? "icons" :
  pageName === "ai-agent-roadmap.html" ? "roadmap" : "home";
```

### Visual tokens

| Token            | Default                     | Where                                                          |
| ---------------- | --------------------------- | -------------------------------------------------------------- |
| Top bar          | 24px, `#111111`             | `.site-info-bar`                                               |
| Navbar height    | 72px desktop / 47px mobile  | `.navbar-inner` + `@media (max-width: 768px)`                  |
| Navbar max-width | 1600px ≥1776 / 90% / 94%    | `@media` blocks in `.navbar-inner`                              |
| Link color       | `#8c8c8c`, hover/active `#191919` | `.nav-link`, `.nav-link:hover`, `.nav-link[aria-current="page"]` |
| Brand text       | 18px, left red border       | `.navbar-brand-text`                                           |
| Active mobile    | `#c7000b` + left indicator  | `.mobile-menu-link.active`                                     |

`showSiteBar="false"` also removes the 24px bar, so total sticky header height becomes
72px desktop / 47px mobile. When your layout reserves header space (e.g. `main` padding or
sticky sidebars), use `96px` (24 + 72) on desktop and `47px` below 768px.

## Footer

- Fully self-contained: scoped styles, embedded QR images (base64), no imports.
- `openApp()` opens the Huawei Cloud app download page; replace the URL if needed.
- Trim sections by deleting template blocks: contact/QR block (`.footer-nav-comps`), column
  menus (`.footer-nav-menus` `<dl>` groups), legal/copyright row (`.footer-copyright-container`).
- CSS uses native nesting; requires modern browsers (Chrome 120+, Safari 17.2+, Firefox 120+).
  If you must support older browsers, flatten the nested rules inside `#footer`/media queries
  into plain selectors.

## Requirements

- Vue 3 `<script setup>` + Vite project.
- No extra npm dependencies.
- Both components ship styles as `<style scoped>`; no global CSS conflicts expected.