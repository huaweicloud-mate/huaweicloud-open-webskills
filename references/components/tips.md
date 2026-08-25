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

## 矩形 tips

在 DOM 上写上 `class="por-tips"`，并带有 `title` 属性。

```html
<button class="por-btn por-btn-primary por-tips" title="内容文本">
  矩形tips示例
</button>
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
