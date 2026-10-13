# CSS/JS/HTML 兼容技巧与降级写法

原则：先写回退，再写增强；特性检测优先于浏览器判断。

## 特性检测 vs 浏览器嗅探

- 用 `CSS.supports()`、`typeof API !== "undefined"`、`"prop" in el` 判断能力。
- 不用 UA 字符串判断能力（版本规则会过时）。
- 例外：微信内置浏览器（`navigator.userAgent.includes("MicroMessenger")`）、App 内嵌页按约定识别。

## CSS 降级写法

| 特性 | 写法（先回退后增强） |
| --- | --- |
| 可选链无关 | — |
| grid | 先 flex/float 布局作回退，再 `display: grid` |
| position: sticky | 默认 static/滚动跟随，`@supports (position: sticky) { ... }` 内启用 |
| aspect-ratio | 先 `padding-top: 56.25%` 或固定高度，再 `aspect-ratio: 16/9` |
| height: 100dvh | 先 `height: 100vh`，再 `height: 100dvh` |
| env(safe-area-inset-*) | 先普通 `padding` 常量，再 `padding: calc(16px + env(...))` |
| clamp() | 先固定值（如 `font-size: 24px`），再 `clamp(...)` |
| CSS 变量 | 先字面量回退，再 `var(--x)` |
| backdrop-filter | `@supports (backdrop-filter: blur(4px))` 内启用，否则纯色背景 |
| 媒体查询内 CSS 变量 | 旧浏览器不支持，媒体查询用字面量 |

- 自动前缀：接入 PostCSS autoprefixer，配合 browserslist；不要手写 `-webkit-` 前缀。
- 检查项示例：grid、flex 旧语法、sticky、backdrop-filter、user-select、appearance。

## JS 兼容与降级

| 能力 | 支持下限 | 降级方案 |
| --- | --- | --- |
| 可选链 `?.` / 空值合并 `??` | Safari 13.1+ | Babel 转译（preset-env）到 es2019 |
| crypto.randomUUID | Safari 15.4+ | 时间戳 + 随机串拼接 |
| matchMedia addEventListener | Safari 14+ | 检测到无 addEventListener 时用 addListener |
| AbortController | Safari 12.1+ | 无则超时后忽略请求 |
| IntersectionObserver | Safari 12.1+ | 无则直接执行回调（视口内视为可见） |
| fetch | 现代浏览器均有 | 极旧环境回退 XMLHttpRequest |
| Promise / 数组新方法 | Safari 9+ | 按需引入 core-js polyfill |
| optional chaining 之外的语法 | — | 统一走 Babel/TS 转译，target 设为 browserslist |

- polyfill 策略：只按需引入（core-js），避免全量 polyfill 拖慢首屏；优先降级设计而不是补 polyfill。
- 用 eslint-plugin-compat 检测代码里用到的 API 是否超出 browserslist 目标。

## HTML 兼容

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`：刘海屏沉浸必需。
- `loading="lazy"`：不支持的浏览器自动忽略（渐进增强，无副作用）。
- `<dialog>`：Safari 15.4+；旧环境用自绘弹层/抽屉（模板已用 div 自绘）。
- `srcset`/`<picture>`：Safari 9.1+；回退普通 `<img src>`。
- 表单控件：`input[type=date]` 在 iOS Safari 上有差异，必要时用自绘选择器。

## 测试方法

1. 本地实测：Windows 装 Chrome / Edge / Firefox 三件套；Safari 需 macOS 或 BrowserStack。
2. DevTools 设备模拟：iPhone SE/15 Pro、安卓 360/412 宽。
3. 真实设备抽测：iPhone、华为、小米各一台（尤其微信内置浏览器）。
4. 远程矩阵：BrowserStack / Sauce Labs 跑 A 级矩阵。
5. 上线后：window.onerror / Sentry 按浏览器版本分组，跟踪回归。

## 常用工具

- browserslist + autoprefixer：目标环境与自动前缀。
- Babel preset-env / TS target：JS 转译。
- core-js：按需 polyfill。
- eslint-plugin-compat：CI 拦截超纲 API。
- caniuse.com：特性支持度查询。
