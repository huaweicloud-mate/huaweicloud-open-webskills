# 输入框

来源：Tiny PortalUI input 规范

输入框提供区域进行文字或者文本信息的输入。

## 单行输入框

```html
<h5>高度：32px（常规场景使用）</h5>
<input type="text" class="por-text-input" placeholder="please input" />

<h5>高度：40px（特殊场景使用）</h5>
<input type="text" class="por-text-input-l" placeholder="please input"/>

<h5>Disable</h5>
<input type="text" class="por-text-input" placeholder="please input" disabled="disabled" />

<h5>Error</h5>
<div class="por-text-wrap">
    <input type="text" class="por-text-input" placeholder="please input" />
    <span class="por-help-block">
        <span class="por-icon por-icon-prompt"></span> 错误提示文本
    </span>
</div>
```

## 多行输入框

```html
<div id="textarea1" class="por-textarea-wrap">
    <textarea class="por-textarea por-scrollbar-s" maxlength="200">内容...</textarea>
    <span class="por-textarea-wordwrap"> <var class="por-textarea-word">166</var>/200 </span>
</div>
```

## 关联输入框

带下拉关联值提示的输入框。

```html
<div id="input-dropdown" class="por-input-dropdown">
    <input type="text" class="por-text-input" placeholder="please input" />
</div>
<script>
    var newOptions = [{ key: 111, value: 111 }, { key: 222, value: 222 }];
    $('#input-dropdown').porInput('createOptions', newOptions);
</script>
```

## API 指导

### 方法

| 方法 | 描述 |
| --- | --- |
| `$(element).porTextarea()` | 初始化多行文本输入框 |
| `$(element).porInput()` | 初始化关联值输入框 |
| `$(element).porSelect('createOptions', options)` | 动态修改下拉框选项 |

### 事件

| 事件名 | 描述 |
| --- | --- |
| `change` | 输入框值发生变化时触发 |
