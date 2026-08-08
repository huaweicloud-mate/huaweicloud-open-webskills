# 栅格系统

来源：HTML 分析 + CSS 分析

## 容器系统

HWC使用 `por-container` 作为主容器，`por-section` 作为区块容器：

```html
<div class="por-section">
  <div class="por-container">
    <!-- 内容 -->
  </div>
</div>
```

### 容器宽度

```css
.por-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1439px) {
  .por-container { max-width: 1200px; }
}

@media (max-width: 1279px) {
  .por-container { padding-left: 3%; padding-right: 3%; }
}

@media (max-width: 767px) {
  .por-container { padding-left: 15px; padding-right: 15px; }
}
```

## 栅格列

使用 24 列系统，类名格式 `por-col-{n}`：

| 类名 | 宽度占比 | 用途 |
|------|---------|------|
| `por-col-24` | 100% | 整行 |
| `por-col-12` | 50% | 两列 |
| `por-col-8` | 33.33% | 三列 |
| `por-col-6` | 25% | 四列 |
| `por-col-4` | 16.67% | 六列 |

### 使用示例

```html
<!-- 单列 -->
<div class="por-row">
  <div class="por-col-24">
    <div class="common-card">卡片内容</div>
  </div>
</div>

<!-- 两列 -->
<div class="por-row">
  <div class="por-col-12">左列</div>
  <div class="por-col-12">右列</div>
</div>

<!-- 三列卡片 -->
<div class="por-row">
  <div class="por-col-8">卡片1</div>
  <div class="por-col-8">卡片2</div>
  <div class="por-col-8">卡片3</div>
</div>

<!-- 四列产品网格 -->
<div class="por-row">
  <div class="por-col-6">产品1</div>
  <div class="por-col-6">产品2</div>
  <div class="por-col-6">产品3</div>
  <div class="por-col-6">产品4</div>
</div>
```

## Section 区块

Section 是页面的水平区块，用于控制背景色和上下间距：

```css
/* Section 背景 */
--por-section-background-color: #FFFFFF;      /* 白色 */
--por-section-background-gray: #F5F5F5;       /* 灰色 */
--por-section-background-dark: #191919;        /* 深色 */

/* Section 间距 */
--por-section-padding-top-pc-l: 76px;
--por-section-padding-bottom-pc-l: 76px;
--por-section-head-padding-bottom-pc-l: 40px;
```

### Section 使用方式

```html
<!-- 白色背景 Section -->
<div class="por-section">
  <div class="por-container">...</div>
</div>

<!-- 灰色背景 Section -->
<div class="por-section" data-bg="grey">
  <div class="por-container">...</div>
</div>

<!-- 深色背景 Section -->
<div class="por-section" style="background: #191919;">
  <div class="por-container">...</div>
</div>
```

## 响应式适配

### PC 端（≥1025px）
- 容器固定宽度（1280px / 1200px）
- 多列布局
- 完整导航

### Pad 端（769px ~ 1024px）
- 容器流式（3% 左右 padding）
- 部分简化布局
- 简化导航

### Mobile 端（≤768px）
- 容器流式（15px 左右 padding）
- 单列布局为主
- 隐藏部分元素
- 字号缩小

```css
@media (max-width: 768px) {
  /* 容器 */
  .por-container { padding-left: 15px; padding-right: 15px; }

  /* Banner */
  .banner { height: 250px; }
  .banner-title-main { font-size: 24px; line-height: 30px; }
  .banner-title-side { font-size: 12px; line-height: 18px; }

  /* 按钮 */
  .developer-btns.btn-large {
    height: 28px; font-size: 12px; line-height: 26px; padding: 0 20px;
  }

  /* 弹窗 */
  .modal-detail-block { width: calc(100% - 30px); padding: 24px; }

  /* 隐藏 PC 端元素 */
  .por-carousel-pc { display: none; }
  .por-carousel-pad { display: none; }
}
```
