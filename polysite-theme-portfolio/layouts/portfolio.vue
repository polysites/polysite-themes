<script setup lang="ts">
// Site chrome for the Portfolio example theme: a wordmark and a plain text menu, then a big closing statement in the footer.
// Everything editors set per site (logo, colours, menu, footer, social links) arrives through useSiteBranding().
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks } = useSiteBranding(site);
</script>

<template>
  <div class="site-shell theme-portfolio" :style="brandVars">
    <a class="pf-skip" href="#pf-main">{{ t("portfolio.skip", "Skip to content") }}</a>

    <header class="pf-header">
      <div class="pf-header__inner">
        <NuxtLink :to="localePath('/')" class="pf-brand">
          <span class="pf-brand__square" aria-hidden="true" />
          <span class="pf-brand__name">{{ siteName }}</span>
        </NuxtLink>
        <nav class="pf-nav" :aria-label="t('portfolio.main', 'Main')">
          <ul class="pf-nav__list">
            <li v-for="item in navItems" :key="item.label">
              <NuxtLink :to="localePath(item.href)" class="pf-nav__link">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <!-- Drawn by the search and languages plugins when a site has them on; nothing otherwise. -->
        <div class="pf-tools">
          <SiteSlot name="search" class="pf-search" />
          <SiteSlot name="language-switcher" class="pf-languages" />
        </div>
      </div>
    </header>

    <div id="pf-main" tabindex="-1">
      <slot />
    </div>

    <SiteSlot name="share" class="pf-share" />

    <footer class="pf-footer">
      <div class="pf-footer__inner">
        <p v-if="tagline" class="pf-footer__statement">{{ tagline }}</p>
        <div class="pf-footer__columns">
          <div v-for="col in footerColumns" :key="col.heading" class="pf-footer__column">
            <h2 class="pf-footer__heading">{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="socialLinks.length" class="pf-footer__column">
            <h2 class="pf-footer__heading">{{ t("portfolio.elsewhere", "Elsewhere") }}</h2>
            <ul>
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url">{{ s.platform }}</a>
              </li>
            </ul>
          </div>
        </div>
        <p class="pf-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}
          <TrackingSettingsLink class="pf-footer__tracking" />
        </p>
      </div>
    </footer>
  </div>
</template>
