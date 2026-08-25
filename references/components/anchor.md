# 锚点导航

来源：Tiny PortalUI anchor 规范

锚点是页面内的超级链接导航的常用组件，可以帮助用户快速定位楼层。

## 实例

中文锚点不得超过 12 个字符，英文锚点不得超过 20 个字符，超出以 `...` 截断。锚点居中显示，每个锚点间距为 64px。当锚点整体长度超过 1200px 时，会出现右滑动箭头；锚点最多不得超过 15 个。

```html
<div class="por-section por-anchor" id="anchor1">
    <div class="por-container">
        <div class="por-section-body">
            <nav class="por-anchor-nav">
                <div class="por-anchor-list">
                    <a class="por-anchor-slide" href="#锚点导航">锚点导航</a>
                    <a class="por-anchor-slide active" href="#实例">实例</a>
                    <a class="por-anchor-slide" href="#方法">方法</a>
                    <a class="por-anchor-slide" href="#事件">事件</a>
                    <!-- ... 更多锚点 ... -->
                </div>
                <div class="por-anchor-pre">
                    <div class="u-icon u-icon-left por-anchor-disabled"></div>
                </div>
                <div class="por-anchor-next">
                    <div class="u-icon u-icon-right por-anchor-disabled"></div>
                </div>
            </nav>
        </div>
    </div>
</div>
<script>
    const Anchor = $.fn.porAnchor.Constructor;
    // 指定滚动条容器，默认为 document.body
    Anchor.scrollElement = document.querySelector('.components-container');
    $("#anchor1").porAnchor();
</script>
```

## API 指导

### 方法

| 方法 | 描述 |
| --- | --- |
| `$(element).porAnchor()` | 初始化锚点导航组件。PortalUI 2.0 通常会自动初始化页面已有的 `.por-anchor`。如果是异步加载的，才需要手动调用此初始化方法。 |

### 静态属性

| 属性名 | 描述 |
| --- | --- |
| `Anchor.scrollElement` | 指定滚动条容器（默认为 document.body）。对于在局部容器内滚动的页面，需要设置此属性。 |
