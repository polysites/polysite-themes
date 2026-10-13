<script setup lang="ts">
// Site chrome for the Nonprofit (example) theme: a friendly header with a Donate button (shown when the site wants one), the
// page, share buttons and a teal footer with a wavy top edge and a last invitation to give. Editors set the name, logo, menu,
// footer, social links and colours; only fixed words ("Donate", "Menu") are written here and can be translated with useT().
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, showDonateButton, brandVars, navItems, footerColumns, socialLinks, socialIcons } = useSiteBranding(site);

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
  <div class="site-shell theme-nonprofit" :style="brandVars">
    <a href="#content" class="np-skip">{{ t("nonprofit.skip", "Skip to content") }}</a>

    <header class="np-header">
      <div class="np-wrap np-header__bar">
        <NuxtLink :to="localePath('/')" class="np-brand" :aria-label="siteName">
          <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="np-brand__logo" >
          <template v-else>
            <span class="np-brand__mark" aria-hidden="true"><Icon name="lucide:heart-handshake" size="22" /></span>
            <span class="np-brand__text">
              <span class="np-brand__name">{{ siteName }}</span>
              <span v-if="tagline" class="np-brand__tagline">{{ tagline }}</span>
            </span>
          </template>
        </NuxtLink>

        <button
          type="button"
          class="np-menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="np-menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="20" aria-hidden="true" />
          <span>{{ t("nonprofit.menu", "Menu") }}</span>
        </button>

        <div id="np-menu" class="np-header__panel" :class="{ 'is-open': menuOpen }">
          <nav class="np-nav" :aria-label="t('nonprofit.mainNav', 'Main')">
            <NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)" class="np-nav__link">
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="np-header__tools">
            <SiteSlot name="search" class="np-header-search" />
            <SiteSlot name="language-switcher" />
            <NuxtLink v-if="showDonateButton" :to="localePath('/donate')" class="np-button np-button--donate">
              <Icon name="lucide:heart" size="18" aria-hidden="true" />
              {{ t("nonprofit.donate", "Donate") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div id="content" tabindex="-1" class="np-content">
      <slot />
    </div>

    <SiteSlot name="share" class="np-share" />

    <footer class="np-footer">
      <div class="np-wrap">
        <div v-if="showDonateButton" class="np-footer__give">
          <p class="np-footer__give-text">{{ t("nonprofit.footerGive", "Every gift keeps the lights on and the kettle warm.") }}</p>
          <NuxtLink :to="localePath('/donate')" class="np-button np-button--donate">{{ t("nonprofit.donate", "Donate") }}</NuxtLink>
        </div>
        <div class="np-footer__top">
          <div>
            <p class="np-footer__name">{{ siteName }}</p>
            <p v-if="tagline" class="np-footer__tagline">{{ tagline }}</p>
            <ul v-if="socialLinks.length" class="np-social">
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" :aria-label="`${s.platform} (demo link)`" class="np-social__link">
                  <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="18" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <nav v-for="col in footerColumns" :key="col.heading" class="np-footer__col" :aria-label="col.heading">
            <h2 class="np-footer__heading">{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)" class="np-footer__link">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <p class="np-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ t("nonprofit.demo", "A fictional example charity.") }}
          <TrackingSettingsLink class="np-footer__link" />
        </p>
      </div>
    </footer>
  </div>
</template>
