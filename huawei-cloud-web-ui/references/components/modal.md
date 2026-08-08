# 弹窗组件

来源：developer-common.css

## 基础弹窗

```html
<div class="developer-modal modal-cover">
  <div class="modal-detail-block">
    <!-- 关闭按钮 -->
    <div class="icon-delete"></div>

    <!-- 标题 -->
    <div class="modal-title succeed">操作成功</div>

    <!-- 内容 -->
    <div class="warning-box">
      <div class="msg-block">提示信息文字</div>
      <div class="warning-detail">
        <a href="#">详情链接</a>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="btn-block">
      <button class="developer-btns btn-red">确定</button>
      <button class="developer-btns btn-white">取消</button>
    </div>
  </div>
</div>
```

## 样式

```css
/* 遮罩层 */
.modal-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.3);
  z-index: 9999;
  top: 0;
  left: 0;
  display: none;
}

.modal-cover.show { display: block; }

/* 弹窗主体 */
.modal-detail-block {
  width: 400px;
  background: #fff;
  position: absolute;
  left: 0; right: 0; top: 50%;
  transform: translateY(-50%);
  margin: auto;
  padding: 32px;
  border-radius: 2px;
}

/* 标题 */
.modal-title {
  font-size: 18px;
  color: #252b3a;
  text-align: left;
  height: 26px;
  line-height: 26px;
  padding-left: 32px;
  position: relative;
}

/* 标题图标（通过 ::before） */
.modal-title::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  left: 0;
  top: 1px;
  position: absolute;
}
.modal-title.succeed::before { background: url(icon-succeed.svg); }
.modal-title.failed::before  { background: url(icon-failed.svg); }
.modal-title.warning::before { background: url(icon-warning.svg); }

/* 内容 */
.warning-box {
  padding: 12px 0 28px;
  min-height: 76px;
}

.msg-block {
  font-size: 12px;
  color: #575D6C;
  line-height: 18px;
}

/* 链接 */
.warning-detail a[href] { color: #526ECC; }
.warning-detail a[href]:hover { text-decoration: underline; }

/* 关闭按钮（X 形） */
.icon-delete {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.icon-delete::before {
  content: "";
  width: 16px; height: 1px;
  border: 1px solid #8A8E99;
  transform: rotateZ(45deg);
  position: absolute;
  top: 7px;
}
.icon-delete::after {
  content: "";
  width: 16px; height: 1px;
  border: 1px solid #8A8E99;
  transform: rotateZ(-45deg);
  position: absolute;
  top: 7px;
}
.icon-delete:hover::before,
.icon-delete:hover::after {
  border-color: #C7000B;
}

/* 按钮组 */
.btn-block {
  text-align: center;
  padding: 0;
}
.btn-block .btn-white { margin-left: 10px; }
```

## 移动端适配

```css
@media (max-width: 768px) {
  .modal-detail-block {
    width: calc(100% - 30px);
    padding: 24px;
  }
  .modal-title {
    font-size: 16px;
    line-height: 20px;
    padding-left: 24px;
    height: 20px;
  }
  .modal-title::before { width: 18px; height: 18px; }
  .icon-delete { width: 12px; height: 12px; right: 16px; top: 16px; }
}
```

## 标签选择弹窗

开发者站特有的标签选择弹窗：

```html
<div class="modal-overlay"></div>
<div class="label-prompt-modal-content">
  <div class="label-prompt-title">选择标签</div>
  <div class="select-section">
    <div class="select-section-box">
      <div class="label-prompt-list">
        <div class="label-prompt-label active">标签名</div>
      </div>
    </div>
  </div>
  <div class="select-section-btn">
    <button class="developer-btns btn-red">确定</button>
    <button class="developer-btns btn-white prompt-cancel">取消</button>
  </div>
</div>
```

### 标签样式

```css
.label-prompt-label {
  float: left;
  max-height: 56px;
  line-height: 28px;
  background-color: #f5f5f6;
  padding: 0 12px;
  margin-bottom: 8px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 2px;
}

.label-prompt-label:hover { color: #c7000b; }
.label-prompt-label.active { color: #c7000b; }
```
