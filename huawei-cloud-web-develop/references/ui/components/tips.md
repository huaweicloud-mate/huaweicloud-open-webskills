# 提示 Tips

来源：Tiny PortalUI tips 规范

Tips 用来通知用户非关键性问题或提示某控件处于某特殊情况。

## 告警样式提示

```javascript
window.BaseUI.Info({
  content: '提示内容',
  type: 'warning', // warning, error, info, success
  container: '#infoContainer',
  duration: 5000,
});
```

## 信息条 tips（矩形）

使用 `.por-tip` 创建页面级信息条（默认全宽），内容放在 `.por-tip-content` 内，可含图标、文案 `.por-tip-wenzi` 与关闭按钮 `.por-tip-remove`：

```html
<div class="por-tip">
  <div class="por-tip-content">
    <i class="por-icon por-icon-prompt"></i>
    <div class="por-tip-wenzi">这是一条矩形信息条提示</div>
    <i class="por-tip-remove por-icon por-icon-close"></i>
  </div>
</div>
```

## 带箭头 tips

```javascript
window.BaseUI.Tips($('#top'), {
  content: '提示内容',
  position: 'top', // top, bottom, left, right 等
  theme: 'light', // light, dark
  triggerEvent: 'mouseenter', // mouseenter, click, focus
});
```

## 动画 tips

```javascript
window.BaseUI.InfoNotice({
  content: '领取成功',
  type: 'success'
});
```

## API 指导

### 方法 (API)

| API | 描述 |
| --- | --- |
| `window.BaseUI.Info(options)` | 展示警告提示框 |
| `window.BaseUI.Tips($(element), options)` | 展示带箭头提示框 |
| `window.BaseUI.InfoNotice(options)` | 展示信息提示框 |
