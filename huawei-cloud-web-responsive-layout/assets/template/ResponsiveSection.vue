<template>
  <section class="section">
    <header class="section__header">
      <h2 class="section__title">热门活动</h2>
      <!-- 移动端显示筛选按钮，桌面端由 CSS 隐藏 -->
      <button class="section__filter-btn" @click="showFilter = true">筛选</button>
    </header>

    <!-- 移动端抽屉筛选（Teleport 到 body），桌面宽度下自动消失 -->
    <Teleport to="body">
      <div v-if="showFilter && viewport.isMobile" class="drawer" @click.self="showFilter = false">
        <div class="drawer__panel">
          <h3 class="drawer__title">筛选</h3>
          <button class="drawer__close" @click="showFilter = false">关闭</button>
        </div>
      </div>
    </Teleport>

    <!-- 自适应栅格：列数完全由 CSS 决定，无需 JS -->
    <div class="grid">
      <article v-for="item in items" :key="item.id" class="card">
        <img class="card__img" :src="item.img" :alt="item.title" loading="lazy">
        <h3 class="card__title">{{ item.title }}</h3>
        <p class="card__desc">{{ item.desc }}</p>
      </article>
    </div>

    <!-- 视口驱动列数示例：CSS 变量绑定 -->
    <div class="cols-demo" :style="{ '--cols': viewport.isMobile ? 1 : viewport.isTablet ? 2 : viewport.isWide ? 4 : 3 }">
      <div v-for="i in 8" :key="i" class="cols-demo__item">{{ i }}</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useViewport } from "./useViewport";

const viewport = useViewport();
const showFilter = ref(false);
const items = [
  { id: 1, title: "活动一", desc: "案例描述一", img: "/img/a.jpg" },
  { id: 2, title: "活动二", desc: "案例描述二", img: "/img/b.jpg" },
  { id: 3, title: "活动三", desc: "案例描述三", img: "/img/c.jpg" },
];
</script>

<style scoped>
.section { max-width: 1200px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 32px); }
.section__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.section__title { font-size: clamp(20px, 2vw + 14px, 32px); margin: 24px 0 16px; }

/* 卡片栅格：自适应列数，移动端从 1 列起步 */
.grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; min-width: 0; }
.card__img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.card__title { margin: 12px 16px 4px; font-size: 18px; }
.card__desc { margin: 0 16px 16px; color: #64748b; }

/* 视口驱动列数（CSS 变量绑定） */
.cols-demo { display: grid; gap: 8px; grid-template-columns: repeat(var(--cols, 2), 1fr); margin-top: 32px; }
.cols-demo__item { padding: 12px; background: #eef2ff; border-radius: 8px; text-align: center; }

/* 移动端抽屉：底部滑出 + 安全区 */
.drawer { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); z-index: 100; }
.drawer__panel {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  background: #fff; border-radius: 16px 16px 0 0;
}
.drawer__title { margin: 0 0 12px; }
.drawer__close { padding: 10px 16px; border: 0; border-radius: 8px; background: #2563eb; color: #fff; }

/* 筛选按钮：移动端显示，桌面端隐藏（移动优先） */
.section__filter-btn {
  display: inline-flex; padding: 10px 16px; border: 0; border-radius: 8px;
  background: #2563eb; color: #fff; cursor: pointer; min-height: 44px;
}
@media (min-width: 768px) {
  .section__filter-btn { display: none; }
}
</style>
