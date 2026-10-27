# 新闻 & 博客推荐（News & Blog Floor）

来源：官网设计稿「新闻&博客推荐」页面（`楼层` 画板 12 个变体：1920/1536/1280/1024 × 5/6/7 个 + `单卡` 三种结构）节点树实测

首页、产品页、解决方案页底部的「**最新动态**」楼层：一排 3 张卡，每张卡是一个内容位，展示新闻 / 博客 / 白皮书。

它是**楼层级组合**，不是单个组件——卡片本体见 `components/cards.md`，图片比例见 `components/illustration.md`，本文只定义「怎么把内容推荐排成一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 首页「新闻动态」 | `大图卡` × 3（517 × 648） |
| 产品页「相关博客」 | `混合卡` × 3（上图下文 200 + 大图 424） |
| 资讯聚合位（多条短内容） | `列表卡` × 3（每张卡内 3 条 517 × 200） |

**不要**用它做：文档目录（用 `doc-recommend`）、客户案例（用 `logo-wall`）、活动推广（用 `full-banner`）。

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层画板 | `1919 × 894` | 5 / 6 / 7 个变体高度一致 |
| 上下 padding | `76px` | |
| 左右 padding | `160px` | 内容区 `1599px` |
| 楼层底色 | `#F5F5F5` | |
| 楼层标题 | `36px` `#191919`，`144 × 54` | 左对齐 |
| 标题 → 卡行 gap | `40` | |
| 卡行 | `1599 × 648` | 3 张 × 517 + 2 × 24 |
| 卡间 gap | `24` | |

```css
.por-news-floor {
  padding: 76px 160px;
  background: #F5F5F5;
}
.por-news-floor__title { font-size: 36px; line-height: 54px; color: #191919; margin: 0 0 40px; }
.por-news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

## 3. 三种卡片结构（实测，均为 `517 × 648`）

三种结构的**外框尺寸完全一致**，只是内部图文配比不同，可同排混用。

### 3.1 大图卡（全幅图 + 底部内容）

```
┌────────────────────┐
│                    │
│   图片 517 × 648    │  ← 整卡是图，r16
│                    │
│  ┌──────────────┐  │  ← 内容块 453 × 222，叠在图左下，padding 32
│  │ 类别1  16px   │  │
│  │ 标题 20px     │  │
│  │ 描述 16px×3行  │  │
│  │ [按钮] [按钮]  │  │  256 × 40，gap 16
│  └──────────────┘  │
└────────────────────┘
```

| 元素 | 值 |
| --- | --- |
| 卡片 | `517 × 648`，`border-radius: 16px` |
| 内容块 | `453 × 222`，位于卡内左下，padding `32` |
| 内容块 gap | `32`（文案区 ↔ 按钮组）/ `12`（文案区内） |
| 类别 | `16px` `#FFFFFF` |
| 标题 | `20px` `#FFFFFF`，单行 |
| 描述 | `16px` `#FFFFFF`，最多 3 行（72 高） |
| 按钮组 | `256 × 40`，两枚 `120 × 40`，gap `16` |

### 3.2 混合卡（小图 + 大图）

| 区块 | 尺寸 | 说明 |
| --- | --- | --- |
| 上：横向小条 | `517 × 200`（r16） | 图 + 标题压在图左下（内容块 `206 × 66`，gap `12`） |
| gap | `24` | |
| 下：大图 | `517 × 424`（r16） | 内容块 `426 × 222`，padding `32` |
| 合计 | `200 + 24 + 424 = 648` | |

### 3.3 列表卡（卡内 3 条）

| 项 | 值 |
| --- | --- |
| 单条 | `517 × 200`，r16 |
| 条间距 | `24` |
| 3 条合计 | `200 × 3 + 24 × 2 = 648` | |
| 单条内容块 | `206 × 66`，位于图左下，gap `12` |
| 单条文字 | 类别 `16px` / 标题 `20px`，白色 |

> 列表卡的三条**必须同类别**（都是新闻，或都是博客），混排会让用户以为是一组推荐。

## 4. 图文叠压规则（关键）

三种结构的文字都压在图上，实测用**纯黑 40%~60% 渐变遮罩**，不是毛玻璃、也不是色块：

```css
.por-news-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 517 / 648;   /* 大图卡 */
}
.por-news-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.72) 100%);
  pointer-events: none;       /* 不挡点击 */
}
.por-news-card__body {
  position: absolute;
  left: 32px; bottom: 32px;
  width: 453px;
  z-index: 1;
}
```

**对比度底线**：白字压在图上，最坏情况（纯白图）也必须 ≥ 4.5:1。图太亮时把遮罩起点从 40% 提前到 25%，不要给文字加描边。

