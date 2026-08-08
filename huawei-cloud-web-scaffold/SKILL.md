---
name: huawei-cloud-web-scaffold
description: 初始化 Vue 3 + TypeScript + Vite + Opentiny + Pinia 前端项目脚手架：目录结构、vite/tsconfig 配置、环境变量、路由守卫、store、i18n、工具函数等完整工程骨架。当需要从零创建新前端项目、初始化 Vue3 工程，或迁移现有项目到 Vue3 + TS + Vite + Opentiny + Pinia 时使用，触发关键词：初始化前端项目、创建新项目、脚手架、scaffold、Vue3 项目初始化、搭建项目骨架。
---

# 华为云 Web 项目脚手架 (Huawei Cloud Web Scaffold)

初始化一个 Vue 3 + TypeScript + Vite + Opentiny + Pinia 前端项目。

执行前先问用户项目名称。所有文件名和代码按以下规范生成。

## 核心规则

- **优先使用 Opentiny 组件**：生成代码时，凡 Opentiny 能覆盖的 UI 能力（按钮、表单、弹窗、表格、消息提示、分页、布局等），一律使用 @opentiny/vue 组件实现，禁止用原生 HTML/CSS/JS 自行实现。
- **Opentiny 组件用法参考官方 Skill**：https://docs.opentiny.design/tiny-vue/guide/skills.html （组件 API、示例与最佳实践以该文档为准）。

## 步骤

### 1. 创建项目目录

创建以项目名为名称的目录，进入后执行后续步骤。

### 2. index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><项目名></title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 3. package.json

```json
{
  "name": "<项目名>",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.0",
    "@opentiny/vue": "^3.0.0",
    "axios": "^1.7.0",
    "vue-i18n": "^9.13.0",
    "mitt": "^3.0.0",
    "normalize.css": "^8.0.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-vue": "^5.1.0",
    "typescript": "^5.5.0",
    "vue-tsc": "^2.0.0",
    "sass": "^1.77.0",
    "unplugin-vue-components": "^0.27.0",
    "unplugin-auto-import": "^0.17.0",
    "vite-plugin-svg-icons": "^2.0.0"
  }
}
```

### 3. index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><项目名></title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 4. vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    Components(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/@types/auto-imports.d.ts',
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/var.scss" as *;\n`,
      },
    },
  },
  server: {
    https: true,
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### 5. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "src/@types/**/*.d.ts"]
}
```

### 6. 环境变量文件

创建三个环境文件，支持按环境区分配置：

`.env` — 公共默认值：

```
VITE_API_BASE_URL=/api
VITE_APP_TITLE=<项目名>
```

`.env.development` — 开发环境：

```
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://localhost:8080
```

`.env.production` — 生产环境：

```
VITE_API_BASE_URL=https://api.example.com
```

`VITE_API_PROXY_TARGET` 用于指定 Vite 开发服务器代理的后端地址，开发时改为实际后端接口地址。

所有 `VITE_` 开头的变量会被注入到 `import.meta.env` 中，可在 `axios.ts` 中通过 `import.meta.env.VITE_API_BASE_URL` 读取。

> 注意：`.env` / `.env.development` / `.env.production` 已在 `.gitignore` 中忽略，不上传 git。如需模板可创建 `.env.example` 用于给其他开发者参考。

### 7. .gitignore

```
node_modules
dist
.env
.env.local
.env.development.local
.env.production.local
*.log
.DS_Store
```

### 7. 目录结构

```
src/
  @types/
    index.ts
    api.d.ts
    store.d.ts
    router.d.ts
    global.d.ts
  api/
    axios.ts
    user.ts
  assets/           (.gitkeep)
  components/       (.gitkeep)
  composables/      (.gitkeep)
  event-bus/
    index.ts
  i18n/
    index.ts
    languages/
      zh-CN/
        common.ts
      en-US/
        common.ts
  icons/            (.gitkeep)
  layouts/          (.gitkeep)
  pages/
    index.vue
  router/
    index.ts
    routes.ts
    guard.ts
  store/
    index.ts        (示例 store)
  styles/
    common.scss
    index.scss
    normalize.scss
    tiny-theme.scss
    var.scss
  utils/
    index.ts
    validate.ts
    format.ts
    storage.ts
    constants.ts
    helpers.ts
  App.vue
  main.ts
  shims-vue.d.ts
```

### 8. src/main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
```

### 9. src/App.vue

```vue
<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
```

### 10. src/shims-vue.d.ts

```typescript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### 11. src/router/index.ts

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

### 12. src/router/routes.ts

```typescript
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
]

