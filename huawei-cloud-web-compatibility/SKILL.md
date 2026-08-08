---
name: huawei-cloud-web-compatibility
description: 主流浏览器兼容适配规范与工作流，覆盖 Chrome、Edge、Firefox、Safari、iOS Safari、微信内置浏览器与安卓 WebView 的支持矩阵与分级策略（完整支持/降级可用/不支持）、特性检测、CSS/JS/HTML 降级写法、polyfill 策略、browserslist/autoprefixer 配置、多浏览器测试方法与上线后错误监控。当用户需要实现、改造或评审网页在不同浏览器中的兼容性（样式错乱、功能不可用、JS 报错、动效不生效等）时使用。
---

# 浏览器兼容适配 Skill

面向主流浏览器的兼容适配规范。按以下流程工作，细节参考对应资源文件。

## 工作流

### 1. 确认支持矩阵
- 项目启动时确认目标浏览器与最低版本，分三档：A 级完整支持、B 级降级可用、C 级不支持。
- 默认矩阵见 `references/browser-matrix.md`；按公司统计或客户要求调整。
- 用 browserslist 统一管理目标：`"last 2 versions", "not dead"`，供 autoprefixer / Babel 使用。

### 2. 编码规范
- 特性检测优先，禁止浏览器嗅探（微信内置浏览器识别 UA 属例外）。
- CSS：先写回退值再写新特性；自动前缀交给 autoprefixer；高危特性（grid、sticky、backdrop-filter、aspect-ratio、clamp、dvh、env）写法见 `references/techniques.md`。
- JS：走 Babel/TypeScript 转译，目标 API 提前用 caniuse 确认；超出目标的 API 降级或按需 polyfill。
- 用 eslint-plugin-compat 在 CI 拦截超出目标浏览器的 API。

### 3. 兼容性自检
- 复制 `assets/feature-detect.js` 到页面，在目标浏览器控制台跑 `featureDetect()`，核对能力报告。
- Chrome / Edge / Firefox 最新 2 版本实测；Safari / iOS Safari 最新 2 版本实测（含 iPhone 刘海屏）。
- 微信内置浏览器单独测：页面打开、表单提交、分享、登录跳转。

### 4. 上线与监控
- 错误上报按浏览器版本分组（window.onerror / Sentry），可追踪版本分布与回归。
- 重大特性发布前用 BrowserStack/Sauce Labs 跑一遍矩阵回归。

### 5. 验收清单
- [ ] 支持矩阵已确认，browserslist 配置生效
- [ ] CSS 高危特性均有回退写法，autoprefixer 已接入
- [ ] JS 转译目标正确，eslint-plugin-compat 无告警
- [ ] Chrome / Edge / Firefox 最新 2 版本实测通过
- [ ] Safari / iOS Safari 最新 2 版本实测通过（含刘海屏安全区）
- [ ] 微信内置浏览器实测：打开、表单提交、分享正常
- [ ] 旧版本浏览器跑 feature-detect 无抛错，核心功能降级可用
- [ ] 错误上报已按浏览器版本分组，可监控回归

## 资源

- `references/browser-matrix.md`：默认支持矩阵与分级策略，实施前读取。
- `references/techniques.md`：CSS/JS/HTML 兼容技巧与降级写法，编码时读取。
- `assets/feature-detect.js`：浏览器能力检测工具，排查兼容问题时使用。
