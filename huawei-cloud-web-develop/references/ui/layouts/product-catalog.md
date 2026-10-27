# 全部产品展示（Product Catalog Floor）

来源：官网设计稿「全部产品展示」页面（`基础样式` 3 种 + `卡片` 4 档断点 + `多分辨率` 3 档）节点树实测

首页、产品导航页末尾的「**全量产品地图**」楼层：左侧一列品类索引，右侧按品类分组铺产品卡，每张卡一个产品（图标 + 名称 + 一句话）。

它是**楼层级组合**，不是单个组件——卡片本体见 `components/cards.md`，产品图标见 `icon.md`，本文只定义「怎么把上百个产品排成可扫读的一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 首页「全部产品」收口 | `上下图标` 基础样式，左索引 + 分组卡片 |
| 产品导航页/落地页 | `无图标` 基础样式（信息密度最高） |
| 品类内页（只展示某一类） | `左右图标` 基础样式，去掉左索引 |

**不要**用它做：推荐位（产品少、要讲故事 → 用 `cards` 或 `advantage-floor`）、规格对比（用 `plan-table`）、搜索结果列表（用 `service-table`）。

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层画板 | `1920 × 1318` | `上下图标` 版式，最高 |
| 楼层画板（左右图标） | `1920 × 1146` | 卡片矮 89px |
| 楼层画板（无图标） | `1920 × 1138` | 最矮 |
| 上下 padding | `76px` | 与其他楼层一致 |
| 左右 padding | `160px` | 内容区 = **1600px** |
| 楼层底色 | `#F5F5F5` | 卡片白色 |
| 左索引 | `270 × 998` | 与右侧内容区 gap `60` |
| 右内容区 | `1286` | 3 列 × 418 + 2 × 16 |
| 分类组之间 gap | `60` | |

```css
.por-catalog-floor {
  padding: 76px 160px;
  background: #F5F5F5;
}

.por-catalog-layout {
  display: flex;
  gap: 60px;
}

.por-catalog-nav  { flex: 0 0 270px; position: sticky; top: 88px; }
.por-catalog-main { flex: 1 1 auto; max-width: 1286px; }
.por-catalog-group + .por-catalog-group { margin-top: 60px; }
```

## 3. 三种基础样式（实测）

| 样式 | 卡片尺寸 | 图标位置 | 楼层高 | 用在哪 |
| --- | --- | --- | --- | --- |
| `上下图标` | `418 × 202` | 图标在上，文字在下（gap `24`） | `1318` | 主力，首页收口 |
| `左右图标` | `418 × 113` | 图标在左，文字在右（pad `24 36 24 24`） | `1146` | 品类页，一屏多放 |
| `无图标` | `418 × 130`（按楼层高 `1138` 反推，设计稿未单独出卡） | 只有名称 + 描述 | `1138` | 产品极多时 |

> 三种样式的**列宽完全一致**（418），只有卡片高度与图标位置不同——切样式不会导致网格重排。

## 4. 产品卡（实测四档断点）

| 断点 | 卡片 | padding | 内部 gap | 每行 | 单元 gap |
| --- | --- | --- | --- | --- | --- |
| `1920 ~ 1601` | `418 × 202` | `32` | `24` | 3 | `16` |
| `1600 ~ 1281` | `365 × 172` | `28` | `20` | 3 | `16` |
| `1280 ~ 1025` | `304 × 140` | `24` | `16` | 3 | `16` |
| `1024 ~ 769` | `240 × 140` | `24` | `16` | 3 | `16` |

**卡片内部（418 档实测）**

| 元素 | 值 |
| --- | --- |
| 卡片 | `418 × 202`，`border-radius: 16px`，padding `32`，白底 |
| 图标 | `52 × 52` 画框（图形本身 `72 × 72`，溢出画框） |
| 产品名 | `20px` / **`#000000`**（注意：这一层不是 `#191919`） |
| 描述 | `16px` / `#595959` |
| 名称 → 描述 gap | `8` |
| 图标 → 文字 gap | `24` |
| 角标 | `52 × 24`，`border-radius: 2px`，底色 `#F23030`，白字，贴右上角 |
| 悬停态 | `1px` 描边（`#191919`），不再加阴影 |

> 卡内文字块宽 `354`（= 418 − 32 × 2），产品名超长仍单行，用 `text-overflow: ellipsis`，**不要换行**——换行会让同排卡片高度不一致。

```html
<a class="por-catalog-card" href="/product/ecs">
  <span class="por-catalog-card__badge">新品</span>
  <span class="por-catalog-card__icon"><img src="ecs.svg" alt=""></span>
  <span class="por-catalog-card__text">
    <span class="por-catalog-card__name">GPU加速云服务器 GACS</span>
    <span class="por-catalog-card__desc">提供GPU计算资源的弹性云服务器</span>
  </span>
</a>
```

```css
.por-catalog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border-radius: 16px;
  background: #FFFFFF;
  text-decoration: none;
  transition: box-shadow .2s, outline-color .2s;
  outline: 1px solid transparent;
}
.por-catalog-card:hover { outline-color: #191919; }

.por-catalog-card__badge {
  position: absolute; top: 0; right: 32px;
  height: 24px; padding: 0 12px;
  border-radius: 2px;
  background: #F23030; color: #FFFFFF;
  font-size: 12px; line-height: 24px;
}

.por-catalog-card__icon { display: block; width: 52px; height: 52px; }
.por-catalog-card__icon img { width: 72px; height: 72px; margin: -10px; }

.por-catalog-card__name {
  display: block; font-size: 20px; line-height: 30px; color: #000000;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.por-catalog-card__desc {
  display: block; margin-top: 8px;
  font-size: 16px; line-height: 24px; color: #595959;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
```

