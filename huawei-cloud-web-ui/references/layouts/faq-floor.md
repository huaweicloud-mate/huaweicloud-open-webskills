# 常见问题楼层（FAQ Floor）

来源：官网设计稿「常见问题」页面（`组合样式` 1920×814 + `单个问题展开` / `单个问题收起` + `多分辨率`）节点树实测

产品页、定价页、活动页底部的「**常见问题**」楼层：一个大白卡装一组可折叠问答，左侧 help 图标 + 20px 问题，点击展开正文。

它是**楼层级组合**，折叠交互本体见 `components/collapse.md`，本文只定义 FAQ 这一层的版式与文案规格。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 产品页底部 FAQ | 6~8 条，默认全收起 |
| 定价页（计费相关疑问） | 4~6 条，首条可默认展开 |
| 活动页（规则说明） | ≤ 10 条，配「查看全部」链接 |
| 帮助中心入口 | 用 `doc-recommend`，不要用 FAQ 楼层 |

## 2. 楼层规格（实测 1920）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 楼层画板 | `1920 × 814` | 8 条收起态 |
| 上下 padding | `76px` | |
| 左右 padding | `160px` | 内容区 `1600` |
| 楼层底色 | `#F5F5F5` | |
| 标题区 | `1600 × 90` | |
| 标题区 → 内容块 gap | `32` | |
| 内容块 | `1600 × 480` | 白卡，`border-radius: 16px`，padding `24 32` |
| 内容块内 gap | `24` | 条与条之间 |

```css
.por-faq-floor { padding: 76px 160px; background: #F5F5F5; }
.por-faq-head  { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
.por-faq-panel { padding: 24px 32px; border-radius: 16px; background: #FFFFFF; }
```

## 3. 标题区（实测）

| 元素 | 值 |
| --- | --- |
| 标题 | `36px` `#191919`，`630 × 54`（「常见问题」） |
| 副文 | `16px` `#595959`，单行 `24` 高，位于标题下方 gap `12` |
| 副文宽度 | `630`（不与标题同宽到 1600，保持短行易读） |
| 右上「查看全部」 | `64 × 24`，`16px` `#191919` + 箭头 |

```
常见问题                                     查看全部 →
副文本原则上不限制行数，建议一行
```

> 副文**实测建议一行**（设计稿原文批注：「副文本原则上不限制行数，建议一行；移动端可以另外处理」）。超过一行就说明这段文案该删。

## 4. 单条问答（收起态，实测 `1536 × 55`）

| 元素 | 值 |
| --- | --- |
| 行高 | `30` |
| 行 padding | `8`（上下） |
| 左侧 help 图标 | `24 × 24` |
| 图标 → 文字 gap | `16` |
| 问题文字 | `20px` `#191919`，`1448` 宽，单行 |
| 右侧折叠图标 | `24 × 24` |
| 分隔线 | `1px` `#DBDBDB`，位于行下方 |
| 条与条 gap | `24` |

## 5. 单条问答（展开态，实测 `1536 × 299`）

| 元素 | 值 |
| --- | --- |
| 标题行 | 同收起态 `30` |
| 正文区 padding | 左右 `40` / 上 `48`（相对内容块） |
| 正文 | `16px` `#595959`，行高 `48`（实测块高 `144` = 3 行） |
| 段落 gap | `8` |
| 底部再一条分隔线 | `1px` `#DBDBDB` |

> 正文行高 `48` 看起来偏大——实测是因为设计稿正文块按 `16px / 32px` 行高 + 上下各 `8px` 段落间距排版。落地实现用 `line-height: 32px; margin-bottom: 16px` 更稳。

```html
<div class="por-faq-panel">
  <div class="por-faq-item">
    <button class="por-faq-item__q" aria-expanded="false" aria-controls="faq-1">
      <span class="por-faq-item__icon" aria-hidden="true"></span>
      <span class="por-faq-item__text">如何选择适合我的实例规格？</span>
      <span class="por-faq-item__fold" aria-hidden="true"></span>
    </button>
    <div class="por-faq-item__a" id="faq-1" hidden>
      <p>按 CPU 与内存配比选择：通用型适合 Web 应用，计算型适合高并发计算，内存型适合数据库与缓存。</p>
    </div>
  </div>
  <!-- 其余条目 -->
</div>
```

