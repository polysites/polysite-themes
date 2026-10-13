<script setup lang="ts">
// Site chrome for the Shop (example) theme: a striped awning, a centred name, a calm menu, the page, share buttons and a
// kraft-paper footer. A catalogue site has no cart and no checkout, so there is no Donate or basket button: visitors are
// invited to visit or to send an enquiry (that is a menu item an editor adds). Editors set the name, logo, menu, footer,
// social links and colours; only fixed words ("Menu", "Skip to content") are written here.
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks, socialIcons } = useSiteBranding(site);

const menuOpen = ref(false);
const router = useRouter();
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <div class="site-shell theme-shop" :style="brandVars">
    <a href="#content" class="sh-skip">{{ t("shop.skip", "Skip to content") }}</a>

    <div class="sh-awning" aria-hidden="true" />

    <header class="sh-header">
      <div class="sh-wrap sh-header__bar">
        <NuxtLink :to="localePath('/')" class="sh-brand" :aria-label="siteName">
          <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="sh-brand__logo" >
          <template v-else>
            <span class="sh-brand__name">{{ siteName }}</span>
            <span v-if="tagline" class="sh-brand__tagline">{{ tagline }}</span>
          </template>
        </NuxtLink>

        <button
          type="button"
          class="sh-menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="sh-menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="20" aria-hidden="true" />
          <span>{{ t("shop.menu", "Menu") }}</span>
        </button>

        <div id="sh-menu" class="sh-header__panel" :class="{ 'is-open': menuOpen }">
          <nav class="sh-nav" :aria-label="t('shop.mainNav', 'Main')">
            <NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)" class="sh-nav__link">
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="sh-header__tools">
            <SiteSlot name="search" class="sh-header-search" />
            <SiteSlot name="language-switcher" />
          </div>
        </div>
      </div>
    </header>

    <div id="content" tabindex="-1" class="sh-content">
      <slot />
    </div>

    <SiteSlot name="share" class="sh-share" />

    <footer class="sh-footer">
      <div class="sh-wrap">
        <div class="sh-footer__top">
          <div class="sh-footer__about">
            <p class="sh-footer__name">{{ siteName }}</p>
            <p v-if="tagline" class="sh-footer__tagline">{{ tagline }}</p>
            <ul v-if="socialLinks.length" class="sh-social">
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" :aria-label="`${s.platform} (demo link)`" class="sh-social__link">
                  <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="18" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <nav v-for="col in footerColumns" :key="col.heading" class="sh-footer__col" :aria-label="col.heading">
            <h2 class="sh-footer__heading">{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)" class="sh-footer__link">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <p class="sh-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ t("shop.demo", "A fictional example shop.") }}
          <TrackingSettingsLink class="sh-footer__link" />
        </p>
      </div>
    </footer>
  </div>
</template>
