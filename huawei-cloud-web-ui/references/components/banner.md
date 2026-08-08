# Banner 轮播

来源：HTML 结构分析

## 开发者站 Banner 轮播

### 结构（三端自适应）

```html
<div class="pep-hwc-dtt-head-carousels" data-time="5" data-length="2">

  <!-- PC 轮播 -->
  <div class="por-carousel por-carousel-pc por-carousel-banner">
    <div class="por-carousel-wrapper">

      <div class="por-carousel-slide" data-carousel-slide-index="0">
        <a class="banner-link" href="#" target="_blank" rel="noopener noreferrer">
          <div class="banner" style="background-image: url(banner-pc-1920x450.jpg);">
            <div class="banner-title por-container">
              <div class="banner-info">
                <div class="banner-title-main">主标题文字</div>
                <div class="banner-title-side">副标题文字</div>
              </div>
              <div class="btn">
                <button class="btnLink" data-link="#">按钮文字</button>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- 更多 slides... -->

    </div>
  </div>

  <!-- Pad 轮播 -->
  <div class="por-carousel por-carousel-pad por-carousel-banner">
    <div class="por-carousel-wrapper">
      <div class="por-carousel-slide">
        <a class="banner-link" href="#" target="_blank">
          <div class="banner" style="background-image: url(banner-pad-768x250.jpg);">
            <!-- 内容同 PC -->
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Mobile 轮播 -->
  <div class="por-carousel por-carousel-m por-carousel-banner">
    <div class="por-carousel-wrapper">
      <div class="por-carousel-slide">
        <a class="banner-link" href="#">
          <div class="banner" style="background-image: url(banner-mb-406x250.jpg);">
            <!-- 内容同 PC -->
          </div>
        </a>
      </div>
    </div>
  </div>

</div>
```

## Banner 图片尺寸

| 端 | 尺寸 | 示例文件名 |
|----|------|-----------|
| PC | 1920 × 450 | `banner-pc-1920x450.jpg` |
| Pad | 768 × 250 | `banner-pad-768x250.jpg` |
| Mobile | 406 × 250 | `banner-mb-406x250.jpg` |

## Banner 样式

```css
/* PC Banner */
.banner {
  background-size: cover;
  background-position: center;
  height: 450px;       /* PC 端 */
}

.banner-title.por-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0;
}

.banner-title-main {
  font-size: 40px;
  color: #252b3a;
  line-height: 50px;
  font-weight: 700;
  margin-bottom: 8px;
}

.banner-title-side {
  font-size: 14px;
  color: #575D6C;
  line-height: 22px;
}

/* CTA 按钮 */
.btnLink {
  /* 继承 developer-btns 样式 */
}

/* Pad */
@media (max-width: 1439px) and (min-width: 769px) {
  .banner { height: 250px; }
}

/* Mobile */
@media (max-width: 768px) {
  .banner { height: 250px; }
  .banner-title-main {
    font-size: 24px;
    line-height: 30px;
    text-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  }
  .banner-title-side {
    font-size: 12px;
    line-height: 18px;
  }
}
```

## 主站 Banner

主站使用不同的 Banner 组件，特色是带视频背景：

```html
<div class="card-video-container lazyload isPC" data-src="poster.jpg">
  <video class="card-bg-video lazyload-customer"
         data-src="video.mp4"
         data-poster="poster.jpg"
         loop muted>
  </video>
</div>
```

## 轮播配置属性

```html
<!-- 自动轮播间隔（秒） -->
<div data-time="5" data-length="2">

<!-- 移动端单独轮播 -->
<div class="community-carousel community-carousel-mb"
     data-time="411" data-nums="1">
```

## 轮播组件依赖

```html
<script>
window.gConfig.seed.push({
  name: '@cloud/pep-hwc-dtt-head-carousels',
  data: {
    packages: {
      '@cloud/pep-hwc-dtt-head-carousels': {
        path: '//res.hc-cdn.com/cnpm-pep-developer-components/1.0.27/cnpm-pep-hwc-dtt-head-carousels/',
        version: '1.0.27'
      }
    }
  }
});
</script>
```
