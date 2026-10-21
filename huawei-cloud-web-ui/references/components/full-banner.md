# 通栏广告（Full Banner）

来源：官网设计稿「通栏广告」楼层（8 个变体）实测

页面**中段**的整幅推广位：一条横贯内容区的通栏，用大字号标题 + 一个按钮把用户导向活动页、试用页或合作页。

⚠️ 与两个易混组件区分：

| 组件 | 位置 | 形态 |
| --- | --- | --- |
| `ad-banner`（顶部广告横幅） | 页面最顶部，导航之上 | 72px 细条，一行文字 + 链接，≤1024 隐藏 |
| `banner`（Hero 轮播） | 首屏第一屏 | 大图轮播，多张可切换 |
| **本组件 `full-banner`** | **页面中段任意楼层之间** | **1920 满宽、高 468/392 的整幅推广位** |

## 1. 适用场景

| 场景 | 用法 |
| --- | --- |
| 合作伙伴招募（「加入华为云合作，携手共赢」） | 背景无图片 + 渐变标题 |
| 活动促销（「开启您的上云之旅」） | 变主按钮形态，主按钮强化 |
| 生态计划 / 认证推广 | 背景有图片 |
| 试用引导 | 辅助说明开关 + 次要按钮 |

**不要**用本组件做：产品对比（用 `plan-table`）、多卡片并列（用 `advantage-floor` 或 `cards`）、页面首屏（用 `banner`）。

## 2. 变体体系（实测）

| 属性轴 | 取值 | 说明 |
| --- | --- | --- |
| `类型` | `背景无图片` / `背景有图片` / `变主按钮` | 前两者同尺寸；第三种内容更窄、更紧凑 |
| `辅助说明` | `开` / `关` | 「开」= 标题下多一行说明文字 |
| 断点 | `1280` / `1536` / `1920` | 按内容区宽度出多套 |

## 3. 尺寸规格（实测）

| 变体 | 楼层尺寸 | 左右 padding | 内容区 | 高度 | 背景 |
| --- | --- | --- | --- | --- | --- |
| `类型=背景无图片` | `1920 × 468` | `456px` | `1008 × 316` | 468 | `#F5F5F5` |
| `类型=背景有图片` | `1920 × 468` | `456px` | `1008 × 316` | 468 | 图片（铺满，不重复） |
| `类型=变主按钮` | `1916 × 392` | `670px` | `576 × 240` | 392 | `#F5F5F5` |

> 上下 padding 恒为 `76px`，与楼层规范一致（见 `layouts/floor.md`）。
> 内容区宽度 = 1920 − 456 × 2 = **1008px**；`变主按钮` 内容区仅 **576px**，是为了让主按钮离标题更近、更聚焦。

```css
.por-full-banner {
  padding: 76px 0;
  background: #F5F5F5;
}

.por-full-banner-inner {
  max-width: 1008px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}

/* 变主按钮：内容更窄 */
.por-full-banner-compact .por-full-banner-inner {
  max-width: 576px;
  gap: 24px;
}
```

## 4. 内容结构

```
┌───────────────────────────────────────────────────────────┐
│  ← 456 →   ┌───────────────────────────┐   ← 456 →        │
│            │  加入华为云合作             │  ← 标题 56px     │
│            │  携手共赢（渐变字）          │   多段，可混排    │
│            │                            │                  │
│            │         ↕ gap 40           │                  │
│            │  [ 立即加入 ]               │  ← 按钮          │
│            │         ↕ gap 40           │                  │
│            │  成为华为云合作伙伴将帮您…    │  ← 辅助说明 18px  │
│            └───────────────────────────┘                  │
│  背景 #F5F5F5 或图片                                        │
└───────────────────────────────────────────────────────────┘
```

**关键：标题支持多段混排**——设计稿里同一行标题由「渐变文字 + 纯色文字」拼接（如「加入华为云合作」用线性渐变，「携手共赢」用 `#191919`）。这是官网通栏最典型的排版手法，不能用单色标题代替。

```html
<section class="por-full-banner">
  <div class="por-full-banner-inner">
    <h2 class="por-full-banner-title">
      <span class="por-text-gradient">加入华为云合作</span><br>
      携手共赢
    </h2>
    <a class="por-btn por-btn-primary por-btn-large" href="…">立即加入</a>
    <p class="por-full-banner-desc">
      成为华为云合作伙伴将帮您充分利用华为云提供的资源，构建基于华为云的解决方案。
    </p>
  </div>
</section>
```

