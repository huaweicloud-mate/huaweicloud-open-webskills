---
name: huawei-cloud-web-ui-check
description: 华为云官网 UX 规范校验技能。给定一个 HTML 页面（或设计稿切图/DOM），逐项识别页面中的组件与模块，校验其颜色、字号、圆角、间距、尺寸、排布是否符合 huawei-cloud-web-ui skill 的规范值（全部来自设计稿节点树实测）。触发词：校验页面、规范检查、UX 审查、check 页面、页面是否符合规范、验收页面。
---

# 华为云官网 UX 规范校验

对任意官网风格页面做两级校验：

1. **自动校验**（`scripts/check.mjs`）——解析 CSS 声明层，跑 10 条硬规则；
2. **清单校验**（`references/checklists/` 三份）——识别页面里的每个组件/楼层，逐项核对结构级规范值。

校验依据全部来自 `huawei-cloud-web-ui` skill 的实测值（设计稿 27 页 / 18289 节点），**不做主观判断，只对照数值**。

## 工作流

```
输入页面
  │
  ├─ ① 跑脚本: node scripts/check.mjs page.html
  │      → 色板/字阶/圆角/按钮/删除线/栅格/内容区/层级/字族 10 规则
  │      → 产出 page.check-report.html
  │
  ├─ ② 识别组件清单: 页面里有哪些楼层/组件？
  │      → 对照 checklists/03-floors.md 逐楼层核对
  │      → 对照 checklists/02-components.md 逐组件核对
  │
  ├─ ③ 全局核对: checklists/01-global-tokens.md
  │      （色彩语义、字阶使用场景、楼层节奏、断点表现）
  │
  └─ ④ 输出校验报告: 按 error / warn / info 分级列出，
         每条给出 实测值 vs 规范值 + 规范出处文件
```

## 判定原则

| 原则 | 说明 |
|---|---|
| **只对照实测值** | 规范值来自设计稿节点树，不凭感觉；规范里没有的（如 `服务图标`、`btn_floating` 尺寸）标 `无法校验`，不编造 |
| **±1px 容差** | 渲染取整导致的 ±1px 不算 fail（如 1599/1601） |
| **先算再判** | 卡片排布先验算 `(内容区 − n×卡宽)/(n−1) = gap`，gap 与卡宽必须自洽，单独看哪个都可能"看起来对" |
| **hover/按压态放宽** | 黑/白/主色基的 rgba 透明变体（如 `rgba(25,25,25,.04)`）是规范内的状态色，放行 |
| **级别定义** | `error` = 与实测值直接冲突；`warn` = 疑似偏离需人工确认；`info` = 规范外但可能合理的做法 |

## 10 条自动规则

| 规则 | 维度 | 级别 | 核心判定 | 出处 |
|---|---|---|---|---|
| R1 | 色板 | error | 只允许调色板 26 色 + 插画 3 主色；rgba 仅黑/白/灰基 | tokens/colors.md |
| R2 | 字阶 | error | 只允许 16 档：10/12/14/16/18/20/24/28/32/36/40/44/48/54/56/60 | tokens/typography.md |
| R3 | 圆角 | error | token 档位 0/2/4/6/8/12/16/24/32/48/50%/100px；卡片 16 或 24；**按钮恒 24（胶囊）** | tokens/shadows-radii.md |
| R4 | 按钮高度 | warn | 四档 24/32/40/48；未显式声明时提示目测 | components/buttons.md |
| R5 | 按钮底色 | warn | 主按钮 #191919；深底楼层 #FFFFFF；次按钮描边 #595959；hover 黑/白透明变体放行 | components/buttons.md |
| R6 | 删除线 | error | **全库 0 处 line-through**——原价靠「原价」前缀 + 字号降两档，不划线 | components/price.md |
| R7 | 间距 | warn | gap/padding 落 4px 栅格（76/160/164/52/32/28/24/16…） | tokens/spacing.md |
| R8 | 内容区 | info | 1200~1700 的显式宽度须为 1600/1592/1280/1008 | tokens/spacing.md |
| R9 | 层级 | warn | z-index ≤ 900（吸顶层） | tokens/level.md |
| R10 | 字族 | warn | 首选 HarmonyOS Sans，兜底 PingFang/微软雅黑 | tokens/typography.md |

## 脚本用法

```bash
node scripts/check.mjs page.html                # 控制台摘要 + 生成 page.check-report.html
node scripts/check.mjs page.html -o report.html # 指定报告路径
```

要求 Node ≥ 18，零依赖。脚本解析 `<style>` 块（含 @media 拍平）与 inline style；**纯运行时注入的样式（JS 动态设置）校验不到**，此类请走清单人工核对。

## 清单校验（脚本覆盖不到的结构层）

- `references/checklists/01-global-tokens.md` —— 色彩语义误用、字阶场景、楼层底色节奏、四断点、深浅底规则
- `references/checklists/02-components.md` —— 按钮/卡片(8 种)/页签/锚点/页内导航/价格/插画/通栏广告等 20+ 组件逐项数值
- `references/checklists/03-floors.md` —— 13 个楼层模块的楼层尺寸、内容区、排布数与 gap 自洽验算

每条清单项格式：`校验项 | 规范值 | 级别 | 出处`，核对时**逐条给出 实测值/规范值/结论**。

## 输出格式约定

最终校验报告必须是可交付的 HTML（含汇总卡片 + 分级明细表），每条问题包含：

```
[级别] 组件/选择器 · 属性
  实测: xxx   规范: yyy   出处: references/xxx.md
  修法: 一句话
```

## 已知边界

- `服务图标`、`btn_floating` 在设计稿导出节点中 0 命中，无实测值——遇到时标"无法校验"，**不得编造规范值**
- 字体渲染类（字重、行高 1.4 等）属于建议级，不作为 fail 依据
- baseui 组件（`<hd-button>` 等）自带规范样式，脚本对内部实现无法校验，确认页面未覆盖其默认样式即可
