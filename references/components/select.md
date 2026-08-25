# 下拉选择框

来源：Tiny PortalUI select 规范

下拉选择框组件主要功能为从一个数据集合中选择某一条数据。

## 基础实例

通过在原生 select 外包裹 `.por-select` 创建一个下拉菜单。

```html
<div class="por-select">
    <select class="por-native" name="fruits">
        <option value="app">苹果</option>
        <option value="banana" disabled="">香蕉</option>
        <option value="yz">椰子</option>
    </select>
</div>
```

## 特殊样式下拉菜单组

```html
<div class="por-mb-select-group">
    <div class="por-row">
        <div class="por-col-12">
            <div class="por-select por-select-inline por-select-text">
                <select class="por-native" name="维度A">
                    <option value="选项一">维度A选项一</option>
                    <!-- ... -->
                </select>
            </div>
        </div>
        <!-- ... -->
    </div>
</div>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-select` | 基础下拉框容器 |
| `por-select-inline` | 行内样式的下拉框 |
| `por-select-text` | 仅显示文本样式的下拉框 |
| `por-native` | 原生 select 元素使用的类 |

### 方法

| 方法 | 描述 | 传参 |
| --- | --- | --- |
| `$().porSelect('getVal')` | 获取下拉框选中的值 | -- |
| `$().porSelect('getText')` | 获取选中的文本 | -- |
| `$().porSelect('setVal', value)` | 设置下拉框的值 | `value`（目标 option 的 value） |
| `$().porSelect('update')` | 动态修改 options 后手动更新组件状态 | -- |
| `$().porSelect('disable')` | 禁用下拉框 | -- |
| `$().porSelect('enable')` | 启用下拉框 | -- |
