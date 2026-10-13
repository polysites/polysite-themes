<script setup lang="ts">
// Site chrome for the example "Help centre" theme: a compact top bar, and on every page but the home page a left sidebar of
// topics built from the site's own menu data (header menu and footer columns). The home page is the full-width landing page.
const site = await useSite();
const localePath = useLocalePath();
const language = useSiteLanguage();
const t = useT();
const { siteName, tagline, brandVars, navItems, footerColumns } = useSiteBranding(site);

const isHome = computed(() => language.path.value === "");
// The last menu item is the contact button; the others are the topics.
const topics = computed(() => (navItems.value.length > 1 ? navItems.value.slice(0, -1) : navItems.value));
const contact = computed(() => (navItems.value.length > 1 ? navItems.value[navItems.value.length - 1] : null));
// The sidebar shows the footer columns after the first (the first is the topics again).
const extraColumns = computed(() => footerColumns.value.slice(1));
</script>

<template>
  <div class="site-shell theme-helpdesk" :style="brandVars">
    <a class="hd-skip" href="#content">{{ t("helpdesk.skip", "Skip to the content") }}</a>
    <div class="hd-page">
      <header class="hd-bar">
        <div class="hd-bar__inner">
          <NuxtLink :to="localePath('/')" class="hd-brand">
            <img v-if="site?.logo?.url" :src="site.logo.url" alt="" width="32" height="32" class="hd-brand__logo" >
            <span class="hd-brand__name">{{ siteName }}</span>
            <span v-if="tagline" class="hd-brand__tag">{{ tagline }}</span>
          </NuxtLink>
          <div class="hd-bar__tools">
            <SiteSlot v-if="!isHome" name="search" class="hd-search hd-search--bar" />
            <SiteSlot name="language-switcher" class="hd-lang" />
            <NuxtLink v-if="contact" :to="localePath(contact.href)" class="hd-button">{{ contact.label }}</NuxtLink>
          </div>
        </div>
      </header>

      <div class="hd-body" :class="{ 'hd-body--home': isHome }">
        <aside v-if="!isHome" class="hd-side" :aria-label="t('helpdesk.topics', 'Help topics')">
          <HelpdeskHdTopics class="hd-side__wide" :topics="topics" :columns="extraColumns" />
          <details class="hd-side__narrow">
            <summary>{{ t("helpdesk.topics", "Help topics") }}</summary>
            <HelpdeskHdTopics :topics="topics" :columns="extraColumns" />
          </details>
        </aside>
        <div id="content" tabindex="-1" class="hd-content">
          <slot />
          <SiteSlot name="share" class="hd-share" />
        </div>
      </div>

      <footer class="hd-footer">
        <div class="hd-footer__inner">
          <p class="hd-footer__about">
            <strong>{{ siteName }}</strong>
            <span v-if="tagline"> &middot; {{ tagline }}</span>
          </p>
          <ul v-for="col in footerColumns" :key="col.heading" class="hd-footer__links" :aria-label="col.heading">
            <li v-for="l in col.links ?? []" :key="l.label"><NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink></li>
          </ul>
          <p class="hd-footer__legal">
            &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ t("helpdesk.fiction", "A fictional example site.") }}
            <TrackingSettingsLink />
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
