# 视频播放

来源：Tiny PortalUI player 规范

## 实例

使用 `.por-player` 创建一个视频播放器。使用 `.por-player-block` 使其宽度适应容器，视频比例固定为 16:9。

```html
<div class="por-player">
    <video class="por-native" controls src="video_url.mp4"></video>
</div>

<div class="por-player por-player-block">
    <video class="por-native" controls src="video_url.mp4"></video>
</div>
```

## 配合弹窗播放

为弹窗组件添加 `.por-modal-player`，可使弹窗显示（隐藏）时自动播放（暂停）内部视频。

```html
<div class="por-player-btn" data-toggle="modal" data-target="#demo-modal"></div>
<div class="por-modal por-modal-player" data-hide="modal" id="demo-modal">
    <div class="por-player">
        <video class="por-native" controls src="video_url.mp4"></video>
        <i class="por-player-close" data-hide="modal"></i>
    </div>
</div>
```

## 自动生成弹窗播放

为按钮添加属性 `data-show="player"` 和 `data-src`。

```html
<div class="por-player-btn" data-show="player" data-src="video_url.mp4"></div>
```

## API 指导

### 方法

| 方法名 | 描述 |
| --- | --- |
| `play` | 播放 |
| `pause` | 暂停 |
| `setSrc` | 设置视频 src |
| `getVideo` | 获取 HTMLVideoElement |
