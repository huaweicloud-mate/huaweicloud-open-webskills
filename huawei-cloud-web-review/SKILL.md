---
name: huawei-cloud-web-review
description: 华为云前端审查 Skill（合并版），面向测试 / QA / 评审阶段：浏览器兼容性适配审查、Web 性能审查，以及 Vue 3 代码规范评审清单与统一验收清单。当需要对前端产物做浏览器兼容性、性能、代码规范的审查与验收时使用。当前不包含 UI 设计规范审查。
---

# 华为云前端审查 Skill

## 概述

本 Skill 由审查阶段相关 skill 合并而成，供「一个阶段只加载一个 skill」的平台在**测试 / QA / 评审阶段**统一加载：

`huawei-cloud-web-compatibility`、`huawei-cloud-web-performance`，以及 `huawei-cloud-web-code-style` 的评审自查清单。

> 范围说明：当前**不包含 UI 设计规范审查**（UI 规范符合性待后续按需并入）。

`SKILL.md` 只放审查工作流、判定规则与资源索引，细则以 `references/` 为准。

## 审查工作流

对一份前端产物，按以下顺序审查；每项完成后勾选 `references/review-checklist.md` 中对应条目。

### 1. 代码规范评审

核对 Vue 3 组件与代码是否符合团队规范：SFC 结构、命名、props/emits、样式 scoped 与全局污染、监听器清理、lint 通过。
→ 清单见 `references/review-checklist.md` 第一节（细则对照开发阶段 `huawei-cloud-web-develop` 的 code-style 规范）。

### 2. 浏览器兼容性审查

确认支持矩阵（L1/L2/L3 + A/B/C）与分辨率适配原则，检查 CSS 高危特性降级、JS 转译目标、polyfill 策略、实测覆盖版本与错误上报。
→ 读取 `references/browser-compatibility.md`；矩阵 `references/browser-matrix.md`、分辨率 `references/resolution-support.md`、降级技巧 `references/compatibility-techniques.md`。
→ 工具：`assets/feature-detect.js`（在目标浏览器控制台执行 `featureDetect()` 核对能力报告）。

### 3. 性能审查

核对指标与阈值（LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1、FCP ≤ 1.8s、TTFB ≤ 0.8s），检查资源优化、加载策略、渲染与交互性能、现场监控。
→ 读取 `references/performance.md`；指标 `references/performance-metrics.md`、优化技巧 `references/performance-techniques.md`。
→ 工具：`assets/vitals-collect.js`（Core Web Vitals 采集器）。

### 4. 汇总裁决

将三部分结果合并，输出「通过 / 不通过 + 问题清单 + 修复建议」。统一清单见 `references/review-checklist.md`。

## 资源索引

| 资源 | 说明 |
|------|------|
| `references/review-checklist.md` | 统一验收清单（代码规范 + 兼容 + 性能） |
| `references/browser-compatibility.md` | 浏览器兼容适配工作流与索引 |
| `references/browser-matrix.md` | 浏览器支持矩阵（L1/L2/L3 + A/B/C） |
| `references/resolution-support.md` | 分辨率支持矩阵与总体原则 |
| `references/compatibility-techniques.md` | CSS/JS/HTML 兼容与降级技巧 |
| `references/performance.md` | 性能优化工作流与索引 |
| `references/performance-metrics.md` | 性能指标定义、阈值与测量方法 |
| `references/performance-techniques.md` | 资源/网络/渲染优化技巧 |
| `assets/feature-detect.js` | 浏览器能力检测工具 |
| `assets/vitals-collect.js` | Core Web Vitals 采集器 |

## 注意事项

- 审查以「规则 + 清单」为准，逐条核对并给出证据（截图 / 日志 / 报告 / 实测版本）。
- 兼容性与性能均需**目标版本实测**，不能仅凭静态检查通过。
- 本 skill 文件夹不含 `.html` 文件。
