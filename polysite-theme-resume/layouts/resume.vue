<script setup lang="ts">
// Site chrome for the Resume example theme: a sheet of paper on a grey desk. A document bar on top (file name and a
// "Save as PDF" button that opens the browser's print dialog, where the print stylesheet makes a clean CV), then the name
// and role, a plain menu, the page, and a small footer. Everything editors set per site arrives through useSiteBranding().
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks } = useSiteBranding(site);

const fileName = computed(() => `${siteName.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "cv"}-cv.pdf`);
const printPage = () => window.print();
// The name is the page title on the home page; inner pages have their own title.
const router = useRouter();
const isHome = computed(() => router.currentRoute.value.path === localePath("/"));
</script>

<template>
  <div class="site-shell theme-resume" :style="brandVars">
    <a class="rs-skip" href="#rs-main">{{ t("resume.skip", "Skip to content") }}</a>

    <div class="rs-sheet">
      <header class="rs-top">
      <div class="rs-doc">
        <img v-if="site?.logo?.url" :src="site.logo.url" alt="" class="rs-doc__icon" width="24" height="24">
        <span v-else class="rs-doc__icon rs-doc__icon--plain" aria-hidden="true" />
        <span class="rs-doc__file">{{ fileName }}</span>
        <button type="button" class="rs-doc__button" @click="printPage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
          {{ t("resume.save", "Save as PDF") }}
        </button>
      </div>

      <div class="rs-header">
        <component :is="isHome ? 'h1' : 'p'" class="rs-name"><NuxtLink :to="localePath('/')" class="rs-name__link">{{ siteName }}</NuxtLink></component>
        <p v-if="tagline" class="rs-role">{{ tagline }}</p>
        <div class="rs-bar">
          <nav class="rs-nav" :aria-label="t('resume.main', 'Main')">
            <ul class="rs-nav__list">
              <li v-for="item in navItems" :key="item.label">
                <NuxtLink :to="localePath(item.href)" class="rs-nav__link">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
          <SiteSlot name="search" class="rs-search" />
          <SiteSlot name="language-switcher" class="rs-languages" />
        </div>
      </div>
      </header>

      <div id="rs-main" tabindex="-1">
        <slot />
      </div>

      <SiteSlot name="share" class="rs-share" />

      <footer class="rs-footer">
        <div v-for="col in footerColumns" :key="col.heading" class="rs-footer__column">
          <h2 class="rs-footer__heading">{{ col.heading }}</h2>
          <ul>
            <li v-for="l in col.links ?? []" :key="l.label"><NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink></li>
          </ul>
        </div>
        <div v-if="socialLinks.length" class="rs-footer__column">
          <h2 class="rs-footer__heading">{{ t("resume.online", "Online") }}</h2>
          <ul>
            <li v-for="s in socialLinks" :key="s.platform"><a :href="s.url">{{ s.platform }}</a></li>
          </ul>
        </div>
        <p class="rs-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}
          <TrackingSettingsLink class="rs-footer__tracking" />
        </p>
      </footer>
    </div>
  </div>
</template>
