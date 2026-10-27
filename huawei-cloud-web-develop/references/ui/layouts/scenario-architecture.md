# 应用场景架构图（Scenario Architecture Floor）

来源：官网设计稿「应用场景架构图」页面（`组合样式 / 内容区 / 多分辨率` 三组，共 9 个变体 + 4 个断点）节点树实测

产品页、解决方案页里回答「**这套方案长什么样、跑在什么上面**」的楼层：左边一张架构大图，右边一列说明（大标题 + 能力点 + 搭配服务 + 案例视频 + 推荐机型 + 按钮），上方可挂一排行业页签。

它是**楼层级组合**，不是单个组件——页签见 `components/tabs.md`，按钮见 `components/buttons.md`，播放器见 `components/player.md`，本文只定义「怎么把架构图排成一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 行业解决方案（零售电商、制造、金融…） | 楼层 Tab + 左图右文 `6:4` |
| 单场景深度介绍（图文等权） | 左图右文 `5:5` |
| 文字少、图是主角 | 左文右图 `5:5`（镜像） |
| 技术架构讲解（多服务组合） | 搭配使用 `3 × 2` 服务网格 + 推荐机型 |

**不要**用它做：纯卖点罗列（用 `advantage-floor`）、规格参数对比（用 `plan-table`）、产品清单（用 `product-catalog`）。

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层画板 | `1920 × 1058` | 含页签区 |
| 上下 padding | `76px` | 与其他楼层一致 |
| 左右 padding | `160px` | 内容区 = 1920 − 160 × 2 = **1600px** |
| 楼层底色 | `#F5F5F5` | 内容卡为白色，形成反差 |
| 页签区 → 内容区 gap | `12px` | |
| 页签区 | `1516 × 134` | 标题 + 页签条 |
| 内容区 | `1600 × 760` | 白色卡，`border-radius: 0`（直角，与卡片体系不同） |

```css
.por-scenario-floor {
  padding: 76px 160px;
  background: #F5F5F5;
}

.por-scenario-tabs {
  max-width: 1516px;
  margin: 0 auto 12px;
}

.por-scenario-stage {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  background: #FFFFFF;
}
```

## 3. 三种版式（实测）

| 版式 | 分栏 | 图形区 | 文字区 | 用在哪 |
| --- | --- | --- | --- | --- |
| `左图右文-6:4` | 960 / 640 | `960 × 760` | `640 × 760`，padding `48`，gap `40` | 主力版式，图是主角 |
| `左图右文-5:5` | 800 / 800 | `800 × 760` | `800 × 760`，padding `48`，gap `40` | 图文等权 |
| `左文右图-5:5` | 800 / 800 | `800 × 760` | `800 × 760`，镜像 | 阅读动线从文字开始 |

> **实测偏差**：1536 断点下 `6:4` 实际渲染为 `802 / 580`（≈ 58:42），不是精确 60:40——因为文字列有 `min-width: 580px` 下限，图形区被压缩。写 CSS 时用 `flex: 1 1 0` + 文字列 `min-width: 580px`，不要硬写百分比。

```css
.por-scenario-stage--6-4 .por-scenario-figure { flex: 1 1 0; }
.por-scenario-stage--6-4 .por-scenario-body { flex: 0 0 40%; min-width: 580px; padding: 48px; }

.por-scenario-stage--5-5 .por-scenario-figure,
.por-scenario-stage--5-5 .por-scenario-body { flex: 1 1 50%; }

/* 镜像：DOM 顺序不变，用 order 换位，保证键盘 Tab 顺序仍是「先文后图」 */
.por-scenario-stage--reverse .por-scenario-figure { order: 2; }
```

## 4. 文字列结构（实测，自上而下）

| 区块 | 尺寸 | 内部规格 |
| --- | --- | --- |
| 大标题 + 副文 | `544 × 160` | 标题 `28px` `#191919` 单行 40 高；副文 `16px` `#595959`；两者 gap `8`，整块 gap `28` |
| 一级标题 + 正文 | `544 × 222` | 标题 `20px` `#191919`（30 高）；正文 `16px` `#595959`；gap `12` |
| 二级标题 + 正文 | `544 × 80 / 88` | 二级标题 `16px` `#191919`（24 高）；gap `8` |
| 搭配使用 | `544 × 182` | 标题 `20px` + 服务网格 `544 × 140`；gap `12` |
| 案例视频 | `544 × 156` | 标题 `20px` + 视频行 `544 × 114`；gap `12` |
| 推荐机型 | `544 × 62` | 标题 `20px` + 机型行 `544 × 24`；gap `8` |
| 按钮组 | `256 × 48` | 主按钮 + 次按钮各 `120 × 40`，组内 gap `16` |

