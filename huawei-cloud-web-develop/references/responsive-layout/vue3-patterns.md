# Vue 3 响应式实现细节

## useViewport composable（推荐）

- 基于 `window.matchMedia`，与断点体系一致，返回：

| 返回值 | 类型 | 说明 |
| --- | --- | --- |
| isMobile / isTablet / isDesktop / isWide | Ref<boolean> | 是否命中该断点档（wide ≥ 1536px） |
| breakpoint | Ref<string> | 当前档位：mobile / tablet / desktop / wide |
| isTouch | Ref<boolean> | 是否触屏（pointer: coarse） |

- 在 `onMounted` 注册监听、`onBeforeUnmount` 移除，避免泄漏。
- SSR/Nuxt：mounted 前无 matchMedia，初始值兜底为桌面布局。

```js
const viewport = useViewport();
watch(() => viewport.isMobile, (mobile) => { /* 切换抽屉导航等 */ });
```

## 布局切换方式

1. 动态 class：`:class="{ 'is-mobile': viewport.isMobile }"` + scoped CSS 覆盖。
2. 动态组件：`<component :is="viewport.isMobile ? MobileNav : DesktopNav" />`。
3. 视口驱动 props：`:cols="viewport.isMobile ? 1 : 3"`。
4. CSS 变量绑定：`:style="{ '--cols': viewport.isMobile ? 1 : 3 }"`，样式用 `var(--cols)`。

## 注意事项

- 优先 CSS 媒体查询解决「样式级」适配；JS 只做「结构性」切换（渲染不同组件），避免 v-if 频繁切换大子树造成抖动。
- 用 matchMedia 的 change 事件即可，不要自行监听 resize 并 debounce。
- 弹层用 `<Teleport to="body">`；移动端抽屉打开时锁定 body 滚动，关闭时恢复。
- scoped 样式 + 媒体查询是成本最低方案；容器查询（`@container`）解决「组件自身宽度」适配，两者勿混用同一条规则。
- 移动端菜单 a11y：打开时聚焦面板，关闭时焦点回到触发按钮，支持 Esc 关闭。
- 旧版 Safari（< 14）MediaQueryList 没有 addEventListener，需要时用 addListener 兜底。
