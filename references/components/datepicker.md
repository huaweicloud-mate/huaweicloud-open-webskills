# 日期选择器

来源：Tiny PortalUI datepicker 规范

用于集成 PC 和 Mobile 双端使用的日期选择器。需手动切换双端状态并刷新页面。

## 实例

```html
<div class="cus-date-input"></div>
<script>
  var datePickerConfigItems = {
    yearRange: 20,
    lang: 'zh-cn',
    parentElement: '.demo-box',
  };
  var DatePicker = $.fn.porDatePicker;
  var datePickerInstance = new DatePicker($('.cus-date-input'), datePickerConfigItems);
  datePickerInstance.beforeInit();
  $(datePickerInstance.template.input).click(e => {
    datePickerInstance.init({
      type: 'monthrange',
      lang: 'zh-cn',
      onChange: () => {
        // 获取当前选中的时间
        var $cusDataMonth = $('.cus-date-input input').val();
      },
    });
  });
</script>
```

## API 指导

### 初始化配置 (datePickerConfigItems)

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `lang` | 国际化语言 | string | 'zh-cn' |
| `yearRange` | 年份跨度 | number | 20 |
| `parentElement` | 日期输入框父节点选择器 | string | '.demo-box' |

### 方法

使用 `datePickerInstance.方法名()` 调用。

| 方法名 | 描述 | 传参 |
| --- | --- | --- |
| `beforeInit` | 获取入口 input 框（适配 PC/Mobile） | -- |
| `init` | 初始化并打开日期选择器 | `options`（见下表） |

#### init options 属性

- `type`: 模式，如 `'monthrange'`
- `lang`: 语言，如 `'zh-cn'`
- `onChange`: 选择改变后的回调函数

### 事件

| 事件名 | 描述 | 备注 |
| --- | --- | --- |
| `change` | 输入框日期改变 | 在 `options.onChange` 中处理 |
