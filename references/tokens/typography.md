# 字体排版

来源：`cnpm-baseui` (3.0.17) Tiny PortalUI design-tokens + text 规范

## 1. 字体族

| 变量名 | 值 | 说明 |
| :--- | :--- | :--- |
| `--por-base-font-family` | `-apple-system, HuaweiSans, ...` | 默认字体栈 |
| `--por-base-font-family-ja-jp` | `-apple-system, "メイリオ", ...` | 日语字体栈 |
| `--por-base-font-family-ar-mena` | `Manrope, -apple-system, ...` | 中东/阿拉伯字体栈 |

```css
/* 主字体栈（HTML 中常用） */
font-family: HuaweiSans, PingFang SC, Microsoft YaHei, sans-serif;
```

## 2. 字重

| 变量名 | 值 | 说明 |
| :--- | :--- | :--- |
| `--por-base-font-weight-lighter` | `lighter` | 较细字重 |
| `--por-base-font-weight-normal` | `normal` | 常规字重 |
| `--por-base-font-weight-bold` | `bold` | 加粗字重 |
| `--por-base-font-weight-bolder` | `bolder` | 更粗字重 |

## 3. 文本规范（Text）

1. 中、英文使用独立字体。
2. 术语一致性（如：统一使用"编辑"或"Edit"）。
3. 特定元素（菜单、大标题）全大写或首字母大写。
4. 中英混排时，英文字符切换为 Huawei Sans。

## 4. 语义化字号类名

通过给元素添加以下 class 使用官方字号/行高：

| 类型 | 字体/字号/行高 | class |
| --- | --- | --- |
| 标题 1 | PingFangSC / 60px / 84Line | `class="por-text-title-t1"` |
| 标题 2 | PingFangSC / 48px / 72Line | `class="por-text-title-t2"` |
| 标题 3 | PingFangSC / 40px / 60Line | `class="por-text-title-t3"` |
| 正文 1 | PingFangSC / 18px / 28Line | `class="por-text-body-t1"` |
| 正文 2 | PingFangSC / 16px / 24Line | `class="por-text-body-t2"` |
| 正文 3 | PingFangSC / 14px / 22Line | `class="por-text-body-t3"` |

## 5. 实际使用示例

```html
<h1 class="por-text-title-t1">大标题</h1>
<h3 class="por-text-title-t3">卡片标题</h3>
<div class="por-text-body-t1">正文内容</div>
<div class="por-text-body-t2">次级正文</div>
```

## 6. 单行省略

`por-text-body-t1-textOverflow` 可实现文字单行显示、溢出省略号：

```html
<div class="por-text-body-t1-textOverflow">很长的一段文字...</div>
```
