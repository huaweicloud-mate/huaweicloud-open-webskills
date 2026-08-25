# 色彩体系

来源：`cnpm-baseui` (portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css) Tiny PortalUI design-tokens

> **核心规范**
> - 禁止直接使用基础变量：以 `--por-base-` 开头的变量为底层基础变量，不建议在业务组件中直接引用。
> - 优先使用语义变量：应优先选择具有语义含义的变量（如 `--por-color-text-primary`），保证设计一致性。
> - 语义变量通常引用基础变量，见下方"默认值 / 映射"列。

## 1. 基础调色板 (Base Palette)

*仅供内部引用，不建议直接用于业务代码。*

| 变量名 | 颜色值 | 说明 |
| :--- | :--- | :--- |
| `--por-base-color-transparent` | `transparent` | 透明 |
| `--por-base-color-rgb-black` | `0,0,0` | 黑色 RGB |
| `--por-base-color-rgb-white` | `255,255,255` | 白色 RGB |
| `--por-base-color-gray-0` | `#fff` | 白色 |
| `--por-base-color-gray-5` | `#fafafa` | 极浅灰 |
| `--por-base-color-gray-10` | `#f5f5f5` | 浅灰 1 |
| `--por-base-color-gray-20` | `#ebebeb` | 浅灰 2 |
| `--por-base-color-gray-30` | `#dbdbdb` | 浅灰 3 |
| `--por-base-color-gray-40` | `#c2c2c2` | 中灰 1 |
| `--por-base-color-gray-50` | `grey` | 中灰 2 |
| `--por-base-color-gray-60` | `#595959` | 深灰 1 |
| `--por-base-color-gray-70` | `#333` | 深灰 2 |
| `--por-base-color-gray-80` | `#262626` | 深灰 3 |
| `--por-base-color-gray-90` | `#191919` | 极深灰 |
| `--por-base-color-gray-100` | `#000` | 黑色 |
| `--por-base-color-red-20` | `#faa9a5` | 浅红 |
| `--por-base-color-red-40` | `#f76360` | 亮红 |
| `--por-base-color-red-50` | `#f23030` | 基础红 |
| `--por-base-color-orange-50` | `#f80` | 基础橙 |
| `--por-base-color-lemon-50` | `#f7d916` | 基础柠檬黄 |
| `--por-base-color-kelly-50` | `#5cb300` | 基础绿 |
| `--por-base-color-blue-50` | `#1476ff` | 基础蓝 |
| `--por-base-color-red-huawei` | `#191919` | 品牌深色 |
| `--por-base-color-disabled` | `#adb0b8` | 禁用态置灰 |
| `--por-base-color-divider-light` | `#eee` | 浅色分割线 |
| `--por-base-color-divider-normal` | `rgba(0,0,0,.078)` | 常规分割线 |
| `--por-base-color-divider-dark` | `#dfe1e6` | 深色分割线 |

## 2. 文字颜色 (Text Colors)

| 变量名 | 默认值 / 映射 | 说明 |
| :--- | :--- | :--- |
| `--por-color-text-primary` | `var(--por-base-color-gray-90)` | 主要文字 |
| `--por-color-text-secondary` | `var(--por-base-color-gray-60)` | 次要文字 |
| `--por-color-text-weak` | `var(--por-base-color-gray-50)` | 弱提示文字 |
| `--por-color-text-disabled` | `var(--por-base-color-gray-40)` | 禁用文字 |
| `--por-color-text-white` | `var(--por-base-color-gray-0)` | 白色文字 |
| `--por-color-text-black` | `var(--por-base-color-gray-100)` | 黑色文字 |
| `--por-color-text-button` | `var(--por-base-color-blue-50)` | 按钮文字色 |
| `--por-color-text-huawei` | `var(--por-base-color-red-huawei)` | 品牌强调色文字 |
| `--por-color-text-link-default` | `var(--por-base-color-gray-90)` | 链接默认色 |
| `--por-color-text-link-active` | `var(--por-base-color-gray-60)` | 链接点击/激活色 |

## 3. 背景颜色 (Background Colors)

| 变量名 | 默认值 / 映射 | 说明 |
| :--- | :--- | :--- |
| `--por-color-background-white` | `var(--por-base-color-gray-0)` | 白色背景 |
| `--por-color-background-black` | `var(--por-base-color-gray-100)` | 黑色背景 |
| `--por-color-background-primary` | `var(--por-base-color-gray-90)` | 主要背景色 |
| `--por-color-background-gray-1` | `var(--por-base-color-gray-5)` | 浅灰色背景 1 |
| `--por-color-background-gray-2` | `var(--por-base-color-gray-10)` | 浅灰色背景 2 |
| `--por-color-background-disabled` | `rgba(var(--por-base-color-rgb-black),0.05)` | 禁用态背景 |
| `--por-color-background-transparent` | `var(--por-base-color-transparent)` | 透明背景 |

## 4. 边框颜色 (Border Colors)

| 变量名 | 默认值 / 映射 | 说明 |
| :--- | :--- | :--- |
| `--por-color-border-primary` | `var(--por-base-color-gray-90)` | 主要边框色 |
| `--por-color-border-secondary` | `var(--por-base-color-gray-60)` | 次要边框色 |
| `--por-color-border-input` | `var(--por-base-color-gray-40)` | 输入框默认边框 |
| `--por-color-border-input-active` | `var(--por-base-color-gray-90)` | 输入框激活边框 |
| `--por-color-border-disabled` | `var(--por-base-color-gray-40)` | 禁用态边框 |
| `--por-color-border-white` | `var(--por-base-color-gray-0)` | 白色边框 |

## 5. 功能色 (Functional Colors)

| 变量名 | 默认值 / 映射 | 说明 |
| :--- | :--- | :--- |
| `--por-color-function-error` | `var(--por-base-color-red-50)` | 错误状态色 |
| `--por-color-function-warning` | `var(--por-base-color-orange-50)` | 警告状态色 |
| `--por-color-function-success` | `var(--por-base-color-kelly-50)` | 成功状态色 |
| `--por-color-function-info` | `var(--por-base-color-blue-50)` | 信息提示色 |

## 6. 官网应用色一览

按应用场景整理的常见色值（来自官网 color 规范）：

| 应用场景 | 色值 | 语义变量 |
| --- | --- | --- |
| 页面背景 | `#191919` | `--por-color-background-primary` |
| 禁用背景 | `rgba(0,0,0,0.05)` | `--por-color-background-disabled` |
| 悬浮背景 | `#fafafa` | `--por-color-background-gray-1` |
| 白背景 | `#ffffff` | `--por-color-background-white` |
| 文本重要色 | `#191919` | `--por-color-text-primary` |
| 文本次要色 | `#595959` | `--por-color-text-secondary` |
| 文本按钮 | `#1476ef` | `--por-color-text-button` |
| 文本弱化色 | `#808080` | `--por-color-text-weak` |
| 文本弱化色（浅色/禁用） | `#c2c2c2` | `--por-color-text-disabled` |
| 错误色 | `#f23030` | `--por-color-function-error` |
| 告警色 | `#ff8800` | `--por-color-function-warning` |
| 成功色 | `#5cb300` | `--por-color-function-success` |
| 提示色 | `#1476ff` | `--por-color-function-info` |
