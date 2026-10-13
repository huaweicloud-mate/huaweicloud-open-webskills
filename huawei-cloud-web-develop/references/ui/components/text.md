# 文本

来源：Tiny PortalUI text 规范

官网文本字体规范。

## 使用规范

1. 中、英文使用独立字体。
2. 术语一致性（如：统一使用"编辑"或"Edit"）。
3. 特定元素（菜单、大标题）全大写或首字母大写。
4. 中英混排时，英文字符切换为 Huawei Sans。

## 字号

| 类型 | 字体/字号/行高 | 代码 |
| --- | --- | --- |
| 文本_标题1 | PingFangSC / 60px / 84Line | `class="por-text-title-t1"` |
| 文本_标题2 | PingFangSC / 48px / 72Line | `class="por-text-title-t2"` |
| 文本_标题3 | PingFangSC / 40px / 60Line | `class="por-text-title-t3"` |
| 文本_正文1 | PingFangSC / 18px / 28Line | `class="por-text-body-t1"` |
| 文本_正文2 | PingFangSC / 16px / 24Line | `class="por-text-body-t2"` |
| 文本_正文3 | PingFangSC / 14px / 22Line | `class="por-text-body-t3"` |

## 字重

| 字重 | 描述 | token |
| --- | --- | --- |
| 100 | 细体 | `--por-base-font-weight-lighter` |
| 400 | 常规体 | `--por-base-font-weight-normal` |
| 700 | 中黑体 | `--por-base-font-weight-bold` |

## 示例

```html
<h1 class="por-text-title-t1">标题一</h1>
<h3 class="por-text-title-t3">标题三</h3>
<p class="por-text-body-t3">正文三段</p>
```
