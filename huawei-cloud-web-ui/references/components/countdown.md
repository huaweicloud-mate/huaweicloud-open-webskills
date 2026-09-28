# 倒计时

来源：Tiny PortalUI countdown 规范

## 实例

```html
<div id="countDown" class="por-countdown-container"></div>
<script>
    $(function () {
        var resetOptions = { endTime: '2029-03-30 23:59' };
        $('#countDown').countDown(resetOptions);
    })
</script>
```

## API 指导

### css属性

| 属性 | 描述 | 备注 |
| --- | --- | --- |
| `upDownLayout` | 上下布局 | 非必填，推荐小分辨率下使用 |
| `leftLayout` | 居左布局 | 非必填，推荐结合上下布局使用 |

### 初始化 options 属性

| 属性 | 描述 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `endTime` | 倒计时结束时间 | string | '2099/12/31' | 推荐格式：'2023-03-21 22:33' |
| `startTime` | 倒计时开始时间 | string | 当前时间 | 非必填 |
| `fontColor` | 数字的颜色 | string | 'red' | 可选值：'red'、'black' |
| `backgroundOpacity` | 组件不透明度 | number | 1.0 | 范围：0-1.0 |
| `preContent` | 文案内容 | string | '距本次活动结束：' | -- |
| `showFormat` | 格式 | string | 'D/H/M' | 'D/H/M/S'、'H/M/S'、'D/H/M' |
| `autoShowCountDown` | 自动显示隐藏 | boolean | true | -- |
