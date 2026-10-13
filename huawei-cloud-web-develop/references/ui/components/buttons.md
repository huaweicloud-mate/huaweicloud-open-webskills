# 按钮组件

来源：Tiny PortalUI button 规范

快速创建不同尺寸不同样式的按钮。

## 基础按钮

通过向元素添加 `.por-btn` 创建一个按钮，再组合类型类。

```html
<!-- 浅色背景 -->
<div style="background-color: #dfe1e6;">
    <a class="por-btn por-btn-primary">primary</a>
    <a class="por-btn por-btn-secondary">secondary</a>
    <a class="por-btn por-btn-dark">dark</a>
    <a class="por-btn por-btn-danger">danger</a>
</div>

<!-- 深色背景 -->
<div style="background-color: #252b3a;margin-top: 20px;padding: 10px;">
    <a class="por-btn por-btn-primary-light">primary-light</a>
    <a class="por-btn por-btn-light">light</a>
</div>
```

## 尺寸

```html
<a class="por-btn por-btn-primary por-btn-small">small</a>
<a class="por-btn por-btn-primary">default</a>
<a class="por-btn por-btn-primary por-btn-middle">middle</a>
<a class="por-btn por-btn-primary por-btn-large">large</a>
```

## 响应式尺寸

使用 `.por-btn-*-*` 创建响应式尺寸按钮：
- 第一个 `*` 可选值：`lg`、`md`、`sm`、`xs`（对应栅格多种屏幕尺寸）
- 第二个 `*` 可选值：`small`、`middle`、`default`、`large`（按钮尺寸）

```html
<a class="por-btn por-btn-primary por-btn-large por-btn-md-middle por-btn-xs-small">响应式尺寸按钮</a>
```

## 禁用按钮

通过添加属性 `disabled` 创建禁用按钮，PortalUI 会根据按钮类型自动匹配禁用样式。

```html
<div style="padding: 20px;">
  <a class="por-btn por-btn-primary" disabled>disabled primary</a>
  <a class="por-btn por-btn-secondary" disabled>disabled secondary</a>
  <a class="por-btn por-btn-dark" disabled>disabled dark</a>
</div>
<div style="background-color: #252b3a;padding: 20px;">
  <a class="por-btn por-btn-light" disabled>disabled light</a>
</div>
```

## 图标按钮

```html
<div style="padding: 20px;">
  <a class="por-btn por-icon-btn-primary">
    <span class="por-btn-icon u-icon u-icon-star"></span>
    por-icon-btn-primary
  </a>
</div>
<div style="background-color: #252b3a;padding: 20px;">
  <a class="por-btn por-icon-btn-light">
    <span class="por-btn-icon u-icon u-icon-star"></span>por-icon-btn-light
  </a>
</div>
```

## 块级按钮

`.por-btn-block` 常用于移动端或需要两端对齐的情况。

```html
<div><a class="por-btn por-btn-primary por-btn-block">登录</a></div>
<div style="margin-top: 16px;"><a class="por-btn por-btn-primary por-btn-block">注册</a></div>
```

## 圆角（默认胶囊）

`.por-btn` **默认圆角为胶囊形（pill）**：圆角半径 = 按钮高度，两端呈半圆。各尺寸半径由 `--por-button-size-radius-*` 控制，不使用 `--por-radius-*`：

| 尺寸 | class | 高度 | 圆角 Token | 值 |
| --- | --- | --- | --- | --- |
| small | `por-btn-small` | `24px` | `--por-button-size-radius-small` | `24px`（`--por-base-size-24`） |
| default | `por-btn` | `32px` | `--por-button-size-radius-default` | `32px`（`--por-base-size-32`） |
| middle | `por-btn-middle` | `40px` | `--por-button-size-radius-medium` | `40px`（`--por-base-size-40`） |
| large | `por-btn-large` | `48px` | `--por-button-size-radius-large` | `48px`（`--por-base-size-48`） |

响应式尺寸类（`por-btn-<lg|md|sm|xs>-<small|middle|default|large>`）按上表映射到对应尺寸的圆角。

> **版本差异**：`cnpm-baseui@3.0.17` 起按钮为胶囊圆角（半径 = 高度）；旧版 `2.8.11` 的 `.por-btn` 为 `2px` 直角。若页面同时加载旧版 baseui（如华为云开发者公共页头引入的 `https://portal.hc-cdn.com/cnpm-baseui/2.8.11/index.css`），旧版按钮仍为 `2px`，需按来源区分，勿混用。
>
> **需要非胶囊按钮时**：显式覆盖 `border-radius`，例如 `border-radius: var(--por-radius-s)`（`2px` 直角）或 `var(--por-radius-m)`（`4px`）。

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-btn` | 每个按钮必须的 class |
| `por-btn-primary` | 重要按钮 |
| `por-btn-secondary` | 次要按钮 |
| `por-btn-danger` | 危险按钮 |
| `por-btn-dark` | 普通黑色边框按钮 |
| `por-btn-light` | 暗色系风格按钮（用于深色背景中） |
| `por-btn-primary-light` | 浅色背景风格的主按钮 |
| `por-icon-btn-primary` | 带有图标的主按钮样式 |
| `por-icon-btn-light` | 带有图标的暗色系风格按钮样式 |
| `por-btn-small` | 小尺寸按钮 |
| `por-btn-middle` | 中等尺寸按钮 |
| `por-btn-large` | 大尺寸按钮 |
| `por-btn-block` | 块级按钮 |
| `disabled` | 按钮禁用状态属性 |
