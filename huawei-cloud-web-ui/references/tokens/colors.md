# 色彩体系

来源：`cnpm-baseui` theme-token.css

## 灰阶系统（核心色彩）

HWC 官网以灰阶为主色调，几乎全部界面都基于以下灰阶：

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--por-base-color-gray-0` | `#FFFFFF` | 白色背景、反色文字 |
| `--por-base-color-gray-5` | `#FAFAFA` | 极浅背景 |
| `--por-base-color-gray-10` | `#F5F5F5` | 灰色背景区、禁用背景 |
| `--por-base-color-gray-20` | `#EBEBEB` | 分割线、轻边框 |
| `--por-base-color-gray-30` | `#DBDBDB` | 中等边框 |
| `--por-base-color-gray-40` | `#C2C2C2` | 弱化文字、禁用文字 |
| `--por-base-color-gray-50` | `grey` | 次级弱化文字 |
| `--por-base-color-gray-60` | `#595959` | 辅助文字、次要文字 |
| `--por-base-color-gray-70` | `#333333` | — |
| `--por-base-color-gray-80` | `#262626` | — |
| `--por-base-color-gray-90` | `#191919` | 主文字色、品牌色默认 |
| `--por-base-color-gray-100` | `#000000` | 纯黑 |

## 品牌色

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--por-base-color-red-huawei` | `#C7000B` | HWC 品牌红，CTA 按钮、链接高亮 |
| `--por-base-color-brand` | `var(--por-base-color-gray-90)` 即 `#191919` | 主品牌色（深灰） |
| `--por-base-color-brand-2` | `var(--por-base-color-blue-50)` 即 `#1476FF` | 辅品牌色（蓝色） |

### 品牌红色的衍生用法

```css
/* 开发者站特有按钮色 */
.btn-red { background: #C7000B; border-color: #C7000B; color: #fff; }
.btn-red:hover { background: #d64a52; border-color: #d64a52; box-shadow: 0 8px 6px -4px rgba(246, 111, 106, 0.5); }

/* 文字链接高亮 */
color: #c7000b;  /* hover 状态 */

/* 消息徽标 */
background-color: #c7000b;
```

## 功能色

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--por-base-color-red-50` | `#F23030` | 错误 Error |
| `--por-base-color-red-40` | `#FAA9A5` | 错误文字（浅） |
| `--por-base-color-orange-50` | `#FF8800` | 警告 Warning |
| `--por-base-color-lemon-50` | `#F7D916` | 提醒 Alarm |
| `--por-base-color-kelly-50` | `#5CB300` | 成功 Success |
| `--por-base-color-blue-50` | `#1476FF` | 信息 Info、辅助品牌色 |

### 功能色半透明背景

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--por-base-color-red-50-alpha` | `rgba(242,48,48,0.1)` | 错误背景 |
| `--por-base-color-orange-50-alpha` | `rgba(255,136,0,0.1)` | 警告背景 |
| `--por-base-color-lemon-50-alpha` | `rgba(247,217,22,0.1)` | 提醒背景 |
| `--por-base-color-kelly-50-alpha` | `rgba(92,179,0,0.1)` | 成功背景 |
| `--por-base-color-blue-50-alpha` | `rgba(20,118,255,0.1)` | 信息背景 |

## 文字色语义映射

```css
--por-color-text-primary: #191919;      /* 主要文字 */
--por-color-text-secondary: #595959;    /* 次要文字 */
--por-color-text-weak-1: #C2C2C2;      /* 弱化文字 1 */
--por-color-text-weak: grey;            /* 弱化文字 */
--por-color-text-disabled: #C2C2C2;     /* 禁用文字 */
--por-color-text-white: #FFFFFF;        /* 白色文字 */
--por-color-text-button: #1476FF;       /* 按钮文字（蓝色） */
--por-color-text-huawei: #C7000B;       /* HWC 品牌红文字 */
```

## 开发者站特有颜色

从 `developer-common.css` 提取的非 Token 颜色：

| 色值 | 用途 |
|------|------|
| `#252B3A` | 页头/标题深色（比主站灰90稍蓝） |
| `#575D6C` | 开发者站辅助文字色 |
| `#8A8E99` | 开发者站边框/灰色按钮 |
| `#DFE1E6` | 分割线、弹窗边框 |
| `#F5F5F6` | 禁用背景、标签背景 |
| `#526ECC` | 开发者站链接色（偏蓝紫） |
| `#666A75` | 二级辅助文字 |

## 背景色语义映射

```css
--por-color-background-white: #FFFFFF;
--por-color-background-gray-1: #FAFAFA;          /* 极浅灰背景 */
--por-color-background-gray-2: #F5F5F5;          /* 浅灰背景（灰色区块） */
--por-color-background-gray-3: rgba(0,0,0,0.1);  /* 10% 黑 */
--por-color-background-gray-4: rgba(0,0,0,0.05); /* 5% 黑 */
--por-color-background-primary: #191919;          /* 深色区块背景 */
--por-color-background-disabled: rgba(0,0,0,0.05);
```

## 边框色语义映射

```css
--por-color-border-primary: #191919;
--por-color-border-secondary: #595959;
--por-color-border-input: #C2C2C2;
--por-color-border-split-1: rgba(0,0,0,0.08);   /* 最轻分割线 */
--por-color-border-split-2: rgba(0,0,0,0.15);   /* 较重分割线 */
```
