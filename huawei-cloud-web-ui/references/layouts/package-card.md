# 套餐组合卡（Package Card）

来源：官网设计稿「通用套餐」页面（`组合卡片` 788×696 / 388×878 + `规格卡片` + `亮点卡片` + `价格` 4 种排布）节点树实测

售卖页的**套餐卡**：一张卡就是一个可买的组合（产品 + 规格 + 亮点 + 价格 + 购买按钮）。3~4 张一排，用户横向比价后直接下单。

它与 `plan-table.md` 是**两种不同的售卖形态**：

| 形态 | 用在哪 | 特点 |
| --- | --- | --- |
| `plan-table`（对比表） | 规格维度多、要逐行对比 | 表头固定，行对齐，适合 5 个以上套餐 |
| `package-card`（本文） | 套餐少（2~4 个）、每档卖点差异大 | 卡片独立，图/亮点/价格自成一体 |

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 建站套餐（基础 / 标准 / 旗舰） | 3 张 `788 × 696`，首档推荐 |
| 云服务器套餐（按配置分档） | 3~4 张，规格区展开 |
| 活动套餐（限时折扣） | 价格区用「活动价 + 划线原价」 |
| 多规格可选（同档 3 个配置） | 规格区用 `规格卡片` + 「收起/展开」 |

## 2. 卡片三段结构（实测 `788 × 696`）

```
┌────────────────────────────────────────────┐  210
│ [角标]                          48×48 图标  │  头部 pad 32 gap 12
│ 产品名 24px                                 │
│ 一句话描述 16px                             │
├────────────────────────────────────────────┤  164
│ 产品亮点 16px                               │  亮点 pad 32/16
│ · 亮点 1          · 亮点 2                  │
│ · 亮点 3          · 亮点 4                  │
├────────────────────────────────────────────┤  250
│ 规格                                        │  规格 pad 32
│ ┌────────┐ ┌────────┐                      │
│ │ 2核4G  │ │ 4核8G  │  ← 规格卡片（可收起） │
│ └────────┘ └────────┘                      │
├────────────────────────────────────────────┤   72
│ ¥1,000 /月，此价格仅为实例价格   [立即购买]  │  价格 pad 32
└────────────────────────────────────────────┘
```

| 区块 | 高度 | padding | 内部 gap | 底色 |
| --- | --- | --- | --- | --- |
| 头部 | `210` | `32` | `12` | `#FFFFFF` |
| 亮点 | `164` | `32 / 16 / 32` | `12` | `#FFFFFF` |
| 规格 | `250` | `32` | `16` | `#FFFFFF` |
| 价格 | `72` | `32` | 两端对齐 | `#FFFFFF` |
| 合计 | `696` | | | 整卡 `border-radius: 16px`，`1px` 描边 |

## 3. 头部（实测）

| 元素 | 值 |
| --- | --- |
| 角标 | `80 × 24`，`border-radius: 2px`，底 `#D96900`（橙，推荐档用），白字 `12px`，贴左上角（`top: 0`） |
| 产品图标 | `48 × 48`，右上角 |
| 标题区 | `324 × 86`，gap `8` |
| 产品名 | `24px` `#191919`，单行 |
| 一句话描述 | `16px` `#595959`，≤ 2 行 |

> 角标在**卡片外沿顶部**（`top: 0; left: 32px`），不是卡内留白里——它压着卡片上边框，这是设计稿的刻意处理，用来在同排卡片里一眼分出推荐档。

## 4. 亮点区（实测 `788 × 164`）

| 项 | 值 |
| --- | --- |
| 区标题 | 「产品亮点」`16px` `#595959` |
| 列表区 | `724 × 114` |
| 列表列数 | `2` 列 |
| 行 gap | `16` |
| 条目 | `16px` `#191919`，前置小圆点或对勾 |

亮点 **4 条为上限**（2 × 2），第 5 条开始要砍——这一区是「为什么买这档」，不是功能清单。

## 5. 规格区（实测 `788 × 250`）

