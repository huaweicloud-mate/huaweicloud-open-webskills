# 常规表格（固定表头）

来源：Tiny PortalUI fixed-table 规范

用于参数展示、参数对比，清晰地为用户呈现信息。

## 楼层表格样式 2

带有斑马纹的表格。

```html
<div id="table1" class="por-fixed-table-container">
    <div class="por-fixed-table-body">
        <table class="por-fixed-table por-fixed-table-stripes">
            <thead>
                <tr>
                    <th><div class="th-inner">Header</div></th>
                    <!-- ... -->
                </tr>
            </thead>
            <tbody>
                <tr class="por-compute-tr">
                    <td>- Group -</td>
                    <!-- ... -->
                </tr>
                <tr>
                    <td>Content</td>
                    <td><span class="u-icon u-icon-confirm"></span></td>
                    <!-- ... -->
                </tr>
            </tbody>
        </table>
    </div>
</div>
<script>
    $('#table1').porFixedtable();
</script>
```

## 深色表格

在深色背景下使用，添加 `data-theme="dark"`。

```html
<div class="por-fixed-table-container" data-theme="dark" data-initialheight="300">
    <!-- ... -->
</div>
```

## API 指导

### 属性 (Attributes)

| 属性 | 描述 |
| --- | --- |
| `data-theme` | 主题样式，可选 `dark` |
| `data-initialheight` | 初始高度 |

### 方法

| 方法 | 描述 |
| --- | --- |
| `$().porFixedtable()` | 初始化固定表头表格 |
