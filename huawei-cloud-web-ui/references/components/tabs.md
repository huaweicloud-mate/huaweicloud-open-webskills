# 标签页组件

来源：cnpm-baseui theme-token.css

## Tab Token

```css
/* 字号与行高 */
--por-tab-font-size: 18px;
--por-tab-line-height: 28px;
--por-tab-arrow-font-size: 22px;

/* 文字颜色 */
--por-tab-text-color: #595959;            /* 默认（次要文字色） */
--por-tab-text-color-hover: #191919;      /* hover（主要文字色） */
--por-tab-text-color-active: #191919;     /* 激活（主要文字色） */
--por-tab-text-color-disabled: #C2C2C2;   /* 禁用 */

/* 字重 */
--por-tab-font-weight: normal;            /* 默认 */
--por-tab-font-weight-hover: bold;        /* hover */
--por-tab-font-weight-active: bold;       /* 激活 */

/* 背景 */
--por-tab-background-color: #FFFFFF;      /* 白色背景 */
--por-tab-background-color-gray: #F5F5F5; /* 灰色背景 */
--por-tab-background-color-transparent: transparent;

/* 浅色模式（深色背景上） */
--por-tab-text-color-light: rgba(255,255,255,0.8);
--por-tab-text-color-light-hover: #FFFFFF;

/* 提示气泡 */
--por-tab-tips-font-size: 12px;
--por-tab-tips-text-color: #191919;
--por-tab-tips-background-color: #FFFFFF;
--por-tab-tips-radius: 4px;
--por-tab-tips-shadow: 0 2px 12px rgba(0,0,0,0.08);
```

## Tab 使用模式

### 普通标签页

```html
<div class="por-tabs">
  <div class="por-tabs-nav">
    <div class="por-tabs-tab por-tabs-tab-active">全部</div>
    <div class="por-tabs-tab">推荐</div>
    <div class="por-tabs-tab">最新</div>
  </div>
  <div class="por-tabs-content">
    <div class="por-tabs-pane por-tabs-pane-active">内容1</div>
    <div class="por-tabs-pane">内容2</div>
    <div class="por-tabs-pane">内容3</div>
  </div>
</div>
```

### Tab 状态说明

| 状态 | 文字色 | 字重 | 装饰 |
|------|--------|------|------|
| 默认 | `#595959` | normal | 无 |
| Hover | `#191919` | bold | 无 |
| 激活 | `#191919` | bold | 底部指示线 |
| 禁用 | `#C2C2C2` | normal | 无 |
