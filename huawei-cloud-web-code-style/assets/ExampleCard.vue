<!-- 规范示例组件：ExampleCard -->
<!-- 结构顺序：template → script setup → style scoped -->
<template>
  <!-- 展示组件：只依赖 props/emits/插槽，不写业务逻辑 -->
  <article class="card" :class="{ 'card--featured': isFeatured }">
    <img v-if="cover" class="card__cover" :src="cover" :alt="title" loading="lazy">
    <h3 class="card__title">{{ title }}</h3>
    <p class="card__desc">{{ description }}</p>

    <!-- 命名插槽带默认内容（fallback） -->
    <div class="card__footer">
      <slot name="footer">
        <span class="card__meta">更新于 {{ updatedAt }}</span>
      </slot>
    </div>

    <!-- 事件名 kebab-case，按钮只发事件不写逻辑 -->
    <button class="card__btn" type="button" :disabled="isDisabled" @click="emit('view')">
      查看详情
    </button>
  </article>
</template>

<script setup lang="ts">
// imports → props/emits → state → computed → 方法

// 1. props：TS interface 显式声明，默认值用 withDefaults，无 any
interface CardProps {
  title: string;
  description?: string;
  cover?: string;
  updatedAt?: string;
  /** 布尔 props 用 is/has 前缀 */
  isFeatured?: boolean;
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  description: "",
  cover: "",
  updatedAt: "",
  isFeatured: false,
  isDisabled: false,
});

// 2. emits：全部显式声明，事件名 kebab-case
const emit = defineEmits<{
  (e: "view"): void;
}>();

// 3. 本地 state 与派生值
// 模板用到的派生值用 computed，方法不承担渲染计算
const cardClass = computed(() => ({
  "card--featured": props.isFeatured,
}));
</script>

<style scoped>
/* 类名 BEM：card__元素、card--修饰 */
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  min-width: 0;
}
.card--featured {
  border-color: #2563eb;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
}
.card__cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}
.card__title {
  margin: 0;
  font-size: 18px;
}
.card__desc {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}
.card__footer {
  margin-top: auto;
}
.card__meta {
  color: #94a3b8;
  font-size: 12px;
}
.card__btn {
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  min-height: 44px;
}
.card__btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}
</style>