```css
.por-full-banner-title {
  font-size: 56px;
  line-height: 80px;
  font-weight: 600;
  color: #191919;
  margin: 0;
}

.por-text-gradient {
  background: linear-gradient(90deg, #0067D1 0%, #1476FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.por-full-banner-desc {
  font-size: 18px;
  line-height: 28px;
  color: #595959;
  margin: 0;
  max-width: 1008px;
}
```

## 5. 三档字号（实测）

同一结构按断点收三档，**字号、说明、按钮同步降一档**：

| 档位 | 标题 | 辅助说明 | 按钮 | 内部 gap | 内容区 |
| --- | --- | --- | --- | --- | --- |
| 大（1920） | `56px` | `18px` | `180 × 48`（`Large`） | `40px` | `1008` |
| 中（1536） | `48px` | `16px` | `148 × 40`（`Medium`） | `36px` | `1008` |
| 小（1280） | `40px` | `14px` | `132 × 32`（`Small`） | `28px` | `960` |

```css
@media (max-width: 1535px) {
  .por-full-banner-title { font-size: 48px; line-height: 72px; }
  .por-full-banner-desc { font-size: 16px; line-height: 24px; }
  .por-full-banner-inner { gap: 36px; }
}

@media (max-width: 1279px) {
  .por-full-banner-title { font-size: 40px; line-height: 60px; }
  .por-full-banner-desc { font-size: 14px; line-height: 22px; }
  .por-full-banner-inner { gap: 28px; max-width: 960px; }
  .por-full-banner { padding: 56px 0; }
}

@media (max-width: 767px) {
  .por-full-banner-title { font-size: 28px; line-height: 40px; }
  .por-full-banner-inner { gap: 20px; padding: 0 15px; }
}
```

## 6. 背景图规则

| 项 | 要求 |
| --- | --- |
| 尺寸 | `1920 × 468`（与容器等比，做 2x 图） |
| 裁切 | `background-size: cover; background-position: center` |
| 安全区 | **文字区（左侧 1008px）必须低对比**，图片的高亮主体放右侧或做高斯模糊 |
| 文字可读性 | 文字压在图上时，加一层 `linear-gradient` 遮罩，保证对比度 ≥ 4.5:1 |
| 深色图 | 文字反白 `#FFFFFF`，按钮换 `por-btn-light` |

```css
.por-full-banner-bg {
  background-image:
    linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 55%, rgba(0,0,0,0) 100%),
    url("banner.jpg");
  background-size: cover;
  background-position: center;
  color: #FFFFFF;
}
```

## 7. 按钮选择规则

| 背景 | 用哪个按钮 | 依据 |
| --- | --- | --- |
| `#F5F5F5` 浅灰 | 主按钮 `#191919`，或次要按钮 `#595959` 描边 | 设计稿两种都有：招募类用次要按钮（弱化），促销类用主按钮（强化） |
| 深色 / 图片 | `por-btn-light`（白底黑字） | 深底上主按钮会糊 |
| `变主按钮` 形态 | 强制主按钮 | 该变体的存在意义就是强化 CTA |

一个通栏**只能有一个按钮**。两个按钮等于没有重点。

## 8. 无障碍

| 项 | 要求 |
| --- | --- |
| 语义 | 用 `<section>` + `<h2>`，标题层级跟随页面大纲 |
| 背景图 | 纯装饰图用 CSS `background-image`；若承载信息，改用 `<img>` + `alt` |
| 渐变文字 | `-webkit-text-fill-color: transparent` 会导致高对比度模式下文字消失，需加 `@media (forced-colors: active)` 兜底回 `color: #191919` |
| 焦点 | 按钮获焦时焦点环要在背景上可见（深色底用白色描边环） |

```css
@media (forced-colors: active) {
  .por-text-gradient {
    -webkit-text-fill-color: currentColor;
    background: none;
    color: LinkText;
  }
}
```

## 9. Do / Don't

**Do**

- ✅ 内容区固定 `1008px`（或 compact 的 `576px`），靠 padding 撑满 1920
- ✅ 标题做「渐变 + 纯色」两段混排，这是官网通栏的标志性排版
- ✅ 上下 padding 用 `76px`，与上下楼层保持同一节奏
- ✅ 一个通栏只放一个 CTA

**Don't**

- ❌ 不要把通栏做成「左图右文」的两栏——那是 `advantage-floor` 的事
- ❌ 不要在通栏里堆三个以上信息点（标题 + 一句说明 + 一个按钮，到此为止）
- ❌ 不要用 `background-attachment: fixed`（移动端与 iOS 会失效并抖动）
- ❌ 不要让背景图的高亮区落在文字下面
- ❌ 不要在同一页面连用两个通栏，视觉上会互相削弱
