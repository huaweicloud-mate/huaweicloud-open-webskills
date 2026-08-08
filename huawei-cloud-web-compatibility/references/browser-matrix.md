# 浏览器支持矩阵与分级策略

## 分级策略

| 级别 | 定义 | 要求 |
| --- | --- | --- |
| A 级 | 完整支持 | 全功能、像素级还原，逐项测试 |
| B 级 | 降级可用 | 核心功能可用，视觉/动效可降级，不阻塞使用 |
| C 级 | 不支持 | 不承诺兼容，提示升级浏览器（横幅） |

## 默认矩阵（A 级）

| 浏览器 | 建议目标 | 说明 |
| --- | --- | --- |
| Chrome | 最新 2 个大版本 | 开发主基准 |
| Edge | 最新 2 个大版本 | Chromium 内核，与 Chrome 行为一致 |
| Firefox | 最新 2 个大版本 | 重点回归 grid/flex 细节与动效 |
| Safari（macOS） | 最新 2 个大版本 | 重点回归 sticky、aspect-ratio、CSS 变量 |
| iOS Safari | 最新 2 个大版本 | 含刘海屏安全区、100dvh、输入框聚焦缩放 |
| 安卓 WebView | 最新 2 个 Chrome 内核 | 内置浏览器/App 内嵌页的宿主 |

## 国产浏览器与特殊环境

| 环境 | 内核 | 处理建议 |
| --- | --- | --- |
| 微信内置浏览器（iOS） | WKWebView（Safari 内核） | 按 iOS Safari 标准 + 单独测分享/JSSDK |
| 微信内置浏览器（安卓） | X5/XWeb 或系统 WebView | 按 Chrome 标准 + 单独测分享/JSSDK |
| 360 / QQ / 搜狗 / 夸克 | 多为 Chromium 内核 | 按 Chrome 标准，抽样验证 |
| UC | Chromium 内核为主 | 抽样验证 |

- 微信内置浏览器通过 UA 包含 `MicroMessenger` 识别（这是少数允许 UA 判断的场景）。
- 安卓内置浏览器版本碎片化：以「系统 WebView 内核版本 ≥ 目标 Chrome」为判据，让用户升级 WebView 或降级设计。

## B 级建议（降级可用）

- Safari 14–15：无 `crypto.randomUUID`、无 `addEventListener` on MQL（用 addListener）、无容器查询。
- 旧版安卓 WebView（Chrome 内核 < 80）：无 `aspect-ratio`、无 `100dvh`、无可选链。
- 处理方式：核心链路可用，动效/毛玻璃/新布局特性自动降级。

## C 级（不支持）

- IE11 及更早：默认不支持。如业务硬性要求，单独评估成本，通常需要大幅降级设计。
- 判断新特性支持度：实现前查 caniuse.com（如 `caniuse.com/backdrop-filter`），或本地 `npx browserslist` 查看目标环境。

## 版本数据来源

- 优先用产品自有统计（前端埋点采集浏览器版本分布）。
- 无统计时参考 StatCounter / 公司 IT 基线。
