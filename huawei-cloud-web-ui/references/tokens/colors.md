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
| `--por-base-color-red-huawei` | `#c7000b` | 华为红 |
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
| 文本按钮 | `#1476ff` | `--por-color-text-button` |
| 文本弱化色 | `#808080` | `--por-color-text-weak` |
| 文本弱化色（浅色/禁用） | `#c2c2c2` | `--por-color-text-disabled` |
| 错误色 | `#f23030` | `--por-color-function-error` |
| 告警色 | `#ff8800` | `--por-color-function-warning` |
| 成功色 | `#5cb300` | `--por-color-function-success` |
| 提示色 | `#1476ff` | `--por-color-function-info` |

## 7. 插画色板

官网站内插画有独立配色体系（与 UI 色板分离），来自设计稿「插画规范色」系列：

| Token | 值 | 说明 |
| --- | --- | --- |
| `--hc-illus-primary-1` | `#1476FF` | 插画主色 1（蓝） |
| `--hc-illus-primary-2` | `#6CCD06` | 插画主色 2（绿） |
| `--hc-illus-primary-3` | `#FFAD04` | 插画主色 3（橙黄） |
| `--hc-illus-accent-1` | `#191919` | 点缀色 1（深墨） |
| `--hc-illus-accent-3` | `#1D2B43` | 点缀色 3（深蓝灰） |
| `--hc-illus-accent-blue-gray` | `#C4E1FF` | 点缀蓝灰 |
| `--hc-illus-accent-green-gray` | `#DAF2BB` | 点缀绿灰 |
| `--hc-illus-accent-yellow-gray` | `#FAE396` | 点缀黄灰 |
| `--hc-illus-gray-2` | `#F0F0F0` | 填充灰 2 |
| `--hc-illus-gray-3` | `#E6E6E6` | 填充灰 3 |
| `--hc-illus-line` | `#808080` | 线稿颜色 |
| `--hc-illus-line-white` | `#FFFFFF` | 线稿反白 |

另有 `渐变色 1/2/3` 三组线性渐变，需从设计稿取色标，不要用纯色替代。

> 插画必须使用本组色板，**不要**直接套用 UI 语义色——插画色饱和度更高，混用会破坏视觉层级。

## 8. 表格与内容底色

| 用途 | 值 | 说明 |
| --- | --- | --- |
| 表格斑马纹 / 表头底 | `rgba(17,26,44,0.03)` | 设计稿 token `背景色/表格背景色` |
| 楼层灰底 | `#F5F5F5` | 套餐卡楼层、通栏广告底 |
| 卡片灰底 | `#FAFAFA` | 通用卡片（与楼层灰底不同，注意区分） |
| 分隔线 | `#DFDFDF` | 表头与数据行之间 |
| 竖线框 | `#DFDFDF` | 表格列分隔（`竖线框=有` 变体） |

## 9. 语义色补充（错误 / 告警 / 交互态）

现有功能色只有 error / warning / success / info 四档，缺「致命告警」与各交互态：

| Token | 值 | 说明 |
| --- | --- | --- |
| `--hc-color-critical` | `#C7000B` | **致命告警**（欠费、停服、数据风险），比普通 error 更重 |
| `--hc-color-error` | `#E02128` | 普通错误（表单校验、操作失败） |
| `--hc-color-error-hover` | `#E7434A` | 错误态悬浮 |
| `--hc-color-error-disabled` | `#FABDC1` | 错误态禁用 |
| `--hc-color-alert` | `#F4840C` | 告警橙（配额不足、即将到期） |
| `--hc-color-hover-bg` | `rgba(25,25,25,0.05)` | 通用悬浮底色 |
| `--hc-color-border` | `#C9C9C9` | 通用描边 |
| `--hc-color-border-focus` | `#0067D1` | 聚焦描边 |
| `--hc-color-price-promo` | `#C7000B` | **促销价红**（`价格颜色=红色` 变体），非促销价用 `#191919` |

> 区分**致命告警 `#C7000B`** 与 **普通错误 `#E02128`**：前者用于「服务已停 / 欠费」这类阻断性状态，后者用于「输入有误」这类可恢复状态。两者不可互换。
