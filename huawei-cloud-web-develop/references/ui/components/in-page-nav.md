# 产品页内导航（In-page Product Nav）

来源：官网设计稿「产品页内导航」页面（`页内导航` 4 个分辨率 + `tab更多` 未选中/展开态）节点树实测

产品详情页顶部、吸顶的那条二级导航：左边产品名，中间是产品内的功能页签（简介 / 功能 / 价格 / 文档…），右边一主一次两个按钮（购买 / 控制台）。

它是**组件**（不是楼层），与全站页头 `navigation.md` 是两层：页头管「站」，页内导航管「这个产品」。

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 产品详情页（页签 ≤ 6 个） | 单条导航，页签平铺 |
| 产品详情页（页签 > 6 个） | 末尾加「更多」下拉 |
| 解决方案页 | 同构，产品名换成方案名 |
| 文档站二级导航 | 不建议（文档站用侧边栏，见 `navigation.md`） |

## 2. 规格（实测 1920）

| 项 | 值 |
| --- | --- |
| 导航条 | `1920 × 48` |
| 底色 | `#FFFFFF` |
| 下边框 | `1px` `#DBDBDB` |
| 内容区左起 | `160`（与楼层 1600 内容区对齐） |
| 产品名 | `150 × 28`，`18px` `#191919`，单行 |
| 产品名 → 页签 gap | `50` |
| 页签区 | `574 × 48`，页签间 gap `32` |
| 页签项 | `56 ~ 70 × 22`，文字 `16px` |
| 右侧按钮组 | `216 × 32`（主 `104 × 32` + 次 `104 × 32`，gap `8`） |
| 展开面板（更多） | `368 × 450`，padding `24 16`，条目 gap `16` |

```css
.por-inpage-nav {
  position: sticky;
  top: 0;
  z-index: 900;              /* 低于全站页头，见 tokens/level.md */
  height: 48px;
  background: #FFFFFF;
  border-bottom: 1px solid #DBDBDB;
}
.por-inpage-nav__inner {
  display: flex;
  align-items: center;
  gap: 50px;
  max-width: 1600px;
  margin: 0 auto;
  height: 48px;
}
```

## 3. 结构

```
┌──────────────────────────────────────────────────────────────────────┐
│ 弹性云服务器 ECS   简介  功能  价格  文档  更多 ▾      [控制台][立即购买] │
└──────────────────────────────────────────────────────────────────────┘
   150×28 18px      页签 16px，gap 32              216×32
   ← 160 →          ← 574 →                        ← 右侧 160 →
```

| 区域 | 弹性规则 |
| --- | --- |
| 产品名 | 固定 `150`，超长截断 |
| 页签区 | `flex: 1 1 auto`，靠左；溢出时最后一个变成「更多」 |
| 按钮组 | `margin-left: auto` 贴右 |

## 4. 页签状态

| 状态 | 表现 |
| --- | --- |
| 默认 | `16px` `#595959` |
| 悬停 | `16px` `#191919` |
| 选中 | `16px` `#191919` + 底部 `2px` 下划线（与导航条底边重合） |
| 禁用 | `#C2C2C2`，`cursor: not-allowed` |

```css
.por-inpage-nav__tab {
  position: relative;
  display: inline-flex; align-items: center;
  height: 48px;
  font-size: 16px; line-height: 22px;
  color: #595959; text-decoration: none;
}
.por-inpage-nav__tab:hover { color: #191919; }
.por-inpage-nav__tab.is-active { color: #191919; font-weight: 500; }
.por-inpage-nav__tab.is-active::after {
  content: "";
  position: absolute; left: 0; right: 0; bottom: -1px;
  height: 2px; background: #191919;
}
```

> 下划线必须**压住导航条的 1px 边框**（`bottom: -1px`），否则会出现「线断了一格」的错觉。

## 5. 「更多」下拉（实测）

| 项 | 值 |
| --- | --- |
| 触发项 | 与普通页签同高 `48`，右侧带 `▾` |
| 面板 | `368 × 450` |
| 面板定位 | 相对触发项左对齐，顶部紧贴导航条下沿（`top: 48px`） |
| 面板 padding | 上下 `24` / 左右 `16` |
| 面板条目 | `56 ~ 70 × 22`，文字 `16px` |
| 条目行距 | `16` |
| 面板边框 | `1px` `#DBDBDB` |

```css
.por-inpage-nav__more { position: relative; }
.por-inpage-nav__panel {
  position: absolute; top: 48px; left: 0;
  width: 368px;
  padding: 24px 16px;
  background: #FFFFFF;
  border: 1px solid #DBDBDB;
  border-top: none;
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-4px);
  transition: opacity .16s, transform .16s, visibility .16s;
}
.por-inpage-nav__more:hover .por-inpage-nav__panel,
.por-inpage-nav__more:focus-within .por-inpage-nav__panel {
  opacity: 1; visibility: visible; transform: none;
}
```

