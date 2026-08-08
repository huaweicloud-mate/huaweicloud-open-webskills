# 页脚

来源：HTML 结构分析 + CSS 分析

## 页脚结构

页脚由统一的页头页脚组件渲染：

```html
<!-- 页脚组件 -->
<div id="footer">
  <div class="footer-nav"><!-- 导航链接 --></div>
  <div class="footer-copyright-container"><!-- 版权信息 --></div>
  <div class="footer-service">
    <div class="footer-wrapper"><!-- 服务信息 --></div>
  </div>
</div>
```

## 页脚 CSS 特征

```css
/* 主站隐藏了部分页脚区域 */
#footer .footer-nav { display: none; }
#footer .footer-copyright-container { display: none; }
.footer-service .footer-wrapper { display: none; }
```

## 服务栏图标

```css
.footer-icon-support {
  background-image: url(https://res.hc-cdn.com/cnpm-header-and-footer/1.1.0/base/footer-china/components/service/images/support.svg);
}
.footer-icon-record {
  background-image: url(https://res.hc-cdn.com/cnpm-header-and-footer/1.1.0/base/footer-china/components/service/images/record.svg);
}
.footer-icon-vip {
  background-image: url(https://res.hc-cdn.com/cnpm-header-and-footer/1.1.0/base/footer-china/components/service/images/vip.svg);
}
.footer-icon-unsub {
  background-image: url(https://res.hc-cdn.com/cnpm-header-and-footer/1.1.0/base/footer-china/components/service/images/unsub.svg);
}
.footer-icon-feedback {
  background-image: url(https://res.hc-cdn.com/cnpm-header-and-footer/1.1.0/base/footer-china/components/service/images/feedback.svg);
}
```

## 简化页脚模板

```html
<footer id="footer">
  <div class="footer-service">
    <div class="footer-service-wrapper" style="max-width: 1280px; margin: 0 auto;">
      <!-- 服务链接 -->
      <div class="footer-service-links">
        <a href="#">支持</a>
        <a href="#">备案</a>
        <a href="#">VIP</a>
        <a href="#">退订</a>
        <a href="#">反馈</a>
      </div>
    </div>
  </div>
  <div class="footer-copyright-container">
    <div class="por-container">
      <p>© 2026 Huawei Cloud. All rights reserved.</p>
      <p>
        <a href="#">HWC用户协议</a>
        <a href="#">隐私政策声明</a>
      </p>
    </div>
  </div>
</footer>
```

## 页脚样式要点

```css
#footer {
  background: #191919;          /* 深色背景 */
  color: rgba(255,255,255,0.7); /* 半透明白文字 */
  font-size: 12px;
  line-height: 20px;
  padding: 40px 0;
}

#footer a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
}

#footer a:hover {
  color: #ffffff;
}
```
