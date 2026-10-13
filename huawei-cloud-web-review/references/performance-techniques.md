# 优化技术速查

## 图片

| 技术 | 做法 |
| --- | --- |
| 格式 | 转 WebP/AVIF，压缩质量 60–80；不支持 AVIF 时回退 WebP/JPEG（picture 标签） |
| 响应式 | `srcset` + `sizes` 按屏宽下发，禁止大图硬缩 |
| 懒加载 | `loading="lazy"`，低版本浏览器用 IntersectionObserver 兜底 |
| 首屏 | 首屏关键图 `rel="preload" as="image"`，其余懒加载 |
| 防 CLS | 图片容器 `aspect-ratio` 占位或固定宽高 |
| 压缩工具 | sharp / imagemin / tinypng；构建期处理，勿用运行时压缩 |
| 图标 | SVG sprite 或图标字体，避免一张张 HTTP 请求 |

## 字体

- 优先系统字体栈；必须自定义字体时自托管（勿引第三方大体积字体）。
- 子集化：unicode-range 只加载用到的字形；限制字重（通常 1–2 个）。
- `font-display: swap` 防 FOIT（文字不可见），接受短暂 FOUT（字体切换）。
- 关键字体 preload；CSS `@font-face` 放关键 CSS 内。

## JS / CSS

- 代码分割：动态 `import()` 按路由/弹层拆包，首屏只载必需 JS。
- 压缩 + tree-shaking；产物文件名带内容 hash。
- 关键 CSS 内联进 HTML（首屏样式），非关键样式异步加载。
- 非关键脚本 `defer`（不阻塞解析），第三方脚本（统计/客服）延迟到交互后加载。
- 移除未使用 CSS（purgecss/tailwind 清扫）。
- 长任务：单任务 < 50ms；分片处理大数据；重计算移入 Web Worker。
- 避免强制同步布局：读样式与写样式分开，不在循环里交替读写。

## 网络与缓存

- CDN 分发静态资源；`Cache-Control: public, max-age=31536000, immutable`（带 hash 文件名）。
- HTML 用短缓存（no-cache 或 60s），动态接口按需缓存。
- 压缩：Brotli（优于 gzip），回退 gzip。
- HTTP/2 / HTTP/3；连接复用减少握手开销。
- 预连接：跨域资源 `rel="preconnect"`，`dns-prefetch` 预热 DNS。
- 预加载策略：preload 关键资源、prefetch 下屏可能需要的资源（慎用，避免抢带宽）。
- 推广页优先静态托管 + 边缘缓存，首屏零动态请求。

## 渲染与交互

- CLS 治理：图片/视频/广告位/嵌入容器全部预留尺寸；字体 swap；避免在首屏上方插入动态内容。
- `content-visibility: auto` 加速离屏区块渲染（注意滚动条尺寸变化）。
- 长列表虚拟滚动，避免一次性渲染数千节点。
- 事件委托减少监听器数量；防抖/节流高频事件（滚动、输入、resize）。
- 监听器在组件卸载时移除（与 huawei-cloud-web-responsive-layout 的 teardown 一致），防内存泄漏。
- 动画用 transform/opacity（合成器线程），避免 width/height/top 触发布局。

## 排查工具

- Chrome DevTools：Network（体积/瀑布）、Performance（长任务/布局）、Lighthouse、Memory。
- PageSpeed Insights：线上评分与诊断清单。
- WebPageTest：多地域、连接速度模拟。
- RUM 面板（自建或第三方）：现场 LCP/INP/CLS P75。
