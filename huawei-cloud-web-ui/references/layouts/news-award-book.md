# 新闻 / 奖项 / 图书展示（Award & Book Floor）

来源：官网设计稿「新闻奖项图书展示」页面（`组合样式` 8 个变体 + `单卡样式` 9 种 + `图书卡片` 2/3 排）节点树实测

企业官网「**荣誉与认证 / 出版物 / 媒体报道**」楼层：一排 2~3 张横向图文卡，每张是「封面图 + 标题 + 多行说明 + 两个链接按钮」。

它是**楼层级组合**，不是单个组件——通用卡片见 `components/cards.md`，链接按钮见 `components/links.md`，本文只定义这一层的两种卡型与排布。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 荣誉与认证（奖杯、资质证书） | `图书卡` × 2，`788 × 310` |
| 出版物 / 白皮书 / 报告 | `图书卡` × 3，`517 × 310` |
| 媒体报道 / 认证条目（无大封面） | `奖项卡` × 3，`568 × 218` |
| 书籍推荐（竖版封面） | `图书卡`，封面走 `180 × 254`（≈ 5:7） |

**不要**用它做：客户 logo（用 `logo-wall`）、新闻流（用 `news-blog`）、文档目录（用 `doc-recommend`）。

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层高（单排 2 个） | `906` | 卡区 `1600 × 660` |
| 楼层高（单排 3 个） | `744` | 卡区 `1599 × 498` |
| 上下 padding | `76px` | |
| 左右 padding | `160px` | 内容区 `1600` |
| 楼层底色 | `#F5F5F5` | 白卡 |
| 楼层标题 | `36px` `#191919`，`1600 × 54` | 例：「荣誉与认证」 |
| 标题 → 卡区 gap | `40` | |
| 卡区行 gap | `24` | 多行时 |

```css
.por-award-floor {
  padding: 76px 160px;
  background: #F5F5F5;
}
.por-award-floor__title { font-size: 36px; line-height: 54px; color: #191919; margin: 0 0 40px; }
.por-award-grid { display: grid; gap: 24px; }
.por-award-grid--2 { grid-template-columns: repeat(2, 1fr); }
.por-award-grid--3 { grid-template-columns: repeat(3, 1fr); }
```

## 3. 卡片 A：图书卡（横向图文）

适用于封面明显的对象（书、白皮书、认证证书）。

```
┌──────────────────────────────────────────────┐
│  ┌────────┐  获得CCEAL2+ALCFLR.2认证          │  ← 标题 20px #000000
│  │        │  这里是描述文字……（多行 16px）     │
│  │ 封面    │  ……                               │
│  │180×254 │  [次要按钮] [次要按钮]             │  ← 120×40 ×2，gap 16
│  └────────┘                                  │
└──────────────────────────────────────────────┘
   padding 28，pad 内 gap 28
```

| 元素 | 值 |
| --- | --- |
| 卡片（2 列） | `788 × 310` |
| 卡片（3 列） | `517 × 310` |
| 圆角 | `16` |
| padding | `28`（四边） |
| 封面 ↔ 内容 gap | `28` |
| 封面 | `180 × 254`（≈ 5:7，2 列时）；3 列时按比例缩到 `120 × 170` |
| 内容列宽 | `512`（2 列）/ 随容器撑满（3 列） |
| 标题 | `20px` `#000000`，`512 × 30`，单行 |
| 描述 | `16px` `#595959`，行高 `24`，最多 4 行（`96 / 48` 高两种实测块） |
| 标题 ↔ 描述 gap | `8` |
| 描述 ↔ 按钮 gap | `32` |
| 按钮组 | 两枚 `120 × 40`（`Medium` 次要按钮），gap `16` |

> 卡片高度 **310 是固定值**：封面 254 + pad 28 × 2 = 310。内容超长时**只截断描述**，不能把卡撑高——否则同排卡片不齐。

## 4. 卡片 B：奖项卡（小图 + 密集文字）

适用于认证条目、媒体报道（封面只是一枚徽标）。

| 元素 | 值 |
| --- | --- |
| 卡片 | `568 × 218`（1920 单排 3 个时的实测样例尺寸） |
| 圆角 | `16` |
| padding | `24`（四边） |
| 图 ↔ 内容 gap | `24` |
| 图 | `120 × 170`（≈ 5:7） |
| 内容列 | `376` 宽 |
| 标题 | `16px` `#000000`，`376 × 22`，单行 |
| 描述 | `12px` `#595959`，行高 `18`，2 行（`36` 高） |
| 附加链接 | `12px` `#595959`，行高 `18`，最多 3 条，gap `4` |
| 按钮组 | 两枚 `104 × 32`（`Small`），gap `8` |

**与图书卡的关键差异**

| 项 | 图书卡 | 奖项卡 |
| --- | --- | --- |
| 正文字号 | `16px` | **`12px`** |
| 按钮尺寸 | `120 × 40`（Medium） | `104 × 32`（Small） |
| 内容密度 | 标题 + ≤4 行描述 | 标题 + 2 行描述 + ≤3 条链接 |

> 奖项卡的 `12px` 是设计稿里少数允许正文低于 14px 的位置——因为它是**辅助信息块**，不是主阅读区。不要把这个字号带到其他卡片。

