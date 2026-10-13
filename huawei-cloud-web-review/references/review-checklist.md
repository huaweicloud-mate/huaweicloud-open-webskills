# 华为云前端审查 · 统一验收清单

审查阶段逐项核对；任一未通过即视为不达标，需退回修复。

## 一、Vue 3 代码规范评审（来自 code-style）

- [ ] 文件名与组件职责一致，组件文件 PascalCase
- [ ] props 显式声明（TS `interface`），有默认值用 `withDefaults`，无 `any`
- [ ] emits 全部显式声明，事件名 kebab-case
- [ ] 不直接修改 props，需要变更走 emit 或本地 ref
- [ ] `v-for` 有稳定 `:key`，无 `v-if` / `v-for` 同元素
- [ ] 模板无复杂表达式（逻辑放 `<script>` 中）
- [ ] 样式 `scoped`，类名符合约定，无全局样式污染
- [ ] 监听器 / 定时器在卸载时清理
- [ ] ESLint + Prettier 通过

## 二、浏览器兼容验收（来自 compatibility）

- [ ] 支持矩阵已确认（L 版本策略 + A/B/C 分级），browserslist 配置生效
- [ ] 分辨率适配符合总体原则：官网全尺寸 / PC-only 与管理台 min-width 1280px、禁止变形错位、表格内部滚动例外
- [ ] CSS 高危特性均有回退写法，autoprefixer 已接入
- [ ] JS 转译目标正确，eslint-plugin-compat 无告警
- [ ] 按测试覆盖版本完成实测（Chrome / Firefox / Edge 最新稳定版，Safari 核心交互）
- [ ] 移动端 Safari / 微信内置浏览器实测：打开、表单提交、分享正常
- [ ] 旧版本浏览器跑 `featureDetect()` 无抛错，核心功能降级可用
- [ ] 错误上报已按浏览器版本分组，可监控回归

## 三、性能验收（来自 performance）

- [ ] Lighthouse 性能分与 Core Web Vitals 达标（移动端 4G 模拟）
- [ ] 图片全部压缩并响应式下发，首屏图 preload，其余懒加载
- [ ] 字体 swap 且子集化，无 FOIT
- [ ] JS/CSS 已压缩分割，关键 CSS 内联，非关键脚本 defer
- [ ] 静态资源 CDN + 长缓存，启用 Brotli 与 HTTP/2
- [ ] 页面无 CLS（图片 / 广告位均有尺寸占位）
- [ ] 长任务 < 50ms，无内存泄漏（监听器已清理）
- [ ] vitals 采集已上线，可查看现场数据