**二级标题的「点」规则（实测注释原文）**：带点与不带点两种样式，**点的颜色必须与文字色一致**（`#191919`）——设计稿专门标了这句，别用品牌色点缀。

```
┌────────────────────────────────────┐
│ 这里是 28px 大标题                  │
│ 副文 16px #595959                  │
│              ↕ 28                  │
│ 一级标题 20px                      │
│   正文 16px #595959                │
│              ↕ 12                  │
│ 搭配使用 20px                      │
│   ┌──────────┬──────────┐          │
│   │ 服务 264×36│ 服务 264×36│  × 3 行 │
│   └──────────┴──────────┘          │
│ 案例视频 20px                      │
│   ┌────┬────┬────┐  171×114 × 3    │
│ 推荐机型 20px                      │
│   HECS │ C6s │ C6                  │
│   [主要按钮] [次要按钮]             │
└────────────────────────────────────┘
```

### 4.1 搭配使用（服务网格）

| 项 | 值 |
| --- | --- |
| 网格区 | `544 × 140` |
| 单条服务 | `264 × 36` |
| 列数 × 行数 | `2 × 3` |
| 横向 gap | `16` |
| 纵向 gap | `12` |
| 服务名 | `16px` `#191919`，前置图标（产品图标，见 `icon.md`） |

### 4.2 案例视频

| 项 | 值 |
| --- | --- |
| 视频行 | `544 × 114` |
| 单个视频 | `171 × 114`（≈ `3:2`） |
| gap | `12` |
| 数量 | 固定 3 个，不多不少 |

### 4.3 推荐机型

| 项 | 值 |
| --- | --- |
| 机型行 | `544 × 24` |
| 机型名 | `16px` `#191919` |
| 分隔竖线 | `1 × 24` |
| 机型间 gap | `20`（含分隔线，视觉间距 ≈ 10） |
| 数量 | `3 ~ 4` 个，超出换行不用「更多」 |

## 5. 页签区（实测）

| 项 | 值 |
| --- | --- |
| 页签区 | `1516 × 134`，白底 |
| 楼层标题 | `36px` `#191919`，`509 × 54` |
| 标题 → 页签条 gap | `22` |
| 页签条 | `1600 × 58`，padding `10 32`，项间 gap `80` |
| 页签项 | `91 × 28`（未选中）/ `91 × 38`（选中，含下划线） |

> 页签条**比页签区宽**（1600 > 1516）——页签条按内容区宽度对齐，标题按 1516 对齐。渲染时用两个不同 `max-width` 的容器，不要强行统一。

页签行为（选中态、换行、滚动）见 `components/tabs.md`。

## 6. 四断点实测

| 断点 | 楼层高 | 上下 / 左右 padding | 内容区 | 页签区 | 内部 gap |
| --- | --- | --- | --- | --- | --- |
| `1920` | `1058` | `76 / 160` | `1600 × 760` | `1516 × 134` | `12` |
| `1536` | `856` | `60 / 160` | `1382 × 608` | `1280 × 118` | `10` |
| `1280` | `720` | `52 / 160` | `1152 × 506` | `1080 × 102` | `8` |
| `1024` | `720` | `52 / 160` | `960 × 506` | `960 × 102` | `8` |

断点下文字列的 padding 同步收：`48 → 40 → 32`，gap `40 → 32 → 24`。

```css
@media (max-width: 1535px) {
  .por-scenario-floor { padding: 60px 160px; }
  .por-scenario-body { padding: 40px; gap: 32px; }
  .por-scenario-title { font-size: 24px; line-height: 34px; }
}
@media (max-width: 1279px) {
  .por-scenario-floor { padding: 52px 32px; }
  .por-scenario-body { padding: 32px; gap: 24px; }
  .por-scenario-title { font-size: 20px; line-height: 30px; }
}
@media (max-width: 767px) {
  .por-scenario-floor { padding: 40px 15px; }
  /* 移动端必须上下堆叠，图在上、文在下 */
  .por-scenario-stage { flex-direction: column; }
  .por-scenario-body { padding: 24px; min-width: 0; }
}
```

## 7. 完整示例

