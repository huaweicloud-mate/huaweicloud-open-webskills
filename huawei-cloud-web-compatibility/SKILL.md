---
name: huawei-cloud-web-compatibility
description: 主流浏览器兼容适配规范与工作流，覆盖 Chrome、Edge、Firefox、Safari、微信内置浏览器、UC/QQ/华为/360/百度等国产浏览器与安卓 WebView 的支持矩阵（L1/L2/L3 版本策略 + A/B/C 分级）、联盟各网站分辨率支持矩阵与总体原则（最小宽度 1280、禁止变形错位、表格内部滚动例外）、特性检测、CSS/JS/HTML 降级写法、polyfill 策略、browserslist/autoprefixer 配置、多浏览器测试方法与上线后错误监控。当用户需要实现、改造或评审网页在不同浏览器中的兼容性（样式错乱、功能不可用、JS 报错、动效不生效、分辨率适配）时使用。
---

# 浏览器兼容适配 Skill

面向主流浏览器的兼容适配与分辨率适配规范。按以下流程工作，细节参考对应资源文件。

## 工作流

### 1. 确认支持矩阵
- 项目启动时确认目标浏览器、版本策略（L1/L2/L3）与支持级别（A/B/C），默认矩阵见 `references/browser-matrix.md`。
- 版本策略：L3 = 产品版本上线时最新的 3 个稳定版本；PC 端 Safari 为 L2/B 级；微信内置浏览器为 L1/A 级；IE 11 与 Edge < 79 为 C 级不承诺支持。
- 用 browserslist 统一管理目标：`"last 3 versions", "not dead", "not IE 11", "not Edge < 79"`，供 autoprefixer / Babel 使用。
- 测试覆盖版本：A/B 级浏览器至少按矩阵中的「测试覆盖版本」完成实测（默认 L1）。

### 2. 确认分辨率适配
- 官网页面默认全尺寸响应适配；只支持 PC 端的产品设置最小宽度 `1280px`，小于 1280 出现横向滚动条，能兼容到更小宽度更优。
- 管理中心网站默认只支持 PC 端：设置最小宽度 `1280px`，小于 1280 出现横向滚动条。
- 任何浏览器宽度下禁止页面变形、元素错位/挤压；显示不下时设置最小宽度出现横向滚动条。
- 表格为例外组件：字段过多用表格内部横向滚动条，但页面整体不出现横向滚动条。
- 联盟各站点分辨率支持情况与已知问题见 `references/resolution-support.md`。

### 3. 编码规范
- 特性检测优先，禁止浏览器嗅探（微信内置浏览器识别 UA 属例外）。
- CSS：先写回退值再写新特性；自动前缀交给 autoprefixer；高危特性（grid、sticky、backdrop-filter、aspect-ratio、clamp、dvh、env）写法见 `references/techniques.md`。
- JS：走 Babel/TypeScript 转译，目标 API 提前用 caniuse 确认；超出目标的 API 降级或按需 polyfill。
- 用 eslint-plugin-compat 在 CI 拦截超出目标浏览器的 API。

### 4. 兼容性自检
- 复制 `assets/feature-detect.js` 到页面，在目标浏览器控制台跑 `featureDetect()`，核对能力报告。
- 按矩阵的测试覆盖版本实测：Chrome / Firefox / Edge 最新稳定版本；Safari 按 B 级验证核心交互；移动端 Safari 与微信内置浏览器单独测（页面打开、表单提交、分享、登录跳转）。
- 分辨率矩阵中标记「不支持 / 需要排查」的站点，优先复现既有问题（见 `references/resolution-support.md` 问题清单）。

### 5. 上线与监控
- 错误上报按浏览器版本分组（window.onerror / Sentry），可追踪版本分布与回归。
- 重大特性发布前用 BrowserStack/Sauce Labs 跑一遍矩阵回归。

### 6. 验收清单
- [ ] 支持矩阵已确认（L 版本策略 + A/B/C 分级），browserslist 配置生效
- [ ] 分辨率适配符合总体原则：官网全尺寸 / PC-only 与管理台 min-width 1280px、禁止变形错位、表格内部滚动例外
- [ ] CSS 高危特性均有回退写法，autoprefixer 已接入
- [ ] JS 转译目标正确，eslint-plugin-compat 无告警
- [ ] 按测试覆盖版本完成实测（Chrome / Firefox / Edge 最新稳定版，Safari 核心交互）
- [ ] 移动端 Safari / 微信内置浏览器实测：打开、表单提交、分享正常
- [ ] 旧版本浏览器跑 feature-detect 无抛错，核心功能降级可用
- [ ] 错误上报已按浏览器版本分组，可监控回归

## 资源

- `references/browser-matrix.md`：支持矩阵（L1/L2/L3 + A/B/C）与分级策略，实施前读取。
- `references/resolution-support.md`：联盟各站点分辨率矩阵与总体原则（最小宽度 1280、表格例外），布局适配时读取。
- `references/techniques.md`：CSS/JS/HTML 兼容技巧与降级写法，编码时读取。
- `assets/feature-detect.js`：浏览器能力检测工具，排查兼容问题时使用。