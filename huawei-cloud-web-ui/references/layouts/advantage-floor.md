# 优势楼层（Advantage Floor）

来源：官网设计稿「产品&解决方案优势」楼层（7 个变体）+「楼层样式」组合（3/4/5 张 × 灰/白）实测

产品页、解决方案页里回答「**为什么选我**」的楼层：一排 3~5 张同构卡片，每张讲一个优势点，配插画或图标。

它是**楼层级组合**，不是单个卡片——卡片本体见 `components/cards.md`，插画规范见 `components/illustration.md`，本文只定义「怎么把卡片排成一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 产品核心优势（3~5 条卖点） | 插画窄卡 × 3/4/5 |
| 解决方案价值（客户收益） | 单卡片 × 3/4/5 |
| 能力对比（新旧方案 / 竞品） | 插画宽卡 × 2（左右对照） |
| 生态能力全景（一横条覆盖） | 通卡 × 1 |

**不要**用它做：需要逐项对比的规格（用 `plan-table`）、内容长度差异很大的图文（用 `cards` 的自由卡）、价格套餐（用套餐卡组）。

## 2. 楼层规格（实测）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层高度（3 张） | `1374px` | 满宽 1920 |
| 楼层高度（4 张） | `1566px` | |
| 楼层高度（5 张） | `2046px` | 多出一排，高度跳一档 |
| 上下 padding | `76px` | 与其他楼层一致 |
| 左右 padding | `164px` | 内容区 = 1920 − 164 × 2 = **1592px** |
| 卡片组 gap | `40px` | |
| 标题区 | `1516 × 54` | 楼层标题（可选） |
| 卡片区 | `1592 × 1320` | 4 张卡时 |

```css
.por-advantage-floor {
  padding: 76px 164px;
  background: #FFFFFF;
}

.por-advantage-head {
  max-width: 1516px;
  margin: 0 auto 40px;
}

.por-advantage-grid {
  max-width: 1592px;
  margin: 0 auto;
  display: grid;
  gap: 40px;
}
```

## 3. 卡片选型（实测四种类别）

| 类别 | 尺寸 | 圆角 | padding | 内部 gap | 底色 | 用在哪 |
| --- | --- | --- | --- | --- | --- | --- |
| `单卡片`（大） | `681 × 558` | `24` | `40` | `24` | `#FAFAFA` | 3 张一排 |
| `单卡片`（中） | `568 × 474` | `24` | `32` | `24` | `#FAFAFA` | 4 张一排 |
| `单卡片`（小） | `472 × 434` | `24` | `32` | `28` | `#FAFAFA` | 5 张一排 |
| `单卡片`（白） | `784 × 648` | `24` | `48` | `32` | `#FFFFFF` | 2 张一排 / 主推位 |
| `插画窄卡` | `652 × 648` | `24` | `48` | `32` | `#FFFFFF` / `#FAFAFA` | 3 张一排（带按钮） |
| `插画宽卡` | `916 × 648` | `24` | `48` | `32` | `#FAFAFA` | 2 张一排（左右对照） |
| `通卡` | 铺满 `1592` | `24` | `48` | `32` | `#FAFAFA` | 单条横贯 |

**排列规律（实测反推）**

| 一排张数 | 单卡宽度 | 计算 |
| --- | --- | --- |
| 3 张 | `504 / 517` | (1592 − 40 × 2) / 3 ≈ 504 |
| 4 张 | `368` | (1592 − 40 × 3) / 4 = 368 |
| 5 张 | `288` | (1592 − 40 × 4) / 5 ≈ 286 |

> 卡片**不等高**是允许的（568×474 与 652×648 可以同排），但**底部按钮必须对齐**——用 `align-items: stretch` + 卡片内 `flex: 1` 撑开描述区实现。

## 4. 卡片内部结构（实测）

```
┌──────────────────────────────┐
│  padding 48                   │
│  ┌────────────────────────┐  │
│  │   插画（1.91:1）        │  │  ← 插画区 556×360 / 820×360
│  └────────────────────────┘  │
│         ↕ 24                  │
│  优势标题2            28px    │  ← 标题（单行）
│         ↕ 16                  │
│  描述文字最多两行……           │  ← 描述（≤2 行，16px #595959）
│         ↕ 24                  │
│  [ 了解详情 ]                 │  ← 按钮组 256×40 gap 16
└──────────────────────────────┘
```

| 元素 | 实测值 |
| --- | --- |
| 插画区（窄卡） | `556 × 360` |
| 插画区（宽卡） | `820 × 360` |
| 插画区（4 卡） | `504 × 280`（内 padding 40） |
| 标题 | `28px` / `#191919` / 单行 |
| 描述 | `16px` / `#595959` / ≤2 行 |
| 按钮组 | `256 × 40`（`Medium`），组内 gap `16` |
| 小卡按钮组 | `216 × 32`（`Small`），组内 gap `8` |