## 5. 四断点实测

| 断点 | 楼层高（2 个 / 3 个） | 上下 / 左右 padding | 卡区 | 标题 |
| --- | --- | --- | --- | --- |
| `1920` | `906 / 744` | `76 / 160` | `1600 × 660` / `1599 × 498` | `36px` |
| `1536` | `630 / 740` | `60 / 78` | `1380 × 426` | `32px` |
| `1280` | `624` | `52 / 64` | `1152 × 452` | `28px` |
| `1024` | `634 / 668` | `52 / 32` | `960 × 462` / `960 × 496` | `28 / 24px` |

```css
@media (max-width: 1535px) {
  .por-award-floor { padding: 60px 78px; }
  .por-award-floor__title { font-size: 32px; line-height: 48px; margin-bottom: 36px; }
  .por-award-card { padding: 24px; gap: 24px; }
  .por-award-card__cover { width: 150px; height: 212px; }
}
@media (max-width: 1279px) {
  .por-award-floor { padding: 52px 64px; }
  .por-award-floor__title { font-size: 28px; line-height: 40px; margin-bottom: 28px; }
  .por-award-grid { gap: 16px; }
}
@media (max-width: 1023px) {
  .por-award-floor { padding: 52px 32px; }
  .por-award-grid--3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .por-award-floor { padding: 40px 15px; }
  .por-award-grid--2, .por-award-grid--3 { grid-template-columns: 1fr; }
  .por-award-card { flex-direction: column; }
}
```

## 6. 完整示例

```html
<section class="por-award-floor">
  <h2 class="por-award-floor__title">荣誉与认证</h2>
  <div class="por-award-grid por-award-grid--2">
    <article class="por-award-card">
      <img class="por-award-card__cover" src="cert-cc.jpg" alt="CC EAL2+ 认证证书">
      <div class="por-award-card__body">
        <h3 class="por-award-card__title">获得 CC EAL2+ ALC_FLR.2 认证</h3>
        <p class="por-award-card__desc">由国际权威机构颁发，覆盖安全目标评估与缺陷修复流程，是国内云服务中首批通过该等级认证的产品之一。</p>
        <div class="por-btn-group">
          <a class="por-btn por-btn-secondary por-btn-middle" href="…">查看证书</a>
          <a class="por-btn por-btn-secondary por-btn-middle" href="…">了解详情</a>
        </div>
      </div>
    </article>
    <!-- 第 2 张同构 -->
  </div>
</section>
```

```css
.por-award-card {
  display: flex;
  gap: 28px;
  padding: 28px;
  border-radius: 16px;
  background: #FFFFFF;
  align-items: flex-start;
}
.por-award-card__cover {
  flex: 0 0 180px; height: 254px;
  border-radius: 4px; object-fit: cover;
  background: #F5F5F5;
}
.por-award-card__body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.por-award-card__title { font-size: 20px; line-height: 30px; color: #000000; margin: 0;
                         white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.por-award-card__desc { font-size: 16px; line-height: 24px; color: #595959; margin: 0;
                        display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.por-award-card .por-btn-group { margin-top: auto; display: flex; gap: 16px; padding-top: 32px; }
```

## 7. 选型决策规则

| 判断 | 结论 |
| --- | --- |
| 有竖版封面（书 / 报告 / 证书）？ | `图书卡`，封面 `180 × 254` |
| 只有徽标或小图？ | `奖项卡`，图 `120 × 170` |
| 条目 4 个？ | `图书卡` 2 列 × 2 行，行 gap `24` |
| 条目 5~6 个？ | `奖项卡` 3 列 × 2 行 |
| 条目 > 6 个？ | 只展示 6 个 + 「查看全部」链接 |
| 同排封面比例不一致？ | 统一 `object-fit: cover` 裁到 5:7，**不要**留白 |

## 8. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | ≤ 6 字 | 「荣誉与认证」「出版物」 |
| 卡片标题 | ≤ 20 字，单行 | 「获得 CC EAL2+ ALC_FLR.2 认证」 |
| 描述 | 图书卡 ≤ 80 字 / 4 行；奖项卡 ≤ 40 字 / 2 行 | |
| 附加链接 | 奖项卡 ≤ 3 条，每条 ≤ 12 字 | |
| 按钮 | 两枚以内，「查看证书 / 了解详情」这类弱动作 | |

## 9. Do / Don't

**Do**

- ✅ 封面统一裁切比例，边缘用 `#F5F5F5` 兜底底色
- ✅ 同排卡片等高，按钮用 `margin-top: auto` 贴底对齐
- ✅ 描述超出就截断，加 `title` 属性兜底
- ✅ 证书类图片加 `alt` 写明认证名称

**Don't**

- ❌ 不要把 `12px` 正文用在图书卡上（那是奖项卡专用密度）
- ❌ 不要让卡片高度随内容变化（310 / 218 是固定值）
- ❌ 不要在封面里塞多张图拼贴（一眼看不出是什么）
- ❌ 不要给卡片加边框或阴影
- ❌ 不要用 4 列排布（1600 / 4 只剩 380 宽，封面放不下）
