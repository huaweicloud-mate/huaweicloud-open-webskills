# 阴影与圆角

来源：`cnpm-baseui` (3.0.17) Tiny PortalUI design-tokens + variable（样式工具类）

## 1. 圆角体系

| Token | 值 | 说明 |
|-------|-----|------|
| `--por-radius-xs` | `0px` | 无圆角 |
| `--por-radius-s` | `2px` | 小圆角（标签等） |
| `--por-radius-m` | `4px` | 中圆角（按钮等） |
| `--por-radius-l` | `6px` | 大圆角（通用组件） |
| `--por-radius-l-1` | `8px` | 大圆角 1 |
| `--por-radius-l-2` | `12px` | 大圆角 2 |
| `--por-radius-xl` | `16px` | 超大圆角（卡片） |
| `--por-radius-xl-1` | `24px` | 超大圆角 1 |
| `--por-radius-xxl` | `32px` | 超大圆角 2 |
| `--por-radius-xxxl` | `48px` | 超大圆角 3 |
| `--por-radius-xxxxl` | `100px` | 极大圆角（胶囊） |
| `--por-radius-circle` | `var(--por-base-size-percent-middle)` | 圆形（50%） |

### 圆角工具类（variable 规范）

| 类型 | 值 | class 名 | 适用场景 |
| --- | --- | --- | --- |
| XS | 0 | `radius_border_XS` | 直角 |
| S | 2px | `radius_border_S` | 小标签 |
| M | 4px | `radius_border_M` | 中标签 |
| L | 6px | `radius_border_L` | 输入框、下拉框等通用组件 |
| XL | 16px | `radius_border_XL` | 门户侧卡片 |
| XXXL | 50% | `radius_border_XXXL` | 圆形 |

## 2. 阴影体系

| Token | 值 | 说明 |
|-------|-----|------|
| `--por-shadow-card-normal` | `none` | 卡片正常阴影 |
| `--por-shadow-card-active` | `0 2px 12px rgba(0,0,0,.08)` | 卡片激活阴影 |
| `--por-shadow-tips` | `var(--por-base-box-shadow-normal)` | 提示框阴影 |
| `--por-shadow-modal` | `var(--por-base-box-shadow-dark)` | 弹窗阴影 |

### 基础阴影工具类（variable 规范）

| 类型 | class 名 |
| --- | --- |
| 卡片正常 | `shadow_card_normal` |
| 卡片悬浮 | `shadow_card_hover` |
| 提示 | `shadow_tips` |
| 下拉 | `shadow_dropdown` |
| 弹窗 | `shadow_modal` |

## 3. 蒙层

- 蒙版：20% `#000000`，主要用于弹窗背景。
- 使用 `.por-modal` 实现。

## 4. Z-Index 层级

| Token | 值 | 说明 |
|-------|-----|------|
| `--por-base-zindex-content` | `1` | 内容层 |
| `--por-base-zindex-dropdown` | `1000` | 下拉层 |
| `--por-base-zindex-mask` | `1040` | 蒙层 |
| `--por-base-zindex-modal` | `1050` | 弹窗层 |
| `--por-base-zindex-tooltip` | `1060` | 工具提示层 |

### 层级数值定义

| 类型 | z-index 值 | token |
| --- | --- | --- |
| 正文 content | < 1000 | `--por-base-zindex-content` |
| 下拉 dropdown | 1000~1019 | `--por-base-zindex-dropdown` |
| 粘性浮动 sticky | 1020~1029 | `--por-base-zindex-sticky` |
| 浮动控件 fixed | 1030~1039 | `--por-base-zindex-content` |
| 弹窗遮罩 mask | 1040~1049 | `--por-base-zindex-mask` |
| 弹窗 modal | 1050~1059 | `--por-base-zindex-modal` |
| 提示 tooltip | 1060~1069 | `--por-base-zindex-tooltip` |