```css
.por-faq-item + .por-faq-item { margin-top: 24px; }

.por-faq-item__q {
  display: flex; align-items: center; gap: 16px;
  width: 100%; padding: 8px 0;
  background: none; border: 0; cursor: pointer; text-align: left;
  border-bottom: 1px solid #DBDBDB;
}
.por-faq-item__text {
  flex: 1 1 auto;
  font-size: 20px; line-height: 30px; color: #191919;
}
.por-faq-item__icon {
  flex: 0 0 24px; width: 24px; height: 24px;
  background: currentColor; color: #191919;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='9' stroke='%23000' stroke-width='1.6' fill='none'/%3E%3Cpath d='M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.7.7-.7 1.3v.6M12 17h.01' stroke='%23000' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") center/contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='9' stroke='%23000' stroke-width='1.6' fill='none'/%3E%3Cpath d='M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.7.7-.7 1.3v.6M12 17h.01' stroke='%23000' stroke-width='1.6' fill='none'/%3E%3C/svg%3E") center/contain no-repeat;
}
.por-faq-item__fold { flex: 0 0 24px; width: 24px; height: 24px; position: relative; }
.por-faq-item__fold::before,
.por-faq-item__fold::after {
  content: ""; position: absolute; left: 6px; right: 6px; top: 11px;
  height: 2px; background: #191919;
}
.por-faq-item__fold::after { transform: rotate(90deg); transition: transform .2s; }
.por-faq-item__q[aria-expanded="true"] .por-faq-item__fold::after { transform: rotate(0); }

.por-faq-item__a { padding: 16px 0 16px 40px; }
.por-faq-item__a p { font-size: 16px; line-height: 32px; color: #595959; margin: 0 0 16px; }
.por-faq-item__a p:last-child { margin-bottom: 0; }
```

## 6. 四断点实测

| 断点 | 楼层高 | 上下 / 左右 padding | 内容块 | 标题 |
| --- | --- | --- | --- | --- |
| `1920` | `814` | `76 / 160` | `1600 × 480` | `36px` |
| `1536` | `—` | `60 / 78` | `1380` | `32px` |
| `1280` | `—` | `52 / 64` | `1152` | `28px` |
| `1024` | `—` | `52 / 32` | `960` | `24px` |

```css
@media (max-width: 1535px) {
  .por-faq-floor { padding: 60px 78px; }
  .por-faq-head h2 { font-size: 32px; line-height: 48px; }
}
@media (max-width: 1279px) {
  .por-faq-floor { padding: 52px 64px; }
  .por-faq-head h2 { font-size: 28px; line-height: 40px; }
  .por-faq-panel { padding: 20px 24px; }
  .por-faq-item__text { font-size: 18px; line-height: 28px; }
}
@media (max-width: 1023px) {
  .por-faq-floor { padding: 52px 32px; }
  .por-faq-head h2 { font-size: 24px; line-height: 36px; }
}
@media (max-width: 767px) {
  .por-faq-floor { padding: 40px 15px; }
  .por-faq-head { flex-direction: column; gap: 8px; }
  .por-faq-item__text { font-size: 16px; line-height: 24px; }
  .por-faq-item__a { padding-left: 0; }
}
```

## 7. 展开行为

| 行为 | 规则 |
| --- | --- |
| 默认 | 全收起（`aria-expanded="false"`） |
| 同时展开条数 | **不限**，允许全开（用户是在查资料，不该强制互斥） |
| 首条 | 可在定价页默认展开，用于回答最常见疑问 |
| 动画 | 高度过渡 `200ms ease-out`，不做淡入 |
| 锚点 | 支持 `#faq-3` 直接展开并滚动定位 |
| 埋点 | 展开事件应上报问题编号（判断哪些问题真的被看） |

## 8. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 楼层标题 | 「常见问题」，不加「FAQ」混排 | |
| 副文 | **一行**，≤ 30 字 | 「关于计费、规格与迁移的高频疑问」 |
| 问题 | **≤ 30 字**，疑问句，句末不加问号也可（实测无问号） | 「如何选择适合我的实例规格」 |
| 答案 | ≤ 120 字 / 3 行；超出就拆成两条问题 | |
| 条数 | 4~10 条；超过 10 条加「查看全部」链接到帮助中心 | |

**问题排序**：按真实咨询量降序，不按功能模块——用户找的是「我遇到的问题」，不是「产品目录」。

## 9. Do / Don't

**Do**

- ✅ 整行可点击（`<button>` 包住整行），不要只让图标可点
- ✅ 展开态图标从 `+` 变 `−`（旋转 90°），给明确状态
- ✅ 答案里可以放链接，但不超过 2 个
- ✅ 支持键盘 `Enter` / `Space` 展开

**Don't**

- ❌ 不要做手风琴互斥（一次只能开一条）——查资料时用户要对照看
- ❌ 不要把答案写成营销话术（「华为云为您提供业界领先…」），FAQ 只解决问题
- ❌ 不要在答案里放图片/视频（会破坏行高节奏，需要就用图文卡另开楼层）
- ❌ 不要超过 10 条还不给「查看全部」
- ❌ 不要让问题折成两行（20px 两行会打乱 55px 行高）
