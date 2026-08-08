# 阴影与圆角

来源：`cnpm-baseui` theme-token.css

## 圆角体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--por-radius-xs` | 0px | 无圆角 |
| `--por-radius-s` | 2px | **按钮、输入框** |
| `--por-radius-m` | 4px | **卡片、标签** |
| `--por-radius-l` | 6px | 大卡片 |
| `--por-radius-l-1` | 8px | Modal |
| `--por-radius-l-2` | 12px | — |
| `--por-radius-xl` | 16px | — |
| `--por-radius-xl-1` | 24px | — |
| `--por-radius-xxl` | 32px | — |
| `--por-radius-xxxl` | 48px | — |
| `--por-radius-xxxxl` | 100px | 胶囊形 |
| `--por-radius-circle` | 50% | 圆形 |

### 实际使用

```css
/* 按钮 */
border-radius: 2px;    /* radius-s */

/* 卡片 */
border-radius: 4px;    /* radius-m */

/* Modal */
border-radius: 8px;    /* radius-l-1 */

/* 消息徽标 */
border-radius: 10px;   /* 接近 circle */

/* 标签 */
border-radius: 2px;
```

## 阴影体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--por-base-box-shadow-none` | none | 默认卡片（无阴影） |
| `--por-base-box-shadow-light` | `0 1px 4px rgba(0,0,0,0.08)` | 输入框 |
| `--por-base-box-shadow-normal` | `0 2px 12px rgba(0,0,0,0.08)` | 下拉、提示 |
| `--por-base-box-shadow-dark` | `0 4px 22px rgba(0,0,0,0.08)` | Modal |

### 语义化阴影

| Token | 用途 |
|-------|------|
| `--por-shadow-card-normal` | 卡片默认（无阴影） |
| `--por-shadow-card-active` | 卡片 hover（normal 阴影） |
| `--por-shadow-tips` | 提示浮层 |
| `--por-shadow-dropdown` | 下拉菜单 |
| `--por-shadow-modal` | 弹窗 |
| `--por-shadow-input` | 输入框 |

### 开发者站特有阴影

```css
/* 按钮 hover */
box-shadow: 0 8px 6px -4px rgba(246, 111, 106, 0.5);  /* 红色按钮 */

/* 弹窗 */
box-shadow: 0 0 6px 0 rgba(174, 186, 208, 0.27);

/* 二维码浮层 */
box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.10);

/* Modal */
box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
```

## Z-Index 层级

```css
--por-base-zindex-negative: -1;
--por-base-zindex-content: 1;
--por-base-zindex-dropdown: 1000;
--por-base-zindex-sticky: 1020;
--por-base-zindex-fixed: 1030;
--por-base-zindex-mask: 1040;
--por-base-zindex-modal: 1050;
--por-base-zindex-tooltip: 1060;
```
