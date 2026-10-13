# 组件设计细则

## SFC 结构顺序

- 块顺序：`<template>` → `<script setup>` → `<style scoped>`。
- script 内部顺序：imports → 组件 props/emits（defineProps/defineEmits）→ 组合式函数调用 → 本地 state → computed → watch → 生命周期 → 普通方法。

## 目录与命名

| 内容 | 命名 | 示例 |
| --- | --- | --- |
| 组件文件 | PascalCase | `SignupForm.vue`、`AppHeader.vue` |
| 组合式函数 | useXxx | `useViewport.ts`、`useFormSubmit.ts` |
| 页面/视图 | PascalCase 或 kebab-case（按约定） | `HomePage.vue` / `home-page.vue` |
| 工具/常量/类型 | kebab-case | `utils/format.ts`、`types/order.ts` |
| 样式/资源 | kebab-case | `button.css`、`hero-banner.jpg` |

- 目录：`src/components/`（按业务分块）、`src/composables/`、`src/views/`（或 pages）、`src/types/`、`src/assets/`。
- 一个组件一个文件；组件名与文件名一致（defineOptions name 与文件名一致，便于 devtools 调试）。

## Props / Emits

- props 用 `defineProps<Props>()`（TS）或对象式声明（JS）；必填项明确，可选项给默认值（withDefaults）。
- props 命名：定义用 camelCase，模板中使用 kebab-case（`:user-name`）。
- 布尔 props 用 `is`/`has`/`show` 前缀（如 `isLoading`、`showClose`）。
- 单向数据流：不修改 props；需要本地可变副本时 `const local = ref(props.value)`，用 watch 同步。
- emits 全部显式声明（`defineEmits<{ (e: "update:model-value", v: string): void }>()`），事件名 kebab-case。
- v-model：单值用 `modelValue` + `update:modelValue`；多值用 `v-model:title` / `v-model:checked`。
- 对外暴露方法用 `defineExpose`，默认不暴露内部实现。

## 插槽与透传

- 命名插槽显式声明；提供默认内容（fallback），如 `<slot>默认文本</slot>`。
- 需要控制透传位置时 `inheritAttrs: false` + 手动 `v-bind="$attrs"`；否则保持默认自动继承到根元素。
- 跨层级传递优先 Provide/Inject（用 InjectionKey 类型），避免多层 props 钻透。

## 异步 / 动态 / 弹层组件

- 非首屏组件用 `defineAsyncComponent(() => import("./Xxx.vue"))` 按需加载。
- 频繁切换的组件包 `<KeepAlive>` 缓存状态（列表页、Tab 页）。
- 弹层/抽屉用 `<Teleport to="body">`，并处理焦点与滚动锁定。
- 动态组件用 `<component :is="...">`，类型收窄避免 any。

## 样式规范

- 默认 `scoped`，避免全局选择器污染；需要全局的样式（reset、主题变量）放全局文件。
- 类名统一：BEM（`card__title`、`card--featured`）或 kebab-case，项目二选一。
- 设计令牌（颜色/间距/字号）用 CSS 变量统一管理，不散落魔法值。
- 组件内响应式用媒体查询或容器查询（见 huawei-cloud-web-responsive-layout），样式优先纯 CSS 而非 JS 判断。
