# 标签

来源：Tiny PortalUI label 规范

快速创建不同尺寸不同样式的标签。

## 基础标签

通过向元素添加 `.por-label` 创建一个标签。

```html
<div>
    <span class="por-label por-label-s">小标签</span>
    <span class="por-label">普通标签</span>
    <span class="por-label por-label-l">大标签</span>
</div>
<div style="margin-top: 10px;">
    <!-- 不同颜色的标签 -->
    <span class="por-label por-label-red">标签</span>
    <span class="por-label por-label-blue">标签</span>
    <span class="por-label por-label-gold">严选</span>
</div>
```

## 可删除标签

```html
<div>
    <span class="por-label por-label-s">小标签<i class="por-icon por-icon-close"></i></span>
    <span class="por-label">普通标签<i class="por-icon por-icon-close"></i></span>
    <span class="por-label por-label-disabled">禁用标签<i class="por-icon por-icon-close"></i></span>
</div>
```

## 带小图标标签

```html
<div>
    <span class="por-label por-label-s"><i class="por-icon por-icon-set"></i>小标签</span>
    <span class="por-label por-label-blue"><i class="por-icon por-icon-set"></i>普通标签</span>
</div>
```

## API 指导

### class

| class | 描述 |
| --- | --- |
| `por-label` | 基础标签类 |
| `por-label-s` | 小尺寸标签 |
| `por-label-l` | 大尺寸标签 |
| `por-label-disabled` | 禁用状态标签 |
| `por-label-[color]` | 不同颜色的标签（如 red, blue, gold, orange 等） |