| 项 | 值 |
| --- | --- |
| 规格行 | `724 × 44`（标签 + 当前选中值） |
| 规格卡片区 | `724 × 158` |
| 卡片 gap | `16` |
| 单卡 | 按 2 列 `354` / 3 列 `230` |
| 收起态 | 只显示已选项 + 「展开全部配置」链接 |
| 展开态 | 全部规格卡（> 4 个时区高变为 `2 × 158 + 16`） |

**加价购开关**：设计稿有 `加价购=开/关` 变体——开启时在价格区左侧多一行「+¥xx 加购 xx」，用 `14px` `#595959`，不要抢价格的视觉。

## 6. 价格区（实测 4 种排布）

| 排布 | 尺寸 | 用法 |
| --- | --- | --- |
| 现价 + 原价（小） | `149 × 30`；现价 `20px` `#C7000B`，原价 `12px` `#191919`，gap `6` | 普通折扣 |
| 现价 + 计费说明 | `243 × 36`；现价 `24px` `#191919`，说明 `22px` `#191919`，gap `8` | 无折扣，强调计费口径 |
| 现价（划线）+ 原价 | `176 × 36`；现价 `24px` `#C7000B` + `1px` 删除线，原价 `94 × 36`，gap `8` | 大促，原价必须可见 |
| 仅现价 | 同第二行，去掉说明 | 免费/按量 |

```html
<div class="por-pkg-price">
  <span class="por-pkg-price__now">¥1,000</span>
  <span class="por-pkg-price__origin">原价 ¥2,303.76</span>
  <a class="por-btn por-btn-primary por-btn-small" href="…">立即购买</a>
</div>
```

```css
.por-pkg-price {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;      /* 卡内 72 高 = 16 + 40 + 16 */
  border-top: 1px solid #F0F0F0;
}
.por-pkg-price__now {
  font-size: 24px; line-height: 36px; color: #C7000B; font-weight: 500;
}
.por-pkg-price__origin {
  font-size: 12px; line-height: 18px; color: #191919;
  text-decoration: line-through;
}
.por-pkg-price .por-btn { margin-left: auto; }
```

> 价格红 `#C7000B` 与告警红 `#E02128` 是两个色——售卖价用 `#C7000B`（`color-error-active` 同值，属历史复用），普通错误用 `#E02128`。参见 `tokens/colors.md`。

## 7. 窄卡（实测 `388 × 878`）

同一套内容在 4 列布局里会变成竖窄卡：

| 项 | 值 |
| --- | --- |
| 卡片 | `388 × 878` |
| 头部 | 高度不变，标题压到 `2` 行 |
| 亮点 | 单列（4 条竖排） |
| 规格 | 单列卡片 |
| 价格 | 现价在上、按钮独占一行（`width: 100%`） |

```css
.por-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.por-pkg-grid--4 { grid-template-columns: repeat(4, 1fr); gap: 16px; }

@media (max-width: 1279px) {
  .por-pkg-grid, .por-pkg-grid--4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .por-pkg-grid, .por-pkg-grid--4 { grid-template-columns: 1fr; }
  .por-pkg-price { flex-wrap: wrap; }
  .por-pkg-price .por-btn { margin-left: 0; width: 100%; }
}
```

## 8. 完整示例

```html
<section class="por-pkg-floor">
  <h2 class="por-pkg-floor__title">选择适合您的套餐</h2>
  <div class="por-pkg-grid">
    <article class="por-pkg-card is-recommended">
      <span class="por-pkg-card__badge">推荐</span>
      <header class="por-pkg-card__head">
        <div>
          <h3 class="por-pkg-card__name">企业建站 标准版</h3>
          <p class="por-pkg-card__desc">适合中小企业的官网与营销落地页</p>
        </div>
        <img class="por-pkg-card__icon" src="flexus.svg" alt="">
      </header>

      <div class="por-pkg-card__highlights">
        <p class="por-pkg-card__label">产品亮点</p>
        <ul>
          <li>独立 IP</li><li>免费 SSL 证书</li>
          <li>一键部署</li><li>7×24 技术支持</li>
        </ul>
      </div>

      <div class="por-pkg-card__specs">
        <p class="por-pkg-card__label">规格</p>
        <div class="por-pkg-spec-grid">
          <button class="por-pkg-spec is-active">2 核 4G</button>
          <button class="por-pkg-spec">4 核 8G</button>
        </div>
      </div>

      <div class="por-pkg-price">
        <span class="por-pkg-price__now">¥1,000</span>
        <span class="por-pkg-price__unit">/月</span>
        <a class="por-btn por-btn-primary por-btn-small" href="…">立即购买</a>
      </div>
    </article>
    <!-- 其余 2 张同构 -->
  </div>
</section>
```

