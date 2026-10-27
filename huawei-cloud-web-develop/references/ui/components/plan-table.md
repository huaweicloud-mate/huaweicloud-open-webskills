# 套餐对比表格（Plan Table）

来源：官网设计稿「表单套餐（对比表格）」组件族实测（21 个变体）

官网售卖页的核心模块：用一张表把多个套餐按「权益维度」横向对比，底部固定购买入口。与 `service-table`（侧标题列的服务列表）、`fixed-table`（斑马纹参数表）不同，本组件必须支持**价格行、购买 CTA 行、推荐列高亮**。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 云产品套餐对比（建站套餐、安全套餐、主机套餐） | 3~5 列，含价格与购买按钮 |
| 产品规格矩阵（实例类型 × 规格项） | 4~10 列，纯参数，无购买行 |
| 权益对比（免费版 / 企业版 / 旗舰版） | 2~4 列，推荐列高亮 |

**不要**用本组件做纯数据表格（日志、账单明细）——那属于 `fixed-table`。

## 2. 变体体系（实测）

组件按四个属性轴生成变体，命名格式 `属性=值,属性=值`：

| 属性轴 | 取值 | 说明 |
| --- | --- | --- |
| `列数` | 4 / 5 / 6 / 9 / 10 | 决定每列宽度（内容区均分） |
| `图标` | 有 / 无 | 单元格内权益前是否带图标（勾 / 叉 / 破折号） |
| `竖线框` | 有 / 无 | 是否显示列分隔竖线 |
| `底` | 白 / 灰 | 表格整体底色 |

示例变体名：`图标=有,底=白,列数=4,竖线框=无`、`图标=无,底=白,列数=6,竖线框=有`。

表头另有独立变体：`位置=右上角,类型=表头,底=灰/白,竖线框=有/无`。

## 3. 结构解剖

```
┌─────────────────────────────────────────────────┐
│ 分区 1（可选，多区块时使用）                      │
│  ┌────────┬────────┬────────┬────────┐          │
│  │ 首列    │ 表头-中列│ 表头-中列│ 表头-中列│  ← 表头行（底=灰）
│  │(权益名) │ +标签组  │ +标签组  │ +标签组  │          │
│  ├────────┼────────┼────────┼────────┤          │
│  │ 权益 1  │ ✓      │ ✓      │ ✓      │  ← 数据行（h=64）
│  │ 权益 2  │ ✓      │ ✓      │ —      │          │
│  ├────────┼────────┼────────┼────────┤          │
│  │        │ ¥698/年 │ ¥1298/年│ ¥2298/年│  ← 价格行（h=140~215）
│  ├────────┼────────┼────────┼────────┤          │
│  │        │ [立即购买]│[立即购买]│[立即购买]│  ← 购买行（购买单元格）
│  └────────┴────────┴────────┴────────┘          │
│ 分区 2（可选）                                    │
└─────────────────────────────────────────────────┘
```

### 单元格类型

| 类型 | 用途 | 实测尺寸特征 |
| --- | --- | --- |
| 首列 | 权益名称（左对齐，通常加粗） | 与其他列等宽 |
| 表头单元格-中列 | 套餐名 + 标签组 | 高 93 / 123 / 125 / 137 / 215 等 |
| 表中单元格 | 权益值（文字 / 图标 / 破折号） | 高 64 为绝对主力 |
| 尾列 | 最后一列（无右边框） | 与中列一致 |
| 购买单元格 | 价格 + 购买按钮纵向堆叠 | 320×144 或 178×192，内 gap 20 |

## 4. 尺寸规格（实测）

| 项 | 值 | 说明 |
| --- | --- | --- |
| 表格总宽 | `1600px` | 等于内容区宽度，不出安全边距 |
| 列宽 | `1600 / 列数` | 4 列时每列 400px，均分，不设最小宽 |
| 表头行高 | `93 ~ 319px` | 随内容（套餐名行数、标签组）浮动 |
| 数据行高 | `64px` | 主力值（353 个单元格），单行文字 |
| 数据行高（双行） | `88 ~ 92px` | 权益名超一行时 |
| 价格行高 | `140 / 144 / 166` | 含价格 + 副标题 |
| 购买行高 | `192 ~ 215px` | 含按钮与「限购」说明 |
| 单元格 padding | `20px 0 0 0` | 顶对齐 20px，左右留 0（靠列宽均分） |
| 单元格 padding（带框） | `20px 20px 32px 20px` | `竖线框=有` 时左右补 20px |
| 购买单元格 gap | `20px` | 价格与按钮之间 |

## 5. 推荐列高亮

设计稿用浅蓝底标记推荐套餐（实测 `#F0F7FF`，出现 36 次）：