**交互要求**

- 悬停 120ms 后才展开（防手抖误触），移开 200ms 后收起
- `focus-within` 必须能展开——键盘用户靠 Tab 进入
- 面板内条目数量 > 10 时**分两列**（`368` 宽两列，每列 `168`）

## 6. 完整示例

```html
<nav class="por-inpage-nav" aria-label="产品内导航">
  <div class="por-inpage-nav__inner">
    <span class="por-inpage-nav__name">弹性云服务器 ECS</span>

    <div class="por-inpage-nav__tabs">
      <a class="por-inpage-nav__tab is-active" href="#overview" aria-current="page">简介</a>
      <a class="por-inpage-nav__tab" href="#features">功能</a>
      <a class="por-inpage-nav__tab" href="#pricing">价格</a>
      <a class="por-inpage-nav__tab" href="#docs">文档</a>

      <div class="por-inpage-nav__more">
        <button class="por-inpage-nav__tab" aria-expanded="false" aria-haspopup="true">
          更多 <span class="por-inpage-nav__caret" aria-hidden="true"></span>
        </button>
        <div class="por-inpage-nav__panel" role="menu">
          <a role="menuitem" href="#api">API 参考</a>
          <a role="menuitem" href="#best">最佳实践</a>
          <a role="menuitem" href="#faq">常见问题</a>
        </div>
      </div>
    </div>

    <div class="por-inpage-nav__actions">
      <a class="por-btn por-btn-secondary por-btn-small" href="…">控制台</a>
      <a class="por-btn por-btn-primary por-btn-small" href="…">立即购买</a>
    </div>
  </div>
</nav>
```

## 7. 断点与行为

| 断点 | 变化 |
| --- | --- |
| `≥ 1440` | 完整展示，内容区 `1600` |
| `1280 ~ 1439` | 左右 padding 收到 `64`，页签 gap 收到 `24` |
| `1024 ~ 1279` | 页签超出部分全部收进「更多」；按钮组只保留主按钮 |
| `< 1024` | 导航条改为横向滚动（隐藏「更多」，`overflow-x: auto`，不显示滚动条） |
| `< 768` | 产品名移到第二行或隐藏；只留横向滚动的页签 |

```css
@media (max-width: 1439px) {
  .por-inpage-nav__inner { padding: 0 64px; gap: 32px; }
  .por-inpage-nav__tabs { gap: 24px; }
}
@media (max-width: 1279px) {
  .por-inpage-nav__actions .por-btn-secondary { display: none; }
}
@media (max-width: 1023px) {
  .por-inpage-nav__inner { padding: 0 16px; gap: 16px; }
  .por-inpage-nav__tabs { overflow-x: auto; scrollbar-width: none; }
  .por-inpage-nav__tabs::-webkit-scrollbar { display: none; }
  .por-inpage-nav__more { display: none; }
}
```

## 8. 吸顶与层级

| 场景 | 行为 |
| --- | --- |
| 页头可见 | 页内导航 `top: 页头高度`（`<hd-header>` 实测 88px） |
| 页头滚出视口 | 页内导航贴 `top: 0` |
| `z-index` | `900`（页头 `1000`，弹窗 `1050`，见 `tokens/level.md`） |
| 锚点跳转 | 跳转后目标区块要留 `48px` 滚动偏移（`scroll-margin-top: 48px`） |

```css
[id] { scroll-margin-top: 48px; }
```

## 9. 文案规则

| 元素 | 约束 | 示例 |
| --- | --- | --- |
| 产品名 | 官方全称 + 缩写，≤ 16 字 | 「弹性云服务器 ECS」 |
| 页签 | **2~4 字**，名词，全产品统一用词 | 「简介 / 功能 / 价格 / 文档」 |
| 按钮 | 次「控制台」+ 主「立即购买」，最多两枚 | |
| 「更多」内条目 | ≤ 6 字，与页签同级 | |

页签用词必须在**所有产品页保持一致**——「价格」不要有时写「计费」，有时写「购买」。

## 10. Do / Don't

**Do**

- ✅ 页签顺序按用户决策路径：简介 → 功能 → 价格 → 文档 → 更多
- ✅ 滚动到对应区块时自动高亮当前页签（`IntersectionObserver`）
- ✅ 键盘可 Tab 到每个页签与「更多」面板内条目
- ✅ 移动端横向滚动，选中项滚入可视区

**Don't**

- ❌ 不要在这一层放面包屑（面包屑在页头上方，见 `breadcrumb.md`）
- ❌ 不要超过 6 个平铺页签（第 7 个开始进「更多」）
- ❌ 不要让按钮组跟随滚动隐藏（购买入口必须常驻）
- ❌ 不要用这个组件做全站主导航
- ❌ 不要在面板里塞三级菜单（只允许一层）
