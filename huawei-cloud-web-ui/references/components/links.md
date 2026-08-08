# 链接组件

来源：cnpm-baseui theme-token.css + HTML 分析

## 链接类型

### 1. 默认文字链接

```css
--por-link-font-color-primary: #191919;          /* 默认色 */
--por-link-font-color-primary-hover: #191919;     /* hover 不变色 */
--por-link-text-decoration: none;                  /* 无下划线 */
--por-link-text-decoration-hover: underline;       /* hover 下划线 */
--por-link-font-size: 14px;
--por-link-font-weight: normal;                    /* 默认 normal */
--por-link-font-weight-hover: bold;                /* hover 加粗 */
```

### 2. "了解更多"链接

```html
<a href="#" class="por-link por-link-more" target="_blank">
  了解更多
  <span class="por-link-icon-right por-icon por-icon-right"></span>
</a>
```

### 3. 蓝色链接

```css
--por-link-font-color-blue: #1476FF;  /* 蓝色 */
```

### 4. 开发者站链接

```css
/* 开发者站链接色（偏蓝紫） */
color: #526ECC;
color: #526ECC;  /* hover: underline */

/* 文字 hover 变红 */
color: #c7000b;
```

## 链接 Token 汇总

| Token | 值 | 用途 |
|-------|-----|------|
| `--por-link-font-color-primary` | `#191919` | 主色链接 |
| `--por-link-font-color-secondary` | `#595959` | 次色链接 |
| `--por-link-font-color-light` | `#FFFFFF` | 浅色链接（深色背景） |
| `--por-link-font-color-blue` | `#1476FF` | 蓝色链接 |
| `--por-link-font-color-disabled` | `#C2C2C2` | 禁用链接 |
| `--por-link-icon-size` | `16px` | 链接图标大小 |