## 5. 左索引（实测）

| 项 | 值 |
| --- | --- |
| 索引宽 | `270` |
| 索引区高 | `998` |
| 索引标题 | 「产品类型」`20px` `#191919`，高 `30` |
| 标题 → 首条 gap | `32` |
| 单条 | 高 `48`，文字 `16px` `#595959` |
| 选中条 | 文字 `#191919` + 前置圆点 `8 × 8` 实心 `#191919` |
| 圆点 → 文字 gap | `16` |
| 吸附 | `position: sticky`，顶部偏移 `88px`（避开吸顶导航） |

**索引与内容联动**：点击索引滚动到对应品类分组，滚动时用 `IntersectionObserver` 反高亮。不要用点击切换（隐藏其他分组），用户需要能一路滚完。

## 6. 分组结构（实测）

```
计算                                     ← 分类标题 28px + 右箭头 32×32（gap 8）
  └ 关系型数据库                          ← 子分类标题 24px + 「更多」176×36
       ┌──────┐ ┌──────┐ ┌──────┐
       │ 418  │ │ 418  │ │ 418  │       ← 卡片行，gap 16
       └──────┘ └──────┘ └──────┘
       ┌──────┐ ┌──────┐ ┌──────┐
       └──────┘ └──────┘ └──────┘       ← 行间距 16
```

| 元素 | 值 |
| --- | --- |
| 分类标题 | `28px` `#191919`，高 `40`，右侧箭头 `32 × 32`，gap `8` |
| 分类 → 子分类 gap | `20` |
| 子分类标题 | `24px` `#191919`，高 `36` |
| 「更多」链接 | `176 × 36`，文字 `16px` `#595959` + 右箭头 |
| 子分类标题 → 卡片区 gap | `16` |
| 子分类之间 gap | `32` |
| 分类之间 gap | `60` |

**分组层级硬规则**：最多两级（分类 → 子分类）。设计稿里只有「计算 → 关系型数据库」这种两层，**不要**出现三级；三级说明品类没拆干净，应拆成两个楼层或跳到独立页面。

## 7. 四断点实测

| 断点 | 楼层高 | 左右 padding | 内容区 | 左索引 | 索引 gap |
| --- | --- | --- | --- | --- | --- |
| `1920` | `1318` | `160` | `1286` | `270` | `60` |
| `1536` | `1098` | `160` | `1127` | `216` | `48` |
| `1280` | `896` | `160` | `944` | `176` | `40` |
| `1024` | `914` | `160` | `752` | `176` | `40` |

```css
@media (max-width: 1535px) {
  .por-catalog-layout { gap: 48px; }
  .por-catalog-nav { flex-basis: 216px; }
  .por-catalog-card { padding: 28px; gap: 20px; }
  .por-catalog-card__name { font-size: 18px; line-height: 28px; }
  .por-catalog-card__desc { font-size: 14px; line-height: 22px; }
}
@media (max-width: 1279px) {
  .por-catalog-layout { gap: 40px; }
  .por-catalog-nav { flex-basis: 176px; }
  .por-catalog-card { padding: 24px; gap: 16px; }
  .por-catalog-group__title { font-size: 24px; }
  .por-catalog-subtitle { font-size: 20px; }
}
@media (max-width: 1023px) {
  /* 索引折叠成顶部横滑胶囊 */
  .por-catalog-layout { flex-direction: column; gap: 24px; }
  .por-catalog-nav {
    position: static; flex-basis: auto;
    display: flex; gap: 8px; overflow-x: auto;
  }
  .por-catalog-main { display: grid; grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .por-catalog-floor { padding: 48px 15px; }
  .por-catalog-main { grid-template-columns: 1fr; }
}
```

## 8. 排布决策规则

| 判断 | 结论 |
| --- | --- |
| 产品数 > 60？ | 用 `无图标` 样式 + 左索引，否则一屏高度失控 |
| 产品数 20~60？ | `上下图标`，3 列 |
| 只有一类产品（< 12 个）？ | 去掉左索引，用 `左右图标`，直接 3 列 |
| 某子分类只有 1~2 个产品？ | 并到相邻子分类，不要为 1 个产品开一行 |
| 要突出新品/热销？ | 只用角标（`新品` / `热销`），**不要**给卡换底色 |
| 描述超过 20 字？ | 砍到 20 字以内，卡片不换行 |

## 9. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 分类名 | 2~4 字名词 | 「计算」「存储」「数据库」 |
| 子分类名 | 4~8 字 | 「关系型数据库」 |
| 产品名 | 官方全称 + 英文缩写，≤ 14 字 | 「GPU加速云服务器 GACS」 |
| 产品描述 | **≤ 20 字**，一句话说清是什么 | 「提供GPU计算资源的弹性云服务器」 |
| 角标 | 2 字，只允许「新品」「热销」「免费」 | |

产品名与描述**必须来自产品目录的同一份数据源**，不要手写——否则同一产品在首页、产品页、文档页出现三种名字。

## 10. Do / Don't

**Do**

- ✅ 左索引可点击 + 滚动联动反高亮
- ✅ 同一分组内卡片等高（用 `align-items: stretch`）
- ✅ 图标风格统一（产品图标见 `icon.md`，不要混入插画）
- ✅ 产品名单行截断，用 `title` 属性兜底

**Don't**

- ❌ 不要给卡片加不同底色来表示「推荐」——用角标
- ❌ 不要在楼层里再套一层「查看更多」大按钮，用子分类右侧小链接
- ❌ 不要让索引超过 10 项（超过就合并分类）
- ❌ 不要把「全部产品展示」做成轮播或折叠面板——这一层的价值就是「一眼看到全貌」
- ❌ 不要在卡片里放第 4 行文字（价格/规格/标签），会把 202 撑破
