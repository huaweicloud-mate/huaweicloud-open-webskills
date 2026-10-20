# 页签组件 (Tabs)

来源：Tiny PortalUI tab 规范

页签作为信息分类与导航的常用组件，可以将大量信息进行分类呈现。

> **使用说明**：页签所在的图层下方即为对应的页签内容区域。生成时可以简单扩展其余页签内容。

## 基础实例

通过 `ul` 上的 `data-cols` 属性设置页签数量。**注意：** `por-tab-wrapper` 必须包含在 `por-tab-container` 容器内以确保交互逻辑正确。

```html
<div class="por-tab-container">
    <!-- 导航部分 -->
    <div class="por-tab">
        <ul data-cols="3">
            <li class="active"><a><div class="por-tab-text">页签1</div></a></li>
            <li><a><div class="por-tab-text">页签2</div></a></li>
            <li><a><div class="por-tab-text">页签3</div></a></li>
        </ul>
    </div>
    <!-- 内容区域 -->
    <div class="por-tab-wrapper">
        <div class="por-tab-content active">页签内容1</div>
        <div class="por-tab-content">页签内容2</div>
        <div class="por-tab-content">页签内容3</div>
    </div>
</div>
```

## 皮肤与布局

- **深色皮肤**：在深色背景/楼层中使用时，请为容器添加 `.por-tab-light` 类。
- **居左对齐**：组件默认居中对齐，若需靠左展示，请在 `por-tab` 上添加 `.por-tab-left`。

```html
<div class="por-tab-container por-tab-light">
    <div class="por-tab por-tab-left">
        <!-- ... -->
    </div>
    <!-- ... -->
</div>
```

## 脚本初始化

组件依赖 jQuery 和 `theme-token.js`，需手动调用 `.porTab()` 方法。

```javascript
$(function() {
    // 全局初始化或指定容器初始化
    $('.por-tab-container').porTab();
});
```

## 页签横向滚动

当页签数量较多时，使用 `.por-tab-scroll` 并添加左右箭头图标。

```html
<div class="por-tab por-tab-scroll">
    <ul data-cols="13">
        <!-- ... -->
    </ul>
    <span class="u-icon u-icon-left"></span>
    <span class="u-icon u-icon-right"></span>
</div>
```

## 楼层 Tab（官网实测）

`.por-tab` 是组件层能力。官网楼层头部是「标题区 + 页签条」的组合，尺寸固定，搭楼层时按这个来。

```
┌──────────────────────────────────────────────┐  1920 楼层
│  padding 76 / 160                            │
│  行业实践业务创新                  36px #191919│  ← 标题（单行）
│  ┌──────────────────┐                        │
│  │ 副标题 16px      │ [ 查看更多 › ] 160×24  │  ← 副标题行 24，gap 8
│  └──────────────────┘                        │
│         ↕ gap 14                              │
│  页签1   页签2   页签3   页签4                │  ← 页签条 1600×58
│  ▔▔▔▔                                        │     指示条 2px
└──────────────────────────────────────────────┘
```

### 标题区

| 元素 | 尺寸 | 字号 | 颜色 | 说明 |
| --- | --- | --- | --- | --- |
| 标题 | `509 × 54` | `36px` | `#191919` | 单行 |
| 副标题行 | `509 × 24` | `16px` | `#595959` | 与标题 `gap 12` |
| 链接按钮 | `160 × 24` | `16px` | `#595959` | 副标题行内右侧，`gap 8` |

### 页签条

| 底色 | 尺寸 | padding | 项间距 | 项高 |
| --- | --- | --- | --- | --- |
| 浅底（白/浅灰楼层） | `1600 × 58` | `10px 32px` | `80px` | `28` |
| 深底（深色楼层） | `1600 × 38` | `0 32px` | `80px` | `28` |

深底版**没有上下 padding**（`38 = 28 + 8 + 2`），因为深色楼层自带上下留白；浅底版要 `10px` 上下撑开。

### 页签项

