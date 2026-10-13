<script setup lang="ts">
// Site chrome for the example "Blog" theme: an editorial masthead, a single reading column and a quiet footer.
// Everything an editor sets per site (name, tagline, menu, footer, social links) arrives through useSiteBranding().
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const router = useRouter();
const { siteName, tagline, brandVars, navItems, footerColumns, socialLinks } = useSiteBranding(site);
const socialNames: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", x: "X", tiktok: "TikTok", linkedin: "LinkedIn", other: "Elsewhere" };

// Reading time for an article. The posts plugin draws the article and knows nothing about it, so it is worked out in the
// browser from the words on the page and handed to the stylesheet as an attribute (the text is drawn by CSS, so the markup
// Vue manages is never touched and hydration is not affected).
function markReadingTime() {
  const body = document.querySelector(".poly-post-body");
  const meta = document.querySelector(".poly-post-meta");
  if (!body || !meta) return;
  const words = (body.textContent ?? "").trim().split(/\s+/).filter(Boolean).length;
  meta.setAttribute("data-reading", t("blog.readingTime", "{n} min read", { n: Math.max(1, Math.round(words / 220)) }));
}
onMounted(() => nextTick(markReadingTime));
watch(
  () => router.currentRoute.value.fullPath,
  () => setTimeout(markReadingTime, 60),
);
</script>

<template>
  <div class="site-shell theme-blog" :style="brandVars">
    <a class="blog-skip" href="#content">{{ t("blog.skip", "Skip to the writing") }}</a>
    <div class="blog-page">
      <header class="blog-masthead">
        <div class="blog-masthead__top">
          <NuxtLink :to="localePath('/')" class="blog-brand">
            <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="blog-brand__logo" >
            <span v-else class="blog-brand__name">{{ siteName }}</span>
          </NuxtLink>
          <p v-if="tagline" class="blog-tagline">{{ tagline }}</p>
        </div>
        <div class="blog-masthead__bar">
          <nav class="blog-nav" :aria-label="t('blog.menu', 'Main menu')">
            <NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)">{{ item.label }}</NuxtLink>
          </nav>
          <div class="blog-tools">
            <SiteSlot name="search" class="blog-search" />
            <SiteSlot name="language-switcher" class="blog-lang" />
          </div>
        </div>
      </header>

      <div id="content" tabindex="-1" class="blog-content">
        <slot />
      </div>

      <!-- Share buttons under an article (share plugin, "where the theme puts it"); nothing otherwise. -->
      <SiteSlot name="share" class="blog-share" />

      <footer class="blog-footer">
        <div class="blog-footer__grid">
          <p v-if="tagline" class="blog-footer__about">
            <strong>{{ siteName }}</strong><br >
            {{ tagline }}
          </p>
          <div v-for="col in footerColumns" :key="col.heading" class="blog-footer__col">
            <h2>{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links ?? []" :key="l.label">
                <NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="blog-footer__col">
            <h2>{{ t("blog.elsewhere", "Elsewhere") }}</h2>
            <ul>
              <li>
                <a href="/feed.xml" class="blog-rss">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                    <circle cx="3" cy="13" r="1.8" fill="currentColor" />
                    <path d="M2 7.5a6.5 6.5 0 0 1 6.5 6.5M2 2.5A11.5 11.5 0 0 1 13.5 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  {{ t("blog.rss", "RSS feed") }}
                </a>
              </li>
              <li v-for="s in socialLinks" :key="s.platform">
                <a :href="s.url" rel="me" class="blog-social">{{ socialNames[s.platform] ?? s.platform }}</a>
              </li>
            </ul>
          </div>
        </div>
        <p class="blog-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}.
          {{ t("blog.fiction", "A fictional example site.") }}
          <TrackingSettingsLink />
        </p>
      </footer>
    </div>
  </div>
</template>
