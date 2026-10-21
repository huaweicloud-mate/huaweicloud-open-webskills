# 产品推荐卡片（Product Recommend）

官网「推荐产品 / 热门产品」楼层。与 `cards.md` 的通用卡片不是一个东西——通用卡是组件层，这个是**楼层级的推荐卡组**，特征值是**上下 padding 52**（远大于通用卡的 24~32），因为卡片本身不加边框、靠留白撑开。

## 楼层结构

```
1920 × 676（一排 5 个，带页签）
├─ padding 76 / 160，底 #F5F5F5
├─ 标题区 1600 × 170   gap 22
│   ├─ 标题组 509 × 90   （标题 36px + 副标题行）
│   └─ 页签条 1600 × 58  （pad 10/32，gap 80）
├─ gap 12
├─ 卡行 1600 × 282 / 258   gap 16 / 24
└─ gap 32
    「查看全部」链接 100 × 28
```

| 形态 | 楼层高 | 标题区 | 标题区到卡行 |
| --- | --- | --- | --- |
| 副标题 + 页签 = 开 | `652`（卡 `258`）/ `676`（卡 `282`） | `1600 × 170` | `gap 12` |
| 副标题 + 页签 = 关 | `588` | `1600 × 54`（只有标题） | `gap 40` |

关页签时楼层反而用 `gap 40`——因为标题区不再需要和页签成组，间距回到常规楼层值。

「查看全部」链接固定 `100 × 28`、`gap 32` 挂在卡行下方，**不参与卡组网格**，右对齐。

## 四种排布（1920）

| 一排 | 卡尺寸 | 卡行宽 | 卡间 gap | 算式 |
| --- | --- | --- | --- | --- |
| 2 | `788 × 258` | `1600` | `24` | `788×2 + 24 = 1600` |
| 3 | `517 × 258` | `1599` | `24` | `517×3 + 48 = 1599` |
| 4 | `388 × 258` | `1600` | `16` | `388×4 + 48 = 1600` |
| 5 | `307 × 282` | `1599` | `16` | `307×5 + 64 = 1599` |

两条规则：

- **2~3 个用 gap 24，4~5 个用 gap 16**（与 Logo 墙同一套降档逻辑）。
- **只有 5 个一排时卡高变成 282**。不是排版错位——307 宽下描述必然折成两行，卡高跟着文本走（`52 + 64 + 24 + 90 + 52 = 282`）。不要为了统一高度硬压成 258，会截断描述。

## 卡内结构

```
┌────────────────────────────┐  788 × 258   r16
│  padding 52（上下）         │
│  ┌────┐                     │
│  │icon│  64 × 64            │
│  └────┘                     │
│         ↕ gap 24            │
│  Web应用防火墙 WAF           │  20px #191919
│         ↕ gap 12            │
│  全面避免网站被黑客恶意攻击…  │  16px #595959
│  padding 52                 │
└────────────────────────────┘
```

| 元素 | 尺寸 | 说明 |
| --- | --- | --- |
| 卡容器 | `r16`，`padding 52px 32px` | 白底 `#FFFFFF` |
| 产品图标 | `64 × 64` | 图形本体可到 `72 × 72`，容器留 `64` |
| 文本区 | `724 × 66`（1 行描述）/ `243 × 90`（2 行） | `gap 12` |
| 标题 | `20px` / `#191919` / 行高 `30` | 单行，超长截断 |
| 描述 | `16px` / `#595959` / 行高 `24` | 1~2 行 |

**卡高完全由描述行数决定**：`52 + 64 + 24 + (30 + 12 + 24×n) + 52`。描述 1 行 → `258`，2 行 → `282`。

## 四档断点

| 断点 | 一排 | 卡尺寸 | pad（上下/左右） | 卡内 gap | 图标 | 标题 | 描述 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `1920` | 2 / 3 / 4 | `788 / 517 / 388 × 258` | `52 / 32` | `24` | `64` | `20px` | `16px` |
| `1920` | 5 | `307 × 282` | `52 / 32` | `24` | `64` | `20px` | `16px` |
| `1536` | 3 | `445 × 214` | `42 / 32` | `20` | `56` | `16px` | `14px` |
| `1280` | 3 | `368 × 184` | `36 / 24` | `16` | `48` | `14px` | `12px` |
| `1024` | 3 | `305 × 184` | `36 / 24` | `16` | `48` | `14px` | `12px` |

