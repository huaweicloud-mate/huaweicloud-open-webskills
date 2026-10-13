<template>
  <footer class="footer" style="overflow: visible">
    <div class="container">
      <div
        class="hwc-home-footer"
        data-mod-name="footer"
        data-loaded="true"
        style="overflow: visible"
      >
        <div id="footer" style="overflow: visible">
          <div class="footer-nav" style="display: block">
            <div class="footer-nav-wrapper">
              <div class="footer-nav-content">
                <div class="footer-nav-comps">
                  <a
                    href="https://www.huaweicloud.com/mobile_app/hwapp.html?channel=navigation_right"
                    class="footer-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                    bi_name="页尾_华为云App"
                  >
                    <span>华为云App</span>
                  </a>

                  <div class="footer-nav-submenus">
                    <div class="footer-nav-submenus-inner">
                      <div class="footer-nav-contact">
                        <div class="footer-nav-contact-phone">
                          <h2>售前咨询热线</h2>
                          <a
                            href="https://www.huaweicloud.com/service/contact.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            bi_name="页尾_950808转1"
                          >
                            <span>950808转1</span>
                          </a>
                        </div>
                        <ul class="footer-nav-contact-emails">
                          <li>
                            <div class="footer-nav-contact-emails-item">
                              <a
                                href="https://console.huaweicloud.com/ticket/?locale=zh-cn#/ticketindex/createIndex"
                                target="_blank"
                                rel="noopener noreferrer"
                                bi_name="页尾_技术服务咨询"
                                >技术服务咨询</a
                              >
                            </div>
                          </li>

                          <li>
                            <div class="footer-nav-contact-emails-item">
                              <a
                                href="mailto:sales@huaweicloud.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                bi_name="页尾_售前咨询"
                                >售前咨询</a
                              >

                              <div class="foot-email">
                                <p>
                                  <a href="mailto:sales@huaweicloud.com"
                                    >sales@huaweicloud.com</a
                                  >
                                </p>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div class="footer-nav-contact-emails-item">
                              <a
                                href="mailto:beian@huaweicloud.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                bi_name="页尾_备案服务"
                                >备案服务</a
                              >

                              <div class="foot-email">
                                <p>
                                  <a href="mailto:beian@huaweicloud.com"
                                    >beian@huaweicloud.com</a
                                  >
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="footer-nav-download">
                        <div
                          class="download-app"
                          bi_name="页尾_下载华为云APP"
                          @click="openApp()"
                        >
                          <i></i>下载华为云APP
                        </div>
                      </div>
                      <p class="footer-nav-contact-title">关注我们</p>

                      <div class="footer-nav-about">
                        <div class="right-margin-pc">
                          <div
                            class="burying-point footer-qrcode-pc"
                            data-demo="qrCode"
                            data-radio="qrcode"
                            bi_name="页尾_社媒_0"
                            style="overflow: visible"
                          >
                            <img
                              class="img-circle"
                              src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wechat.svg"
                              event-hover="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wechat-hover.svg"
                              event-moveout="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wechat.svg"
                            />
                            <div class="qr-code">
                              <img
                                src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/1682491746302537729.jpg"
                                style="
                                  width: 100%;
                                  height: 100%;
                                  object-fit: cover;
                                "
                              />
                              <div class="box"></div>
                            </div>
                          </div>
                        </div>

                        <div class="right-margin-pc">
                          <div
                            class="burying-point footer-qrcode-pc"
                            data-demo="qrCode"
                            data-radio="qrcode"
                            bi_name="页尾_社媒_1"
                            style="overflow: visible"
                          >
                            <img
                              class="img-circle"
                              src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/csdn.svg"
                              event-hover="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/scdn-hover.svg"
                              event-moveout="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/csdn.svg"
                            />
                            <div class="qr-code">
                              <img
                                src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/1682491752951712933.png"
                                style="
                                  width: 100%;
                                  height: 100%;
                                  object-fit: cover;
                                "
                              />
                              <div class="box"></div>
                            </div>
                          </div>
                        </div>

                        <div class="right-margin-pc">
                          <div
                            class="burying-point footer-qrcode-pc color-black-hover"
                            data-demo="qrCode"
                            data-radio="qrcode"
                            bi_name="页尾_社媒_2"
                            style="overflow: visible"
                          >
                            <img
                              class="img-circle"
                              src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/bilibili.svg"
                              event-hover="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/bilibili-hover.svg"
                              event-moveout="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/bilibili.svg"
                            />
                            <div class="qr-code">
                              <img
                                src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/bilibili-qc.jpg"
                                style="
                                  width: 100%;
                                  height: 100%;
                                  object-fit: cover;
                                "
                              />
                              <div class="box"></div>
                            </div>
                          </div>
                        </div>

                        <div class="right-margin-pc">
                          <div
                            class="burying-point footer-qrcode-pc color-black-hover"
                            data-demo="qrCode"
                            data-radio="qrcode"
                            bi_name="页尾_社媒_3"
                            style="overflow: visible"
                          >
                            <img
                              class="img-circle"
                              src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wb.svg"
                              event-hover="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wb-hover.svg"
                              event-moveout="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wb.svg"
                            />
                            <div class="qr-code">
                              <img
                                src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/shemei/wb-qc.png"
                                style="
                                  width: 100%;
                                  height: 100%;
                                  object-fit: cover;
                                "
                              />
                              <div class="box"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        href="tel:950808,1"
                        class="footer-nav-contact-icon"
                        bi_name="页尾_售前咨询：_950808转1"
                      >
                        <img
                          class="lazyload"
                          src="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/%E7%BB%84%E4%BB%B6%E9%AA%8C%E8%AF%81/pep-common-footer/1618990892808034938.svg"
                        />售前咨询：<em>950808转1</em>
                      </div>
                      <ul class="footer-law-mb">
                        <li>
                          <a
                            href="https://www.huaweicloud.com/declaration/statement.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="left-href-pc burying-point color-black-hover"
                            bi_name="页尾_法律声明"
                            >法律声明</a
                          >
                        </li>

                        <li>
                          <a
                            href="https://www.huaweicloud.com/declaration/sa_prp.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="left-href-pc burying-point color-black-hover"
                            bi_name="页尾_隐私政策"
                            >隐私政策</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="footer-nav-menus">
                  <dl>
                    <dt>关于华为云</dt>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/about/index.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >了解华为云</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/securecenter/overallsafety.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >信任中心</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/declaration/sa_cua_computing.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >法律协议</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/news.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >新闻报道</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/about/live.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >视频中心</a
                      >
                    </dd>
                  </dl>

                  <dl>
                    <dt>支持与服务</dt>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://support.huaweicloud.com/help-tools.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >自助服务</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/notice.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >服务公告</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/service/supportplans.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >支持计划</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/service/contact.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >联系我们</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huaweicloud.com/report/index.html"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >举报中心</a
                      >
                    </dd>
                  </dl>
                  <dl>
                    <dt>友情链接</dt>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://cloudpartner.shixizhi.huawei.com/"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >华为云伙伴作战营</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://www.huawei.com/cn/?ic_medium=direct&amp;ic_source=surlent"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >华为官网</a
                      >
                    </dd>
                    <dd>
                      <a
                        class="footer-link"
                        href="https://developer.huawei.com/consumer/cn/"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        >华为开发者联盟</a
                      >
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="footer-copyright-container" style="display: block">
              <div class="footer-copyright-wrapper">
                <ul class="footer-law">
                  <li>
                    <a
                      href="https://www.huaweicloud.com/declaration/statement.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="left-href-pc burying-point color-black-hover"
                      bi_name="页尾_法律声明"
                      >法律声明</a
                    >
                  </li>

                  <li>
                    <a
                      href="https://www.huaweicloud.com/declaration/sa_prp.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="left-href-pc burying-point color-black-hover"
                      bi_name="页尾_隐私政策"
                      >隐私政策</a
                    >
                  </li>
                </ul>
                <div class="footer-copyright">
                  <a class="left-href-pc burying-point"
                    >©2026 Huaweicloud.com 版权所有
                  </a>

                  <a
                    href="https://beian.miit.gov.cn/#/Integrated/index"
                    target="_blank"
                    rel="noopener noreferrer"
                    bi_name="页尾_ 黔ICP备20004760号-14 "
                    class="left-href-pc burying-point color-black-hover"
                  >
                    黔ICP备20004760号-14
                  </a>

                  <a class="left-href-pc burying-point">苏B2-20130048号 </a>

                  <a class="left-href-pc burying-point">A2.B1.B2-20070312 </a>

                  <p class="footer-copyright-extra">
                    增值电信业务经营许可证：B1.B2-20200593 |
                    代理域名注册服务机构：新网、西数
                  </p>
                </div>
                <div class="footer-record">
                  <i
                    style="
                      background-image: url(https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/newHWCdeveloper/copyright1.png);
                    "
                    ><a
                      href="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/wangxue/header/yingyezhizhao02.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a
                  ></i>

                  <span
                    ><a
                      href="https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/wangxue/header/yingyezhizhao02.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="left-href-pc burying-point color-black-hover"
                      bi_name="页尾_电子营业执照"
                      >电子营业执照</a
                    ></span
                  >

                  <i
                    style="
                      background-image: url(https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/newHWCdeveloper/copyright2.png);
                    "
                    ><a
                      href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52990002000093"
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a
                  ></i>

                  <span
                    ><a
                      href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52990002000093"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="left-href-pc burying-point color-black-hover"
                      bi_name="页尾_贵公网安备 52990002000093号"
                      >贵公网安备 52990002000093号</a
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const openApp = () => {
  let win = window.open(
    'https://www.huaweicloud.com/mobile_app/api_page/appv2/app_download.html?channel=official',
    '_blank'
  );
  win.opener = null;
};
</script>

