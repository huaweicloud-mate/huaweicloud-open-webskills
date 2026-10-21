# 推荐文档（Document Recommend Floor）

来源：官网设计稿「推荐文档」页面（`组合样式` 1排3个 / 1排4个 / 1排5个 + `多分辨率` 4 档 + `单卡样式`）节点树实测

产品页、开发者页底部的「**文档与学习成长**」楼层：一排 3~5 张小卡，每张卡是一个学习路径（快速入门 / 最佳实践 / API 参考…），卡内是链接清单。

它是**楼层级组合**，不是单个组件——链接见 `components/links.md`，本文只定义「怎么把文档入口排成一层」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 首页 / 产品页「文档与学习成长」 | 一排 3 个（`517 × 242`） |
| 文档中心入口（4 条路径） | 一排 4 个（`388 × 242`）× 2 行 |
| 页脚上方（5 条路径，信息密度高） | 一排 5 个（`307 × 290`） |
| 单列侧边推荐（详情页右栏） | `307 × 266` 单卡竖排 |

**不要**用它做：新闻流（用 `news-blog`）、功能卖点（用 `advantage-floor`）、API 参数表（用 `service-table`）。

## 2. 楼层规格（实测 1920）

| 项 | 一排 3 个 | 一排 4 个 | 一排 5 个 |
| --- | --- | --- | --- |
| 楼层高 | `488` | `746`（2 行） | `536` |
| 卡行 | `1599 × 242` | `1600 × 500` | `1600 × 290` |
| 卡尺寸 | `517 × 242` | `388 × 242` | `307 × 290` |
| 卡间 gap | `24` | `16` | `16` |
| 行间 gap | — | `16` | — |

公共规格：

| 项 | 值 |
| --- | --- |
| 上下 padding | `76` |
| 左右 padding | `160`（内容区 `1600`） |
| 楼层底色 | `#FFFFFF` |
| 楼层标题 | `36px` `#191919`，`1162 × 54` |
| 标题 → 卡行 gap | `40` |

```css
.por-doc-floor { padding: 76px 160px; background: #FFFFFF; }
.por-doc-floor__title { font-size: 36px; line-height: 54px; color: #191919; margin: 0 0 40px; }
.por-doc-grid { display: grid; gap: 16px; }
.por-doc-grid--3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
.por-doc-grid--4 { grid-template-columns: repeat(4, 1fr); }
.por-doc-grid--5 { grid-template-columns: repeat(5, 1fr); }
```

> 注意这一层是**白底**（不像新闻/奖项/优势楼层用 `#F5F5F5`）。卡片本身也没有底色和圆角——它是「透明卡」，只靠留白和标题分层。所以**不能给它加 hover 底色**，否则整层会碎。

## 3. 单卡结构（实测 `307 × 266`）

```
┌──────────────────────────┐
│ 快速入门            20px │  ← 标题 243 × 30
│                          │
│ 链接按钮            16px  │  ← 每条 243 × 24
│ 链接按钮                  │     gap 12
│ 链接按钮                  │
│ 链接按钮                  │
│                          │
│ 链接按钮 →          16px  │  ← 底部「查看全部」88 × 24
└──────────────────────────┘
  padding 20 / 32 / 32
```

| 元素 | 值 |
| --- | --- |
| 卡片 | `307 × 266`（5 条链接时 `290`，3 条时 `242`） |
| padding | 上 `20` / 左右 `32` / 下 `32` |
| 内部竖向 gap | `16` |
| 标题 | `20px` `#191919`，`243 × 30` |
| 链接条目 | `243 × 24`，文字 `16px` `#191919`，条间 gap `12` |
| 底部「查看全部」 | `88 × 24`，文字 `16px` `#191919` + 箭头 `20 × 20`（`#808080`），gap `4` |

**卡高与链接条数的对应（实测）**

| 链接条数 | 卡高 | 用在哪 |
| --- | --- | --- |
| 3 | `242` | 一排 3 / 4 个 |
| 4 | `266` | 单列侧边 |
| 5 | `290` | 一排 5 个 |

> 同一排的卡**链接条数必须一致**。5 条和 3 条混排时，卡高差 48px，底部「查看全部」对不齐，整层会显得没做完。

## 4. 完整示例

```html
<section class="por-doc-floor">
  <h2 class="por-doc-floor__title">文档与学习成长</h2>
  <div class="por-doc-grid por-doc-grid--3">
    <div class="por-doc-card">
      <h3 class="por-doc-card__title">快速入门</h3>
      <ul class="por-doc-card__list">
        <li><a href="…">创建第一台云服务器</a></li>
        <li><a href="…">配置安全组</a></li>
        <li><a href="…">连接实例</a></li>
      </ul>
      <a class="por-doc-card__more" href="…">查看全部</a>
    </div>
    <!-- 其余 2 张同构 -->
  </div>
</section>
```

