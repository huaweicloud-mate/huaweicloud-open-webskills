# 页签组件 (Tabs)

来源：Tiny PortalUI tab 规范

页签作为信息分类与导航的常用组件，可以将大量信息进行分类呈现。

> **使用说明**：页签所在的图层下方即为对应的页签内容区域。生成时可以简单扩展其余页签内容。

## 基础实例

通过 `ul` 上的 `data-cols` 属性设置页签数量。**注意：** `por-tab-wrapper` 必须包含在 `por-tab-container` 容器内以确保交互逻辑正确。

```html
<div class="por-tab-container">
    <!-- 导航部分 -->
    <div class="por-tab">
        <ul data-cols="3">
            <li class="active"><a><div class="por-tab-text">页签1</div></a></li>
            <li><a><div class="por-tab-text">页签2</div></a></li>
            <li><a><div class="por-tab-text">页签3</div></a></li>
        </ul>
    </div>
    <!-- 内容区域 -->
    <div class="por-tab-wrapper">
        <div class="por-tab-content active">页签内容1</div>
        <div class="por-tab-content">页签内容2</div>
        <div class="por-tab-content">页签内容3</div>
    </div>
</div>
```

## 皮肤与布局

- **深色皮肤**：在深色背景/楼层中使用时，请为容器添加 `.por-tab-light` 类。
- **居左对齐**：组件默认居中对齐，若需靠左展示，请在 `por-tab` 上添加 `.por-tab-left`。

```html
<div class="por-tab-container por-tab-light">
    <div class="por-tab por-tab-left">
        <!-- ... -->
    </div>
    <!-- ... -->
</div>
```

## 脚本初始化

组件依赖 jQuery 和 `theme-token.js`，需手动调用 `.porTab()` 方法。

```javascript
$(function() {
    // 全局初始化或指定容器初始化
    $('.por-tab-container').porTab();
});
```

## 页签横向滚动

当页签数量较多时，使用 `.por-tab-scroll` 并添加左右箭头图标。

```html
<div class="por-tab por-tab-scroll">
    <ul data-cols="13">
        <!-- ... -->
    </ul>
    <span class="u-icon u-icon-left"></span>
    <span class="u-icon u-icon-right"></span>
</div>
```

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-tab-container` | 页签组件容器 |
| `por-tab` | 页签导航部分 |
| `por-tab-wrapper` | 内容展示区域容器 |
| `por-tab-content` | 单个页签内容块 |
| `por-tab-light` | 深色背景主题 |
| `por-tab-scroll` | 开启横向滚动样式 |
| `por-tab-left` | 居左对齐样式 |
| `data-cols` | 在 ul 上指定页签列数 |

### 方法

使用 `$().porTab()` 初始化。

### 事件

使用 `$().on(eventName, function(){})` 绑定事件。

| 事件名 | 描述 | 触发元素 |
| --- | --- | --- |
| `beforeActivate` | 页签选中前 | `.por-tab li` |
| `afterActivate` | 页签选中后 | `.por-tab li` |
| `beforeInactivate` | 页签取消选中前 | `.por-tab li` |
| `afterInactivate` | 页签取消选中后 | `.por-tab li` |
| `beforeShow` | 内容显示前 | `.por-tab-content` |
| `afterShow` | 内容显示后 | `.por-tab-content` |
| `beforeHide` | 内容隐藏前 | `.por-tab-content` |
| `afterHide` | 内容隐藏后 | `.por-tab-content` |
