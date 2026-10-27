# 华为云官网 UI 设计规范（概览与索引）

# 华为云官网 UI 设计规范 Skill

## 概述

本 Skill 封装了华为云官网（huaweicloud.com）和华为云 Developer Portal（developer.huaweicloud.com）的完整 UI 设计规范，基于 **Tiny PortalUI** 轻量基础组件库，用于生成符合现有官网视觉规范的页面代码。

**主要聚焦**：华为云 Developer Portal（developer.huaweicloud.com）
**辅助参考**：华为云主站（huaweicloud.com）

## 设计体系来源

- 组件库 / 设计 Token：Tiny PortalUI（`cnpm-baseui`，版本 `3.0.17`，`portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css`）
- 交互脚本：`theme-token.js`（依赖 jQuery）
- 开发者站公共样式：`developer-common.css`
- 前缀规范：所有 CSS 变量和组件类名均以 `por-` 为前缀（Portal 缩写）

## OpenTiny 组件库（组件优选）

Tiny PortalUI 只提供 HTML/CSS + jQuery 的轻量静态组件；**在 Vue 3 工程中，交互与 UI 一律优先使用 OpenTiny（TinyVue）组件库**，而不是用原生 HTML 标签手写。

### 安装 OpenTiny Agent Skill

```bash
# 列出 OpenTiny 仓库中所有可安装的 skills（含 tiny-vue-skill）
npx skills add opentiny/agent-skills --list

# 全局安装 tiny-vue-skill（Claude Code / VS Code；OpenCode 全局路径见下）
npx skills add opentiny/agent-skills -g --skill tiny-vue-skill --agent claude-code

# 项目级安装
npx skills add opentiny/agent-skills --skill tiny-vue-skill --agent claude-code
```

- OpenCode 全局安装路径：`~/.config/opencode/skills/tiny-vue-skill`
- TinyVue 组件会定期升级，需重新执行 `skills add` 更新该 Skill
- 安装后，编写 TinyVue 组件（Grid/Form/Table/Dialog 等）时遵循 `tiny-vue-skill` 的用法与 API

### 组件优先原则（强制）

> **能用 OpenTiny 组件实现的，不要用 HTML 标签实现。**

| 场景 | 使用 OpenTiny 组件 | 禁止 |
|------|------------------|------|
| 按钮 | `<tiny-button>` | `<button>` 手写样式 |
| 表格 | `<tiny-grid>` | `<table>` |
| 表单 | `<tiny-form>` / `<tiny-form-item>` | `<form>` + 手写校验 |
| 输入 / 下拉 / 日期 | `<tiny-input>` / `<tiny-select>` / `<tiny-date-picker>` | `<input>` / `<select>` |
| 弹窗 / 抽屉 | `<tiny-dialog-box>` / `<tiny-drawer>` | 手写遮罩 DOM |
| 提示 / 标签 / 分页 | `<tiny-alert>` / `<tiny-tag>` / `<tiny-pager>` | 手写结构 |

仅在 OpenTiny **未提供**对应组件时，才退回 HTML 标签或 Tiny PortalUI 静态结构（此时仍需保证视觉与 PortalUI Token 一致）。

## 样式隔离规范（强制）

项目内部自定义 CSS 必须加上**当前项目的 id 前缀**（如 `#project-id`），避免被公共样式（`global.min.css` / `developer-common.css` / PortalUI）污染：

```css
/* ✅ 正确：以当前项目 id 作为最外层作用域 */
#my-project .card { padding: 16px; }
#my-project .card__title { color: var(--por-color-text-primary); }

/* ❌ 错误：裸选择器会被公共样式覆盖，也可能污染公共样式的页面 */
.card { padding: 16px; }
header { height: 64px; }
```

- 项目自研样式选择器统一以 `#{当前项目 id}` 为最外层作用域
- 禁止在项目内直接写全局裸选择器（`body` / `header` / `.card` 等）
- 组件库内部样式无需加前缀，仅约束项目自研样式

## 前置条件

### 1. 基础知识
- 熟悉 HTML5 和 CSS3
- 了解 CSS 变量（Custom Properties）的使用方法
- 了解响应式设计基础
- 了解 jQuery（PortalUI 交互组件依赖）
- **Vue 3 工程：了解 OpenTiny（TinyVue）组件库用法（见上方「OpenTiny 组件库」）**

### 2. 外部依赖
```html
<!-- 设计 Token + 组件样式（必须） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css">

<!-- 交互脚本（依赖 jQuery，组件交互必需） -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.js"></script>

<!-- 产品图标（可选，图标组件使用） -->
<link rel="stylesheet" href="https://res-static3.huaweicloud.com/content/dam/cloudbu-site/archive/china/static/v2_resources/css/product-icons.css">

<!-- 主站公共样式（可选） -->
<link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-global-resources/1.2.9/css/global.min.css">
```

### 3. 浏览器支持
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器（iOS Safari 14+, Android Chrome 90+）

## 使用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| 开发者官网页面 | 生成符合开发者站视觉规范的页面（**默认接入公共开发者页头 `<hd-header>`**） | 技术文档页、API 文档页 |
| 产品介绍页 | 华为云产品展示页面 | 产品特性页、价格页 |
| 营销落地页 | 符合品牌调性的营销页面 | 活动页、专题页 |
| 后台管理页 | 简单的管理界面 | 控制台页面、数据看板 |
| 表单页面 | 符合设计规范的表单 | 注册页、配置页 |

### 页头接入：开发者官网场景默认接入公共页头

**开发者官网（developer.huaweicloud.com）场景页面默认接入**华为云开发者公共页头 `<hd-header>` 动态组件（含站点信息栏 / 主导航 / 用户菜单，页脚自动生成）：`<head>` 内按固定顺序加载 baseui(2.8.11) → jQuery → `developer-preload-header.js?url=…hwcheader2026.html` → `window.developerHeaderUrl`（与 `?url=` 同 URL）→ `developer-pep2-template.js`，`<body>` 内放置 `<hd-header></hd-header>`。完整顺序、双通道约束与登录/登出链接兜底见 [导航 / 页头](references/components/navigation.md)。

