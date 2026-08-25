# 弹窗组件

来源：Tiny PortalUI modal 规范

## 基础弹窗

```html
<div class="por-modal" data-hide="modal" id="demo-modal">
    <div class="por-modal-dialog por-modal-dialog-small">
        <div class="por-modal-inner">
            <div class="por-modal-head">
                <div class="por-modal-icon por-icon por-icon-success"></div>
                <div class="por-modal-title">提交成功</div>
            </div>
            <div class="por-modal-body">
                <div class="por-modal-text">内容文字内容文字内容文字</div>
            </div>
            <div class="por-modal-footer">
                <a class="por-btn por-btn-primary" data-hide="modal">确定</a>
                <a class="por-btn por-btn-dark" data-hide="modal">取消</a>
            </div>
        </div>
        <div class="por-modal-close" data-hide="modal">
            <i class="u-icon u-icon-cancel"></i>
        </div>
    </div>
</div>
<button class="por-btn por-btn-dark" data-toggle="modal" data-target="#demo-modal">打开弹窗</button>
```

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-modal` | 弹窗外层遮罩容器 |
| `por-modal-dialog` | 每个弹窗必须的 class |
| `por-modal-dialog-small` | 小弹窗 (400px) |
| `por-modal-dialog-middle` | 中弹窗 (550px) |
| `por-modal-dialog-large` | 大弹窗 (700px) |
| `por-modal-dialog-xlarge` | 超大弹窗 (900px) |
| `data-toggle="modal"` | 触发弹窗显示的按钮属性 |
| `data-target` | 指定弹窗的选择器 |
| `data-hide="modal"` | 关闭弹窗的按钮属性 |

### 方法

使用 `$().porModal(methodName, options)` 调用。

| 方法名 | 描述 | 传参 |
| --- | --- | --- |
| `show` | 显示弹窗 | -- |
| `hide` | 隐藏弹窗 | -- |
| `reset` | 重置弹窗内容 | `resetOptions` |

### 静态方法

使用 `$.fn.porModal.Constructor.show(resetOptions)`（或简写为 `Modal.show`）和 `Modal.hide()` 调用。

| 方法名 | 描述 | 传参 |
| --- | --- | --- |
| `Modal.show` | 静态显示/创建弹窗 | `resetOptions` |
| `Modal.hide` | 静态隐藏弹窗 | -- |

### resetOptions

| 属性名 | 描述 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | string \| HTMLElement \| JQuery | -- | -- |
| `text` | 正文 | string \| HTMLElement \| JQuery | -- | -- |
| `icon` | 图标 | string \| HTMLElement \| JQuery | -- | 可选内置值见下表 |
| `size` | 尺寸 | string | 'small' | small, middle, large, xlarge |
| `isBackdropCloseModal` | 点击背景是否关闭 | boolean | true | -- |
| `buttons` | 按钮配置 | Array<buttonOptions> \| string \| ... | -- | -- |

#### icon 可选内置值

- `Modal.iconStyle.prompt` : 提示
- `Modal.iconStyle.success` : 成功
- `Modal.iconStyle.warn` : 告警
- `Modal.iconStyle.error` : 错误

### buttonOptions

| 属性名 | 描述 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `text` | 按钮文本 | string | -- | -- |
| `style` | 按钮风格 | string | `Modal.buttonStyle.primary` | 可选内置值见下表 |
| `href` | 链接 | string | -- | -- |
| `isBlank` | 是否新窗口打开 | boolean | false | -- |
| `isCloseModal` | 是否点击关闭 | boolean | true | -- |
| `onClick` | 自定义点击事件 | Function | -- | -- |

#### style 可选内置值

- `Modal.buttonStyle.primary`
- `Modal.buttonStyle.secondary`
- `Modal.buttonStyle.dark`
- `Modal.buttonStyle.light`

### 事件

使用 `$().on(eventName, function(){})` 绑定。

| 事件名 | 描述 |
| --- | --- |
| `beforeShow` | 弹窗显示前 |
| `beginShow` | 弹窗开始显示（可获取尺寸） |
| `shown` | 弹窗完成显示 |
| `beforeHide` | 弹窗隐藏前 |
| `beginHide` | 弹窗开始隐藏 |
| `hidden` | 弹窗完成隐藏 |

### 静态属性

| 属性名 | 描述 |
| --- | --- |
| `Modal.scrollElement` | 指定滚动条容器（默认为 document.body） |
