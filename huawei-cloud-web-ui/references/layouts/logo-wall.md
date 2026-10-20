# 客户案例 Logo 墙（Logo Wall Floor）

来源：官网设计稿「客户案例logo墙」页面（`纯logo` 5 档 + `logo+描述` 5 档 + `logo卡片` + `多分辨率` 4 档）节点树实测

首页、解决方案页、产品页里做「**谁在用**」背书的楼层：一排 2~6 张等宽卡，每张一个客户 logo，可选配一句客户介绍。

它是**楼层级组合**，不是单个组件——卡片本体见 `components/cards.md`，本文只定义「怎么把 logo 排成可信的一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 首页客户背书（名额少、要显大） | `纯logo` × 2~3，gap `24` |
| 首页客户背书（名额多、铺量） | `纯logo` × 4~6，gap `16` |
| 客户案例页开头（带一句介绍） | `logo+描述` × 3 |
| 单个标杆客户（横贯） | `logo卡片` × 1，`788 × 180` |

**不要**用它做：合作伙伴分级（用表格）、奖项/资质（用图书卡或图文卡）、需要点击跳转的案例列表（用 `cards`，logo 墙的可点击区域太小）。

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层画板（不带描述） | `1920 × 426` | |
| 楼层画板（带描述） | `1920 × 560` | 单卡高 `242` |
| 上下 padding | `76px` | 与其他楼层一致 |
| 左右 padding | `160px` | 内容区 = **1600px** |
| 楼层标题 | `36px` `#191919`，`254 × 54` | 左对齐，不用居中 |
| 标题 → 卡行 gap | `40` | |
| 卡行高 | `180` | 纯 logo 版 |

```css
.por-logo-floor {
  padding: 76px 160px;
  background: #F5F5F5;
}

.por-logo-floor__title {
  font-size: 36px;
  line-height: 54px;
  color: #191919;
  margin: 0 0 40px;
}

.por-logo-grid { display: grid; gap: 16px; }
```

## 3. 一排几个（实测反推）

| 一排个数 | 卡宽 | 卡高 | gap | 计算 |
| --- | --- | --- | --- | --- |
| 2 | `788` | `180` | `24` | (1600 − 24) / 2 |
| 3 | `517` | `180` | `24` | (1600 − 48) / 3 |
| 4 | `388` | `180` | `16` | (1600 − 48) / 4 |
| 5 | `307` | `180` | `16` | (1600 − 64) / 5 |
| 6 | `253` | `180` | `16` | (1598 − 80) / 6 |

> **gap 随个数降档**：2~3 个用 `24`，4~6 个用 `16`。这不是设计随意——5 个及以上如果还用 24，卡宽会掉到 296 以下，logo 放不下。

## 4. 卡片三种形态（实测）

| 形态 | 尺寸 | 圆角 | padding | 内部 gap | 内容 |
| --- | --- | --- | --- | --- | --- |
| `纯logo` | `388 × 180`（2/3 个时 788 / 517） | `16` | `32` | `16` | 单 logo，**水平垂直居中** |
| `logo+描述` | `788 × 242` | `16` | `32 32 40 32` | `28` | logo（左上）+ 标题 `20px` + 描述 `16px` |
| `logo卡片` | `788 × 180` | `16` | `32` | `16` | 单 logo，加宽横版 |

### 4.1 纯 logo 卡

| 项 | 值 |
| --- | --- |
| 卡 | `388 × 180`，`r16`，padding `32` |
| logo 最大尺寸 | `260 × 80` |
| 对齐 | 居中（实测 x/y 上下左右留白相等） |
| logo 内 padding | `4`（保护留白，避免贴边） |

logo 本身有多种原始尺寸，实测出现的档位：`100×32`、`132×42`、`162×51`、`94×52`、`162×64`、`144×80`、`202×80`、`260×80`。

**统一规则**：所有 logo 等比缩放进 `260 × 80` 的安全区，**不拉伸**，保持原始比例；高 logo 按高对齐，宽 logo 按宽对齐。

```css
.por-logo-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  padding: 32px;
  border-radius: 16px;
  background: #FFFFFF;
}
.por-logo-card img {
  max-width: 260px;
  max-height: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
}
```

### 4.2 logo + 描述卡

| 项 | 值 |
| --- | --- |
| 卡（788 宽） | `788 × 242` |
| padding | 上 `32` / 右 `32` / 下 `40` / 左 `32` |
| 内部竖向 gap | `28` |
| logo 区 | `144 × 80`（左对齐，可缩到 `100 × 32`） |
| 标题 | `20px` `#191919`，高 `30` |
| 描述 | `16px` `#595959`，行高 `24` |
| 标题 → 描述 gap | `8` |

**高度随描述行数变化（实测）**

| 卡宽 | 卡高 | 描述行数 | 验算 |
| --- | --- | --- | --- |
| `788` | `242` | 1 | 32 + 80 + 28 + 62 + 40 |
| `517` | `266` | 2 | 32 + 80 + 28 + 86 + 40 |
| `388` | `266` | 2 | 同上 |
| `307` | `290` | 3 | 32 + 80 + 28 + 110 + 40 |
| `253` | `314` | 4 | 32 + 80 + 28 + 134 + 40 |

> 同排卡片**高度必须一致**（用 `align-items: stretch`），以最高的一张为准，其余卡片描述区下方留白。设计稿里 788 与 253 不会同排。

```html
<article class="por-logo-case">
  <img class="por-logo-case__logo" src="fanruan.svg" alt="帆软">
  <h3 class="por-logo-case__title">帆软</h3>
  <p class="por-logo-case__desc">中国专业的大数据 BI 和分析平台提供商，专注商业智能与数据分析。</p>
</article>
```

