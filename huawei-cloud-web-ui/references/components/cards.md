# 卡片组件

来源：HTML 结构分析 + CSS 分析

## 主站卡片（产品卡片）

主站使用渐变背景卡片展示产品，是最常见的卡片类型：

### 结构

```html
<a href="#" target="_blank" class="card-item-link">
  <div class="card-item-container gradient-card grey hasBg">
    <!-- 视频背景（可选） -->
    <div class="card-video-container lazyload isPC" data-src="bg.jpg">
      <video class="card-bg-video" data-src="video.mp4" loop muted></video>
    </div>

    <!-- 内容 -->
    <div class="item-content">
      <div class="card-main">
        <div class="card-title grey">产品名称</div>
        <div class="card-subtitle richtext grey">
          <p>产品描述文字</p>
        </div>
        <object class="action-buttons grey">
          <a class="por-btn por-btn-default por-btn-md-small por-btn-secondary"
             href="#" target="_blank">了解详情</a>
        </object>
      </div>
    </div>
  </div>
</a>
```

### 产品列表卡片

```html
<a href="#" target="_blank" class="por-card gradient-card product-card-wraper lazyload"
   data-bg="transBlack" data-src="bg.jpg">
  <div class="card-content">
    <div class="card-icon lazyload" data-src="icon.png"></div>
    <div class="card-info">
      <div class="por-text-title-t8 card-title"><span>弹性云服务器 ECS</span></div>
      <div class="por-text-body-t1 card-desc">可随时自动获取、弹性伸缩的云服务器</div>
    </div>
  </div>
  <object class="btn-group">
    <a class="por-btn-md-small por-btn por-btn-secondary" href="#" target="_blank">了解详情</a>
  </object>
</a>
```

## 开发者站卡片

### 通用内容卡片（por-card）

```html
<object class="por-card" data-bg="white">
  <div class="dynamic-main">
    <div class="dynamic-icon" style="background-image: url(icon.svg)"></div>
    <div class="dynamic-title">最新动态</div>
    <div class="dynamic-line"></div>
    <div class="por-text-body-t2">
      <p>在线养虾模式开启，用HWC码道快速安装</p>
    </div>
  </div>
  <a href="#" class="por-link por-link-more" target="_blank">
    了解更多<span class="por-link-icon-right por-icon por-icon-right"></span>
  </a>
</object>
```

### 比赛活动卡片

```html
<div class="information-main">
  <div class="title">HWC Developer Challenge</div>
  <div class="subTitle">
    <object><p>描述文字</p></object>
  </div>
  <div class="btns">
    <a href="#" class="btn btn-click">了解详情</a>
  </div>
</div>
```

## 卡片样式特征

| 特征 | 值 |
|------|-----|
| 背景色 | 白色 `#FFFFFF` 或透明 |
| 圆角 | 4px（`--por-radius-m`） |
| 默认阴影 | 无（`--por-shadow-card-normal: none`） |
| Hover 阴影 | `0 2px 12px rgba(0,0,0,0.08)` |
| 内边距 | 24px ~ 32px |
| 边框 | 默认无边框 |
| Hover 标题色 | `#C7000B`（品牌红） |

## 卡片网格布局

```html
<!-- 3 列卡片 -->
<div class="por-section">
  <div class="por-container">
    <div class="por-row">
      <div class="por-col-8">卡片1</div>
      <div class="por-col-8">卡片2</div>
      <div class="por-col-8">卡片3</div>
    </div>
  </div>
</div>

<!-- 4 列卡片 -->
<div class="por-row">
  <div class="por-col-6">卡片1</div>
  <div class="por-col-6">卡片2</div>
  <div class="por-col-6">卡片3</div>
  <div class="por-col-6">卡片4</div>
</div>
```

## 卡片数据属性

```html
<!-- 灰色背景区块 -->
<div class="por-section" data-bg="grey">

<!-- 白色卡片 -->
<object class="por-card" data-bg="white">

<!-- 主题模式 -->
<div data-theme="light">
```