### 备选模式：登录模式页头（自研页头）

**仅当无法接入公共页头**、退回自研页头时，页头右侧登录区按「登录模式页头」实现：PC 端为登录链接 / 用户名下拉面板；移动端（≤768px）对齐 developer.huaweicloud.com/grow 页 `header-tools` 官方效果——未登录显示人形图标并展开全宽面板（账号中心 / 开放能力 / 注册+登录胶囊按钮），已登录显示圆形头像并展开全宽面板（账号中心 / 开放能力 / 用户名+退出登录）。完整交互规格、尺寸与踩坑记录见 [登录模式页头](references/components/header-login.md)。

## 文件结构

```
huawei-cloud-web-ui/
├── SKILL.md                    # 本文件 — Skill 入口
└── references/                 # 参考文档
    ├── getting-started.md      # 快速开始（引入方式、Token 使用规范）
    ├── xtemplate.md            # XTemplate 模板语法指南
    ├── tokens/                 # 设计 Token
    │   ├── colors.md           # 色彩体系（基础调色板、文字/背景/边框/功能色）
    │   ├── typography.md       # 字体排版（字体族、字重、语义化字号类名）
    │   ├── spacing.md          # 间距系统（尺寸、容器宽度、响应式断点）
    │   ├── shadows-radii.md    # 阴影与圆角
    │   ├── level.md            # 层级规范（z-index）
    │   └── utils.md            # 样式工具类（radius/shadow class）
    ├── components/             # 组件库
    │   ├── text.md             # 文本规范
    │   ├── icon.md             # 字体图标 / 产品图标
    │   ├── buttons.md          # 按钮
    │   ├── links.md            # 链接
    │   ├── input.md            # 输入框
    │   ├── select.md           # 下拉选择框
    │   ├── checkbox.md         # 单选 / 复选
    │   ├── datepicker.md       # 日期选择器
    │   ├── modal.md            # 弹窗
    │   ├── tips.md             # 提示 Tips
    │   ├── label.md            # 标签
    │   ├── breadcrumb.md       # 面包屑
    │   ├── pagination.md       # 分页
    │   ├── carousel.md         # 轮播
    │   ├── rate.md             # 评分
    │   ├── price.md            # 价格
    │   ├── countdown.md        # 倒计时
    │   ├── scrollbar.md        # 滚动条
    │   ├── player.md           # 视频播放
    │   ├── tabs.md             # 页签
    │   ├── anchor.md           # 锚点导航
    │   ├── collapse.md         # 折叠组件
    │   ├── cards.md            # 卡片
    │   ├── plan-table.md       # 套餐对比表格（价格行 + 购买行 + 推荐列）
    │   ├── service-table.md    # 支持与服务风格表格
    │   ├── fixed-table.md      # 固定表头表格
    │   ├── navigation.md       # 导航 / 页头（开发者官网场景默认接入公共页头 <hd-header>）
    │   ├── header-login.md     # 登录模式页头（备选自研页头，PC + 移动端登录区）
    │   ├── ad-banner.md        # 顶部广告横幅（自定义组件，纯 CSS）
    │   ├── banner.md           # Banner 轮播
    │   ├── full-banner.md      # 通栏广告（页面中段整幅推广位）
    │   ├── illustration.md     # 插画（规范色板 + 插画卡版式）
    │   ├── in-page-nav.md      # 产品页内导航（吸顶二级导航 + 更多下拉）
    │   └── footer.md           # 页脚
    ├── layouts/                # 布局系统
    │   ├── page-structure.md   # 页面结构规范
    │   ├── grid.md             # 栅格系统
    │   ├── floor.md            # 楼层（Section）容器
    │   ├── advantage-floor.md  # 优势楼层（3~5 张同构卡的「为什么选我」楼层）
    │   ├── scenario-architecture.md  # 应用场景架构图（左图右文 + 搭配服务 / 案例视频 / 推荐机型）
    │   ├── product-catalog.md  # 全部产品展示（左索引 + 分类分组的产品卡地图）
    │   ├── logo-wall.md        # 客户案例 Logo 墙（2~6 个一排的客户背书楼层）
    │   ├── news-blog.md        # 新闻 & 博客推荐（3 张 517×648 图文卡）
    │   ├── news-award-book.md  # 新闻 / 奖项 / 图书展示（横向图文卡 2~3 张）
    │   ├── doc-recommend.md    # 推荐文档（3~5 列文档入口卡）
    │   ├── faq-floor.md        # 常见问题楼层（大白卡 + 可折叠问答）
    │   ├── package-card.md     # 套餐组合卡（788×696 三段式售卖卡）
    │   └── product-recommend.md # 产品推荐卡片（2~5 个一排的推荐卡组，无按钮）
    └── examples/               # 示例代码
        ├── homepage-dev.html   # 开发者官网首页示例
        └── homepage-main.html  # 主站首页示例
```

## 使用指南

### 1. 当用户需要生成华为云风格页面时

1. 先读取 `references/getting-started.md` 了解引入方式，读取 `references/tokens/` 下所有文件了解设计变量
2. 根据页面类型参考 `references/layouts/page-structure.md` 确定页面骨架，用 `references/layouts/floor.md` 组织楼层
3. 从 `references/components/` 中选取所需组件
4. **能用 OpenTiny（TinyVue）组件实现的，不要用 HTML 标签实现**；Vue 3 工程先加载 `tiny-vue-skill`（`npx skills add opentiny/agent-skills`），按组件优先原则选型
5. 需要可参数化模板时，参考 `references/xtemplate.md` 使用 XTemplate 语法
6. 参考 `references/examples/` 中的示例代码生成完整页面
7. 所有样式使用 CSS 变量（`var(--por-xxx)`）确保与官网设计系统一致
8. **项目内部自研 CSS 统一加 `#{当前项目 id}` 前缀做样式隔离**，禁止全局裸选择器
9. 涉及交互的组件（轮播、页签、折叠、弹窗等）需引入 `theme-token.js` 并调用对应 jQuery 初始化方法
10. **开发者官网（developer.huaweicloud.com）场景页面：默认接入公共开发者页头 `<hd-header>`**（顺序与兜底见 [导航 / 页头](references/components/navigation.md)），不要自研页头；仅在无法接入公共页头时才退回 [登录模式页头](references/components/header-login.md)