## 5. 四断点实测

| 断点 | 楼层高 | 上下 / 左右 padding | 卡行 | 卡尺寸 | 标题 |
| --- | --- | --- | --- | --- | --- |
| `1920` | `894` | `76 / 160` | `1599 × 648` | `517 × 648` | `36px` |
| `1536` | `764` | `60 / 78` | `1380 × 564` | `444 × 564` | `32px` |
| `1280` | `643` | `52 / 64` | `1152 × 469` | `368 × 469` | `28px` |
| `1024` | `643` | `52 / 32` | `960 × 469` | `304 × 469` | `28px` |

> 1440 以下的左右 padding **不是 160 而是 78 / 64 / 32**——这一层比别的楼层更早收边距，因为三张卡本身很宽，留白太多会把卡压窄。

```css
@media (max-width: 1535px) {
  .por-news-floor { padding: 60px 78px; }
  .por-news-floor__title { font-size: 32px; line-height: 48px; }
  .por-news-grid { gap: 24px; }
}
@media (max-width: 1279px) {
  .por-news-floor { padding: 52px 64px; }
  .por-news-floor__title { font-size: 28px; line-height: 40px; }
}
@media (max-width: 1023px) {
  .por-news-floor { padding: 52px 32px; }
  .por-news-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .por-news-floor { padding: 40px 15px; }
  .por-news-grid { grid-template-columns: 1fr; gap: 16px; }
  .por-news-card__body { left: 24px; bottom: 24px; width: auto; right: 24px; }
}
```

## 6. 完整示例

```html
<section class="por-news-floor">
  <h2 class="por-news-floor__title">新闻动态</h2>
  <div class="por-news-grid">
    <a class="por-news-card" href="…">
      <img src="news-1.jpg" alt="">
      <div class="por-news-card__body">
        <p class="por-news-card__cat">公司新闻</p>
        <h3 class="por-news-card__title">华为云发布新一代数据库服务</h3>
        <p class="por-news-card__desc">面向金融级场景，提供更高吞吐与更低时延。</p>
        <div class="por-btn-group">
          <span class="por-btn por-btn-ghost por-btn-small">阅读全文</span>
        </div>
      </div>
    </a>
    <!-- 其余 2 张同构 -->
  </div>
</section>
```

```css
.por-news-card__cat   { font-size: 16px; line-height: 24px; color: #FFFFFF; margin: 0; }
.por-news-card__title { font-size: 20px; line-height: 30px; color: #FFFFFF; margin: 0;
                        overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.por-news-card__desc  { font-size: 16px; line-height: 24px; color: #FFFFFF; margin: 0;
                        display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.por-news-card__body { display: flex; flex-direction: column; gap: 12px; }
```

## 7. 选型决策规则

| 判断 | 结论 |
| --- | --- |
| 有高质量主图（≥ 1000px 宽）？ | `大图卡`，视觉冲击最强 |
| 图一般，但有 6 条内容要放？ | 3 张 `列表卡`，每张 3 条 |
| 一主两次（1 条头条 + 2 条次要）？ | 1 张 `混合卡` + 2 张 `列表卡` |
| 内容少于 3 条？ | **不要用这一层**，改用单条 `full-banner` 或直接并到页脚上方 |
| 内容超过 9 条？ | 只放 9 条 + 「查看更多」链接，不要滚动 |

## 8. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | ≤ 6 字 | 「新闻动态」「最新博客」 |
| 类别 | 2~4 字，固定枚举（公司新闻 / 产品动态 / 技术博客 / 白皮书） | 「公司新闻」 |
| 标题 | **≤ 18 字**，单行，不折行 | 「华为云发布新一代数据库服务」 |
| 描述 | ≤ 60 字 / 3 行 | |
| 时间 | 折叠到描述末尾或省略，**不要单独占一行** | |

同排三张卡的**类别建议一致**，否则会被读成「三条不相关内容」。

## 9. Do / Don't

**Do**

- ✅ 图片用 `object-fit: cover`，统一 517:648（≈ 4:5）
- ✅ 所有卡片整卡可点击，`<a>` 包住
- ✅ 遮罩从底部渐变，不遮上半部分主体
- ✅ 三张卡等高（`align-items: stretch`）

**Don't**

- ❌ 不要在白色背景上用白字卡——遮罩会脏，直接换白卡 + 深字
- ❌ 不要让标题折成两行（20px 两行会顶掉描述）
- ❌ 不要在同一排混用三种结构（最多两种）
- ❌ 不要给卡片加投影，卡片靠图片本身分层
- ❌ 不要在卡内放「阅读全文」以外的第三个按钮
