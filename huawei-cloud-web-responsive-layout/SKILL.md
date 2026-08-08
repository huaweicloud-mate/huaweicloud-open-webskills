---
name: huawei-cloud-web-responsive-layout
description: Vue 3 项目响应式布局的开发规范与工作流，覆盖断点体系（mobile/tablet/desktop/wide 四档）、PC 多尺寸适配（1024–2560）与主流手机机型矩阵（iPhone/华为/小米/OPPO/vivo）、移动优先媒体查询、CSS Grid/Flex 自适应、容器查询、流体排版与安全区、Vue 3 组合式实现（useViewport、动态 class、CSS 变量绑定、Teleport 抽屉导航）、触控目标与可访问性、验收清单。当用户需要为 Vue 3 页面实现、改造或评审响应式布局（推广页、官网、后台系统等）时使用，也可用于生成响应式组件模板。
---

# Vue3 响应式布局 Skill

面向 Vue 3 项目的响应式布局规范。按以下流程工作，细节参考对应资源文件。

## 工作流

### 1. 确认目标设备与断点
- 先确认受众设备分布（手机/平板/桌面）与主要机型，再定断点，不为不存在的场景过度设计。
- 采用移动优先：先写移动端样式，再用 `min-width` 媒体查询逐级增强。
- PC 端覆盖 1024–2560：1280–1535 为 desktop，≥1536 为 wide（1920/2560 超宽屏）；1024 默认归 tablet，可按业务调整为桌面起点。
- 移动端以 375px 为主基准、360px 最窄保底，覆盖 iPhone/华为/小米/OPPO/vivo 主流机型；设备矩阵见 `references/breakpoints.md`。
- 默认断点体系见 `references/breakpoints.md`，按项目裁剪。

### 2. 选型布局方案
- 卡片/栅格：CSS Grid `repeat(auto-fit, minmax(280px, 1fr))`，无需 JS 自适应列数。
- 工具栏/导航条：Flex + `flex-wrap: wrap`。
- 组件级自适应：容器查询 `@container`（依赖组件宽度而非视口）。
- 结构性切换（移动抽屉 vs 桌面顶部导航）：用 `useViewport` + 动态 class / 动态组件。
- 流体排版与间距：`clamp(min, 首选, max)`。

### 3. 实现 Vue 3 响应式逻辑
- 复制 `assets/template/useViewport.js` 到项目 `composables/` 目录，页面内调用 `useViewport()`。
- 需要 JS 参与的结构切换，用 `:class="{ 'is-mobile': viewport.isMobile }"`、动态组件或 CSS 变量绑定，写法见 `references/vue3-patterns.md`。
- matchMedia 仅在 mounted 后可用（SSR/Nuxt 注意），服务端默认渲染桌面布局。
- 能纯 CSS 解决的不要用 JS，避免布局抖动。

### 4. 细节与体验
- 触控目标 ≥ 44×44px，相邻热区间距 ≥ 8px。
- 防止横向滚动：flex/grid 子项加 `min-width: 0`；`overflow-x: hidden` 仅作兜底。
- 移动端底部栏/抽屉处理安全区 `env(safe-area-inset-bottom)`。
- 图片用 `srcset`/`sizes` + `aspect-ratio`，避免 CLS；表格式内容移动端改卡片或横向滚动。

### 5. 验收清单
- [ ] PC 2560/1920/1600/1280/1024 五档无横向滚动、无内容重叠
- [ ] 手机 360/375/393/412/430 五档宽度无横向滚动、无内容重叠
- [ ] 媒体查询全部为移动优先（min-width），或有明确例外
- [ ] 触控目标 ≥ 44px，热区无重叠
- [ ] 断点切换无闪烁、无布局抖动，JS 监听已正确清理
- [ ] 容器查询与视口查询不混用导致冲突
- [ ] 图片/字体加载无 CLS；安全区已处理
- [ ] 移动端菜单键盘与读屏可用，关闭后焦点回到触发按钮

## 资源

- `references/breakpoints.md`：断点体系、媒体查询写法与常见布局模式，实施布局时读取。
- `references/vue3-patterns.md`：Vue 3 响应式实现细节（useViewport、动态类、CSS 变量、Teleport、SSR 注意），编码时读取。
- `assets/template/useViewport.js`：断点监听 composable，可直接复制使用。
- `assets/template/ResponsiveSection.vue`：自适应栅格 + 移动/桌面切换的示例组件。
