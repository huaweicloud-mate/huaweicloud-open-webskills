# 样式工具类 (Utils)

来源：Tiny PortalUI variable 规范

提供各种基础样式对应的工具类名。

## 倒角 (Border Radius)

| 类型 | 值 | class 名 | 适用场景 |
| --- | --- | --- | --- |
| XS | 0 | `radius_border_XS` | 直角 |
| S | 2px | `radius_border_S` | 小标签 |
| M | 4px | `radius_border_M` | 中标签 |
| L | 6px | `radius_border_L` | 输入框、下拉框等通用组件 |
| XL | 16px | `radius_border_XL` | 门户侧卡片 |
| XXXL | 50% | `radius_border_XXXL` | 圆形 |

## 基础投影 (Box Shadow)

| 类型 | class 名 |
| --- | --- |
| 卡片正常 | `shadow_card_normal` |
| 卡片悬浮 | `shadow_card_hover` |
| 提示 | `shadow_tips` |
| 下拉 | `shadow_dropdown` |
| 弹窗 | `shadow_modal` |

## 蒙层

- 蒙版：20% `#000000`，主要用于弹窗背景。
- 使用 `.por-modal` 实现。
