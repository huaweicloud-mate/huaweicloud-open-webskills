# 支持与服务风格表格

来源：Tiny PortalUI service-table 规范

主要用于支持与服务的表格，相比常规表格有一定的使用局限性。

## 楼层表格样式

带有侧边标题列的表格。

```html
<div class="por-service-table por-service-table-coltitle">
    <div class="por-service-table-head">
        <div class="por-service-table-row">
            <div class="por-service-table-cell"><p>服务项目</p></div>
            <div class="por-service-table-cell active"><p>基础级</p></div>
            <!-- ... -->
        </div>
    </div>
    <div class="por-service-table-body">
        <div class="por-service-table-row">
            <div class="por-service-table-cell">
                <div class="p-box"><p>热线电话支持</p></div>
            </div>
            <div class="por-service-table-cell active">
                <div class="h">热线电话支持</div>
                <div class="p-box"><p>7x24小时</p></div>
            </div>
            <!-- ... -->
        </div>
    </div>
</div>
```

## 深色表格

深色背景下，添加 `data-theme="translucent"`。

```html
<div class="por-service-table" data-theme="translucent">
    <!-- ... -->
</div>
```

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-service-table` | 表格容器基础类 |
| `por-service-table-coltitle` | 实现楼层表格带列标题样式 |
| `data-theme="translucent"` | 深色背景透明主题 |
| `por-scrollbar-m/s` | 容器外层添加滚动条样式 |