```css
.hc-plan-col--recommend {
  background: #F0F7FF;
  position: relative;
}
.hc-plan-col--recommend::before {
  content: "推荐";
  position: absolute; top: 0; left: 0; right: 0;
  height: 24px; line-height: 24px; text-align: center;
  background: #C7000B; color: #fff; font-size: 12px;
  border-radius: 24px 24px 0 0;
}
```

- 推荐列**最多一个**，且必须包含在可见列内（不藏在横向滚动里）；
- 推荐列的价格与按钮要与其他列同高，不额外放大。

## 6. 表头标签组

套餐名下方可挂标签（`新用户专享`、`限购一台`、`省 30%`），实测规格：

| 项 | 值 |
| --- | --- |
| 标签组尺寸 | `104×18` |
| 标签间 gap | `4px` |
| 标签字号 | `12px` |
| 标签高度 | `18px` |

一个套餐最多挂 **2 个**标签，超出就换行或只保留最重要的一个。

## 7. 实现骨架

```html
<div class="hc-plan-table" style="--cols: 4;">
  <div class="hc-plan-row hc-plan-row--head">
    <div class="hc-plan-cell hc-plan-cell--lead">权益</div>
    <div class="hc-plan-cell">入门版
      <div class="hc-plan-tags"><span class="por-label por-label-s">新用户专享</span></div>
    </div>
    <div class="hc-plan-cell hc-plan-cell--recommend">企业版
      <div class="hc-plan-tags"><span class="por-label por-label-s">推荐</span></div>
    </div>
    <div class="hc-plan-cell">旗舰版</div>
  </div>

  <div class="hc-plan-row">
    <div class="hc-plan-cell hc-plan-cell--lead">云服务器</div>
    <div class="hc-plan-cell">✓</div>
    <div class="hc-plan-cell hc-plan-cell--recommend">✓</div>
    <div class="hc-plan-cell">✓</div>
  </div>

  <div class="hc-plan-row hc-plan-row--price">
    <div class="hc-plan-cell hc-plan-cell--lead"></div>
    <div class="hc-plan-cell"><span class="hc-plan-price">¥698</span>/年</div>
    <div class="hc-plan-cell hc-plan-cell--recommend"><span class="hc-plan-price">¥1298</span>/年</div>
    <div class="hc-plan-cell"><span class="hc-plan-price">¥2298</span>/年</div>
  </div>

  <div class="hc-plan-row hc-plan-row--cta">
    <div class="hc-plan-cell hc-plan-cell--lead"></div>
    <div class="hc-plan-cell"><a class="por-btn por-btn-primary">立即购买</a></div>
    <div class="hc-plan-cell hc-plan-cell--recommend"><a class="por-btn por-btn-primary">立即购买</a></div>
    <div class="hc-plan-cell"><a class="por-btn por-btn-primary">立即购买</a></div>
  </div>
</div>
```

```css
.hc-plan-table {
  width: 1600px; max-width: 100%;
  display: flex; flex-direction: column;
  background: #fff;
}
.hc-plan-row { display: grid; grid-template-columns: repeat(var(--cols), 1fr); }
.hc-plan-cell {
  padding: 20px 20px 32px;
  border-bottom: 1px solid #DFDFDF;
  font-size: 14px; color: #595959;
  display: flex; flex-direction: column; gap: 20px;
}
.hc-plan-cell--lead { color: #191919; font-weight: 500; }
.hc-plan-row--head .hc-plan-cell { background: #F8F8F8; color: #191919; font-size: 16px; }
.hc-plan-price { font-size: 28px; color: #C7000B; }  /* 促销价红；常规价用 #191919 */
```

## 8. Do / Don't

**Do**

- 列数 ≥ 4 时，先确认 1600 内容区下每列 ≥ 300px，否则减少列数；
- 价格行与购买行必须在同一屏内可见，不让用户滚动后才看到价格；
- 权益项的图标语义统一（✓ 有 / — 无），不要混用不同图标表达同一含义。

**Don't**

- 不要给表格加横向滚动：套餐对比表一旦需要滚动，推荐列就会滚出视野，失去对比意义；
- 不要在表格里放超过 2 个标签，标签会挤压套餐名；
- 不要用 `fixed-table` 的斑马纹（`rgba(17,26,44,0.03)`）给整个对比表：那会与推荐列高亮冲突。

## 9. 与相近组件的区别

| 组件 | 区别 |
| --- | --- |
| `service-table` | 侧标题列的服务清单，无价格行、无购买列 |
| `fixed-table` | 参数/日志表，支持斑马纹与固定表头，无 CTA |
| **plan-table** | 多套餐横向对比，必须含价格行 + 购买行 + 推荐列 |
