// 浏览器能力检测工具
// 在页面控制台运行 featureDetect()，输出当前环境的 CSS/JS/HTML 能力报告，
// 用于排查「某浏览器上功能异常」的问题。
(function (global) {
  function supports(prop, value) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      try {
        return CSS.supports(prop, value);
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  function detectBrowser(ua) {
    const edge = ua.match(/Edg\/([\d.]+)/);
    const firefox = ua.match(/Firefox\/([\d.]+)/);
    const chrome = ua.match(/Chrome\/([\d.]+)/);
    const safari = ua.match(/Version\/([\d.]+).*Safari/) || (ua.includes("Safari") ? ua.match(/Safari\/([\d.]+)/) : null);
    const isWeChat = ua.includes("MicroMessenger");
    if (edge) return { name: "Edge", version: edge[1], wechat: isWeChat };
    if (firefox) return { name: "Firefox", version: firefox[1], wechat: isWeChat };
    if (chrome) return { name: "Chrome", version: chrome[1], wechat: isWeChat };
    if (safari) return { name: "Safari", version: safari[1], wechat: isWeChat };
    // 微信 iOS 内置浏览器：UA 通常不含 Version/Safari 标记，按 WKWebView（Safari 内核）识别
    if (isWeChat && /iPhone|iPad|iPod/.test(ua)) return { name: "Safari", version: "", wechat: true };
    return { name: "unknown", version: "", wechat: isWeChat };
  }

  function featureDetect() {
    const hasWindow = typeof window !== "undefined";
    const hasNavigator = typeof navigator !== "undefined";
    const ua = hasNavigator ? navigator.userAgent : "";
    const mql = hasWindow && typeof window.matchMedia === "function" ? window.matchMedia("(min-width: 1px)") : null;
    const report = {
      ua: ua,
      browser: detectBrowser(ua),
      date: new Date().toISOString(),
      css: {
        grid: supports("display", "grid"),
        flexbox: supports("display", "flex"),
        sticky: supports("position", "sticky"),
        backdropFilter: supports("backdrop-filter", "blur(4px)"),
        aspectRatio: supports("aspect-ratio", "16 / 9"),
        containerType: supports("container-type", "inline-size"),
        dvh: supports("height", "100dvh"),
        envSafeArea: supports("padding-bottom", "env(safe-area-inset-bottom)"),
        cssVar: supports("--x", "1"),
      },
      js: {
        fetch: typeof fetch === "function",
        promise: typeof Promise !== "undefined",
        intersectionObserver: typeof IntersectionObserver !== "undefined",
        matchMedia: hasWindow && typeof window.matchMedia === "function",
        mqlAddEventListener: !!mql && typeof mql.addEventListener === "function",
        cryptoRandomUUID: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function",
        abortController: typeof AbortController !== "undefined",
        optionalChaining: (function () {
          try {
            return ({}.a?.b === undefined);
          } catch (e) {
            return false;
          }
        })(),
        nullishCoalescing: (function () {
          try {
            return (undefined ?? "ok") === "ok";
          } catch (e) {
            return false;
          }
        })(),
        localStorage: (function () {
          try {
            return typeof localStorage !== "undefined";
          } catch (e) {
            return false;
          }
        })(),
      },
      html: {
        dialog: typeof HTMLDialogElement !== "undefined",
        lazyLoading: typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype,
      },
    };
    return report;
  }

  featureDetect.detectBrowser = detectBrowser;
  global.featureDetect = featureDetect;
})(typeof globalThis !== "undefined" ? globalThis : this);
