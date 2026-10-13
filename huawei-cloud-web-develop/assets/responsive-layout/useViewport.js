// 视口断点监听 composable（Vue 3）
// 用法：const viewport = useViewport()
// 断点体系：mobile < 768px，tablet 768–1279px，desktop 1280–1535px，wide ≥ 1536px
import { ref, onMounted, onBeforeUnmount } from "vue";

const BREAKPOINTS = {
  mobile: "(max-width: 767.98px)",
  tablet: "(min-width: 768px) and (max-width: 1279.98px)",
  desktop: "(min-width: 1280px) and (max-width: 1535.98px)",
  wide: "(min-width: 1536px)",
};

export function useViewport() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);
  const isWide = ref(false);
  const isTouch = ref(false);
  const breakpoint = ref("desktop"); // SSR 兜底：默认桌面布局

  let queries = [];

  function update(name, mql) {
    if (name === "mobile") isMobile.value = mql.matches;
    if (name === "tablet") isTablet.value = mql.matches;
    if (name === "desktop") isDesktop.value = mql.matches;
    if (name === "wide") isWide.value = mql.matches;
    if (mql.matches) breakpoint.value = name;
  }

  function setup() {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    queries = Object.entries(BREAKPOINTS).map(([name, query]) => {
      const mql = window.matchMedia(query);
      const handler = (event) => update(name, event);
      update(name, mql);
      if (mql.addEventListener) {
        mql.addEventListener("change", handler);
      } else if (mql.addListener) {
        mql.addListener(handler); // 旧版 Safari 兜底
      }
      return { mql, handler };
    });
    if (window.matchMedia("(pointer: coarse)").matches) isTouch.value = true;
  }

  function teardown() {
    queries.forEach(({ mql, handler }) => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else if (mql.removeListener) {
        mql.removeListener(handler);
      }
    });
    queries = [];
  }

  onMounted(setup);
  onBeforeUnmount(teardown);

  return { isMobile, isTablet, isDesktop, isWide, isTouch, breakpoint };
}
