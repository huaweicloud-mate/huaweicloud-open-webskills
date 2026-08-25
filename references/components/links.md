# 链接组件

来源：Tiny PortalUI link 规范

快速创建不同样式的链接。

## 基础链接

在浅色背景下创建不同样式的链接。

```html
<a href="javascript:" class="por-link-secondary">por-link-secondary</a>
<a href="javascript:" class="por-link">por-link</a>
<a href="javascript:" class="por-link-disabled">por-link-disabled</a>
<a href="javascript:" class="por-link-blue">por-link-blue</a>
```

## 带箭头的链接

```html
<a href="javascript:" class="por-link por-link-more">了解更多<span class="por-link-icon-right por-icon por-icon-right"></span></a>
```

## "换一换"链接

```html
<a href="javascript:" class="por-link por-link-change">换一换<span class="por-link-icon-right por-icon por-icon-change"></span></a>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-link` | 带下划线文本链接 |
| `por-link-secondary` | 带下划线文本浅色链接 |
| `por-link-light` | 带下划线文本链接（深色背景下使用） |
| `por-link-more` | 更多文本链接 |
| `por-link-change` | 换一换文本链接 |

> 深色背景下的链接还可以使用 `por-link-light`；折叠展开等场景使用 `por-link-nounderline` 去除下划线。
