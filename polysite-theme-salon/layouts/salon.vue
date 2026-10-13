<script setup lang="ts">
// Site chrome for the Salon example theme: a thin top bar (tagline, search and language switcher), a header with the logo,
// the menu and a booking button, and a deep-plum footer. Everything editors can set per site (logo, colours, menu, footer,
// social links) arrives through useSiteBranding(); nothing about one particular salon is written here.
//
// The LAST item of the header menu is drawn as the booking button, so a site's menu decides where it points.
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks, socialIcons } = useSiteBranding(site);

const menuItems = computed(() => (navItems.value.length > 1 ? navItems.value.slice(0, -1) : navItems.value));
const bookItem = computed(() => (navItems.value.length > 1 ? navItems.value[navItems.value.length - 1] : null));

// State in a layout survives page changes: close the small-screen menu when the route changes.
const menuOpen = ref(false);
const router = useRouter();
watch(() => router.currentRoute.value.fullPath, () => {
  menuOpen.value = false;
});
</script>

<template>
  <div class="site-shell theme-salon" :style="brandVars">
    <a class="salon-skip" href="#salon-main">{{ t("salon.skip", "Skip to content") }}</a>

    <header class="salon-top">
    <div class="salon-topbar">
      <div class="salon-topbar__inner">
        <p v-if="tagline" class="salon-topbar__tagline">{{ tagline }}</p>
        <!-- Filled by the search plugin when a site has search on, and by the languages plugin when a site offers several
             languages; both draw nothing otherwise. The classes land on the plugins' own elements. -->
        <SiteSlot name="search" class="salon-search" />
        <SiteSlot name="language-switcher" class="salon-languages" />
      </div>
    </div>

    <div class="salon-header">
      <div class="salon-header__inner">
        <NuxtLink :to="localePath('/')" class="salon-brand">
          <img v-if="site?.logo?.url" :src="site.logo.url" alt="" class="salon-brand__mark" width="40" height="40">
          <span v-else class="salon-brand__moon" aria-hidden="true" />
          <span class="salon-brand__name">{{ siteName }}</span>
        </NuxtLink>

        <button
          type="button"
          class="salon-menu-button"
          :aria-expanded="menuOpen"
          aria-controls="salon-nav"
          @click="menuOpen = !menuOpen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
          <span>{{ menuOpen ? t("salon.close", "Close") : t("salon.menu", "Menu") }}</span>
        </button>

        <div id="salon-nav" class="salon-nav" :class="{ 'salon-nav--open': menuOpen }">
          <nav :aria-label="t('salon.main', 'Main')">
            <ul class="salon-nav__list">
              <li v-for="item in menuItems" :key="item.label">
                <NuxtLink :to="localePath(item.href)" class="salon-nav__link">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
          <NuxtLink v-if="bookItem" :to="localePath(bookItem.href)" class="salon-book">{{ bookItem.label }}</NuxtLink>
        </div>
      </div>
    </div>
    </header>

    <div id="salon-main" tabindex="-1">
      <slot />
    </div>

    <!-- Inline share buttons (share plugin, "where the theme puts it"); nothing otherwise. -->
    <SiteSlot name="share" class="salon-share" />

    <footer class="salon-footer">
      <div class="salon-footer__inner">
        <div class="salon-footer__about">
          <p class="salon-footer__name">{{ siteName }}</p>
          <p v-if="tagline" class="salon-footer__tagline">{{ tagline }}</p>
          <ul v-if="socialLinks.length" class="salon-footer__social">
            <li v-for="s in socialLinks" :key="s.platform">
              <a :href="s.url" :aria-label="s.platform" class="salon-footer__social-link">
                <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="18" />
              </a>
            </li>
          </ul>
        </div>
        <div v-for="col in footerColumns" :key="col.heading" class="salon-footer__column">
          <h2 class="salon-footer__heading">{{ col.heading }}</h2>
          <ul>
            <li v-for="l in col.links ?? []" :key="l.label">
              <NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <p class="salon-footer__legal">
        &copy; {{ new Date().getFullYear() }} {{ siteName }}
        <TrackingSettingsLink class="salon-footer__tracking" />
      </p>
    </footer>
  </div>
</template>