export default routes
```

### 13. src/router/guard.ts

```typescript
import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router): void {
  router.beforeEach((_to, _from, next) => {
    next()
  })
}
```

### 14. src/store/index.ts

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

### 15. src/api/axios.ts

```typescript
import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  withCredentials: true,
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default http
```

### 16. src/api/user.ts

```typescript
import http from './axios'

export interface UserInfo {
  id: number
  name: string
  email: string
}

export function getUserInfo(id: number) {
  return http.get<UserInfo>(`/user/${id}`)
}

export function login(data: { username: string; password: string }) {
  return http.post<{ token: string }>('/auth/login', data)
}
```

### 17. src/i18n/index.ts

```typescript
import { createI18n } from 'vue-i18n'
import zhCommon from './languages/zh-CN/common'
import enCommon from './languages/en-US/common'

const messages = {
  'zh-CN': { common: zhCommon },
  'en-US': { common: enCommon },
}

const savedLang = localStorage.getItem('lang') || 'zh-CN'

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: 'zh-CN',
  messages,
})

export function setLanguage(lang: string) {
  i18n.global.locale = lang as 'zh-CN' | 'en-US'
  localStorage.setItem('lang', lang)
}

export default i18n
```

### 18. src/i18n/languages/zh-CN/common.ts

```typescript
export default {
  hello: '你好',
  logout: '退出登录',
  login: '登录',
  confirm: '确认',
  cancel: '取消',
}
```

### 19. src/i18n/languages/en-US/common.ts

```typescript
export default {
  hello: 'Hello',
  logout: 'Logout',
  login: 'Login',
  confirm: 'Confirm',
  cancel: 'Cancel',
}
```

### 20. src/event-bus/index.ts

```typescript
import mitt from 'mitt'

type Events = {
  logout: void
  login: string
  'theme-change': string
}

const emitter = mitt<Events>()

export default emitter
```

### 21. src/styles/normalize.scss

```scss
@import 'normalize.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 22. src/styles/var.scss

```scss
$primary-color: #007bff;
$font-size-base: 14px;
$border-radius: 4px;
```

### 23. src/styles/common.scss

```scss
html, body {
  height: 100%;
  font-size: $font-size-base;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  height: 100%;
}
```

### 24. src/styles/tiny-theme.scss

```scss
:root {
  // Opentiny 主题定制，根据官网主题配置覆盖 CSS 变量
}
```

### 25. src/styles/index.scss

```scss
@import './normalize.scss';
@import './var.scss';
@import './common.scss';
@import './tiny-theme.scss';
```

### 26. src/pages/index.vue

```vue
<template>
  <div>
    <h1>{{ $t('common.hello') }}</h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
```

### 27. src/@types/api.d.ts

```typescript
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
```

### 28. src/@types/router.d.ts

```typescript
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
  }
}
```

### 29. src/@types/store.d.ts

```typescript
export type RootState = ReturnType<typeof import('@/store').useAppStore>
```

### 30. src/@types/global.d.ts

```typescript
declare global {
  interface Window {
    __APP_VERSION__: string
  }
}

export {}
```

### 31. src/@types/index.ts

```typescript
export type {}
```

### 32. src/utils/constants.ts

```typescript
export const TOKEN_KEY = 'token'
export const LANG_KEY = 'lang'
export const PAGE_SIZE = 10
```

### 33. src/utils/storage.ts

```typescript
export function getItem<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch {
    return null
  }
}

export function setItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key: string): void {
  localStorage.removeItem(key)
}
```

### 34. src/utils/validate.ts

```typescript
export function isPhone(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isNotEmpty(value: string): boolean {
  return value !== undefined && value !== null && value.trim() !== ''
}
```

### 35. src/utils/format.ts

```typescript
export function formatDate(date: Date | string, format = 'YYYY-MM-DD'): string {
  const d = new Date(date)
  const map: Record<string, number> = {
    'YYYY': d.getFullYear(),
    'MM': d.getMonth() + 1,
    'DD': d.getDate(),
    'HH': d.getHours(),
    'mm': d.getMinutes(),
    'ss': d.getSeconds(),
  }
  let result = format
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(key, String(value).padStart(2, '0'))
  }
  return result
}

export function formatMoney(amount: number, currency = '¥'): string {
  return `${currency}${amount.toFixed(2)}`
}
```

### 36. src/utils/helpers.ts

```typescript
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

### 37. src/utils/index.ts

```typescript
export * from './constants'
export * from './storage'
export * from './validate'
export * from './format'
export * from './helpers'
```

### 38. 安装依赖 & 验证

```bash
npm install
```

安装完成后执行 `npm run dev` 确认无报错。
