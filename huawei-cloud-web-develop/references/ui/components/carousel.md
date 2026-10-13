# 轮播

来源：Tiny PortalUI carousel 规范

用于指示内容轮播展示。

## 基础实例

带有底部分页器和翻页按钮的轮播。

```html
<div class="por-carousel" id="carousel1">
    <div class="por-carousel-wrapper">
        <div class="por-carousel-slide" style="background-color: #00aaff">1</div>
        <div class="por-carousel-slide" style="background-color: #3ac295"><a href="https://www.huaweicloud.com" target="_blank">2</a></div>
        <div class="por-carousel-slide" style="background-color: #fac20a">3</div>
    </div>
</div>
<script>
    $('#carousel1').porCarousel({
        pagination: true, // 底部指示器
        navigation: true, // 翻页按钮
        loop: true, // 循环
    });
</script>
```

## 自动播放

```html
<div class="por-carousel" id="carousel2">
    <div class="por-carousel-wrapper">
        <div class="por-carousel-slide" style="background-color: #00aaff">1</div>
        <div class="por-carousel-slide" style="background-color: #3ac295">2</div>
        <div class="por-carousel-slide" style="background-color: #fac20a">3</div>
    </div>
</div>
<script>
    $('#carousel2').porCarousel({
        autoplay: true,
        pagination: true,
        navigation: true,
        loop: true
    });
</script>
```

## 渐变效果

使用 `effect: 'fade'`。

```html
<script>
    $('#carousel-fade').porCarousel({
        effect: 'fade',
        pagination: true,
        navigation: true,
        loop: true
    });
</script>
```

## API 指导

### 初始化配置 (Options)

使用 `$().porCarousel(options)` 初始化。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `effect` | 过渡效果 | string | 'slide'（或 'fade'） |
| `initialSlide` | 初始显示的 slide 索引 | number | 0 |
| `preview` | 同时显示的滑块数量 | number | 1 |
| `speed` | 切换速度 (ms) | number | 400 |
| `loop` | 是否开启循环模式 | boolean | false |
| `autoplay` | 是否自动播放 | boolean \| object | false |
| `pagination` | 是否使用分页导航 | boolean | false |
| `navigation` | 是否使用导航按钮 | boolean \| object | false |
| `simulateTouch` | 是否开启鼠标模拟触摸 | boolean | false |

#### autoplay options

- `delay`: 播放间隔时间（默认 5000ms）

#### navigation options

- `prevEl`: 上一个按钮的选择器（默认 `[data-prev="carousel"]`）
- `nextEl`: 下一个按钮的选择器（默认 `[data-next="carousel"]`）

### 方法

使用 `$().porCarousel(methodName, params)` 调用。

| 方法名 | 描述 | 传参 |
| --- | --- | --- |
| `prev` | 上一页 | -- |
| `next` | 下一页 | -- |
| `slideTo` | 切换至指定索引 | `(index: number, speed?: number)` |
| `slideToLoop` | 切换至真实索引（loop 模式） | `(index: number, speed?: number)` |
| `play` | 开启自动播放 | -- |
| `pause` | 暂停自动播放 | -- |
| `appendSlide` | 添加新的 slide | `(slides: HTMLElement \| string \| ...)` |
| `destroy` | 销毁实例 | -- |

### 事件

| 事件名 | 描述 |
| --- | --- |
| `beforeInit` | 初始化前 |
| `init` | 初始化后 |
| `slideChange` | 当前 slide 发生变化 |
| `beforeTransition` | 过渡开始前 |
| `transitioned` | 过渡结束 |
| `slideChangeTransitioned` | 从一个 slide 过渡到另一个结束 |
