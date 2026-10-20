# 锚点导航

来源：Tiny PortalUI anchor 规范

锚点是页面内的超级链接导航的常用组件，可以帮助用户快速定位楼层。

## 实例

中文锚点不得超过 12 个字符，英文锚点不得超过 20 个字符，超出以 `...` 截断。锚点居中显示，每个锚点间距为 64px。当锚点整体长度超过 1200px 时，会出现右滑动箭头；锚点最多不得超过 15 个。

```html
<div class="por-section por-anchor" id="anchor1">
    <div class="por-container">
        <div class="por-section-body">
            <nav class="por-anchor-nav">
                <div class="por-anchor-list">
                    <a href="#锚点导航">锚点导航</a>
                    <a class="active" href="#实例">实例</a>
                    <a href="#方法">方法</a>
                    <a href="#事件">事件</a>
                    <!-- ... 更多锚点 ... -->
                </div>
                <div class="por-anchor-pre">
                    <div class="u-icon u-icon-left por-anchor-disabled"></div>
                </div>
                <div class="por-anchor-next">
                    <div class="u-icon u-icon-right por-anchor-disabled"></div>
                </div>
            </nav>
        </div>
    </div>
</div>
<script>
    const Anchor = $.fn.porAnchor.Constructor;
    // 指定滚动条容器，默认为 document.body
    Anchor.scrollElement = document.querySelector('.components-container');
    $("#anchor1").porAnchor();
</script>
```

> 锚点项即 `.por-anchor-list` 内的普通 `<a>`（当前项加 `.active`，其下划线由 `.active:after` 生成），baseui 中**没有** `por-anchor-slide` 类。

## 楼层锚点导航版式（官网实测）

上面是 PortalUI 的**组件能力**（含滚动箭头、15 项上限）。官网首页的「楼层锚点导航」是另一套版式：**不带箭头、不做横向滚动**，靠断点换排布方式。两套并存，做官网楼层时用这一套。

楼层锚点 `1920 × 76`（1536 下 `68`，1280 下 `60`），白底，贴楼层顶部。

### 六种组合（三档断点 × 两种对齐）

| 断点 | 对齐 | 条尺寸 | 左右 padding | 排布 | 项尺寸 | 项间距 |
| --- | --- | --- | --- | --- | --- | --- |
| `1920` | 居中 | `1920 × 76` | `180` | 整体居中，项**定宽** | `108 × 76` | `160` |
| `1920` | 左对齐 | `1920 × 76` | `160` | 靠左 | `108 × 76` | `80` |
| `1536` | 居中 | `1536 × 68` | `77` | **5 等分** | `276 × 68` | `0` |
| `1536` | 左对齐 | `1536 × 68` | `77` | 靠左 | `96 ~ 256 × 68` | `64` |
| `1280` | 居中 | `1280 × 60` | `64` | **5 等分** | `231 × 60` | `0` |
| `1280` | 左对齐 | `1280 × 60` | `65` | 靠左 | `84 ~ 224 × 60` | `52` |

两条规律，别记反：

- **大断点不等分**。1920 下项是定宽 `108`，6 项总宽只有 `1448`，居中时两侧各留 `236`——不是把 1600 摊成 6 份。间距放大（`160` / `80`）来撑开视觉，而不是把项拉宽。
- **小断点才等分**。1536 与 1280 的居中版是标准等分：`1536 − 77×2 = 1382`，五等分得 `276`，**项之间零间距**，靠项内 padding 拉开文字。

### 项的结构

```
┌──────────────┐  ← 108 × 76
│  padding 16  │
│   楼层名称    │  18px
│  padding 16  │
├──────────────┤  ← gap -2（负间距，指示条压住底边）
│▔▔▔▔▔▔▔▔▔▔▔▔▔▔│  2px #191919
└──────────────┘
```

| 断点 | 项尺寸 | 项内 padding | 文字 | 行高 |
| --- | --- | --- | --- | --- |
| `1920` | `108 × 76` | `16` | `18px` | `28` |
| `1536` | `276 × 68` | `14` | `16px` | `24` |
| `1280` | `231 × 60` | `12` | `14px` | `22` |

字号**逐档降**（18 → 16 → 14），不是保持不变。未选中 `#595959`，选中 `#191919`——两态字号与字重一致，只有颜色和指示条不同。

- 指示条 `2px` 实色 `#191919`，**与项同宽**，贴在项底；未选中项不渲染指示条（不是透明度 0）。
- 项外层是 `gap: -2px` 的纵向 stack，让指示条与文字块重叠 2px，避免出现 2px 缝。
- 项宽受文字长度影响：实测最宽项 `288`（1920）/ `256`（1536）/ `224`（1280），短项 `108` / `96` / `84`。所以**左对齐版的项不等宽**，别按等分切。

```css
.por-floor-anchor {
  display: flex;
  align-items: center;
  height: 76px;
  padding: 0 180px;          /* 左对齐版改 0 160px */
  background: #fff;
}
.por-floor-anchor__list {
  display: flex;
  gap: 160px;                /* 左对齐版 80px */
  margin: 0 auto;            /* 左对齐版去掉，且 justify-content: flex-start */
}
.por-floor-anchor__item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  font-size: 18px;
  line-height: 28px;
  color: #595959;
  white-space: nowrap;
}
.por-floor-anchor__item.is-active { color: #191919; }
.por-floor-anchor__item.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #191919;
}

@media (max-width: 1536px) {
  .por-floor-anchor { height: 68px; padding: 0 77px; }
  .por-floor-anchor__list { gap: 0; flex: 1; }
  .por-floor-anchor__item {
    flex: 1;
    padding: 14px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }
}
@media (max-width: 1280px) {
  .por-floor-anchor { height: 60px; padding: 0 64px; }
  .por-floor-anchor__item { padding: 12px; font-size: 14px; line-height: 22px; }
}
```

### 项数

实测 5 项与 6 项两种。**1536 / 1280 的等分版固定 5 项**（`276 × 5 = 1380`、`231 × 5 = 1155`），超过 5 项时最后一项会被压到 `200` 以下、文字换行，所以 6 项以上只在 1920 定宽版使用。

### 无障碍

- 锚点条本身是 `<nav aria-label="本页楼层导航">`，内部是 `<a href="#楼层id">`，不是 `<div onclick>`。
- 指示条是纯装饰，不要用它承载"当前楼层"的唯一线索——同步给当前项 `aria-current="true"`。
- 滚动落点用 `scroll-margin-top: 76px`（1536 下 `68`，1280 下 `60`），否则楼层标题会被吸顶的锚点条盖住。

## API 指导

### 方法

| 方法 | 描述 |
| --- | --- |
| `$(element).porAnchor()` | 初始化锚点导航组件。PortalUI 2.0 通常会自动初始化页面已有的 `.por-anchor`。如果是异步加载的，才需要手动调用此初始化方法。 |

### 静态属性

| 属性名 | 描述 |
| --- | --- |
| `Anchor.scrollElement` | 指定滚动条容器（默认为 document.body）。对于在局部容器内滚动的页面，需要设置此属性。 |