```css
.por-doc-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 32px 32px;
  min-height: 242px;
}
.por-doc-card__title { font-size: 20px; line-height: 30px; color: #191919; margin: 0; }
.por-doc-card__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.por-doc-card__list a {
  display: block; font-size: 16px; line-height: 24px; color: #191919;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  text-decoration: none;
}
.por-doc-card__list a:hover { color: var(--por-color-brand, #0067D1); text-decoration: underline; }

.por-doc-card__more {
  margin-top: auto;
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 16px; line-height: 24px; color: #191919; text-decoration: none;
}
.por-doc-card__more::after {
  content: ""; width: 20px; height: 20px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M7 4l6 6-6 6' stroke='%23808080' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") center/contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M7 4l6 6-6 6' stroke='%23808080' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") center/contain no-repeat;
  color: #808080;
}
```

## 5. 四断点实测

| 断点 | 上下 / 左右 padding | 楼层标题 | 卡行 | 排布 |
| --- | --- | --- | --- | --- |
| `1920` | `76 / 160` | `36px` | `1599 × 242` | 3 / 4 / 5 列 |
| `1536` | `60 / 160` | `32px` | `1382 × 208` | 3 列 |
| `1280` | `52 / 160` | `28px` | `1152 × 170` | 3 列 |
| `1024` | `52 / 160` | `24px` | `963 × 170` / `960 × 356` | 3 列 / 2 列 |

> 断点只缩 padding 与字号，**列数不变**——文档路径是并列关系，变列会打乱阅读顺序。1024 起才允许掉到 2 列。

```css
@media (max-width: 1535px) {
  .por-doc-floor { padding: 60px 160px; }
  .por-doc-floor__title { font-size: 32px; line-height: 48px; margin-bottom: 32px; }
  .por-doc-card { padding: 16px 24px 24px; gap: 12px; min-height: 208px; }
  .por-doc-card__title { font-size: 18px; line-height: 28px; }
  .por-doc-card__list a { font-size: 14px; line-height: 22px; }
}
@media (max-width: 1279px) {
  .por-doc-floor { padding: 52px 32px; }
  .por-doc-floor__title { font-size: 28px; line-height: 40px; margin-bottom: 28px; }
  .por-doc-grid--3, .por-doc-grid--4, .por-doc-grid--5 { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}
@media (max-width: 1023px) {
  .por-doc-floor__title { font-size: 24px; line-height: 36px; }
  .por-doc-grid--3, .por-doc-grid--4, .por-doc-grid--5 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .por-doc-floor { padding: 40px 15px; }
  .por-doc-grid--3, .por-doc-grid--4, .por-doc-grid--5 { grid-template-columns: 1fr; }
}
```

## 6. 列数决策规则

| 判断 | 结论 |
| --- | --- |
| 3 条学习路径（入门 / 进阶 / 参考）？ | 3 列，`517` 宽，链接 ≤ 3 条 |
| 4 条路径且内容短？ | 4 列 × 2 行，`388` 宽 |
| 5 条路径、链接 ≤ 5 条？ | 5 列，`307` 宽——再窄就放不下「创建第一台云服务器」这种标题 |
| 链接文案普遍 > 14 字？ | 降到 3 列，别硬塞 5 列 |
| 只是侧栏 1 个入口？ | 用单卡 `307 × 266`，不要用整层 |

## 7. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | 「文档与学习成长」这类固定句式，≤ 12 字 | |
| 卡片标题 | **4 字**为最佳（快速入门 / 最佳实践 / API 参考 / 常见问题） | |
| 链接文案 | ≤ 14 字，动宾短语，不加句号 | 「创建第一台云服务器」 |
| 链接条数 | 同排一致，3 条或 5 条 | |
| 底部链接 | 统一「查看全部」，不要每张卡换说法 | |

## 8. Do / Don't

**Do**

- ✅ 同排卡链接条数一致，底部「查看全部」对齐
- ✅ 卡片无底色，靠标题字号和留白分层
- ✅ 链接 hover 用品牌色 + 下划线，给可点击反馈
- ✅ 每条链接单独可点，不要整卡跳转

**Don't**

- ❌ 不要给卡片加边框/底色/圆角（这一层是透明卡，加了就变成卡片墙）
- ❌ 不要在卡里放图标或缩略图（会挤掉链接行）
- ❌ 不要让链接折行（单行截断 + `title` 兜底）
- ❌ 不要在一层里混用 3 列和 5 列
- ❌ 不要把「查看全部」做成按钮（它是弱链接，不是 CTA）