字号逐档降两档（`20/16` → `16/14` → `14/12`），图标同步 `64 → 56 → 48`。**不要只缩卡宽不缩字号**，1280 下用 20px 标题会溢出成三行。

1024 断点特殊：超过 3 个时卡行折成两行（`959 × 384`，行间 `gap 16`），每卡 `232 × 184`；不超 3 个时一行 `963 × 184`，卡 `305 × 184`。

## 一个实测细节：描述带下划线

设计稿里描述文字带 `UNDERLINE` 装饰，标题不带。这不是笔误——整张卡是可跳转的，描述被单独包成了链接。

实现时二选一，**不要混**：

```css
/* A. 整卡可跳转，描述不额外加下划线（推荐） */
.por-reco-card__desc { text-decoration: none; }

/* B. 只有描述是链接（设计稿原样） */
.por-reco-card__desc { text-decoration: underline; text-underline-offset: 3px; }
```

若选 B，hover 时下划线要加粗到 2px 或换色，否则和普通正文难以区分。

## 与 `cards.md` 通用卡的区别

| | 产品推荐卡片 | 通用卡片 `por-card` |
| --- | --- | --- |
| 上下 padding | **`52`** | `24 / 32` |
| 有无边框 | 无 | `por-card-m` 之外有 1px 线 |
| 卡高 | 随描述行数 `258 / 282` | 有 `por-card-xl/l/m` 固定档 |
| 内容 | 图标 + 标题 + 描述，**无按钮** | 可有按钮组 |
| 用法 | 楼层级卡组，2~5 个一排 | 组件级，任意容器 |

## 代码

```html
<section class="por-reco">
  <div class="por-reco__head">
    <h2 class="por-reco__title">热门产品</h2>
    <nav class="por-tab por-reco__tabs"><ul data-cols="4"><!-- 页签 --></ul></nav>
  </div>
  <div class="por-reco__row">
    <a class="por-reco-card" href="/product/waf">
      <span class="icons-product-lg waf"></span>
      <h3 class="por-reco-card__title">Web应用防火墙 WAF</h3>
      <p class="por-reco-card__desc">全面避免网站被黑客恶意攻击和入侵</p>
    </a>
    <!-- 其余卡 -->
  </div>
  <a class="por-reco__more" href="/product">查看全部</a>
</section>
```

```css
.por-reco {
  padding: 76px 160px;
  background: #f5f5f5;
}
.por-reco__head { display: flex; flex-direction: column; gap: 22px; }
.por-reco__row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 12px;
}
.por-reco-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 52px 32px;
  border-radius: 16px;
  background: #fff;
  text-decoration: none;
  color: inherit;
}
.por-reco-card__title {
  font-size: 20px;
  line-height: 30px;
  color: #191919;
  margin: 0 0 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.por-reco-card__desc {
  font-size: 16px;
  line-height: 24px;
  color: #595959;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.por-reco__more {
  display: block;
  width: 100px;
  margin: 32px 0 0 auto;   /* 右对齐 */
  font-size: 16px;
  line-height: 28px;
}

@media (max-width: 1536px) {
  .por-reco { padding: 60px 160px; }
  .por-reco-card { padding: 42px 32px; gap: 20px; border-radius: 16px; }
  .por-reco-card__title { font-size: 16px; line-height: 24px; }
  .por-reco-card__desc { font-size: 14px; line-height: 22px; }
}
@media (max-width: 1280px) {
  .por-reco { padding: 52px 160px; }
  .por-reco-card { padding: 36px 24px; gap: 16px; }
  .por-reco-card__title { font-size: 14px; line-height: 22px; }
  .por-reco-card__desc { font-size: 12px; line-height: 18px; }
}
```

## Do / Don't

- **Do** 用 `grid` + `1fr` 让卡自动等高——同一行里描述 1 行和 2 行的卡必须齐平底边。
- **Do** 图标区固定 `64` 高度，图标本身 `56~64` 居中，不要按图片原始比例撑高。
- **Don't** 给卡加边框或阴影。这一层的层次靠 `#F5F5F5` 底 + 白卡对比，没有描边。
- **Don't** 在卡里加按钮。产品推荐卡的唯一动作是整卡跳转；要带按钮请用 `cards.md` 的通用卡或 `layout/advantage-floor.md` 的插画卡。
