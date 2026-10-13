# 分页

来源：Tiny PortalUI pagination 规范

用于显示分页以指示跨多个页面的一系列相关内容。

## 动态分页

适用于页面内容动态修改、页面不会刷新的场景。

```html
<div class="por-pagination" id="dynamic-pagination"></div>
<script>
    $('#dynamic-pagination').porPagination({
        dynamic: true,
        pagesNumber: 30,
        current: 1,
        total: 100,
    }).on('goto', function(e, page) {
        console.log('跳转的页数为：' + page);
    });
</script>
```

## 静态分页

跳转至对应的新页面（页面会刷新），适用于多页面场景。

```html
<div class="por-pagination" id="static-pagination"></div>
<script>
    var hrefs = [];
    for (var i = 1; i <= 30; i++) { hrefs.push('?' + i); }
    $('#static-pagination').porPagination({
        dynamic: false,
        pagesNumber: 30,
        current: 1,
        total: 100,
        hrefs: hrefs
    });
</script>
```

## API 指导

### 初始化配置 (Options)

使用 `$().porPagination(options)` 初始化。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `dynamic` | 是否为动态分页 | boolean | false |
| `lang` | 语言或自定义文案 | string \| object | `Pagination.langs.zh` |
| `current` | 当前页码 | number | 1 |
| `total` | 总条数 | number | 0 |
| `hrefs` | 链接集合（仅 dynamic=false） | string[] | 必填 |
| `pagesNumber` | 总页数（仅 dynamic=true） | number | 必填 |

#### lang 可选内置值

- `Pagination.langs.zh`: 中文
- `Pagination.langs.en`: 英文
- `Pagination.langs.es`: 西班牙语
- `Pagination.langs.pt`: 葡萄牙语
- `Pagination.langs.th`: 泰语

### 方法

使用 `$().porPagination(methodName, params)` 调用。

| 方法 | 描述 | 传参 | 返回值 |
| --- | --- | --- | --- |
| `goto` | 跳转至对应页面 | `targetPage: number` | -- |
| `prev` | 跳转至上一页 | -- | -- |
| `next` | 跳转至下一页 | -- | -- |
| `first` | 跳转至第一页 | -- | -- |
| `last` | 跳转至最后一页 | -- | -- |
| `getCurrentPage` | 获取当前页码 | -- | `number` |

### 事件

| 事件名 | 描述 | 备注 |
| --- | --- | --- |
| `goto` | 页面跳转时触发 | 仅在动态分页上触发 |
