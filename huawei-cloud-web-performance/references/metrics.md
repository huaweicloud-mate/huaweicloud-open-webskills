# 性能指标与测量

## Core Web Vitals 目标阈值

| 指标 | 含义 | 良好 | 需改进 | 差 |
| --- | --- | --- | --- | --- |
| LCP | 最大内容绘制（首屏关键内容加载） | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP | 交互到下一次绘制的延迟（2024 起替代 FID） | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | 累计布局偏移 | ≤ 0.1 | ≤ 0.25 | > 0.25 |

辅助指标：

| 指标 | 含义 | 建议 |
| --- | --- | --- |
| FCP | 首次内容绘制 | ≤ 1.8s |
| TTFB | 服务器响应首字节 | ≤ 0.8s |
| LCP 图片体积 | 首屏最大图 | 移动端建议 < 200KB |

## 测量方法

1. Lighthouse（实验室数据）：Chrome DevTools → Lighthouse，选移动端 + 4G 模拟（Slow 4G throttling 更贴近真实）。
2. PageSpeed Insights：线上 URL 直接跑，含移动端与体验评分。
3. 现场数据（RUM）：接入 web-vitals / vitals-collect.js 采集真实用户 LCP/INP/CLS，看 P75 分布而非均值。
4. Chrome DevTools Performance：录制交互，查长任务、强制同步布局、内存增长。

## 优先级排序

- 推广页/落地页：LCP（首屏图、Hero 区）> CLS（图片无尺寸、字体）> INP（表单按钮）。
- 后台系统：INP（表格、筛选、弹窗交互）> LCP > CLS。
- 通用顺序：TTFB/资源体积 → 渲染路径（关键 CSS/JS）→ 运行时交互。

## 预算建议

- 首屏 JS 传输量 ≤ 170KB（gzip 后），CSS ≤ 50KB。
- 图片总请求数移动端 ≤ 15，LCP 图 ≤ 1 张大图 + 其余懒加载。
- Lighthouse CI 设预算：performance ≥ 90、LCP ≤ 2.5s、CLS ≤ 0.1，超标拦截发布。
