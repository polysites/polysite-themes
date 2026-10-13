<script setup lang="ts">
// Site chrome for the Event (example) theme: a thin strip with the site's tagline, a bold header whose last menu link is
// drawn as the ticket button, the page, share buttons and a black footer with the name in huge capitals. Editors set the
// name, logo, menu, footer and colours; only fixed words ("Menu", "Skip to content") are written here.
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
// The menu link that points at tickets (or a registration page) is the header's button.
const isCta = (href: string) => /ticket|register|book|join/i.test(href);
</script>

<template>
  <div class="site-shell theme-event" :style="brandVars">
    <a href="#content" class="ev-skip">{{ t("event.skip", "Skip to content") }}</a>

    <aside v-if="tagline" class="ev-strip" :aria-label="t('event.announcement', 'Announcement')">
      <p class="ev-wrap">{{ tagline }}</p>
    </aside>

    <header class="ev-header">
      <div class="ev-wrap ev-header__bar">
        <NuxtLink :to="localePath('/')" class="ev-brand" :aria-label="siteName">
          <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="ev-brand__logo" >
          <template v-else>
            <span class="ev-brand__sun" aria-hidden="true" />
            <span class="ev-brand__name">{{ siteName }}</span>
          </template>
        </NuxtLink>

        <button
          type="button"
          class="ev-menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="ev-menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="22" aria-hidden="true" />
          <span>{{ t("event.menu", "Menu") }}</span>
        </button>

        <div id="ev-menu" class="ev-header__panel" :class="{ 'is-open': menuOpen }">
          <nav class="ev-nav" :aria-label="t('event.mainNav', 'Main')">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              :to="localePath(item.href)"
              class="ev-nav__link"
              :class="{ 'ev-nav__link--cta': isCta(item.href) }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
          <div class="ev-header__tools">
            <SiteSlot name="search" class="ev-header-search" />
            <SiteSlot name="language-switcher" />
          </div>
        </div>
      </div>
    </header>

    <div id="content" tabindex="-1" class="ev-content">
      <slot />
    </div>

    <SiteSlot name="share" class="ev-share" />

    <footer class="ev-footer">
      <div class="ev-wrap">
        <p class="ev-footer__big" aria-hidden="true">{{ siteName }}</p>
        <div class="ev-footer__top">
          <div>
            <p class="ev-footer__name">{{ siteName }}</p>
            <p v-if="tagline" class="ev-footer__tagline">{{ tagline }}</p>
            <ul v-if="socialLinks.length" class="ev-social">
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" :aria-label="`${s.platform} (demo link)`" class="ev-social__link">
                  <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="20" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <nav v-for="col in footerColumns" :key="col.heading" class="ev-footer__col" :aria-label="col.heading">
            <h2 class="ev-footer__heading">{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)" class="ev-footer__link">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <p class="ev-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ t("event.demo", "A fictional example event.") }}
          <TrackingSettingsLink class="ev-footer__link" />
        </p>
      </div>
    </footer>
  </div>
</template>