<style scoped>
.footer {
  background-color: #efefef;
  overflow: visible;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: visible;
}

@media (max-width: 375px) {
  .container {
    max-width: 100%;
  }
}

@media (min-width: 376px) and (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .hwc-home-footer {
    & .footer-nav-comps {
      flex: 2;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    max-width: 94%;
  }
}

@media (min-width: 1025px) and (max-width: 1775px) {
  .container {
    max-width: 90%;
  }
}

@media (min-width: 1776px) {
  .container {
    max-width: 1600px;
  }
}

/** write less here **/
.hwc-home-footer {
  overflow: visible;

  .mb {
    display: none !important;
  }

  .ul-footer-pc {
    display: flex;
    flex-direction: column;
  }

  .ul-footer-pc li {
    width: 100%;
    height: 17px;
    margin: 6px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 0;
  }

  .ul-footer-pc li a {
    font-weight: 500;
    font-size: 12px;
    color: #595959;
    letter-spacing: 0;
  }

  .por-row-pc {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .por-col-6-pc {
    flex: 1;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .li-title-pc {
    font-weight: 800;
    font-size: 14px;
    color: #595959;
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    padding-left: 0;
  }

  .flex-group-pc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-margin-pc a {
    font-weight: 500;
    font-size: 12px;
    color: #595959;
    letter-spacing: 0;
  }

  .right-margin-pc img {
    width: 36px;
    height: 36px;
  }

  .right-margin-pc .img-circle {
    border-radius: var(--radius-xl);
    /* filter: brightness(0) invert(0.5); */
  }

  .right-margin-pc + li:last-child {
    margin-right: 0;
  }

  .span-title-pc {
    font-weight: 800;
    font-size: 14px;
    color: #595959;
    letter-spacing: 0;
  }

  .right-bottom-pc,
  .left-bottom-pc {
    padding: 20px 0;
    flex: 5;
  }

  .right-bottom-pc div,
  .left-bottom-pc div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .right-bottom-pc div a,
  .left-bottom-pc div a {
    margin-right: 8px;
  }

  .right-bottom-pc div:last-child,
  .left-bottom-pc div:last-child {
    margin-top: 5px;
  }

  .right-bottom-pc .footer-icon-record i,
  .left-bottom-pc .footer-icon-record i {
    background-size: 100% 100%;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 8px;
    vertical-align: middle;
    cursor: pointer;
  }

  .right-bottom-pc .footer-icon-record i a,
  .left-bottom-pc .footer-icon-record i a {
    display: block;
    height: 18px;
    width: 18px;
  }

  .right-bottom-pc {
    text-align: right;
    flex: 2;
  }

  .right-href-pc {
    color: #595959;
    font-size: 12px;
  }

  .footer-law {
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    top: -10px;
  }

  .footer-law > li + li::before {
    content: '|';
    margin-left: 10px;
    margin-right: 6px;
  }

  .left-href-pc {
    line-height: 18px;
    font-size: 14px;
    color: #595959;
    letter-spacing: 0;
  }

  .left-href-pc:not(.color-black-hover):hover {
    color: #191919;
  }

  .color-black-hover:hover {
    color: #191919;
    text-decoration: underline;
  }

  .hwc-home-footer li {
    padding-left: 0;
  }

  .por-col-6-pc:first-child {
    margin-left: -8px;
  }

  .por-col-6-pc:last-child {
    margin-right: -8px;
  }

  .footer-nav {
    background: #efefef;
    padding: 0;
    overflow: visible;
  }

  .footer-nav-wrapper {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    overflow: visible;
  }

  @media (min-width: 1776px) {
    .footer-nav-wrapper {
      max-width: 1600px;
    }
  }

  .footer-copyright-container {
    background: #efefef;
    overflow: visible;
  }

  .footer-nav-content {
    padding-top: 20px;
    padding-bottom: 20px;
    overflow: visible;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #e0e0e1;
  }

  .footer-nav-comps {
    padding-right: 160px;
    overflow: visible;
    @media (max-width: 1776px) {
      padding-right: 80px !important;
    }
    @media (max-width: 1440px) {
      padding-right: 0px !important;
    }
  }

  .footer-nav-content::after {
    content: '';
    display: table;
    clear: both;
  }

  .footer-law-mb {
    display: none;
  }

  .footer-nav-submenus {
    float: left;
    width: 242px;
    overflow: visible;
  }

  .footer-nav-submenus::after {
    content: '';
    display: table;
    clear: both;
  }

  .footer-nav-left {
    float: left;
    width: 242px;
  }

  .footer-nav-left.isNotCN {
    width: 197px;
  }

  .footer-nav-submenus-inner {
    float: left;
    overflow: visible;
  }

  .footer-nav-contact {
    margin-bottom: 20px;
  }

  .footer-submenu-links {
    margin-bottom: 66px;
  }

  .footer-submenu-link {
    display: block;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  }

  .footer-nav-contact-phone {
    margin-bottom: 8px;
    text-align: left;
  }

  .footer-nav-contact-phone > h2 {
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 24px;
    color: #191919;
  }

  .footer-nav-contact-phone > a,
  .footer-nav-contact-phone > p {
    font-size: 24px;
    line-height: 36px;
    display: flex;
    align-items: center;
    color: #191919;
    font-weight: 600;
    position: relative;
  }

  .footer-nav-contact-phone > a i,
  .footer-nav-contact-phone > p i {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    margin-right: 8px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.2s;
  }

  .footer-nav-contact-phone > a span,
  .footer-nav-contact-phone > p span {
    margin-left: 0;
    transition: all 0.2s;
  }

  .footer-nav-contact-phone > a + p,
  .footer-nav-contact-phone > p + p {
    margin-top: 7px;
  }

  .footer-nav-contact-phone > a:hover {
    color: #191919;
  }

  .footer-nav-contact-phone > a:hover span {
    text-decoration: underline;
  }

  .footer-nav-contact-emails {
    position: relative;
    font-size: 0;
  }

  .footer-nav-contact-emails > li {
    font-size: 14px;
    line-height: 24px;
    white-space: nowrap;
    list-style: none;
  }

  .footer-nav-contact-emails-item {
    position: relative;
    display: inline-block;
    padding-right: 8px;
  }

  .footer-nav-contact-emails-item a {
    display: block;
    color: #595959;
    font-size: 14px;
    line-height: 24px;
    position: relative;
    z-index: 1;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }

  .footer-nav-download {
    display: none;
  }

  .foot-email {
    position: absolute;
    top: 50%;
    left: 100%;
    display: none;
    height: 24px;
    border-radius: 3px;
    margin-top: -12px;
    padding-left: 10px;
    padding-right: 10px;
    background: #fff;
    color: #333;
    line-height: 24px;
    font-size: 12px;
  }

  .foot-email p:before {
    content: '';
    position: absolute;
    top: 7px;
    right: 100%;
    display: block;
    border: 5px solid;
    border-left: 0;
    border-color: transparent #fff transparent transparent;
  }

  .footer-nav-contact-emails-item:hover .foot-email {
    display: block;
  }

  .footer-nav-contact-emails-item:hover > a {
    color: #191919;
    text-decoration: underline;
  }

  .footer-nav-about {
    position: relative;
    z-index: 99999;
    text-align: left;
    font-size: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .footer-nav-about .right-margin-pc {
    display: inline-block;
    margin-right: 12px;
    text-align: left;
    overflow: visible;
  }

  .footer-nav-about .right-margin-pc:last-child {
    margin-right: 0;
  }

  .footer-logo {
    display: none;
  }

  .footer-nav-menus {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin-top: 60px;
    text-align: center;
    border-left: 1px solid #e0e0e1;
    padding-left: 200px;
    @media (max-width: 1776px) {
      padding-left: 100px !important;
    }
    @media (max-width: 1440px) {
      padding-left: 50px !important;
    }
  }

  .footer-nav-menus.isNotCN {
    width: ~'calc(100% - 197px)';
  }

  .footer-nav-menus:after {
    content: '';
    display: table;
    clear: both;
  }

  .footer-nav-menus dl {
    float: left;
    width: 186px;
    padding-left: 30px;
    font-size: 14px;
    flex: 1;
    text-align: left;
  }

  .footer-nav-menus dl dt {
    margin-bottom: var(--margin-md);
    font-weight: 700;
    line-height: 18px;
    color: #191919;
    font-size: 16px;
  }

  .footer-nav-menus dl dd {
    font-size: 14px;
    line-height: 24px;
    color: #595959;

    & + dd {
      margin-top: 8px;
    }
  }

  .footer-nav-menus dl dd a {
    color: #595959;
  }

  .footer-nav-menus dl dd a:hover {
    color: #191919;
    text-decoration: underline;
  }

  /* footer-copyright */
  .footer-copyright-wrapper {
    padding-top: 20px;
    padding-bottom: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1776px) {
      max-width: 1600px;
    }

    @media (max-width: 1023px) {
      border-top: none;
    }
  }

  .footer-copyright {
    float: left;
    font-size: 0;
  }

  .footer-copyright span,
  .footer-copyright a {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    line-height: 18px;
  }

  .footer-copyright .footer-copyright-extra {
    font-size: 14px;
    color: #595959;
  }

  .footer-law {
    float: right;
    overflow: hidden;
    font-size: 0;
  }

  .footer-law > li {
    display: inline-block;
    font-size: 14px;
    line-height: 18px;
  }

  .footer-law > li + li:before {
    content: '|';
    margin-left: 10px;
    margin-right: 10px;
    color: #595959;
  }

  .footer-record {
    clear: both;
    padding-top: 5px;
    font-size: 0;
  }

  .footer-record i {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 8px;
    vertical-align: middle;
    background-size: 100% 100%;
  }

  .footer-record i a {
    display: block;
    width: 18px;
    height: 18px;
  }

  .footer-record a,
  .footer-record span {
    font-size: 12px;
    line-height: 18px;
    vertical-align: middle;
    margin-right: 5px;
  }

  @media (max-width: 1023px) {
    .footer-nav-menus {
      display: none;
    }
    .footer-nav-content {
      justify-content: center;
      align-items: center;
    }

    .footer-copyright,
    .footer-law,
    .footer-record {
      float: none;
      display: block;
      text-align: center;
      font-size: 0;
      max-width: 100% !important;
    }

    .footer-copyright {
      padding-top: 5px;
      max-width: 100% !important;
    }

    .footer-copyright span,
    .footer-copyright a {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  @media (max-width: 1023px) {
    .footer-law {
      display: none !important;
    }
  }

  @media (max-width: 767px) {
    .footer-copyright {
      padding-top: 0;
      color: #fff;
    }

    .footer-copyright-wrapper {
      padding-top: 10px;
      padding-bottom: 20px;
    }

    .footer-copyright span,
    .footer-copyright a,
    .footer-copyright .footer-copyright-extra {
      font-size: 10px;
      line-height: 15px;
    }

    .footer-record i,
    .footer-record i a {
      width: 12px;
      height: 12px;
    }

    .footer-record i {
      margin-right: 4px;
    }

    .footer-record span {
      margin-left: 4px;
      line-height: 15px;
      color: #fff;
    }
  }

  .por-section-link {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .footer-qrcode-pc {
    display: block;
    font-size: 12px;
    position: relative;
    cursor: pointer;
    z-index: 99999;
    overflow: visible;
  }

  .qr-code {
    display: none;
    position: absolute;
    left: 50%;
    bottom: 55px;
    width: 165px;
    height: 165px;
    margin-bottom: 2px;
    margin-left: -82.5px;
    background-color: #fff;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 99999;
  }

  [data-demo='qrCode']:hover .qr-code {
    display: block;
  }

  .box {
    left: 50%;
    width: 0;
    height: 0;
    border-width: 12px;
    border-style: solid;
    border-color: #fff transparent transparent;
    bottom: -24px;
    position: absolute;
    margin-left: -12px;
  }
}

.footer-nav-contact-title {
  display: none;
}

.footer-nav-contact-icon {
  display: none;
}

@media (max-width: 1366px) {
  .footer-nav-menus {
    padding-left: 0 !important;
  }
}

@media (max-width: 1023px) {
  .qr-code {
    width: 165px !important;
    height: 165px !important;
    z-index: 99999 !important;
  }

  .footer-nav-download {
    display: block !important;
    margin-bottom: 16px;
    text-align: center;
  }

  .download-app {
    font-size: 14px;
    line-height: 22px;
    color: #191919;
    cursor: pointer;
  }

  .download-app i {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 10px;
    height: 14px;
    margin-top: -3px;
    margin-right: 8px;
    border: solid 1px #191919;
  }

  .download-app i:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 2px;
    left: 0;
    border-bottom: solid 1px #191919;
  }

  .footer-nav-contact-title {
    display: block;
    text-align: center;
    width: 100%;
    color: #191919;
    font-size: 14px;
    line-height: 22px;
  }

  .footer-nav-contact-icon {
    display: flex;
    flex-wrap: wrap;
    height: 48px;
    border: 1px solid #999999;
    border-radius: var(--radius-2xl);
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: rgba(37, 43, 58, 0.7);
    line-height: 20px;
    margin-bottom: 2px;

    :is(img) {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 8px;
    }
    :is(em) {
      font-style: normal;
      font-weight: 700;
      color: #191919;
    }
  }

  .footer-hot-recommend {
    display: none;
  }
  .footer-nav-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border: none;
  }
  .footer-nav {
    padding: 0;
  }

  .footer-nav-menus {
    display: none;
  }

  @media (max-width: 768px) {
    .footer-nav-content {
      flex-direction: column;
    }

    .footer-nav-menus {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      order: 1;
    }

    .footer-nav-contact {
      order: 0;
    }
  }

  .footer-nav-submenus,
  .footer-nav-left {
    float: none !important;
    width: auto !important;
    padding-left: 0;
    padding-right: 0;
    border: none !important;
    font-size: 0;
    padding-top: 16px;
    text-align: center;
  }

  .footer-nav-submenus-inner {
    float: none !important;
    width: auto;
    padding-left: 0;
    background: none;
  }

  .footer-nav-contact,
  .footer-submenu-links {
    display: none;
  }

  .footer-nav-about {
    display: inline-block;
    float: none;
    margin: 0 auto;
    font-size: 0;
    text-align: center !important;
    padding-bottom: 16px;
    padding-top: 8px;
    vertical-align: top;
  }

  .footer-nav-about dt {
    display: none;
  }

  .footer-nav-about > .right-margin-pc {
    display: inline-block;
    height: auto;
    padding-bottom: 0;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px !important;
  }

  .footer-nav-about > .right-margin-pc.footer-nav-about-dd-mb {
    display: inline-block;
  }

  .footer-nav-submenus-link {
    padding-top: 0;
    margin-top: 0;
    font-size: 14px;
    line-height: 34px;

    :is(i) {
      margin-top: 0;
    }

    :is(p) {
      display: block;
      margin-left: 44px;
    }

    &.weixin-sh {
      cursor: pointer;
    }
  }

  .footer-nav-submenus-link-phone {
    line-height: 20px;

    :is(p:first-of-type) {
      margin-top: -3px;
    }

    :is(p:last-of-type) {
      margin-bottom: -3px;
    }
  }

  .footer-nav-submenus-qr {
    display: none !important;
  }

  .footer-nav-other-link {
    display: none;
  }

  .footer-law-mb {
    clear: both;
    display: block !important;
    font-size: 0;
    text-align: center;
    color: #e0e0e1;
    padding-top: 10px;
    padding-bottom: 0;
  }

  .footer-law-mb ::before {
    clear: both;
    display: block;
    font-size: 0;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 0;
  }

  .footer-law-mb > li {
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
  }

  .footer-law-mb > li + li:before {
    content: '';
    height: 17px;
    display: inline-block;
    position: relative;
    top: 3px;
    border-right: 1px solid;
    margin-left: 12px;
    margin-right: 12px;
  }

  .footer-copyright-container {
    border: none;
  }

  .footer-nav-contact-button {
    display: none;
  }
}

@media (max-width: 767px) {
  .footer-nav-contact-button {
    display: inline-block;
  }

  .footer-nav-wrapper {
    padding-left: 20px;
    padding-right: 20px;
  }

  .footer-nav-contact,
  .footer-submenu-links {
    display: none;
  }

  .footer-nav-contact-phone {
    padding-left: 34px;
    margin: 0;
    background-size: 24px 24px;
    background-position: 0 0;

    :is(p) {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .footer-nav-contact-emails {
    display: none;
  }

  .footer-nav-submenus-link {
    line-height: 24px;

    :is(p) {
      margin-left: 34px;
    }
  }

  .footer-nav-submenus-link-phone {
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .footer-logo {
    display: flex !important;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    color: #191919;
    font-weight: 600;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  }

  .footer-logo::before {
    display: inline-block;
    content: '';
    margin-right: 12px;
    width: 40px;
    height: 40px;
    background-image: url('data:image/png;base64,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');
    background-position: center;
    background-size: 100%;
    border-radius: 4px;
  }
}

@media (max-width: 1775px) {
  #footer {
    .footer-nav-wrapper,
    .footer-copyright-wrapper {
      padding-left: 5%;
      padding-right: 5%;
    }
  }
}
</style>
