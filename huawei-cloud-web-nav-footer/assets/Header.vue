<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  // [[label, href, pageKey], ...] — rendered as desktop + mobile nav links
  navLinks: { type: Array, default: () => [] },
  // Key of the current page; matched against navLinks entries to highlight
  activePage: { type: String, default: "" },
  // Logo image URL; relative paths resolve against Vite BASE_URL
  logoUrl: { type: String, default: "assets/huaweicloud-logo.svg" },
  // Optional brand text shown next to the logo
  brandText: { type: String, default: "" },
  // Brand/home link target
  homeHref: { type: String, default: "index.html" },
  // Show the black "中国站" top bar
  showSiteBar: { type: Boolean, default: true }
});

const BASE = import.meta.env.BASE_URL;

const resolveUrl = (url) => {
  if (!url) return "";
  return /^(https?:)?\/\//.test(url) || url.startsWith("/") ? url : BASE + url;
};

const logoSrc = computed(() => resolveUrl(props.logoUrl));
const homeUrl = computed(() => resolveUrl(props.homeHref));
const hasNav = computed(() => props.navLinks.length > 0);

const siteDropdownOpen = ref(false);
const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

const handleClickOutside = (e) => {
  if (!e.target.closest(".site-info-inner")) {
    siteDropdownOpen.value = false;
  }
  if (
    showMobileMenu.value &&
    !e.target.closest(".mobile-menu-panel") &&
    !e.target.closest(".navbar-hamburger-btn")
  ) {
    showMobileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="navbar-wrapper">
    <!-- 中国站站点信息栏 -->
    <div v-if="showSiteBar" class="site-info-bar">
      <div class="site-info-inner">
        <div
          class="site-selector"
          @mouseenter="siteDropdownOpen = true"
          @mouseleave="siteDropdownOpen = false"
        >
          <svg class="site-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.2" />
            <ellipse cx="10" cy="10" rx="4" ry="8" stroke="currentColor" stroke-width="1.2" />
            <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1.2" />
            <path d="M3.5 6.5h13M3.5 13.5h13" stroke="currentColor" stroke-width="1.2" />
          </svg>
          <span class="site-text">中国站</span>
          <svg class="site-arrow" width="8" height="8" viewBox="0 0 10 10" fill="none">
            <path
              d="M2.5 3.75L5 6.25l2.5-2.5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <transition name="dropdown">
          <div
            v-if="siteDropdownOpen"
            class="site-dropdown"
            @mouseenter="siteDropdownOpen = true"
            @mouseleave="siteDropdownOpen = false"
          >
            <div class="site-option active">
              <div class="option-content">
                <span class="option-label">中国站</span>
                <span class="option-sub">
                  <span class="option-indicator"></span>
                  简体中文
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 主导航栏 -->
    <div class="navbar">
      <div class="navbar-inner">
        <div class="navbar-left">
          <a class="navbar-brand" :href="homeUrl" aria-label="首页">
            <img
              class="navbar-logo"
              :src="logoSrc"
              alt=""
              aria-hidden="true"
            />
            <span v-if="brandText" class="navbar-brand-text">{{ brandText }}</span>
          </a>
          <nav v-if="hasNav" class="navbar-nav-links" aria-label="主导航">
            <a
              v-for="[label, href, key] in navLinks"
              :key="href"
              :href="resolveUrl(href)"
              class="nav-link"
              :aria-current="activePage === key ? 'page' : undefined"
            >{{ label }}</a>
          </nav>
        </div>

        <div v-if="hasNav" class="navbar-actions">
          <button
            class="navbar-hamburger-btn"
            :class="{ active: showMobileMenu }"
            :aria-expanded="showMobileMenu"
            aria-label="菜单"
            @click.stop="toggleMobileMenu"
          >
            <svg v-if="!showMobileMenu" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="mobile-menu-panel">
      <div v-if="showMobileMenu && hasNav" class="mobile-menu-panel">
        <nav class="mobile-menu-content" aria-label="移动端主导航">
          <a
            v-for="[label, href, key] in navLinks"
            :key="href"
            :href="resolveUrl(href)"
            class="mobile-menu-link"
            :class="{ active: activePage === key }"
            @click="closeMobileMenu"
          >{{ label }}</a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 9999;
}

/* ===== 中国站站点信息栏 ===== */
.site-info-bar {
  background: #111111;
  height: 24px;
  width: 100%;
}

.site-info-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.site-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.site-selector:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.site-icon {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.site-selector:hover .site-icon {
  color: #ffffff;
}

.site-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
  line-height: 24px;
}

.site-selector:hover .site-text {
  color: #ffffff;
}

.site-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.site-selector:hover .site-arrow {
  color: #ffffff;
}

.site-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 24px;
  width: 160px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  padding: 32px;
  line-height: 32px;
  z-index: 10001;
}