```css
.por-pkg-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #E5E5E5;
  background: #FFFFFF;
  overflow: hidden;
}
.por-pkg-card.is-recommended { border-color: #191919; }

.por-pkg-card__badge {
  position: absolute; top: 0; left: 32px;
  height: 24px; padding: 0 12px;
  border-radius: 2px; background: #D96900;
  color: #FFFFFF; font-size: 12px; line-height: 24px;
}
.por-pkg-card__head {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 12px; padding: 32px; min-height: 210px; box-sizing: border-box;
}
.por-pkg-card__name { font-size: 24px; line-height: 34px; color: #191919; margin: 0 0 8px; }
.por-pkg-card__desc { font-size: 16px; line-height: 24px; color: #595959; margin: 0; }
.por-pkg-card__icon { width: 48px; height: 48px; flex: 0 0 48px; }

.por-pkg-card__highlights { padding: 32px 16px; }
.por-pkg-card__label { font-size: 16px; line-height: 24px; color: #595959; margin: 0 0 12px; }
.por-pkg-card__highlights ul {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  list-style: none; margin: 0; padding: 0;
}
.por-pkg-card__highlights li { font-size: 16px; line-height: 24px; color: #191919; }

.por-pkg-card__specs { padding: 32px; margin-top: auto; }
.por-pkg-spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.por-pkg-spec {
  height: 64px; border: 1px solid #DBDBDB; border-radius: 8px;
  background: #FFFFFF; font-size: 16px; color: #191919; cursor: pointer;
}
.por-pkg-spec.is-active { border-color: #191919; box-shadow: inset 0 0 0 1px #191919; }
```

## 9. 选型决策规则

| 判断 | 结论 |
| --- | --- |
| 套餐 2~4 个，卖点差异大？ | 用本组件，3 列 `788` |
| 套餐 5 个以上，要逐项比价？ | 用 `plan-table`，不要用卡片 |
| 同档有 5 个以上配置？ | 规格区收起，只显示已选项 + 「展开全部」 |
| 要突出某一档？ | `is-recommended` 描边 + 橙色角标，**只允许一个** |
| 有活动价？ | 价格区用「现价（红）+ 划线原价」，原价不能省 |
| 卡片里内容放不下？ | 砍亮点到 3 条，不要把字号降到 14px |

## 10. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 档位名 | 「场景 + 版本」，≤ 10 字 | 「企业建站 标准版」 |
| 一句话描述 | ≤ 24 字 | 「适合中小企业的官网与营销落地页」 |
| 亮点 | 4 条 / 每条 ≤ 10 字，动宾或名词 | 「独立 IP」「一键部署」 |
| 规格 | 「N 核 NG」，不加空格以外的修饰 | 「2 核 4G」 |
| 价格 | 现价只写数字，单位放「/月」 | `¥1,000 /月` |
| 按钮 | 全层统一「立即购买」 | |

## 11. Do / Don't

**Do**

- ✅ 同排卡片等高（`align-items: stretch`），价格区用 `margin-top: auto` 贴底
- ✅ 推荐档只给一张，角标颜色固定 `#D96900`
- ✅ 规格切换后价格实时更新，并给 `aria-live` 播报
- ✅ 价格口径（/月、/年、按量）必须写在价格旁，不能只写数字

**Don't**

- ❌ 不要和 `plan-table` 出现在同一屏（两套比价逻辑会互相干扰）
- ❌ 不要给每张卡不同底色来区分档位
- ❌ 不要在卡内放第二个 CTA（「了解更多」放亮点区末尾）
- ❌ 不要把原价做得比现价还显眼
- ❌ 不要用 5 列窄卡（`388` 已是最窄，再窄亮点只能排 1 列）