## 5. 底色交替规则（实测确认）

设计稿用**楼层底色与卡片底色互补**，形成节奏：

| 卡片底 | 楼层底 | 效果 |
| --- | --- | --- |
| `灰` `#FAFAFA` | `白` `#FFFFFF` | 卡片浮在白色页面上（主力用法） |
| `白` `#FFFFFF` | `灰` `#FAFAFA` | 卡片嵌在灰底楼层里 |

**同一楼层不能混用三种底色**，也不能出现「灰底楼层 + 灰底卡片」（层级消失）。

```css
/* 灰卡 + 白楼层 */
.por-advantage-floor { background: #FFFFFF; }
.por-advantage-card { background: #FAFAFA; }

/* 白卡 + 灰楼层 */
.por-advantage-floor--grey { background: #FAFAFA; }
.por-advantage-floor--grey .por-advantage-card { background: #FFFFFF; }
```

## 6. 完整示例

```html
<section class="por-advantage-floor">
  <div class="por-advantage-head">
    <h2 class="por-title-t3">为什么选择华为云 Flexus</h2>
  </div>
  <div class="por-advantage-grid" style="grid-template-columns: repeat(4, 1fr);">
    <article class="por-advantage-card">
      <img class="por-illu" src="security.svg" alt="三个可用区相互隔离">
      <h3 class="por-advantage-title">安全快速隔离</h3>
      <p class="por-advantage-desc">独享资源池，故障域隔离，业务互不影响。</p>
      <a class="por-btn por-btn-secondary por-btn-middle" href="…">了解详情</a>
    </article>
    <!-- 其余 3 张同构 -->
  </div>
</section>
```

```css
.por-advantage-card {
  display: flex;
  flex-direction: column;
  padding: 48px;
  gap: 24px;
  background: #FAFAFA;
  border-radius: 24px;
}

.por-advantage-title {
  font-size: 28px;
  line-height: 40px;
  color: #191919;
  margin: 0;
}

.por-advantage-desc {
  font-size: 16px;
  line-height: 26px;
  color: #595959;
  margin: 0;
  flex: 1;                     /* 撑开，保证按钮底部对齐 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 断点：4 列 → 2 列 → 1 列 */
@media (max-width: 1439px) {
  .por-advantage-floor { padding: 76px 40px; }
  .por-advantage-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px; }
  .por-advantage-card { padding: 32px; }
  .por-advantage-title { font-size: 24px; line-height: 34px; }
}

@media (max-width: 767px) {
  .por-advantage-floor { padding: 48px 15px; }
  .por-advantage-grid { grid-template-columns: 1fr !important; }
  .por-advantage-card { padding: 24px; }
  .por-advantage-title { font-size: 20px; }
}
```

## 7. 排布决策规则

| 判断 | 结论 |
| --- | --- |
| 每张卡都有插画 + 描述 + 按钮？ | 用 `插画窄卡`，3 张一排 |
| 只有图标 + 标题 + 短描述？ | 用 `单卡片`，4~5 张一排 |
| 需要左右对照（新 vs 旧）？ | `插画宽卡` × 2 |
| 只有一句话 + 一个链接？ | `通卡` × 1，不要拆成多张空卡 |
| 优势点超过 5 条？ | **拆成两个楼层**，不要塞 6 张（5 张以上文字会挤成两行） |

## 8. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | ≤ 20 字，一句话说清这一层在讲什么 | 「为什么选择华为云 Flexus」 |
| 卡片标题 | **4~8 字**，动宾或名词短语，同层结构一致 | 「安全快速隔离」「秒级计费」「多端建站」 |
| 描述 | **≤ 2 行 / 40 字**，讲结果不讲参数 | 「独享资源池，故障域隔离，业务互不影响。」 |
| 按钮 | 弱化，多数用「了解详情」；只有主推位用「立即购买」 | |

同层卡片标题必须**字数接近、句式一致**（都是动宾，或都是名词），否则视觉上参差不齐。

## 9. Do / Don't

**Do**

- ✅ 一层只讲一个主题，3~5 张卡片讲同一主题的不同侧面
- ✅ 卡片等高、按钮底部对齐（描述区 `flex: 1`）
- ✅ 楼层底色与卡片底色互补
- ✅ 插画风格统一（见 `illustration.md`）

**Don't**

- ❌ 不要在一层里混用不同类别的卡（插画卡 + 纯文字卡混排会失衡）
- ❌ 不要让某张卡没有插画/图标——会形成视觉空洞，用户以为漏了
- ❌ 不要把「优势」写成参数罗列（「8 核 16G」不是优势，是规格）
- ❌ 不要超过 5 张；超过就拆楼层
- ❌ 不要给每张卡配不同色系的插画背景