.site-option {
  display: flex;
  align-items: center;
  cursor: default;
  transition: background-color 0.2s ease;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-size: 14px;
  color: #191919;
  font-weight: 600;
  margin-left: 5px;
  line-height: 22px;
}

.option-sub {
  font-size: 14px;
  color: #c7000b;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: -9px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 12px;
}

.option-indicator {
  width: 3px;
  height: 18px;
  margin-right: 5px;
  background-color: #c7000b;
  border-radius: 1.5px;
  flex-shrink: 0;
}

.dropdown-enter-active {
  transition: all 0.3s ease;
}

.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ===== 主导航栏 ===== */
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 9999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 72px;
  gap: 24px;
}

@media (max-width: 375px) {
  .navbar-inner {
    max-width: 100%;
  }

  .site-info-inner {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar-inner {
    max-width: 100%;
    height: 47px;
  }

  .navbar-logo {
    height: 31px;
    width: 88px;
    display: block;
  }

  .site-info-inner {
    max-width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .navbar-inner {
    max-width: 94%;
  }

  .site-info-inner {
    max-width: 94%;
  }
}

@media (min-width: 1025px) and (max-width: 1775px) {
  .navbar-inner {
    max-width: 90%;
  }

  .site-info-inner {
    max-width: 90%;
  }
}

@media (min-width: 1776px) {
  .navbar-inner {
    max-width: 1600px;
  }

  .site-info-inner {
    max-width: 1600px;
  }
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.navbar-logo {
  display: block;
  width: 108px;
  height: 38px;
  object-fit: contain;
}

.navbar-brand-text {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding-left: 12px;
  color: #191919;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid rgba(25, 25, 25, 0.22);
  white-space: nowrap;
}

.navbar-nav-links {
  display: flex;
  align-items: center;
  gap: 48px;
  font-size: 16px;
}

.nav-link {
  color: #8c8c8c;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
  font-weight: 400;
}

.nav-link:hover {
  color: #191919;
}

.nav-link[aria-current="page"] {
  color: #191919;
  font-weight: 600;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.navbar-hamburger-btn {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #8c8c8c;
  transition: all 0.2s ease;
}

.navbar-hamburger-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #191919;
}

.navbar-hamburger-btn.active {
  color: #191919;
}

/* ===== 移动端菜单 ===== */
.mobile-menu-panel {
  position: fixed;
  top: 71px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 9997;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 100vh;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  padding: 8px 0 24px;
}

.mobile-menu-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 14px 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #191919;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.mobile-menu-link:hover {
  background-color: #f5f7fa;
}

.mobile-menu-link.active {
  color: #c7000b;
}

.mobile-menu-link.active::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  background-color: #c7000b;
  border-radius: 1.5px;
}

.mobile-menu-panel-enter-active {
  transition: all 0.3s ease;
}

.mobile-menu-panel-leave-active {
  transition: all 0.2s ease;
}

.mobile-menu-panel-enter-from {
  opacity: 0;
  top: 59px;
}

.mobile-menu-panel-leave-to {
  opacity: 0;
  top: 59px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .site-info-bar {
    display: none;
  }

  .navbar-inner {
    gap: 12px;
    position: relative;
    align-items: center;
    padding: 0 24px;
  }

  .navbar-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .navbar-nav-links {
    display: none;
  }

  .navbar-brand-text {
    min-height: 19px;
    padding-left: 8px;
    font-size: 15px;
  }

  .navbar-hamburger-btn {
    display: flex;
  }

  .mobile-menu-panel {
    top: 47px;
  }

  .mobile-menu-panel-enter-from,
  .mobile-menu-panel-leave-to {
    top: 59px;
  }
}

@media (max-width: 375px) {
  .navbar-inner {
    padding: 0 16px;
  }
}
</style>