```css
.por-logo-case {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 32px 40px;
  border-radius: 16px;
  background: #FFFFFF;
}
.por-logo-case__logo { width: auto; height: 80px; max-width: 144px; object-fit: contain; align-self: flex-start; }
.por-logo-case__title { font-size: 20px; line-height: 30px; color: #191919; margin: 0; }
.por-logo-case__desc  { font-size: 16px; line-height: 24px; color: #595959; margin: 8px 0 0; }
```

## 5. 底色三态（实测）

设计稿给了 `白底 / 灰底 / 透明底` 三种卡片底，对应楼层底色必须**互补**：

| 卡片底 | 楼层底 | 效果 |
| --- | --- | --- |
| `白` `#FFFFFF` | `灰` `#F5F5F5` | 卡片浮在灰楼层上（主力） |
| `灰` `#F5F5F5` | `白` `#FFFFFF` | 卡片嵌在白楼层里 |
| `透明` | `白` 或 `灰` | 只留 logo，不要卡片轮廓 |

```css
.por-logo-floor--grey  { background: #F5F5F5; }  /* 配白卡 */
.por-logo-floor--white { background: #FFFFFF; }  /* 配灰卡 */
.por-logo-floor--plain .por-logo-card { background: transparent; }
```

> 透明底时**不要保留 padding 视觉**——logo 之间的间距靠 grid gap 撑，卡片 padding 仍在（保证 logo 不贴边），但背景透明会让它看起来「没有卡」。

## 6. 四断点实测

| 断点 | 楼层高（无描述 / 带描述） | 上下 / 左右 padding | 内部 gap |
| --- | --- | --- | --- |
| `1920` | `426 / 560` | `76 / 160` | `40` |
| `1600` | `426 / 560` | `76 / 160` | `40` |
| `1536` | `348 / 474` | `60 / 160` | `36` |
| `1280` | `292 / 398` | `52 / 160` | `28` |
| `1024` | `272 / —` | `52 / 160` | `28` |
| `769` | `272 / —` | `52 / 160` | `28` |

> 1440 以下楼层高度掉得比内容快——因为卡行高度从 `180` 收到 `140`，见下。

```css
@media (max-width: 1535px) {
  .por-logo-floor { padding: 60px 160px; }
  .por-logo-floor__title { font-size: 32px; line-height: 48px; margin-bottom: 36px; }
  .por-logo-card { height: 160px; padding: 28px; }
}
@media (max-width: 1279px) {
  .por-logo-floor { padding: 52px 32px; }
  .por-logo-floor__title { font-size: 28px; line-height: 40px; margin-bottom: 28px; }
  .por-logo-card { height: 140px; padding: 24px; }
  .por-logo-grid { gap: 16px; }
}
@media (max-width: 1023px) {
  /* 6 列 → 3 列 → 2 列 */
  .por-logo-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 767px) {
  .por-logo-floor { padding: 40px 15px; }
  .por-logo-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .por-logo-card { height: 96px; padding: 16px; }
  .por-logo-card img { max-width: 100%; max-height: 48px; }
}
```

## 7. 选型决策规则

| 判断 | 结论 |
| --- | --- |
| 客户 8 个以上？ | 用 5~6 个一排铺两行，不要「轮播」——轮播会让 70% 的 logo 看不到 |
| 客户 4~6 个？ | 4 个一排 `gap 16`，或 3 个一排 `gap 24` |
| 只有 1~2 个标杆客户？ | `logo卡片` 横贯，或 `logo+描述` 大卡 |
| 需要讲客户故事？ | 换 `logo+描述`，每个客户一句 ≤ 40 字 |
| 客户 logo 深浅不一（黑白/彩色混）？ | 统一转灰（详见下） |
| 有客户授权限制？ | 只放拿到授权的，宁缺毋滥 |

**logo 一致性处理**：混排彩色 logo 会显得杂乱。实测设计稿里 logo 是单色灰 `#C4C4C4` 占位——**推荐统一为单色**（`filter: grayscale(1)` 或直接提供单色版），悬停时恢复品牌色。

```css
.por-logo-card img { filter: grayscale(1); opacity: .75; transition: filter .2s, opacity .2s; }
.por-logo-card:hover img { filter: none; opacity: 1; }
```

## 8. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | ≤ 10 字，名词性 | 「客户案例」/「他们都在用」 |
| 客户名 | 与 logo 一致，不额外加「有限公司」 | 「帆软」 |
| 客户描述 | **≤ 40 字**，写「是谁 + 做什么」，不写夸奖 | 「中国专业的大数据 BI 和分析平台提供商。」 |
| 数量 | 3 的倍数最好看（2/3/4/6），避开 5 |

同排客户**行业要分散**——全是银行会让用户以为这是金融专区。

## 9. Do / Don't

**Do**

- ✅ logo 等比缩放，不拉伸、不裁切
- ✅ logo 统一灰度，悬停恢复彩色
- ✅ 同排卡片等高（`align-items: stretch`）
- ✅ 标题左对齐，与内容区左边缘对齐

**Don't**

- ❌ 不要把 logo 做成轮播（自动播放的 logo 墙基本没人看）
- ❌ 不要给 logo 卡加阴影（卡片体系里没有阴影，见 `shadows-radii.md`）
- ❌ 不要让 logo 超出 `260 × 80` 安全区（撑满卡片会显得廉价）
- ❌ 不要在 logo 墙上放「查看更多客户」按钮——用楼层的「更多」链接
- ❌ 不要用彩色背景卡衬托 logo（背景色会污染品牌色）