| 状态 | 尺寸 | 文字 | 指示条 |
| --- | --- | --- | --- |
| 未选中 | `91 × 28` | `18px` `#595959` | 无 |
| 选中（单行） | `91 × 38` | `18px` `#191919` | `91 × 2` `#191919`，`gap 8` |
| 选中（折行） | `91 × 66` | `18px` `#191919`，行高 `28` | `91 × 2`，`gap 8` |

- 指示条**与项同宽**、贴项底，不做居中短条。
- 未选中项不渲染指示条，但容器要预留 `2 + 8 = 10px` 的纵向空间，否则切换时整条会跳 `10px`。
- 项宽不固定：短文案 `91`，最长实测 `288`。**不要给页签设等分宽度**。

### 换行开关（关键约束）

页签条支持 `换行 = ON / OFF` 两态，实测数量覆盖 2 ~ 8：

| 换行 | 条高 | 单项高 | 文字行为 | 适用 |
| --- | --- | --- | --- | --- |
| **OFF** | `58` | `28` | 单行，超长撑宽项（实测到 `288`） | 默认，4 ~ 6 项 |
| **ON** | `58` | `28` 或 `66` | 允许折成两行（`56` 高），**字号仍 `18px`** | 文案长、项多 |

三条容易踩的：

1. **换行 ON 不是把字号缩小**。折行后字号仍是 `18px`，只是行高从 `28` 变成两行共 `56`，项高 `66`。如果为了塞下而把字号降到 `16`，那是另一种变体（`页签折行` 样式），不要混用。
2. **换行 OFF 时页签条总宽恒 `1600`**，超出靠撑宽项消化，不会溢出容器，也不会出现横向滚动条。真要超过容器，才切到上面「页签横向滚动」的箭头方案。
3. **数量 4 是官网主力配置**，2 / 3 / 5 / 6 / 7 / 8 都有实例但出现频次远低于 4。

### 断点

页签条宽度随内容区走：`1920 → 1600`、`1536 → 1382`、`1280 → 1153`。项间距 `80` 在 1536 下会挤（5 项 × 91 + 4 × 80 = 775，只占 1382 的 56%），所以 1536 及以下建议把 `gap` 降到 `48`，或改用左对齐。

```css
.por-floor-tabs {
  display: flex;
  gap: 80px;
  align-items: flex-start;
  height: 58px;
  padding: 10px 32px;
  background: #fff;
}
.por-floor-tabs__item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 18px;
  line-height: 28px;
  color: #595959;
  white-space: nowrap;
}
.por-floor-tabs__item.is-active { color: #191919; }
.por-floor-tabs__item.is-active::after {
  content: "";
  height: 2px;
  background: #191919;
}
/* 折行开启 */
.por-floor-tabs--wrap .por-floor-tabs__item { white-space: normal; }
```

## API 指导

### class/属性

| class/属性 | 描述 |
| --- | --- |
| `por-tab-container` | 页签组件容器 |
| `por-tab` | 页签导航部分 |
| `por-tab-wrapper` | 内容展示区域容器 |
| `por-tab-content` | 单个页签内容块 |
| `por-tab-light` | 深色背景主题 |
| `por-tab-scroll` | 开启横向滚动样式 |
| `por-tab-left` | 居左对齐样式 |
| `data-cols` | 在 ul 上指定页签列数 |

### 方法

使用 `$().porTab()` 初始化。

### 事件

使用 `$().on(eventName, function(){})` 绑定事件。

| 事件名 | 描述 | 触发元素 |
| --- | --- | --- |
| `beforeActivate` | 页签选中前 | `.por-tab li` |
| `afterActivate` | 页签选中后 | `.por-tab li` |
| `beforeInactivate` | 页签取消选中前 | `.por-tab li` |
| `afterInactivate` | 页签取消选中后 | `.por-tab li` |
| `beforeShow` | 内容显示前 | `.por-tab-content` |
| `afterShow` | 内容显示后 | `.por-tab-content` |
| `beforeHide` | 内容隐藏前 | `.por-tab-content` |
| `afterHide` | 内容隐藏后 | `.por-tab-content` |
