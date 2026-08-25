# 单选/复选

来源：Tiny PortalUI checkbox 规范

提供标准样式的单选框、复选框以及卡片样式的选择组。

## 基础选择组

单选框通过 `name` 属性确定分组。

```html
<p>年龄</p>
<div class="por-checkbox-group">
  <div class="por-checkbox-inline">
    <label>
      <span class="por-radio">
        <input class="por-native" type="radio" name="age" value="青年" checked>
        <span></span>
      </span>青年
    </label>
  </div>
  <!-- ... -->
</div>

<p>食物</p>
<div class="por-checkbox-group">
  <div class="por-checkbox-inline">
    <div class="por-checkbox">
      <input class="por-native" type="checkbox" value="orange" name="fruit" checked>
      <span><i class="u-icon u-icon-confirm"></i></span>
    </div>
    <label>橙子</label>
  </div>
  <!-- ... -->
</div>
```

## 卡片选择组

支持超过 4 行自动折叠功能。

```html
<div class="por-checkbox-card-pane">
  <div class="por-checkbox-card-pane-title">实例类型：</div>
  <div class="por-checkbox-card-group">
    <div class="por-checkbox-card-group-inner">
      <div class="por-checkbox-card-group-content">
        <div class="por-radio-card">
          <input class="por-native" type="radio" name="type" value="1" checked>
          <span>选项文本</span>
        </div>
        <!-- ... -->
      </div>
    </div>
  </div>
</div>
<script>
  $('.por-checkbox-card-group').porCheckboxGroup();
</script>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-checkbox-group` | 基础选择框容器 |
| `por-checkbox-inline` | 行内排列的包装类 |
| `por-radio` | 单选框包装类 |
| `por-checkbox` | 复选框包装类 |
| `por-native` | 原生 input 元素使用的类 |
| `por-checkbox-card-group` | 卡片选择组容器 |
| `por-radio-card` | 单选卡片包装类 |
| `por-checkbox-card` | 多选卡片包装类 |

### 方法

使用 `$().porCheckboxGroup(methodName)` 调用。

| 方法名 | 描述 |
| --- | --- |
| `getVal` | 获取选中的值（或值集合） |
| `getText` | 获取选中的文本（或文本集合） |
| `updateCollapse` | 手动更新折叠状态（适用于异步加载场景） |

### 事件

| 事件名 | 描述 |
| --- | --- |
| `change` | 选项改变时触发 |
