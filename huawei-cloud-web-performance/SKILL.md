---
name: huawei-cloud-web-performance
description: Web 页面性能优化的开发规范与工作流，覆盖性能指标（LCP、INP、CLS、FCP、TTFB）与目标阈值、性能基线测量（Lighthouse、PageSpeed Insights、现场数据）、图片/字体/JS/CSS 资源优化、缓存与 CDN 加载策略、渲染与交互性能（CLS 治理、长任务、输入响应）、Core Web Vitals 监控采集与验收清单。当用户需要优化网页加载速度、提升转化页性能、排查性能问题（首屏慢、卡顿、布局抖动、图片加载慢等）时使用。
---

# Web 性能优化 Skill

面向网页（推广页、官网、后台等）的性能优化规范。按以下流程工作，细节参考对应资源文件。

## 工作流

### 1. 建立性能基线
- 明确目标指标与阈值：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1、FCP ≤ 1.8s、TTFB ≤ 0.8s，定义见 `references/metrics.md`。
- 用 Lighthouse（移动端 4G 模拟）跑基线，同时接现场数据（RUM）看真实用户分布。
- 按「影响面 × 收益」排优先级：首屏资源（LCP）> 布局稳定（CLS）> 交互响应（INP）> 其他。

### 2. 资源层优化
- 图片：转 WebP/AVIF，压缩质量 60–80；`srcset`/`sizes` 按屏宽下发；首屏图 preload，其余懒加载；`aspect-ratio` 占位防 CLS。细节见 `references/techniques.md`。
- 字体：自托管 + 子集化（unicode-range）；`font-display: swap`；限制字重数量。
- JS/CSS：代码分割（动态 import）、tree-shaking、压缩；内联关键 CSS；非关键脚本 defer。

### 3. 加载策略
- 静态资源上 CDN，文件名带内容 hash 并长缓存（`Cache-Control: public, max-age=31536000, immutable`）。
- 开启 Brotli/gzip、HTTP/2/3；跨域资源 preconnect，DNS 预热用 dns-prefetch。
- 推广页优先静态化/边缘缓存，减少首屏依赖的动态请求。

### 4. 渲染与交互性能
- CLS 治理：所有图片/视频/广告位预留尺寸，字体 swap，避免运行时插入大块内容。
- 长任务治理：单任务 < 50ms，重计算放 Web Worker；监听器及时清理，避免内存泄漏。
- 输入响应：表单提交防抖节流（见 huawei-cloud-web-form），避免主线程被同步操作阻塞。

### 5. 测量与监控
- 接入 `assets/vitals-collect.js` 采集现场 LCP/INP/CLS，经 sendBeacon 上报。
- 上线前后对比基线；CI 中用 Lighthouse CI 设性能预算，超标拦截。
- 异常时按页面/渠道/浏览器版本分组定位。

### 6. 验收清单
- [ ] Lighthouse 性能分与 CWV 达标（移动端 4G 模拟）
- [ ] 图片全部压缩并响应式下发，首屏图 preload，其余懒加载
- [ ] 字体 swap 且子集化，无 FOIT
- [ ] JS/CSS 已压缩分割，关键 CSS 内联，非关键脚本 defer
- [ ] 静态资源 CDN + 长缓存，启用 Brotli 与 HTTP/2
- [ ] 页面无 CLS（图片/广告位均有尺寸占位）
- [ ] 长任务 < 50ms，无内存泄漏（监听器已清理）
- [ ] vitals 采集已上线，可查看现场数据

## 资源

- `references/metrics.md`：指标定义、阈值与测量方法，建立基线时读取。
- `references/techniques.md`：图片/字体/JS/CSS/网络/渲染优化技术速查，实施时读取。
- `assets/vitals-collect.js`：Core Web Vitals 内联采集器，可复制到页面使用。
