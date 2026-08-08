# 页面结构规范

来源：HTML 结构分析

## 标准页面骨架

### 开发者站页面模板

```html
<!doctype html>
<html lang="zh-CN" site="china">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
  <title>页面标题_HWC</title>

  <!-- 设计 Token（必须） -->
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css">

  <!-- 主站全局样式 -->
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-global-resources/1.2.9/css/global.min.css">

  <!-- 页头页脚样式 -->
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cpage-pep-header-and-footer-china/2.0.50/index.css">

  <!-- 开发者站特有样式 -->
  <link rel="stylesheet" href="https://res-static.hc-cdn.cn/aem/content/dam/cloudbu-develop/archive/china/zh-cn/developer/developer-page/css/global.css">
  <link rel="stylesheet" href="https://res-static.hc-cdn.cn/aem/content/dam/cloudbu-develop/archive/china/zh-cn/developer/developer-page/css/developer-common.css">

  <link rel="icon" href="https://www.huaweicloud.com/favicon.ico">
</head>
<body>

  <!-- 页头 -->
  <hd-header></hd-header>

  <!-- 主内容区 -->
  <div id="content" data-site="china">

    <!-- Banner 区域 -->
    <section class="hero-banner">
      <!-- 轮播组件 -->
    </section>

    <!-- 内容区块 1（白色背景） -->
    <div class="por-section">
      <div class="por-container">
        <!-- 区块标题 -->
        <div class="section-header">
          <h2 class="section-title">区块标题</h2>
          <p class="section-subtitle">区块副标题</p>
        </div>
        <!-- 区块内容 -->
        <div class="section-body">
          <!-- 内容 -->
        </div>
      </div>
    </div>

    <!-- 内容区块 2（灰色背景） -->
    <div class="por-section" style="background: #F5F5F5;">
      <div class="por-container">
        <!-- ... -->
      </div>
    </div>

  </div>

  <!-- 页脚 -->
  <div id="footer">
    <!-- 页脚组件 -->
  </div>

</body>
</html>
```

## 主站页面模板

```html
<!doctype html>
<html lang="zh-CN" site="china">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题_HWC</title>

  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.6/theme-token.css">
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-global-resources/1.2.9/css/global.min.css">
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cpage-pep-header-and-footer-china/2.0.50/index.css">

  <link rel="icon" href="https://www.huaweicloud.com/favicon.ico">
</head>
<body>

  <!-- 页头 -->
  <div id="header">...</div>

  <!-- 主内容 -->
  <div id="content">

    <!-- Hero Banner -->
    <div class="por-section">
      <!-- 产品展示大卡片 -->
    </div>

    <!-- 产品列表 -->
    <div class="por-section" data-bg="grey">
      <div class="por-container">
        <div class="por-row">
          <div class="por-col-24 common-card">
            <!-- 产品卡片 -->
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- 页脚 -->
  <div id="footer">...</div>

</body>
</html>
```

## 页面区块命名规范

从实际 HTML 提取的模块命名：

| 模块 | data-mod-name | 说明 |
|------|--------------|------|
| Banner 轮播 | `pep-hwc-dtt-head-carousels` | 首页顶部轮播 |
| 最新动态 | `pep-latest-dynamic-v2` | 最新消息卡片 |
| 市场 | `pep-hwc-new-home-marketplace` | 市场/商城入口 |
| 通用卡片 | `pep-common-card-v2` | 通用内容卡片 |
| 分类导航 | `pep-mkp-home-category` | 产品分类 |
| 客户案例 | `pep-product-customer-v2` | 客户案例展示 |
| 大赛 | `pep-hwc-new-home-competition` | 比赛活动 |
| 活动推广 | `pep-activity-promotion-v2` | 活动推广位 |

## 常见页面类型

### 首页（Homepage）
1. Banner 轮播
2. 最新动态
3. 产品/服务展示
4. 活动/比赛
5. 客户案例
6. 页脚

### 列表页（Listing）
1. 面包屑导航
2. 筛选/分类
3. 内容卡片网格
4. 分页

### 详情页（Detail）
1. 面包屑导航
2. 标题区
3. 正文内容
4. 相关推荐

### 活动页（Campaign）
1. 大 Banner
2. 活动介绍
3. 奖品/规则
4. 报名/参与 CTA