```html
<section class="por-scenario-floor">
  <div class="por-scenario-tabs">
    <h2 class="por-scenario-tabs__title">行业实践业务创新</h2>
    <div class="por-tab-container por-scenario-tabs__bar">
      <a class="por-tab is-active" href="#retail">零售电商</a>
      <a class="por-tab" href="#manufacture">智能制造</a>
      <a class="por-tab" href="#finance">金融</a>
      <a class="por-tab" href="#gov">政务</a>
    </div>
  </div>

  <div class="por-scenario-stage por-scenario-stage--6-4">
    <div class="por-scenario-figure">
      <img src="retail-arch.svg" alt="零售电商方案架构：负载均衡 → 应用集群 → RDS / OBS">
    </div>
    <div class="por-scenario-body">
      <h3 class="por-scenario-title">快速搭建外贸独立站</h3>
      <p class="por-scenario-lead">提供电商类常用市场镜像，帮助您快速搭建外贸独立站。</p>

      <div class="por-scenario-block">
        <h4 class="por-scenario-h4">搭配使用</h4>
        <ul class="por-scenario-services">
          <li><img src="ecs.svg" alt="">弹性云服务器 ECS</li>
          <li><img src="rds.svg" alt="">云数据库 RDS</li>
          <!-- 共 6 条 -->
        </ul>
      </div>

      <div class="por-scenario-block">
        <h4 class="por-scenario-h4">案例视频</h4>
        <div class="por-scenario-videos">
          <a href="…" class="por-scenario-video"><img src="v1.jpg" alt="客户案例：某跨境品牌"></a>
          <!-- × 3 -->
        </div>
      </div>

      <div class="por-scenario-block">
        <h4 class="por-scenario-h4">推荐机型</h4>
        <p class="por-scenario-specs"><span>HECS</span><i></i><span>C6s</span><i></i><span>C6</span></p>
      </div>

      <div class="por-btn-group">
        <a class="por-btn por-btn-primary por-btn-middle" href="…">立即购买</a>
        <a class="por-btn por-btn-secondary por-btn-middle" href="…">查看文档</a>
      </div>
    </div>
  </div>
</section>
```

```css
.por-scenario-body {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 48px;
  background: #FFFFFF;
}
.por-scenario-title { font-size: 28px; line-height: 40px; color: #191919; margin: 0 0 8px; }
.por-scenario-lead  { font-size: 16px; line-height: 26px; color: #595959; margin: 0; }
.por-scenario-h4    { font-size: 20px; line-height: 30px; color: #191919; margin: 0 0 12px; }

.por-scenario-services {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 12px;
  list-style: none; margin: 0; padding: 0;
}
.por-scenario-services li {
  display: flex; align-items: center; gap: 8px;
  height: 36px; font-size: 16px; color: #191919;
}

.por-scenario-videos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.por-scenario-video img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; }

.por-scenario-specs { display: flex; align-items: center; gap: 10px; font-size: 16px; color: #191919; margin: 0; }
.por-scenario-specs i { width: 1px; height: 24px; background: #E5E5E5; }
```

## 8. 排版决策规则

| 判断 | 结论 |
| --- | --- |
| 一层要覆盖 4 个以上行业/场景？ | 上页签，内容区固定 `1600 × 760` 不随页签变高 |
| 图的信息密度高（多层架构）？ | `6:4`，给图 960 |
| 图是简单拓扑（3~5 个框）？ | `5:5`，图文等权 |
| 文字讲的是「我们做了什么」而非「图里有什么」？ | `左文右图 5:5` |
| 服务超过 6 个？ | 拆到下一个楼层，或改用「搭配使用」+ 链接到产品目录 |
| 没有案例视频？ | 整个「案例视频」块删掉，**不要留空行** |

## 9. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | ≤ 12 字，行业视角 | 「行业实践业务创新」 |
| 大标题 | ≤ 14 字，说清场景 | 「快速搭建外贸独立站」 |
| 副文 | ≤ 40 字，说清「给谁解决什么」 | 「提供电商类常用市场镜像，帮助您快速搭建外贸独立站。」 |
| 一级标题 | ≤ 12 字 | 「搭配使用」「推荐机型」 |
| 服务名 | 产品全称 + 缩写，与产品目录一致 | 「弹性云服务器 ECS」 |
| 按钮 | 主按钮「立即购买」/ 次按钮「查看文档」，只放两个 | |

## 10. Do / Don't

**Do**

- ✅ 图片必须带 `alt`，描述架构层级关系（不是「架构图」三个字）
- ✅ 服务条目按「接入层 → 计算 → 存储 → 数据库」的调用顺序排，不要按字母序
- ✅ 推荐机型 ≤ 4 个，用竖线分隔
- ✅ 页签选中项与内容区必须同步切换，切换后回到内容区顶部

**Don't**

- ❌ 不要把架构图做成纯插画——架构图是信息图，必须有真实产品模块与连线（插画见 `illustration.md`）
- ❌ 不要在 `5:5` 里放 `960` 宽的复杂架构图（会被压糊）
- ❌ 不要给内容卡加圆角——设计稿是直角，加了会和上方页签区分不开
- ❌ 不要在文字列塞第三个按钮，两个是上限
- ❌ 不要让「搭配使用」出现单数（1 条）——1 条就直接写成一句话
