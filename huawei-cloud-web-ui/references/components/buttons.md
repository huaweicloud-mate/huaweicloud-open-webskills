# 按钮组件

来源：`cnpm-baseui` theme-token.css + developer-common.css

## 尺寸规格

### Token 体系（主站 por-btn）

| 属性 | large | medium | default | small |
|------|-------|--------|---------|-------|
| 高度 | 48px | 40px | 32px | 24px |
| 字号 | 14px | 14px | 14px | 12px |
| 行高 | 22px | 22px | 22px | 18px |
| 横向 padding | 48px | 32px | 24px | 16px |
| 圆角 | 48px | 40px | 32px | 24px |

> 注意：por-btn 的圆角 Token 值很大（接近胶囊形），但实际官网主要用的是 `2px` 圆角。

### 开发者站按钮（developer-btns）

```css
.developer-btns {
  height: 32px;
  font-size: 12px;
  line-height: 30px;
  padding: 0 24px;
  border-radius: 2px;
  transition: 0.2s;
}

.developer-btns.btn-small {
  height: 28px; font-size: 12px; line-height: 26px; padding: 0 20px;
}

.developer-btns.btn-large {
  height: 40px; font-size: 14px; line-height: 38px; padding: 0 32px;
}
```

## 按钮类型

### 1. 主要按钮（红色 CTA）

```css
/* 开发者站 */
.btn-red, .red-btn {
  background-color: #C7000B;
  border-color: #C7000B;
  color: #ffffff;
}
.btn-red:hover {
  background-color: #d64a52;
  border-color: #d64a52;
  color: #ffffff;
  box-shadow: 0 8px 6px -4px rgba(246, 111, 106, 0.5);
}
```

### 2. 次要按钮（白色描边红字）

```css
.btn-white, .white-btn {
  background-color: transparent;
  border-color: #C7000B;
  color: #C7000B;
}
.btn-white:hover {
  background-color: #C7000B;
  border-color: #C7000B;
  color: #ffffff;
}
```

### 3. 灰色按钮

```css
.btn-gray, .gray-btn {
  border-color: #8a8e99;
  color: #575d6c;
}
.btn-gray:hover {
  background-color: #C7000B;
  border-color: #C7000B;
  color: #ffffff;
}
```

### 4. 浅色按钮（深色背景上使用）

```css
.btn-light, .light-btn {
  border-color: #ffffff;
  color: #ffffff;
}
.btn-light:hover {
  background-color: #C7000B;
  border-color: #C7000B;
  color: #ffffff;
}
```

### 5. 主站按钮（por-btn 体系）

```html
<!-- 主按钮（深色） -->
<a class="por-btn por-btn-default por-btn-md-small por-btn-secondary"
   href="#" target="_blank">了解详情</a>

<!-- 按钮组 -->
<object class="action-buttons grey">
  <a class="por-btn por-btn-default por-btn-md-small por-btn-secondary">了解详情</a>
</object>

<object class="btn-group">
  <a class="por-btn-md-small por-btn por-btn-secondary">了解详情</a>
</object>
```

## 禁用状态

```css
.btn-red[disabled], .btn-red.developer-btn-disabled,
.btn-white[disabled], .btn-white.developer-btn-disabled {
  background-color: #f5f5f6;
  border-color: #dfe1e6;
  color: #dfe1e6;
  box-shadow: none;
}
```

## HTML 模板

```html
<!-- 开发者站红色 CTA -->
<button class="developer-btns btn-red btn-large">立即体验</button>

<!-- 开发者站次要按钮 -->
<button class="developer-btns btn-white btn-large">了解更多</button>

<!-- 主站按钮 -->
<a class="por-btn por-btn-default por-btn-md-small por-btn-secondary"
   href="#" target="_blank" rel="noopener noreferrer">了解详情</a>

<!-- Banner 中的按钮 -->
<button class="btnLink" data-link="https://...">立即体验</button>
```
