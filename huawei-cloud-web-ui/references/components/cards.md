# 卡片组件

来源：Tiny PortalUI card 规范

提供各种样式的卡片。

## 基础卡片

使用下面列出的类创建不同尺寸的卡片。中尺寸卡片 `.por-card-m` 没有华为线。

```html
<div class="por-row">
    <div class="por-col-6">
        <div class="por-card por-card-m">
            <div class="por-card-content">
                <h3 class="por-text-title-t3">卡片标题</h3>
                <div class="por-text-body-t1">文本正文内容...</div>
            </div>
        </div>
    </div>
    <div class="por-col-6">
        <div class="por-card por-card-l">
            <!-- ... -->
        </div>
    </div>
    <div class="por-col-6">
        <div class="por-card por-card-xl">
            <!-- ... -->
        </div>
    </div>
</div>
```

## 卡片指针规则（可跳转卡片）

可跳转的卡片需使用 `<a>` 包裹并带上卡片类。

```html
<a href="#" class="por-card por-card-l">
    <div class="por-card-content">
        <h3 class="por-text-title-t3">可跳转，不带按钮卡片</h3>
        <div class="por-text-body-t1">文本正文内容...</div>
    </div>
</a>
```

## 其他类型卡片

带图标、左对齐、面板卡片、带副标题、带图片等。

```html
<div class="por-card por-card-l">
    <div class="por-card-icon">
        <span class="icons-product-md ecs"></span>
    </div>
    <div class="por-card-content">
        <h3 class="por-text-title-t3">带图标的卡片</h3>
        <!-- ... -->
    </div>
</div>

<div class="por-card por-card-panel">
    <!-- 面板卡片内容 -->
</div>
```

## 不同皮肤

前景色为 light，背景色为 dark 或 transparent。

```html
<div class="por-card por-card-l por-card-light-dark">
    <!-- ... -->
</div>
<div class="por-card por-card-l por-card-light-transparent">
    <!-- ... -->
</div>
```

## 双卡售前（官网实测）

售前咨询楼层用**两张等宽卡并排**，是 `por-card` 在官网最典型的组合用法：图标 + 标题 + 正文 + 按钮组，两卡严格等高。

```
1920 × 528    padding 76 / 160    gap 40    底 #F5F5F5
├─ 标题「售前咨询」36px #191919
└─ 卡行 1600 × 282   gap 24
   ├─ 卡 A 788 × 282  r16  padding 32/32/40/32  gap 28
   └─ 卡 B 788 × 282  （同构）
```

### 卡的内部（三行）

| 层 | 尺寸 | 说明 |
| --- | --- | --- |
| 图标 | `48 × 48` 或 `60 × 60` | 圆角 `11`，`1px` 描边；两档决定卡高 |
| 内容块 | `724 × 202`（组合）/ `724 × 210`（单卡） | `gap 32`，内含标题、正文、脚注 |
| 按钮组 | `256 × 40` | `gap 16`，主按钮 + 2 个次按钮 |

卡高由图标档位决定：

| 图标 | 卡高 | 内容块高 | 用途 |
| --- | --- | --- | --- |
| `48 × 48` | `350` | `210` | 文字多（带脚注） |
| `60 × 60` | `370` | `210` | 文字多 + 大图标 |
| `48 × 48`（组合楼层内） | `282` | `202` | 楼层内两卡等高，正文压到 2 行 |

**同一楼层内两卡必须等高**，高度取较高那张，另一张用 `align-items: stretch` 拉齐——不要各自按内容自适应。

### 卡宽换算

`788 × 2 + 24 = 1600`，正好等于 1920 内容区。换成栅格就是 `--por-col-6` 各一格 + `24px` 间距，不需要 `por-row` 的默认 gutter。

### 联系方式行（2 组不换行 / 换行）

卡底部常挂一行双电话，是独立的小组件，两态：

| 状态 | 尺寸 | 排布 |
| --- | --- | --- |
| **2 组不换行** | `401 × 36` | 号码1 `223` + 竖线 `1 × 36` + 号码2 `137`，`gap 20` |
| **2 组换行** | `724 × 72` | 号码本身折成两行（`342 × 72`），竖线满高 `72`，右号码 `341 × 36` |

- 号码字号 `24px` `#191919`，行高 `36`。
- 中间竖线 `1px`、`#C2C2C2`；不换行时竖线只有 `18` 高（垂直居中），换行时满高 `72`。
- 容器窄于 `440` 时必须用折行版，否则右侧号码会被截断。

```html
<section class="por-presale">
  <h2 class="por-presale__title">售前咨询</h2>
  <div class="por-presale__row">
    <article class="por-card por-card-l por-presale__card">
      <span class="icons-product-md ecs por-presale__icon"></span>
      <div class="por-card-content">
        <h3 class="por-text-title-t3">售前咨询热线</h3>
        <div class="por-text-body-t1">7×24 小时在线，1 对 1 解答选型与迁移问题。</div>
        <div class="por-presale__contact">
          <span>4000-955-988 转 1</span>
          <i class="por-presale__divider"></i>
          <span>950808 转 1</span>
        </div>
      </div>
      <div class="por-btn-group">
        <a class="por-btn por-btn-primary por-btn-middle">立即咨询</a>
        <a class="por-btn por-btn-secondary por-btn-middle">提交工单</a>
        <a class="por-btn por-btn-secondary por-btn-middle">联系客户经理</a>
      </div>
    </article>
    <!-- 第二张同构卡 -->
  </div>
</section>
```

```css
.por-presale {
  padding: 76px 160px;
  background: #f5f5f5;
}
.por-presale__row {
  display: flex;
  gap: 24px;
  align-items: stretch;      /* 两卡等高 */
  margin-top: 40px;
}
.por-presale__card {
  flex: 1;
  border-radius: 16px;
  padding: 32px 32px 40px;   /* 上右下左：底部多 8 */
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: #fff;
}
.por-presale__icon {
  width: 48px;
  height: 48px;
  border-radius: 11px;
}
.por-presale__contact {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  line-height: 36px;
  color: #191919;
}
.por-presale__divider {
  width: 1px;
  height: 36px;
  background: #c2c2c2;
}
.por-btn-group { display: flex; gap: 16px; margin-top: auto; }
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-card` | 卡片最外层 class |
| `por-card-xl` | 特大尺寸卡片 |
| `por-card-l` | 大尺寸卡片 |
| `por-card-m` | 中尺寸卡片 |
| `por-card-align-left` | 卡片内容居左 |
| `por-card-panel` | 面板形式卡片 |
| `por-card-icon` | 卡片上的图标区域 |
| `por-card-icon-left` | 卡片上的图标居左 |
| `por-card-light-dark` | 前景色 light、背景色 dark 的卡片 |
| `por-card-light-transparent` | 前景色 light、背景色 transparent 的卡片 |
| `por-card-content` | 卡片文本区域 |
| `por-text-title-t3` | 卡片文本区域-标题 |
| `por-text-body-t1` | 卡片文本区域-正文内容 |
| `por-text-body-t1-textOverflow` | 文字单行显示，溢出显示省略号 |
