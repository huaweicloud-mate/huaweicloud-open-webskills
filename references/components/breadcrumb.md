# 面包屑

来源：Tiny PortalUI breadcrumb 规范

指示当前页面在导航层次结构中的位置。

## 实例

支持浅色和深色背景下的两种样式。

```html
<!-- 浅色背景 -->
<ul class="por-breadcrumb">
    <li class="por-breadcrumb-item">
        <a class="por-link" href="">隐私性</a>
    </li>
    <li class="por-breadcrumb-item">
        <a class="por-link" href="">法律条款</a>
    </li>
    <li class="por-breadcrumb-item">
        当前页面
    </li>
</ul>

<!-- 深色背景 -->
<div style="background-color: #252b3a; padding: 10px;">
    <ul class="por-breadcrumb por-breadcrumb-light">
        <li class="por-breadcrumb-item">
            <a class="por-link-light" href="">隐私性</a>
        </li>
        <li class="por-breadcrumb-item">
            <a class="por-link-light" href="">法律条款</a>
        </li>
        <li class="por-breadcrumb-item">
            当前页面
        </li>
    </ul>
</div>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-breadcrumb` | 面包屑容器 (ul) |
| `por-breadcrumb-item` | 面包屑项 (li) |
| `por-breadcrumb-light` | 深色背景下使用的面包屑样式 |
| `por-link` | 面包屑中的链接样式 |
| `por-link-light` | 深色背景下的链接样式 |
