---
name: huawei-cloud-web-code-style
description: Vue 3 组件与代码规范，覆盖 SFC 结构（template/script/style 顺序）、目录与文件命名、组件设计（props/emits 声明、单向数据流、v-model、插槽、透传、异步组件、Provide/Inject）、代码风格（script setup、组合式函数、TS 类型、模板规范、computed/watch 用法）、scoped 样式与类名规范、评审自查清单。当用户需要编写、重构或评审 Vue 3 组件与代码（统一团队风格、代码评审、新手规范培训）时使用。
---

# Vue3 组件与代码规范 Skill

面向 Vue 3 项目的组件与代码规范。按以下流程工作，细节参考对应资源文件。

## 工作流

### 1. 确认工程基线
- 确认技术栈：Vue 3 + Vite，是否 TypeScript、Pinia、Vue Router。
- 确认工具链：ESLint（eslint-plugin-vue recommended）+ Prettier，提交前 lint-staged 检查。
- 确认样式方案：scoped 为主，是否使用 UI 库/设计令牌。

### 2. 目录与命名
- 组件文件 PascalCase（如 `SignupForm.vue`），组合式函数 `useXxx`，其余文件 kebab-case。
- 目录按业务分块组织，公共组件放 `components/` 并分类，见 `references/component-rules.md`。

### 3. 组件设计
- 遵守 SFC 结构顺序与 props/emits 规范：显式声明、命名约定、单向数据流。
- 按职责拆分（容器组件 vs 展示组件）；超过约 200 行或职责不清时拆分。
- 弹层用 Teleport、异步组件用 defineAsyncComponent，细节见 `references/component-rules.md`。

### 4. 代码风格
- 统一 `<script setup>`，不用 Options API 混用；命名、模板写法、TS 类型、computed/watch 用法见 `references/code-style.md`。

### 5. 评审自查清单
- [ ] 文件名与组件职责一致，PascalCase
- [ ] props 显式声明（TS 用 interface），有默认值用 withDefaults，无 any
- [ ] emits 全部显式声明，事件名 kebab-case
- [ ] 无 props 直接修改，需要变更走 emit 或本地 ref
- [ ] v-for 有稳定 :key，无 v-if/v-for 同元素
- [ ] 模板无复杂表达式（逻辑在 script 中）
- [ ] 样式 scoped，类名符合约定，无全局样式污染
- [ ] 监听器/定时器在卸载时清理
- [ ] ESLint + Prettier 通过

## 资源

- `references/component-rules.md`：组件设计细则（SFC 结构、props/emits、插槽、透传、异步/动态组件、样式），编写组件时读取。
- `references/code-style.md`：代码风格细则（命名、模板、TS 类型、computed/watch、工具链），编码与评审时读取。
- `assets/ExampleCard.vue`：符合规范的示例组件（TS + 注释标注规范点），作为新组件模板参考。
