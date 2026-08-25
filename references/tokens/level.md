# 层级规范 (Level)

来源：Tiny PortalUI level 规范

官网各控件需要严格遵守一定的层级规范，避免前端控件相互覆盖。

## 层级数值定义

| 类型 | z-index 值 | token |
| --- | --- | --- |
| 正文 content | < 1000 | `--por-base-zindex-content` |
| 下拉 dropdown | 1000~1019 | `--por-base-zindex-dropdown` |
| 粘性浮动 sticky | 1020~1029 | `--por-base-zindex-sticky` |
| 浮动控件 fixed | 1030~1039 | `--por-base-zindex-content` |
| 弹窗遮罩 mask | 1040~1049 | `--por-base-zindex-mask` |
| 弹窗 modal | 1050~1059 | `--por-base-zindex-modal` |
| 提示 tooltip | 1060~1069 | `--por-base-zindex-tooltip` |

## 常用 Token 速查

| Token | 值 |
|-------|-----|
| `--por-base-zindex-content` | `1` |
| `--por-base-zindex-dropdown` | `1000` |
| `--por-base-zindex-mask` | `1040` |
| `--por-base-zindex-modal` | `1050` |
| `--por-base-zindex-tooltip` | `1060` |
