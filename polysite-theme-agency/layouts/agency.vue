<script setup lang="ts">
// Site chrome for the Agency (example) theme: a sticky header with a menu that folds into a panel on phones, then the
// page, the share buttons and a roomy footer. Everything an editor can set (name, logo, menu, footer, social links,
// colours) arrives through useSiteBranding(); only fixed words ("Menu", "Skip to content") are written here.
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks, socialIcons } = useSiteBranding(site);

// The phone menu closes when the visitor follows a link (a layout is not re-created between pages).
const menuOpen = ref(false);
const router = useRouter();
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  },
);
// The last menu item that points at a contact page is drawn as the header's button.
const isCta = (href: string) => /contact/i.test(href);
</script>

<template>
  <div class="site-shell theme-agency" :style="brandVars">
    <a href="#content" class="ag-skip">{{ t("agency.skip", "Skip to content") }}</a>

    <header class="ag-header">
      <div class="ag-wrap ag-header__bar">
        <NuxtLink :to="localePath('/')" class="ag-brand" :aria-label="siteName">
          <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="ag-brand__logo" >
          <template v-else>
            <span class="ag-brand__mark" aria-hidden="true" />
            <span class="ag-brand__name">{{ siteName }}</span>
          </template>
        </NuxtLink>

        <button
          type="button"
          class="ag-menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="ag-menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="20" aria-hidden="true" />
          <span class="ag-menu-toggle__label">{{ t("agency.menu", "Menu") }}</span>
        </button>

        <div id="ag-menu" class="ag-header__panel" :class="{ 'is-open': menuOpen }">
          <nav class="ag-nav" :aria-label="t('agency.mainNav', 'Main')">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              :to="localePath(item.href)"
              class="ag-nav__link"
              :class="{ 'ag-nav__link--cta': isCta(item.href) }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="ag-header__tools">
            <SiteSlot name="search" class="ag-header-search" />
            <SiteSlot name="language-switcher" />
          </div>
        </div>
      </div>
    </header>

    <div id="content" tabindex="-1" class="ag-content">
      <slot />
    </div>

    <SiteSlot name="share" class="ag-share" />

    <footer class="ag-footer">
      <div class="ag-wrap">
        <div class="ag-footer__top">
          <div class="ag-footer__about">
            <p class="ag-footer__name">{{ siteName }}</p>
            <p v-if="tagline" class="ag-footer__tagline">{{ tagline }}</p>
            <ul v-if="socialLinks.length" class="ag-social">
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" :aria-label="`${s.platform} (demo link)`" class="ag-social__link">
                  <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="18" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <nav v-for="col in footerColumns" :key="col.heading" class="ag-footer__col" :aria-label="col.heading">
            <h2 class="ag-footer__heading">{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)" class="ag-footer__link">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <p class="ag-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ t("agency.demo", "A fictional example site.") }}
          <TrackingSettingsLink class="ag-footer__link" />
        </p>
      </div>
    </footer>
  </div>
</template>
