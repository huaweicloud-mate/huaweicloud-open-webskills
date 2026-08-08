# 字体排版

来源：`cnpm-baseui` theme-token.css + developer-common.css

## 字体族

```css
/* 主字体栈 */
--por-base-font-family:
  -apple-system,
  HuaweiSans,          /* HWC proprietary font */
  Helvetica Neue,
  Helvetica,
  Arial,
  PingFang SC,         /* macOS 中文 */
  Hiragino Sans GB,
  STHeiti,
  Microsoft YaHei,     /* Windows 中文 */
  Microsoft JhengHei,
  SimSun,
  sans-serif;
```

## 字号体系

所有字号基于 `--por-base-size-2: 2px` 的整数倍：

| Token | 值 | 用途 |
|-------|-----|------|
| `--por-font-size-12` | 12px | 最小文字、辅助信息 |
| `--por-font-size-14` | 14px | **正文默认**、按钮文字 |
| `--por-font-size-16` | 16px | 小标题、强调文字 |
| `--por-font-size-18` | 18px | 模块标题、Modal 标题 |
| `--por-font-size-20` | 20px | 区块标题 |
| `--por-font-size-22` | 22px | — |
| `--por-font-size-24` | 24px | 移动端 Banner 标题 |
| `--por-font-size-28` | 28px | — |
| `--por-font-size-30` | 30px | — |
| `--por-font-size-32` | 32px | — |
| `--por-font-size-36` | 36px | 大标题 |
| `--por-font-size-40` | 40px | **Banner 大标题**（PC） |
| `--por-font-size-48` | 48px | 超大标题 |
| `--por-font-size-60` | 60px | Hero 标题 |

## 行高体系

| Token | 值 | 搭配字号 |
|-------|-----|---------|
| `--por-font-line-height-18` | 18px | 12px 文字 |
| `--por-font-line-height-22` | 22px | **14px 正文** |
| `--por-font-line-height-24` | 24px | 16px 文字 |
| `--por-font-line-height-28` | 28px | 18-20px 标题 |
| `--por-font-line-height-30` | 30px | 20px 标题 |
| `--por-font-line-height-36` | 36px | 24px 标题 |
| `--por-font-line-height-40` | 40px | 大标题 |
| `--por-font-line-height-48` | 48px | 超大标题 |
| `--por-font-line-height-60` | 60px | Hero 标题 |

## 字重

| Token | 值 | 用途 |
|-------|-----|------|
| `--por-base-font-weight-lighter` | lighter | — |
| `--por-base-font-weight-normal` | normal (400) | 正文 |
| `--por-base-font-weight-bold` | bold (700) | 标题、强调 |

## 开发者站特有排版

从 `developer-common.css` 提取的固定值：

```css
/* Banner 标题 */
.banner-title-main {
  font-size: 40px;
  color: #252b3a;
  line-height: 50px;
  font-weight: 700;
}

/* Banner 副标题 */
.banner-title-side {
  font-size: 14px;
  color: #575D6C;
  line-height: 22px;
}

/* 标题装饰竖线 */
.maintenance-title::before {
  border-left: 3px solid #f66f6a;
}

/* 移动端 Banner */
@media (max-width: 768px) {
  .poster-caption { font-size: 24px; line-height: 30px; }
  .poster-text { font-size: 12px; line-height: 18px; }
}
```

## 语义化排版类名

主题系统提供语义化的文字类名（从 HTML 分析得出）：

| 类名 | 推测用途 |
|------|---------|
| `.por-text-title-t8` | 标题文字（t8 层级） |
| `.por-text-body-t1` | 正文文字（t1 层级） |
| `.por-text-body-t2` | 正文文字（t2 层级） |
| `.por-link` | 链接文字 |
| `.por-link-more` | "了解更多"链接 |
