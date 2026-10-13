<script setup lang="ts">
// Site chrome for the example "Restaurant" theme: a warm header with the language switcher always in view, and a dark olive
// footer. Everything an editor sets per site (name, tagline, menu, footer columns, social links) arrives through
// useSiteBranding(). The layout works with one language or several: the switcher slot draws nothing when the Languages plugin
// is absent or the site offers only one.
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const router = useRouter();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks } = useSiteBranding(site);

const socialNames: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", x: "X", tiktok: "TikTok", linkedin: "LinkedIn", other: "Web" };

// The last menu item is the call to action (reservations) and is drawn as a button.
const links = computed(() => navItems.value.slice(0, -1));
const action = computed(() => (navItems.value.length > 1 ? navItems.value[navItems.value.length - 1] : null));

const menuOpen = ref(false);
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <div class="site-shell theme-restaurant" :style="brandVars">
    <a class="rest-skip" href="#content">{{ t("restaurant.skip", "Skip to the content") }}</a>
    <div class="rest-page">
      <header class="rest-header">
        <div class="rest-header__inner">
          <NuxtLink :to="localePath('/')" class="rest-brand">
            <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="rest-brand__logo" >
            <template v-else>
              <svg class="rest-brand__mark" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
                <path d="M16 29C6 22 3 14 6 9c3-4 8-3 10 1c2-4 7-5 10-1c3 5 0 13-10 20z" fill="currentColor" />
                <path d="M16 12v14M16 18l-5-4M16 21l5-4" stroke="var(--rest-paper)" stroke-width="1.6" stroke-linecap="round" fill="none" />
              </svg>
              <span class="rest-brand__text">
                <span class="rest-brand__name">{{ siteName }}</span>
                <span v-if="tagline" class="rest-brand__tag">{{ tagline }}</span>
              </span>
            </template>
          </NuxtLink>

          <SiteSlot name="language-switcher" class="rest-lang" />

          <button
            type="button"
            class="rest-burger"
            :aria-expanded="menuOpen"
            aria-controls="rest-nav"
            @click="menuOpen = !menuOpen"
          >
            {{ menuOpen ? t("restaurant.closeMenu", "Close") : t("restaurant.menu", "Menu") }}
          </button>

          <div id="rest-nav" class="rest-navwrap" :class="{ 'is-open': menuOpen }">
            <nav class="rest-nav" :aria-label="t('restaurant.menuLabel', 'Main menu')">
              <NuxtLink v-for="item in links" :key="item.label" :to="localePath(item.href)">{{ item.label }}</NuxtLink>
              <NuxtLink v-if="action" :to="localePath(action.href)" class="rest-button">{{ action.label }}</NuxtLink>
            </nav>
          </div>
        </div>
      </header>

      <div id="content" tabindex="-1" class="rest-content">
        <slot />
      </div>

      <SiteSlot name="share" class="rest-share" />

      <footer class="rest-footer">
        <div class="rest-footer__grid">
          <div class="rest-footer__about">
            <p class="rest-footer__name">{{ siteName }}</p>
            <p v-if="tagline">{{ tagline }}</p>
            <SiteSlot name="search" class="rest-search" />
          </div>
          <div v-for="col in footerColumns" :key="col.heading" class="rest-footer__col">
            <h2>{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="socialLinks.length" class="rest-footer__col">
            <h2>{{ t("restaurant.follow", "Follow us") }}</h2>
            <ul>
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" rel="me">{{ socialNames[s.platform] ?? s.platform }}</a>
              </li>
            </ul>
          </div>
        </div>
        <p class="rest-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}.
          {{ t("restaurant.fiction", "A fictional example site.") }}
          <TrackingSettingsLink />
        </p>
      </footer>
    </div>
  </div>
</template>
