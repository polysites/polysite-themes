<script setup lang="ts">
// Site chrome (header, navigation and footer) for this theme.
//
// Edit the markup and classes freely. Everything editors can set per site (logo,
// colors, fonts, navigation, footer, social links) arrives through
// useSiteBranding(), so don't hard-code those here.
//
// The root element carries `theme-starter`, the class assets/css/starter.css
// uses to scope this theme's design tokens.
const site = await useSite();
// Links keep the visitor's language (a no-op on a site with one language).
const localePath = useLocalePath();
const { siteName, tagline, showDonateButton, brandVars, navItems, footerColumns, socialLinks, socialIcons } =
  useSiteBranding(site);
</script>

<template>
  <div class="site-shell theme-starter min-h-screen bg-white text-neutral-900" :style="brandVars">
    <header class="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 px-4 py-4 sm:px-8">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="h-8 w-auto" >
        <span v-else class="text-lg font-bold text-[var(--brand-primary)]">{{ siteName }}</span>
        <span v-if="tagline" class="hidden text-sm text-neutral-500 sm:inline">{{ tagline }}</span>
      </NuxtLink>
      <nav class="flex flex-wrap items-center gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="localePath(item.href)"
          class="text-sm font-medium text-neutral-700 hover:text-[var(--brand-primary)]"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          v-if="showDonateButton"
          :to="localePath('/donate')"
          class="rounded-full bg-[var(--brand-primary)] px-4 py-1.5 text-sm font-bold text-white hover:opacity-90"
        >
          Donate
        </NuxtLink>
      </nav>
      <!-- Filled by the search plugin when a site has search on, otherwise nothing at all. The class lands on the plugin's <form>
           and is styled in assets/css/starter.css. -->
      <SiteSlot name="search" class="starter-header-search" />
      <!-- Filled by the i18n plugin when a site offers more than one language; empty otherwise. -->
      <SiteSlot name="language-switcher" />
    </header>

    <slot />

    <!-- Inline share buttons (share plugin, placement "where the theme puts it"); nothing otherwise. The class lands on the
         plugin's <nav> and is styled in assets/css/starter.css. -->
    <SiteSlot name="share" class="starter-share" />

    <footer class="border-t border-neutral-200 bg-neutral-50 px-4 py-10 sm:px-8">
      <div class="mx-auto flex max-w-[var(--poly-container,64rem)] flex-wrap items-start justify-between gap-8">
        <div v-for="col in footerColumns" :key="col.heading">
          <h4 class="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">{{ col.heading }}</h4>
          <ul class="flex flex-col gap-1.5 text-sm">
            <li v-for="l in col.links ?? []" :key="l.label">
              <NuxtLink :to="localePath(l.href)" class="text-neutral-700 hover:text-[var(--brand-primary)]">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex gap-3">
          <a
            v-for="s in socialLinks"
            :key="s.platform"
            :href="s.url"
            :aria-label="`${s.platform} (demo link)`"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 hover:bg-[var(--brand-primary)] hover:text-white"
          >
            <Icon :name="socialIcons[s.platform] ?? 'lucide:link'" size="14" />
          </a>
        </div>
      </div>
      <p class="mx-auto mt-8 max-w-[var(--poly-container,64rem)] text-xs text-neutral-400">
        &copy; {{ new Date().getFullYear() }} {{ siteName }}
        <TrackingSettingsLink class="ms-3" />
      </p>
    </footer>
  </div>
</template>
