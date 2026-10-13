<template>
  <form ref="rootEl" class="form" novalidate @submit.prevent="onSubmit">
    <div class="field">
      <label class="field__label" for="name">姓名 <span class="field__required">*</span></label>
      <input class="field__input" id="name" v-model.trim="form.name" maxlength="50" required autocomplete="name"
             aria-describedby="name-error" :aria-invalid="errors.name ? 'true' : undefined"
             @blur="validateField('name')" @input="onInput('name')">
      <p class="field__error" id="name-error" role="alert">{{ errors.name }}</p>
    </div>

    <div class="field">
      <label class="field__label" for="phone">手机号 <span class="field__required">*</span></label>
      <input class="field__input" id="phone" v-model.trim="form.phone" type="tel" maxlength="11" required autocomplete="tel"
             inputmode="numeric" aria-describedby="phone-error" :aria-invalid="errors.phone ? 'true' : undefined"
             @blur="validateField('phone')" @input="onInput('phone')">
      <p class="field__error" id="phone-error" role="alert">{{ errors.phone }}</p>
    </div>

    <div class="field">
      <label class="field__label" for="wechat">微信号</label>
      <input class="field__input" id="wechat" v-model.trim="form.wechat" maxlength="20"
             aria-describedby="wechat-error" :aria-invalid="errors.wechat ? 'true' : undefined"
             @blur="validateField('wechat')" @input="onInput('wechat')">
      <p class="field__error" id="wechat-error" role="alert">{{ errors.wechat }}</p>
    </div>

    <div class="field">
      <label class="field__label" for="message">需求描述</label>
      <textarea class="field__input" id="message" v-model.trim="form.message" rows="3" maxlength="500"
                aria-describedby="message-error" :aria-invalid="errors.message ? 'true' : undefined"
                @blur="validateField('message')" @input="onInput('message')"></textarea>
      <p class="field__error" id="message-error" role="alert">{{ errors.message }}</p>
    </div>

    <!-- 蜜罐字段：人类不可见，机器人填写后提交会被静默丢弃 -->
    <input class="honeypot" type="text" name="website" v-model="form.website" tabindex="-1" autocomplete="off" aria-hidden="true">

    <label class="consent">
      <input type="checkbox" id="consent" v-model="form.consent" required aria-describedby="consent-error">
      <span>我已阅读并同意 <a href="/privacy" target="_blank" rel="noopener">《隐私政策》</a></span>
    </label>
    <p class="field__error" id="consent-error" role="alert">{{ errors.consent }}</p>

    <button class="btn" type="submit" :disabled="submitting">{{ submitting ? "提交中…" : "立即报名" }}</button>
    <p class="form__status" role="status" :data-kind="statusKind">{{ status }}</p>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  submitEndpoint: { type: String, default: "/api/signup" },
  timeoutMs: { type: Number, default: 15000 },
  onTrack: { type: Function, default: null },
});

const form = reactive({ name: "", phone: "", wechat: "", message: "", website: "", consent: false });
const errors = reactive({ name: "", phone: "", wechat: "", message: "", consent: "" });
const status = ref("");
const statusKind = ref("");
const submitting = ref(false);
const started = ref(false);
const rootEl = ref(null);

const rules = {
  name: { required: true, test: (v) => v.length >= 1 && v.length <= 50, message: "请输入姓名（1-50 个字符）" },
  phone: { required: true, test: (v) => /^1[3-9]\d{9}$/.test(v), message: "请输入正确的 11 位手机号" },
  wechat: { required: false, test: (v) => v === "" || /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(v), message: "微信号需 6-20 位，不能以数字开头" },
  message: { required: false, test: (v) => v.length <= 500, message: "需求描述不能超过 500 字" },
};

// 埋点：默认 console，接入统计平台时通过 onTrack prop 注入
function track(event, payload = {}) {
  if (props.onTrack) props.onTrack(event, payload);
  else console.log("[track]", event, payload);
}

// 防抖工具：实时校验等高频场景使用
function debounce(fn, ms = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

const debouncedInputs = {};
function onInput(name) {
  if (!debouncedInputs[name]) {
    debouncedInputs[name] = debounce(() => {
      if (errors[name]) validateField(name);
    }, 300);
  }
  debouncedInputs[name]();
}

function validateField(name) {
  const rule = rules[name];
  if (!rule) return true;
  const value = form[name];
  const valid = !rule.required && value === "" ? true : rule.test(value);
  if (!valid) {
    errors[name] = rule.message;
    track("field_error", { field: name });
  } else {
    errors[name] = "";
  }
  return valid;
}

function validateAll() {
  return Object.keys(rules).every(validateField);
}

// 会话请求 token：幂等标识，服务端需据此去重；成功或超时后失效
let requestToken = "";
function newRequestToken() {
  requestToken =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "t-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

async function onSubmit() {
  // 清除上次提交状态
  status.value = "";
  statusKind.value = "";

  // 隐私勾选
  if (!form.consent) {
    errors.consent = "请先阅读并同意《隐私政策》";
    return;
  }
  errors.consent = "";

  const valid = validateAll();
  track("submit_click", { valid });
  if (!valid) return;

  // 蜜罐：机器人填写的隐藏字段非空则静默丢弃
  if (form.website) return;

  const payload = {};
  Object.keys(rules).forEach((name) => {
    payload[name] = form[name];
  });
  payload.consent = form.consent;
  newRequestToken();
  payload.requestToken = requestToken;

  // 防重复提交：进入加载态并禁用按钮
  const startedAt = Date.now();
  submitting.value = true;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), props.timeoutMs);

  try {
    const res = await fetch(props.submitEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.code === 0) {
      status.value = "提交成功，我们会尽快与您联系！";
      statusKind.value = "success";
      track("submit_success", { duration_ms: Date.now() - startedAt });
      requestToken = "";
      Object.keys(rules).forEach((name) => {
        form[name] = "";
        errors[name] = "";
      });
      form.consent = false;
      form.website = "";
    } else {
      throw new Error(data.message || "提交失败，请稍后重试");
    }
  } catch (err) {
    const message = err.name === "AbortError" ? "提交超时，请重试" : err.message;
    status.value = message;
    statusKind.value = "error";
    track("submit_fail", { message });
  } finally {
    clearTimeout(timer);
    submitting.value = false;
  }
}

function onFirstInteraction() {
  if (!started.value) {
    started.value = true;
    track("form_start");
  }
}

onMounted(() => {
  const el = rootEl.value;
  if (!el) return;
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        track("form_view");
        observer.disconnect();
      }
    });
    observer.observe(el);
  }
  el.addEventListener("focusin", onFirstInteraction);
});

onBeforeUnmount(() => {
  if (rootEl.value) rootEl.value.removeEventListener("focusin", onFirstInteraction);
});
</script>

<style scoped>
.field { margin-bottom: 16px; }
.field__label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 600; }
.field__required { color: #dc2626; }
.field__input {
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
}
.field__input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }
.field__input[aria-invalid="true"] { border-color: #dc2626; }
.field__error { margin: 4px 0 0; font-size: 13px; color: #dc2626; min-height: 18px; }
.honeypot { position: absolute; left: -9999px; opacity: 0; height: 0; width: 0; }
.consent { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; color: #475569; }
.consent a { color: #2563eb; }
.btn {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: #2563eb;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.btn:disabled { background: #93c5fd; cursor: not-allowed; }
.form__status { margin: 12px 0 0; font-size: 14px; text-align: center; min-height: 20px; }
.form__status[data-kind="success"] { color: #16a34a; }
.form__status[data-kind="error"] { color: #dc2626; }
</style>
