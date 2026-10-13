# 快速开始

来源：Tiny PortalUI getting-started 规范

Tiny PortalUI 是基于华为云门户类视觉规范、使用参数化设计和开发的轻量基础组件库。主要目标是保证华为云门户网页用户体验的一致性、提升前端开发效率。

## 关键特性

- 基础动画效果库
- 基础组件及其基础样式
- 以 API 形式提供常用 UI 交互功能，如折叠、页签切换、提示等

## 使用方法

### 基于 cui 套件开发

cui 套件和 PEP 基础模板默认集成了 PortalUI。在使用 cui 套件开发定制页面或 PEP 组件时，可以直接使用，无需手动引入。

### 手动引入

在其他开发环境下，需要在页面中引入 PortalUI 的 CSS 和 JS 文件：

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="//portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css"/>

<!-- 引入 JS (依赖 jQuery) -->
<script type="text/javascript" src="//portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.js"></script>
```

> **注意**：`3.0.17` 为 PortalUI 的版本号。请参考更新日志获取最新版本。

## 设计 Token 使用规范

- **禁止直接使用基础变量**: 以 `--por-base-` 开头的变量为底层基础变量，不建议在业务组件中直接引用。
- **优先使用语义变量**: 应优先选择具有语义含义的变量（如 `--por-color-text-primary`），保证设计一致性。
- **关联关系**: 语义变量通常引用基础变量。

详见 `tokens/` 目录下的设计 Token 文档。
