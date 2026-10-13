// Core Web Vitals 内联采集器（无第三方依赖）
// 用法：<script src="vitals-collect.js"></script>，或设置全局 __VITALS_ENDPOINT__ 指定上报地址
(function (global) {
  var THRESHOLDS = {
    LCP: [2500, 4000],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    FID: [100, 300],
  };

  function rating(name, value) {
    var t = THRESHOLDS[name];
    if (!t) return "";
    if (value <= t[0]) return "good";
    if (value <= t[1]) return "needs-improvement";
    return "poor";
  }

  function serialize(metric) {
    var navType = "";
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      navType = nav && nav.type ? nav.type : "";
    } catch (e) { /* ignore */ }
    return {
      name: metric.name,
      value: Math.round(metric.value * 1000) / 1000,
      rating: rating(metric.name, metric.value),
      navigationType: navType,
      ua: (typeof navigator !== "undefined" && navigator.userAgent) || "",
      t: Date.now(),
    };
  }

  function send(metric) {
    var endpoint = global.__VITALS_ENDPOINT__ || "/api/vitals";
    var data = serialize(metric);
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([JSON.stringify(data)], { type: "application/json" }));
    } else if (typeof fetch === "function") {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(function () { /* 静默失败 */ });
    }
  }

  function init() {
    if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") {
      return false;
    }

    var lcpValue = 0;
    var clsValue = 0;
    var inpValue = 0;
    var fidValue = 0;

    try {
      var lcpObserver = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        var latest = entries[entries.length - 1];
        if (latest) lcpValue = latest.startTime;
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) { /* 不支持则跳过 */ }

    try {
      var clsObserver = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (!entry.hadRecentInput) clsValue += entry.value;
        });
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) { /* 不支持则跳过 */ }

    try {
      if (PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.indexOf("event") !== -1) {
        var inpObserver = new PerformanceObserver(function (list) {
          list.getEntries().forEach(function (entry) {
            if (entry.duration > inpValue) inpValue = entry.duration;
          });
        });
        inpObserver.observe({ type: "event", buffered: true, durationThreshold: 40 });
      } else {
        var fidObserver = new PerformanceObserver(function (list) {
          var first = list.getEntries()[0];
          if (first) fidValue = first.processingStart - first.startTime;
        });
        fidObserver.observe({ type: "first-input", buffered: true });
      }
    } catch (e) { /* 不支持则跳过 */ }

    function flush() {
      var metrics = [];
      if (lcpValue) metrics.push({ name: "LCP", value: lcpValue });
      if (clsValue) metrics.push({ name: "CLS", value: clsValue });
      if (inpValue) metrics.push({ name: "INP", value: inpValue });
      if (fidValue) metrics.push({ name: "FID", value: fidValue });
      metrics.forEach(send);
    }

    window.addEventListener("pagehide", flush);
    if (typeof document !== "undefined" && document.visibilityState === "hidden") flush();
    return true;
  }

  global.initVitals = init;
  global.vitalsRating = rating;
  global.__vitalsSerialize = serialize;
  global.__vitalsSend = send;
})(typeof globalThis !== "undefined" ? globalThis : this);
