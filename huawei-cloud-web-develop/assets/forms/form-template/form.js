// 表单模板脚本：校验、防重复提交（按钮禁用 + 请求 token）、防刷（蜜罐）、埋点钩子
// 使用前：将 SUBMIT_ENDPOINT 替换为真实接口地址，字段名与后端对齐

const SUBMIT_ENDPOINT = "/api/signup"; // TODO: 替换为真实接口
const REQUEST_TIMEOUT_MS = 15000;

const form = document.getElementById("signup-form");
const submitBtn = document.getElementById("submit-btn");
const statusEl = document.getElementById("form-status");

const rules = {
  name: {
    required: true,
    test: (v) => v.length >= 1 && v.length <= 50,
    message: "请输入姓名（1-50 个字符）",
  },
  phone: {
    required: true,
    test: (v) => /^1[3-9]\d{9}$/.test(v),
    message: "请输入正确的 11 位手机号",
  },
  wechat: {
    required: false,
    test: (v) => v === "" || /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(v),
    message: "微信号需 6-20 位，不能以数字开头",
  },
  message: {
    required: false,
    test: (v) => v.length <= 500,
    message: "需求描述不能超过 500 字",
  },
};

// 埋点：按需接入统计平台
function track(event, payload = {}) {
  console.log("[track]", event, payload);
  // TODO: 替换为真实埋点 SDK，如 dataLayer.push 或 _hmt.push
}

// 表单曝光
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      track("form_view");
      observer.disconnect();
    }
  });
  observer.observe(form);
}

// 首次交互
let started = false;
form.addEventListener(
  "focusin",
  () => {
    if (!started) {
      started = true;
      track("form_start");
    }
  },
  true
);

function getFieldValue(name) {
  const el = form.elements[name];
  if (!el) return "";
  if (el.type === "checkbox") return el.checked ? "1" : "0";
  return el.value.trim();
}

function validateField(name) {
  const rule = rules[name];
  if (!rule) return true;
  const value = getFieldValue(name);
  const valid = !rule.required && value === "" ? true : rule.test(value);
  const errorEl = document.getElementById(name + "-error");
  const inputEl = form.elements[name];
  if (!valid) {
    errorEl.textContent = rule.message;
    inputEl.setAttribute("aria-invalid", "true");
    track("field_error", { field: name });
  } else {
    errorEl.textContent = "";
    inputEl.removeAttribute("aria-invalid");
  }
  return valid;
}

function validateAll() {
  return Object.keys(rules).every(validateField);
}

// 防抖工具：高频交互（实时校验、联想查询等）使用
function debounce(fn, ms = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// 失焦校验
Object.keys(rules).forEach((name) => {
  const el = form.elements[name];
  if (el) el.addEventListener("blur", () => validateField(name));
});

// 实时重校验：字段已标记错误后，停止输入时自动重新校验（防抖 300ms）
Object.keys(rules).forEach((name) => {
  const el = form.elements[name];
  if (!el || el.type === "checkbox") return;
  el.addEventListener(
    "input",
    debounce(() => {
      if (el.getAttribute("aria-invalid") === "true") validateField(name);
    }, 300)
  );
});

// 会话请求 token：幂等标识，服务端需据此去重；成功或超时后失效
let requestToken = "";
function newRequestToken() {
  requestToken =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "t-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 清除上次提交状态
  statusEl.textContent = "";
  statusEl.removeAttribute("data-kind");

  // 隐私勾选
  const consentOk = form.elements.consent.checked;
  const consentError = document.getElementById("consent-error");
  consentError.textContent = consentOk ? "" : "请先阅读并同意《隐私政策》";
  if (!consentOk) return;

  const valid = validateAll();
  track("submit_click", { valid });
  if (!valid) return;

  // 蜜罐：机器人填写的隐藏字段非空则静默丢弃
  const honeypot = getFieldValue("website");
  if (honeypot) return;

  const payload = {};
  Object.keys(rules).forEach((name) => {
    payload[name] = getFieldValue(name);
  });
  payload.consent = true;
  newRequestToken();
  payload.requestToken = requestToken;

  // 防重复提交：进入加载态并禁用按钮
  const startedAt = Date.now();
  submitBtn.disabled = true;
  submitBtn.textContent = "提交中…";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.code === 0) {
      statusEl.textContent = "提交成功，我们会尽快与您联系！";
      statusEl.setAttribute("data-kind", "success");
      track("submit_success", { duration_ms: Date.now() - startedAt });
      requestToken = "";
      form.reset();
    } else {
      throw new Error(data.message || "提交失败，请稍后重试");
    }
  } catch (err) {
    const message = err.name === "AbortError" ? "提交超时，请重试" : err.message;
    statusEl.textContent = message;
    statusEl.setAttribute("data-kind", "error");
    track("submit_fail", { message });
  } finally {
    clearTimeout(timer);
    submitBtn.disabled = false;
    submitBtn.textContent = "立即报名";
  }
});