### 2. 快速开始

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>华为云风格页面</title>
  <link rel="stylesheet" href="https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css">
  <style>
    body {
      font-family: HuaweiSans, PingFang SC, Microsoft YaHei, sans-serif;
      color: var(--por-color-text-primary);
      background: var(--por-color-background-white);
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3 class="por-text-title-t3" style="color: var(--por-color-text-primary);">华为云标题</h3>
    <p class="por-text-body-t3" style="color: var(--por-color-text-secondary);">正文内容</p>
  </div>
</body>
</html>
```

### 3. 设计原则

- **克制**：大量留白，内容呼吸感强
- **信息层级清晰**：标题 > 副标题 > 正文 > 辅助文字，层级分明
- **色彩克制**：以灰阶为主，华为红品牌色仅用于强调和按钮
- **圆角体系化**：按钮默认胶囊圆角（半径 = 高度，见下），`.por-card` 卡片圆角 `2px`；仅在确有需要时显式调整
- **阴影轻微**：只在 hover 和弹窗中使用极轻阴影
- **响应式**：支持 PC / Pad / Mobile 三端自适应

### 4. 关键设计数字速查

| 属性 | 值 |
|------|-----|
| 品牌红色 | `#C7000B`（`--por-base-color-red-huawei`） |
| 主文字色 | `#191919`（灰90） |
| 辅助文字色 | `#595959`（灰60） |
| 弱化文字色 | `#C2C2C2`（灰40） |
| 页面背景 | `#FFFFFF` / `#F5F5F5`（楼层灰底）/ `#FAFAFA`（卡片灰底） |
| 官网内容区宽 | `1600px`（楼层外框 1752 = 1600 + 76×2） |
| 门户容器宽 | `1280px`（1440 以下 `1200px`，`.por-container`） |
| 楼层上下 padding | `76px` |
| 主字体 | HuaweiSans, PingFang SC, Microsoft YaHei |
| 正文字号 | `14px`（`por-text-body-t3`） |
| 行高 | `22px`（14px 正文） |
| 按钮圆角 | 胶囊（设计稿实测四档恒 `24px`；`--por-button-size-radius-*` 用「半径=高度」，渲染等价） |
| 按钮高度 | `24 / 32 / 40 / 48px`（设计稿 Small → XLarge） |
| 卡片圆角 | `16px`（信息卡）/ `24px`（大卡、插画卡、套餐卡） |
| 主按钮填充 | `#191919`（非华为红；`#C7000B` 仅用于 error-active / 促销） |
| 插画画布比例 | `1.91 : 1`（非 16:9），主色 `#1476FF` / `#6CCD06` / `#FFAD04` |
| 通栏广告 | `1920 × 468`，左右 padding `456`，内容区 `1008`；标题 `56 / 48 / 40px` 三档 |
| 优势楼层 | 内容区 `1592px`（左右 padding `164`），卡组 gap `40`，3/4/5 张 |
| 应用场景架构图 | 楼层 `1920 × 1058`（padding `76 / 160`），左图右文 `6:4`（960 / 640）或 `5:5`，文字列 padding `48`、gap `40` |
| 全部产品展示 | 楼层 `1920 × 1318`，内容区 `1600` = 左索引 `270` + gap `60` + `1286`；产品卡 `418 × 202`（r16 / pad32 / 4 档断点） |
| 客户案例 Logo 墙 | 楼层 `1920 × 426`（带描述 `560`），卡高 `180`；一排 2~3 个 gap `24`、4~6 个 gap `16`；logo 安全区 `260 × 80` |
| 新闻 & 博客推荐 | 楼层 `1920 × 894`（padding `76 / 160`），3 张 `517 × 648`，卡间 gap `24`；图上压字用黑色渐变遮罩 |
| 奖项 / 图书楼层 | 楼层 `1920 × 906`（2 个）/ `744`（3 个）；图书卡 `788 × 310`（封面 `180 × 254`）、奖项卡 `568 × 218`（正文 `12px`） |
| 推荐文档 | 3 / 4 / 5 列：`517 × 242` / `388 × 242` / `307 × 290`；白底透明卡，无圆角无底色 |
| 常见问题 | 楼层 `1920 × 814`，内容块 `1600 × 480`（r16 / pad `24 32`）；问题 `20px`，单条收起 `1536 × 55` |
| 套餐组合卡 | `788 × 696` 三段（头部 210 / 亮点 164 / 规格 250 / 价格 72）；窄卡 `388 × 878`；价格红 `#C7000B`、推荐角标 `#D96900` |
| 产品页内导航 | 导航条 `1920 × 48`（1px `#DBDBDB` 下边框），产品名 `150` + gap `50` + 页签（16px，gap `32`）+ 按钮组 `216 × 32`；下拉面板 `368 × 450` |
| 楼层锚点 | `1920 × 76`（1536 下 `68`、1280 下 `60`）；1920 项定宽 `108` + gap `160`（居中）/ `80`（左对齐）；1536 / 1280 **5 等分**（`276` / `231`）；指示条 `2px` `#191919` |
| 楼层 Tab | 页签条 `1600 × 58`（pad `10 32`，gap `80`）、深底版 `1600 × 38`；项 `91 × 28`（18px），选中 `91 × 38`（含 2px 指示条）；换行 ON 折成 `66` 高、**字号不变** |
| 价格区 | 现价 `24px` + 原价 `14px` 同行（`gap 8`）；活动价现价 `#C7000B`；**原价不划线**（全库 0 处 `line-through`）；加价购开 +`76` 卡高 |
| 双卡售前 | 楼层 `1920 × 528`（pad `76 / 160`，底 `#F5F5F5`），两卡 `788 × 282`（r16 / pad `32 32 40`）+ gap `24`；联系方式 `401 × 36`（不换行）/ `724 × 72`（换行） |
| 产品推荐卡 | 楼层 `1920 × 652 / 676`（pad `76 / 160`）；一排 2/3/4/5 → 卡 `788/517/388/307 × 258`（5 个时 `282`）；**上下 pad `52`** 是特征值，无边框无按钮 |
| 栅格 | 24 列响应式 |

> **注意档位命名**：设计稿的 `Large`(40px) 对应 `por-btn-middle`，`XLarge`(48px) 对应 `por-btn-large`，按名字直译会整体错一档。详见 `references/components/buttons.md`。

### 5. 组件交互初始化速查

| 组件 | 初始化方法 |
|------|-----------|
| 轮播 Carousel | `$('#carousel1').porCarousel({...})` |
| 页签 Tab | `$('.por-tab-container').porTab()` |
| 折叠 Collapse | `data-toggle="por-collapse"` 或 `$().porCollapse()` |
| 弹窗 Modal | `data-toggle="modal" data-target="#id"` 或 `Modal.show(resetOptions)` |
| 分页 Pagination | `$('#pagination').porPagination({...})` |
| 评分 Rate | `$('#rate').porRate({...})` |
| 单选/复选组 | `$('.por-checkbox-card-group').porCheckboxGroup()` |
| 下拉 Select | `$().porSelect('getVal')` 等 |
| 锚点 Anchor | `$("#anchor1").porAnchor()` |
| 固定表头表格 | `$('#table1').porFixedtable()` |
| 倒计时 | `$('#countDown').countDown({ endTime: '...' })` |
| 日期选择 | `new $.fn.porDatePicker($el, config)` |
| 提示 Tips | `window.BaseUI.Info({...})` / `BaseUI.Tips($el, {...})` |

## 最佳实践

### 1. 颜色使用
- **优先使用 CSS 变量**：所有颜色应通过 `var(--por-xxx)` 引用，便于主题切换和维护
- **禁止直接使用基础变量**：`--por-base-*` 为底层变量，业务中优先使用语义变量（`--por-color-*`）
- **克制使用品牌红**：`#C7000B` 仅用于 CTA 按钮、链接 hover 状态、错误提示
- **灰阶为主**：界面以灰阶系统为基础，保持克制和专业的视觉风格
- **功能色有明确语义**：成功、警告、错误、信息色严格按照语义使用

### 2. 间距与布局
- **统一使用基础尺寸**：间距应基于 4px、8px、16px、24px、32px 等基础尺寸
- **楼层组织页面**：用 `.por-section` + `.por-container` 组织区块，通过 `data-bg` 控制背景
- **容器居中**：官网页面内容区用 `1600px`（楼层外框 1752 = 1600 + 76×2）；门户/后台页面用 `.por-container`（1280px / 1200px）。两者不要混用
- **楼层上下留白**：官网楼层 padding 固定 `76px`
- **响应式内边距**：移动端使用 15px，桌面端使用 20px
- **留白充足**：区块之间保持足够间距（至少 32px），确保内容呼吸感

### 3. 字体排版
- **使用语义化类名**：标题用 `por-text-title-t1/t2/t3`，正文用 `por-text-body-t1/t2/t3`
- **行高适中**：14px 正文使用 22px 行高
- **字重克制**：标题使用 700，正文使用 400，避免过度使用粗体
- **英文优先使用系统字体**：HuaweiSans、PingFang SC、Microsoft YaHei 作为降级

### 4. 响应式设计
- **大屏优先（desktop-first）**：PortalUI 栅格按 `max-width` 断点向下适配（见 `layouts/grid.md`），先满足大屏再适配移动端
- **断点统一**：栅格使用 `por-col-*` / `por-col-lg/md/sm/xs-*`，屏幕尺寸见 `layouts/grid.md`
- **图片自适应**：使用 `max-width: 100%; height: auto;`
- **字体流式**：使用相对单位（rem、%）或媒体查询调整字号

### 5. 交互状态
- **明确的 hover 反馈**：按钮、链接 hover 时背景色或边框色变化
- **禁用状态可见**：使用灰色背景和文字，降低不透明度
- **加载状态**：使用 spinner 或骨架屏
- **错误提示**：使用红色功能色和 alpha 背景

### 6. 性能优化
- **减少外部资源**：只引入必要的 CSS/JS 文件
- **使用 CSS 变量**：便于浏览器优化和减少重复代码
- **避免深层嵌套**：CSS 选择器不超过 3 层
- **使用 transform 和 opacity**：动画优先使用这两个属性

### 7. 组件优先与样式隔离（强制）
- **能用 OpenTiny 组件实现的，不要用 HTML 标签实现**：按钮/表格/表单/输入/下拉/日期/弹窗等一律用 `<tiny-*>` 组件，禁止用原生标签手写同等能力
- **项目内部 CSS 样式统一加 `#{当前项目 id}` 前缀**：如 `#my-project .card { }`，避免被 `global.min.css` / `developer-common.css` / PortalUI 等公共样式污染，同时避免污染其它页面
- **禁止全局裸选择器**：项目内不得直接写 `body` / `header` / `.card` 等无前缀选择器

## 常见问题（FAQ）

### Q1: CSS 变量不生效怎么办？
A: 检查以下几点：
1. 确认已引入 theme-token.css（建议 3.0.17 及以上版本）
2. 检查变量名拼写（`--por-xxx`）
3. 使用浏览器开发者工具查看变量是否定义
4. 确认作用域是否正确

### Q2: 组件交互不生效怎么办？
A: PortalUI 交互组件依赖 jQuery 和 `theme-token.js`：
1. 确认已引入 jQuery 和 `theme-token.js`
2. 确认已调用对应组件的初始化方法（见"组件交互初始化速查"）
3. 异步加载的内容需在加载完成后手动初始化

### Q3: 如何自定义主题颜色？
A: 可以在引入 theme-token.css 后覆盖 CSS 变量：
```css
:root {
  --por-base-color-red-huawei: #your-color;
}
```

### Q4: 移动端适配需要注意什么？
A: 关键点：
1. 使用 `viewport` meta 标签
2. 字号不小于 14px
3. 按钮高度不小于 44px（触控友好）
4. 横向滚动仅在必要时使用
5. 图片使用响应式属性

### Q5: 如何添加自定义组件？
A: 建议遵循以下步骤：
1. 使用设计 Token 定义样式变量
2. 参考 `references/components/` 中的组件结构
3. 添加交互状态（hover、active、disabled）
4. 确保响应式适配
5. 添加使用示例

### Q6: 为什么有些样式需要内联编写？
A: 这是由于主题 Token 某些属性未完整覆盖，临时解决方案：
1. 优先使用 CSS 变量
2. 内联样式仅用于调试和快速原型
3. 正式项目应提取到 CSS 文件

### Q7: 如何确保无障碍访问（Accessibility）？
A: 遵循以下实践：
1. 使用语义化 HTML 标签
2. 图片添加 alt 属性
3. 链接和按钮有清晰的文本描述
4. 颜色对比度符合 WCAG 2.1 AA 标准（至少 4.5:1）
5. 键盘导航可用

## 版本说明

| 版本 | 日期 | 更新内容 |
|------|------|---------|
| 2.9.1 | 2026-10-21 | **新增「产品推荐卡片」**（`references/layouts/product-recommend.md`，196 行）：官网「热门产品」楼层，与 `cards.md` 通用卡区分开——① 楼层 `1920 × 652`（带页签 `676`）/ `588`（无页签），pad `76 / 160`、底 `#F5F5F5`，标题区 `1600 × 170`（标题组 `509 × 90` + 页签条 `1600 × 58`，gap `22`），页签关时才用 `gap 40`；② 四种排布 2/3/4/5 个 → `788 / 517 / 388 / 307 × 258`，`2~3` 个 gap `24`、`4~5` 个 gap `16`，**5 个一排时卡高 `282`**（描述折两行所致，不可压回 258）；③ 卡内 `r16`、**上下 pad `52`**（特征值）、左右 `32`、gap `24`，图标 `64`、标题 `20px #191919`、描述 `16px #595959`，卡高由描述行数决定（`52+64+24+30+12+24n+52`）；④ 四档断点 `1920 / 1536 / 1280 / 1024`，字号逐档降 `20/16 → 16/14 → 14/12`、图标 `64 → 56 → 48`，1024 超 3 个折两行；⑤ 记录「描述带下划线」两种实现方案与取舍；SKILL.md 文件树 / 速查表 / 索引表同步 |
| 2.9.0 | 2026-10-20 | **补章：把 D 组五个模块的官网实测值写进既有文件（不新增文件）**：① `anchor.md` 新增「楼层锚点导航版式」——`1920 × 76` / `1536 × 68` / `1280 × 60` 三档 × 居中 / 左对齐六种组合，指出**大断点不等分**（1920 项定宽 `108`、gap `160`/`80`，总宽只 `1448`）与**小断点才等分**（1536 五等分 `276` 零间距、1280 `231`），项内 `gap: -2` 让 2px 指示条压住底边，opacity 0 是错的做法；② `price.md` 新增「官网价格区版式」——原价 `243 × 36` / 活动价 `176 × 36`、现价 `24px` + 原价块 `94 × 36`（pad `10 4`、gap `8`）、活动价用 `#C7000B` 而非 `#E02128`，并纠正一个反直觉结论：**原价不划线**（全库 18,289 节点中删除线 0 处，只有 218 处 UNDERLINE 且全是正文链接），加价购开卡高 `274 → 350`（+76）、规格行 `324 × 26` gap `24`、复选 `16 × 16` r4；③ `tabs.md` 新增「楼层 Tab」——标题区 `509 × 90`（标题 36px + 副标题行 24 gap `12`）与链接 `160 × 24`、页签条浅底 `1600 × 58`（pad `10 32`）/ 深底 `1600 × 38`（上下零 padding）、项 `91 × 28` 选中 `91 × 38`、**换行 ON 折成 `66` 高而字号仍 18px**、换行 OFF 总宽恒 `1600` 不出现滚动条、数量 4 为主力；④ `cards.md` 新增「双卡售前」——楼层 `1920 × 528`（pad `76 / 160`）、两卡 `788 × 282`（r16、pad `32 32 40`、gap `28`）、`788×2+24=1600`、图标 `48/60` 两档决定卡高 `350/370`、两卡必须 `align-items: stretch` 等高、联系方式 `401 × 36` 不换行 / `724 × 72` 换行两态与竖线 `#C2C2C2` 高度规则；⑤ `illustration.md` **修正第 4 节多列版式**——删除无依据的 `1024/1280/1536` 三列表（`304×468` / `368×468` / `444×564` 实际来自「1:1:1」通用三列模板，内部是 3 个 `304 × 140` 列表条目，不是插画卡），改为按内容区反算的四种合法组合（双列 `784×656`、1 宽 1 窄 `916+652`、单卡、三列 `517×648`）与小断点重算法；SKILL.md 速查表补 4 行、索引表补 4 条描述 |
| 2.8.0 | 2026-10-20 | **补齐官网 C 组六个楼层 / 组件（均取自设计稿节点树实测值）**：① 新增「新闻 & 博客推荐」（`references/layouts/news-blog.md`）——楼层 `1920 × 894`（padding `76 / 160`、底 `#F5F5F5`）、3 张 `517 × 648` 卡、卡间 gap `24`，三种卡结构（大图卡内容块 `453 × 222`、混合卡 `200 + 24 + 424`、列表卡 3 × `200`），图上压字的黑色渐变遮罩与对比度底线，四断点（`894 / 764 / 643 / 643`，左右 padding 提前收到 `78 / 64 / 32`）；② 新增「新闻 / 奖项 / 图书展示」（`references/layouts/news-award-book.md`）——楼层 `1920 × 906`（2 个）/ `744`（3 个），图书卡 `788 × 310`（封面 `180 × 254`、pad 28、标题 20px `#000000`、描述 ≤4 行、按钮 `120 × 40` ×2）、奖项卡 `568 × 218`（图 `120 × 170`、正文 `12px`、按钮 `104 × 32` ×2），两者字号/按钮尺寸差异表，四断点；③ 新增「推荐文档」（`references/layouts/doc-recommend.md`）——3/4/5 列（`517 × 242` / `388 × 242` / `307 × 290`，gap `24 / 16 / 16`）、白底透明卡（无底色无圆角，pad `20 32 32`）、标题 20px + 链接 16px（条间 gap 12）+ 底部「查看全部」`88 × 24` 箭头 `#808080`、卡高随链接条数 242/266/290、四断点；④ 新增「常见问题楼层」（`references/layouts/faq-floor.md`）——楼层 `1920 × 814`（padding `76 / 160`）、内容块 `1600 × 480`（r16 / pad `24 32`）、标题 36px + 副文 16px 一行、单条收起 `1536 × 55`（help 图标 24 + 问题 20px + fold 24，分隔线 `#DBDBDB`）、展开态正文 `16px` 行高 32、允许全展开不互斥、四断点；⑤ 新增「套餐组合卡」（`references/layouts/package-card.md`）——`788 × 696` 三段（头部 210 / 亮点 164 / 规格 250 / 价格 72，pad 32）、推荐角标 `80 × 24` `#D96900`、亮点 2 列 4 条、规格卡可收起、价格区 4 种排布（现价 20px 红 + 原价 12px / 24px + 计费说明 / 24px 红 + 划线原价）、窄卡 `388 × 878`、与 `plan-table` 的选型边界；⑥ 新增「产品页内导航」（`references/components/in-page-nav.md`）——导航条 `1920 × 48`（1px `#DBDBDB`）、产品名 `150`（18px）+ gap `50` + 页签（16px，gap `32`，选中 2px 下划线压边框）+ 按钮组 `216 × 32`、「更多」下拉 `368 × 450`（pad `24 16`、条目 gap 16）、吸顶层级 900 与 `scroll-margin-top: 48px`、四断点 |
| 2.7.0 | 2026-10-20 | **补齐官网三个 P1 楼层级模块（均取自设计稿节点树实测值）**：① 新增「应用场景架构图」（`references/layouts/scenario-architecture.md`）——楼层 `1920 × 1058`（padding `76 / 160`、底 `#F5F5F5`）、楼层 Tab `1516 × 134`（标题 36px + 页签条 `1600 × 58`）、内容区 `1600 × 760` 直角白卡、三种版式（左图右文 `6:4` 960/640、左图右文 `5:5`、左文右图 `5:5`）、文字列六区块实测（大标题 28 / 一级标题 20 / 二级标题 16 / 搭配使用服务网格 `2 × 3`（条目 264×36）/ 案例视频 `171 × 114 × 3` / 推荐机型）、1920-1536-1280-1024 四断点；② 新增「全部产品展示」（`references/layouts/product-catalog.md`）——楼层 `1920 × 1318`（另两种基础样式 1146 / 1138）、左索引 `270 × 998`（sticky、选中圆点 8×8）+ gap 60 + 右内容区 `1286`、三种基础样式（上下图标 / 左右图标 / 无图标）、产品卡四档断点（`418×202` / `365×172` / `304×140` / `240×140`，padding 32/28/24/24）、卡内规格（图标 52×52、名称 20px `#000000`、角标 `52×24` `#F23030`）、分类两级结构（28 / 24 标题）、四断点；③ 新增「客户案例 Logo 墙」（`references/layouts/logo-wall.md`）——楼层 `1920 × 426`（带描述 560）、一排 2~6 个的卡宽反推（788/517/388/307/253）与 gap 降档（2~3 个 24、4~6 个 16）、三种卡片形态（纯 logo `388×180`、logo+描述 `788×242` 且高度随描述行数 242/266/290/314、logo 卡片 `788×180`）、logo 安全区 `260 × 80` 与八档原始尺寸、白/灰/透明三态底色互补规则、四断点 |
| 2.6.0 | 2026-10-20 | **补齐官网三个 P0 楼层级组件（均取自设计稿节点树实测值）**：① 新增「插画」（`references/components/illustration.md`）——插画规范色 17 条（主色 `#1476FF`/`#6CCD06`/`#FFAD04`、点缀色、三组灰调点缀、三条渐变）、画布基准 `1.91:1`（非 16:9）、插画卡三规格（窄卡 `652×648`/宽卡 `916×648`/双列 `784×656`，圆角 24、padding 48、gap 32）、1024/1280/1536/1920 四套三列版式；② 新增「通栏广告」（`references/components/full-banner.md`）——页面中段整幅推广位 `1920×468`（`变主按钮` 为 `1916×392`）、左右 padding 456/670、内容区 1008/576、背景有/无图 + 辅助说明开/关、三档标题 56/48/40px，含「渐变字 + 纯色字」混排写法；③ 新增「优势楼层」（`references/layouts/advantage-floor.md`）——「为什么选我」楼层，内容区 `1592`（padding 164）、卡组 gap 40、3/4/5 张对应楼层高 1374/1566/2046，四种卡片类别（单卡片三档/插画窄卡/插画宽卡/通卡）实测尺寸与底色交替规则 |
| 2.5.0 | 2026-10-20 | **按官网设计稿（Cloud UI v1.0.0 PC 组件库）节点树实测值校准**：① 新增「套餐对比表格」组件（`references/components/plan-table.md`），补上空缺的售卖型表格（价格行/购买行/推荐列高亮/表头标签组）；② 容器宽度区分场景——官网内容区 `1600px`、门户容器 `1280px`（原文档只有 1280，生成官网大屏版式会窄 320px）；③ 卡片圆角补官网实测 `16px`/`24px` 两档（`.por-card` 的 2px 仅适用门户组件），并补卡片 padding 24/32/48、卡组 gap 16/24/28/40；④ 按钮补「设计稿档位映射表」（设计稿 `Large`(40)= `por-btn-middle`、`XLarge`(48)= `por-btn-large`，直译会整体错一档）、主按钮实测 `#191919`、四档左右 padding 16/24/32/48；⑤ 字阶补 `12px` 与 `20/24/28/32/36px` 楼层标题档；⑥ 色彩补插画色板 12 色、促销价红、致命告警 `#C7000B`（区别于普通错误 `#E02128`）、表格与内容底色 |
| 2.4.0 | 2026-10-15 | 新增「顶部广告横幅」组件（`references/components/ad-banner.md`）：促销/活动横幅，纯 CSS（自定义组件、非 baseui 类），含结构/样式/响应式/配色/交互/无障碍/设计原则；统一品牌红 `#C7000B`、统一样式隔离 `#当前项目id` 前缀 |
| 2.3.0 | 2026-10-13 | 新增「OpenTiny 组件库（组件优选）」：Vue 3 工程优先用 OpenTiny（TinyVue）组件、给出 `npx skills add opentiny/agent-skills --list` 安装方式与组件选型对照表；新增「样式隔离规范」：项目内部 CSS 统一加 `#{当前项目 id}` 前缀避免公共样式污染；在 使用指南 / 最佳实践 / 前置条件 同步两条强制原则 |
| 2.2.2 | 2026-09-28 | 明确**开发者官网场景页面默认接入公共开发者页头 `<hd-header>`**：统一 SKILL（描述/使用场景/使用指南/文件结构/参考文档）、navigation.md 接入策略、header-login.md 措辞为「默认接入」，自研页头为备选 |
| 2.2.1 | 2026-09-28 | 全量校对（比对 cnpm-baseui 3.0.17 实际 CSS）：移除不存在的类名 `por-native`/`por-tips`/`por-modal-text`/`por-anchor-slide`/`por-rate` 及虚构组件「图片查看器」(img-viewer.md)；标注 banner 轮播的开发者站自定义类；修正 `#1476ff`、`zindex-fixed` Token、卡片圆角 `2px`、default 按钮 padding、`textOverflow` 作用域；`page-structure.md`/`examples` 开发者站模板改接公共页头；统一 desktop-first 表述 |
| 2.2.0 | 2026-09-28 | ① 页头改为**优先接入华为云开发者公共页头** `<hd-header>`（navigation.md 重写：head 固定加载顺序、`?url=`/`window.developerHeaderUrl` 双通道同 URL、登录/登出链接轮询兜底），自研页头降为备选（header-login.md）；② 修正按钮圆角：`cnpm-baseui@3.0.17` 起 `.por-btn` 默认为**胶囊圆角**（半径 = 高度 24/32/40/48px，`--por-button-size-radius-*`），旧文档 `2px` 有误（buttons.md / shadows-radii.md / SKILL.md） |
| 2.1.0 | 2026-09-10 | 新增可选模式「登录模式页头」（references/components/header-login.md）：自研页头场景下 PC + 移动端登录区规范（登录链接/用户名下拉/移动端全宽面板/注册登录胶囊按钮），移动端交互对齐 developer.huaweicloud.com/grow 页 header-tools 官方效果；附滚动条宽度补偿（--hc-sbw）与 TinyVue 表单校验 validate-type 踩坑记录 |
| 2.0.0 | 2026-08-17 | 依据 Tiny PortalUI 官方文档全面更新：升级 baseui 至 3.0.17、补齐全部组件（图标/文本/输入框/下拉/单选复选/日期选择/提示/标签/面包屑/分页/轮播/评分/价格/倒计时/滚动条/播放器/锚点/折叠/图片查看器/服务表格/固定表头表格）、新增 XTemplate 语法与楼层布局、更新设计 Token |
| 1.0.0 | 2024-04-27 | 初始版本，提取华为云官网 UI 设计规范 |

## 参考文档

| 文档 | 说明 |
|------|------|
| [快速开始](references/getting-started.md) | 引入方式、Token 使用规范 |
| [XTemplate 指南](references/xtemplate.md) | 模板引擎语法 |
| [色彩体系](references/tokens/colors.md) | 基础调色板、文字/背景/边框/功能色 |
| [字体排版](references/tokens/typography.md) | 字体族、字重、语义化字号类名 |
| [间距系统](references/tokens/spacing.md) | 基础尺寸、容器宽度、响应式断点 |
| [阴影与圆角](references/tokens/shadows-radii.md) | 阴影系统、圆角系统 |
| [层级规范](references/tokens/level.md) | z-index 层级定义 |
| [样式工具类](references/tokens/utils.md) | radius/shadow 工具类 |
| [文本](references/components/text.md) | 文本字体规范 |
| [图标](references/components/icon.md) | 字体图标、产品图标 |
| [按钮组件](references/components/buttons.md) | 按钮尺寸、类型、状态、HTML 模板 |
| [链接组件](references/components/links.md) | 文字链接、锚点 |
| [输入框](references/components/input.md) | 单行/多行/关联输入框 |
| [下拉选择框](references/components/select.md) | 原生 select 封装 |
| [单选/复选](references/components/checkbox.md) | 选择组、卡片选择组 |
| [日期选择器](references/components/datepicker.md) | PC/Mobile 双端日期选择 |
| [弹窗组件](references/components/modal.md) | 模态框、对话框 |
| [提示 Tips](references/components/tips.md) | 告警提示、箭头 tips |
| [标签](references/components/label.md) | 标签尺寸、颜色 |
| [面包屑](references/components/breadcrumb.md) | 导航层级指示 |
| [分页](references/components/pagination.md) | 动态/静态分页 |
| [轮播](references/components/carousel.md) | 轮播图配置、方法、事件 |
| [评分](references/components/rate.md) | 星级评分 |
| [价格](references/components/price.md) | 价格展示、官网价格区（活动价/原价/加价购，原价不划线） |
| [倒计时](references/components/countdown.md) | 活动倒计时 |
| [滚动条](references/components/scrollbar.md) | 自定义滚动条 |
| [视频播放](references/components/player.md) | 视频播放器 |
| [页签组件](references/components/tabs.md) | Tabs 切换、楼层 Tab 版式（标题区 + 页签条、换行 ON/OFF） |
| [锚点导航](references/components/anchor.md) | 页面内锚点、楼层锚点等分版式（三档断点 × 居中/左对齐） |
| [折叠组件](references/components/collapse.md) | 折叠/展开 |
| [卡片组件](references/components/cards.md) | 卡片类型、官网实测规格、排布密度、收起规则、双卡售前 |
| [套餐对比表格](references/components/plan-table.md) | 多套餐横向对比、价格行、购买行、推荐列高亮 |
| [服务表格](references/components/service-table.md) | 支持与服务风格表格 |
| [固定表头表格](references/components/fixed-table.md) | 常规表格 |
| [导航 / 页头](references/components/navigation.md) | 开发者官网场景默认接入公共页头 `<hd-header>`（加载顺序/双通道/登录链接兜底），自研页头为备选 |
| [登录模式页头](references/components/header-login.md) | 备选自研页头：PC + 移动端登录区（登录/用户菜单/全宽面板） |
| [顶部广告横幅](references/components/ad-banner.md) | 促销/活动横幅（自定义组件，纯 CSS） |
| [通栏广告](references/components/full-banner.md) | 页面中段整幅推广位（1920×468，背景有/无图、变主按钮） |
| [插画](references/components/illustration.md) | 插画规范色板 17 色、1.91:1 画布、插画卡版式 |
| [Banner 组件](references/components/banner.md) | Hero Banner、轮播图 |
| [页脚组件](references/components/footer.md) | 页脚布局、链接 |
| [页面结构](references/layouts/page-structure.md) | 页面骨架、区块划分 |
| [栅格系统](references/layouts/grid.md) | 栅格布局、响应式栅格 |
| [楼层](references/layouts/floor.md) | Section 楼层容器 |
| [优势楼层](references/layouts/advantage-floor.md) | 「为什么选我」楼层（3~5 张同构卡，通卡/单卡/插画窄卡/插画宽卡） |
| [应用场景架构图](references/layouts/scenario-architecture.md) | 左图右文架构图楼层（6:4 / 5:5 / 镜像，搭配服务、案例视频、推荐机型） |
| [全部产品展示](references/layouts/product-catalog.md) | 左索引 + 分类分组的产品卡地图（418/365/304/240 四档断点） |
| [客户案例 Logo 墙](references/layouts/logo-wall.md) | 客户背书楼层（一排 2~6 个 logo，纯 logo / logo+描述 / 加宽卡） |
| [新闻 & 博客推荐](references/layouts/news-blog.md) | 3 张图文内容卡（大图卡 / 混合卡 / 列表卡，图上压字遮罩） |
| [奖项 / 图书展示](references/layouts/news-award-book.md) | 荣誉与认证楼层（图书卡 788×310、奖项卡 568×218） |
| [推荐文档](references/layouts/doc-recommend.md) | 文档与学习成长楼层（3/4/5 列透明卡 + 链接清单） |
| [常见问题楼层](references/layouts/faq-floor.md) | FAQ 大白卡 + 可折叠问答（20px 问题、单条 55 高） |
| [套餐组合卡](references/layouts/package-card.md) | 售卖套餐卡（788×696 三段式，价格区 4 种排布、窄卡 388×878） |
| [产品推荐卡片](references/layouts/product-recommend.md) | 推荐产品卡组（2~5 个一排、上下 pad 52、无按钮，四档断点） |
| [产品页内导航](references/components/in-page-nav.md) | 吸顶二级导航（产品名 + 页签 + 更多下拉 + 购买按钮） |
| [开发者站首页示例](references/examples/homepage-dev.html) | 完整的 HTML 示例代码 |
| [主站首页示例](references/examples/homepage-main.html) | 完整的 HTML 示例代码 |

## 注意事项

- 本 Skill 基于华为云 Tiny PortalUI 官方文档整理，CSS 变量前缀为 `por-`
- 设计 Token / 组件库位于 `https://portal.hc-cdn.com/cnpm-baseui/3.0.17/theme-token.css`，交互脚本为 `theme-token.js`（依赖 jQuery）
- 所有样式应使用 CSS 变量（`var(--por-xxx)`）而非硬编码值，确保与官网设计系统一致
- 以 `--por-base-` 开头的底层基础变量不建议在业务中直接引用，应优先使用语义变量
- 主站公共样式为可选引入，仅提供基础重置和工具类
- 栅格系统遵循 5 档断点：超大屏（>1600px）、大屏（≤1600px）、中屏（≤1280px）、小屏（≤1024px）、超小屏（≤768px）
- 华为云设计风格强调克制和留白，避免过度装饰
- 华为红 `#C7000B` 仅用于强调和按钮，不宜大面积使用
- 所有组件和布局规范详见 `references/` 下的详细文档
