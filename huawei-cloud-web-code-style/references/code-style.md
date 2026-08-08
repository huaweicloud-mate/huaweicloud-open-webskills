# 代码风格细则

## 组合式 API 约定

- 一律 `<script setup>`；禁止与 Options API 混用同一组件。
- 逻辑复用抽组合式函数（`useXxx`），返回值只暴露需要的 ref/方法。

## 命名

| 内容 | 规范 | 示例 |
| --- | --- | --- |
| 组件名 | PascalCase，多词 | `BaseButton`，不用 `Btn` |
| 变量 | camelCase；ref 语义化 | `userList`、`isSubmitting` |
| 函数 | 动词开头 | `handleSubmit`、`fetchUserList`、`formatPrice` |
| 常量 | SCREAMING_SNAKE | `MAX_LENGTH`、`DEFAULT_PAGE_SIZE` |
| 事件 | kebab-case | `@submit-success` |
| 布尔 | is/has/can/show 前缀 | `isLoading`、`hasError` |

## 模板规范

- `v-for` 必须带稳定 `:key`（用 id 等唯一字段，不用 index 除非列表静态）。
- `v-if` 与 `v-for` 不放在同一元素；需要组合时外层包 `<template>` 或改用 computed 过滤。
- 模板内不写复杂表达式（三元嵌套、长逻辑一律移到 computed/方法）。
- class 绑定优先对象/数组语法；事件用 `@click` 简写，不用 `v-on:`。
- 表单控件配对 `label for` 与 `aria-describedby`（无障碍）。

## TypeScript 类型

- props/emits/事件参数定义 interface，导出供复用；禁止 `any`（确需时用 unknown + 收窄）。
- 类型文件放 `types/` 或就近 `export interface`，避免散落。
- API 响应定义类型后使用，不写 `res.data as any`。
- 环境变量、路由 meta 声明类型。

## computed / watch / 异步

- 模板或多处使用的派生值用 `computed`，不用方法重复计算。
- `watch` 明确 `deep`/`immediate` 选项；监听多个源用数组；副作用放 `watchEffect` 时注意依赖收集。
- 异步统一 `async/await`，错误用 `try/catch` 处理并给出用户反馈（见 huawei-cloud-web-form 提交流程）。
- 定时器、事件监听、Observable 在 `onBeforeUnmount` 清理，防内存泄漏。

## 性能相关

- 列表 key 稳定；大列表虚拟滚动；`computed` 依赖最小化。
- 非响应式常量用普通变量/`markRaw`，避免无谓的响应式开销。
- 高频事件（resize/scroll/input）防抖节流（见 huawei-cloud-web-form 的 debounce）。

## 工具链

- ESLint：eslint-plugin-vue 的 `vue3-recommended` + 团队规则；TypeScript 用 `vue-tsc` 检查。
- Prettier 统一格式（单引号、分号策略、缩进 2 空格）。
- husky + lint-staged：提交前 lint 与格式化。
