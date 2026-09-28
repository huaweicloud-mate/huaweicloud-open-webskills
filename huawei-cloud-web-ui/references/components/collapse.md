# 折叠组件

来源：Tiny PortalUI collapse 规范

通过折叠组件，你可以很方便的实现内容区域的折叠与展开。

## 基础用法

默认皮肤为前景色 dark、背景色 light。使用 `data-toggle="por-collapse"` 触发，`.show` 和 `.expended` 控制初始状态。`data-hide-siblings` 实现手风琴效果。

```html
<div class="por-collapse-container" data-hide-siblings>
    <a class="por-collapse-trigger" data-toggle="por-collapse">
        <div class="por-collapse-head-text">点击展开我时会收起相邻折叠组件</div>
        <i class="por-icon por-icon-down"></i>
    </a>
    <div class="por-collapse">
        <p>内容...</p>
    </div>
</div>
```

## 链接按钮的折叠

```html
<div class="por-collapse-container por-collapse-dark-transparent por-border-0">
    <div>不需要折叠的内容</div>
    <div class="por-collapse">
        <div>需要折叠的内容</div>
    </div>
    <div class="por-collapse-foot">
        <a class="por-link-nounderline por-link-expend" data-toggle="por-collapse">
            <span class="por-link-expend-text">展开全部</span>
            <span class="por-link-expend-text">收起全部</span>
            <span class="por-link-icon-right por-icon por-icon-down"></span>
        </a>
    </div>
</div>
```

## 外部控制

通过属性 `data-toggle="por-collapse"` 和 `data-target` 指定目标。

```html
<a data-toggle="por-collapse" data-target="#collapse-demo" class="por-btn">按钮切换</a>
<div class="por-collapse show" id="collapse-demo">
    <!-- 内容 -->
</div>
```

## API 指导

### 方法

使用 `$().porCollapse(methodName)` 调用。

| 方法名 | 描述 |
| --- | --- |
| `show` | 展开内容区 |
| `hide` | 收起内容区 |
| `toggle` | 切换状态 |

### 事件

使用 `$().on(eventName, function(){})` 绑定事件。

| 事件名 | 描述 |
| --- | --- |
| `beforeShow` | 内容区展开前 |
| `beginShow` | 内容区开始展开 |
| `shown` | 内容区完成展开 |
| `beforeHide` | 内容区收起前 |
| `beginHide` | 内容区开始收起 |
| `hidden` | 内容区完成收起 |
