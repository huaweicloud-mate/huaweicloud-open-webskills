# 评分

来源：Tiny PortalUI rate 规范

用于分值或者评价展示。

## 基础展示

```html
<div id="rate-test" class="por-rate-container">
    <div class="por-rate">
        <span class="por-star-icon"></span>
        <span class="por-star-icon"></span>
        <span class="por-star-icon"></span>
        <span class="por-star-icon"></span>
        <span class="por-star-icon"></span>
    </div>
</div>
<script>
    $('#rate-test').porRate();
</script>
```

## 可选配置（文字展示与禁用）

```javascript
// 悬浮显示文字
$('#rate-test1').porRate({
    texts: ['很差', '较差', '一般', '较好', '很好'],
    textType: 'tips',
});

// 只读展示分值
$('#rate-test2').porRate({
    value: 3.7,
    disable: true,
});
```

## API 指导

### 初始化配置 (Options)

使用 `$().porRate(options)` 初始化。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `disable` | 禁用点击（只读） | boolean | false |
| `value` | 初始分值或选中的文本 | number \| string | -- |
| `texts` | 星星对应的文字展示数组 | array | -- |
| `unit` | 单位（仅 value 为 number 时生效） | string | '分' |
| `textType` | 文字展示形式 | string | 'text'（或 'tips'） |

### 方法

| 方法名 | 描述 | 传参 | 返回值 |
| --- | --- | --- | --- |
| `getVal` | 获取当前选中的值 | -- | `number \| string` |

### 事件

| 事件名 | 描述 | 备注 |
| --- | --- | --- |
| `change` | 选项改变时触发 | 可通过 `getVal` 获取新值 |
