<script setup lang="ts">
// Site chrome for the Party (example) theme: a utility bar, a sticky header with Join and Donate, a dismissible banner, a side
// rail beside every page except the front page, a once-per-visit pop-up and a footer with the authorization line. Editors set the
// name, logo, menu, footer, social links and colours; the fixed words are written here and can be translated with useT().
const site = await useSite();
const localePath = useLocalePath();
const t = useT();
const route = useRoute();
const { siteName, tagline, showDonateButton, brandVars, navItems, footerColumns, socialLinks, socialIcons } = useSiteBranding(site);

const menuOpen = ref(false);
const bannerOpen = ref(true);
const router = useRouter();
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  },
);
const withRail = computed(() => route.path !== "/" && !route.path.startsWith("/search"));
// Calls to action such as #petition, #pledge and #rsvp point at the page's form, which has no id of its own.
const FORM_ANCHORS = ['#petition', '#pledge', '#rsvp'];
function goToForm() {
  nextTick(() => {
    const form = document.querySelector('#content form:not(.pt-riding)') as HTMLElement | null;
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    (form?.querySelector('input, textarea, select') as HTMLElement | null)?.focus({ preventScroll: true });
  });
}
function onAnchorClick(e: MouseEvent) {
  const a = (e.target as HTMLElement | null)?.closest?.('a');
  if (a && FORM_ANCHORS.some((h) => a.getAttribute('href')?.endsWith(h)) && new URL(a.href).pathname === route.path) {
    e.preventDefault();
    goToForm();
  }
}
onMounted(() => {
  document.addEventListener('click', onAnchorClick);
  if (FORM_ANCHORS.includes(route.hash)) setTimeout(goToForm, 400);
});
onBeforeUnmount(() => document.removeEventListener('click', onAnchorClick));
watch(() => route.fullPath, () => FORM_ANCHORS.includes(route.hash) && setTimeout(goToForm, 400));
const popupAllowed = computed(() => !route.path.startsWith("/donate") && !route.path.startsWith("/join"));
</script>

<template>
  <div class="site-shell theme-nonprofit theme-party" :style="brandVars">
    <a href="#content" class="np-skip">{{ t("party.skip", "Skip to content") }}</a>

    <div class="pt-utility">
      <div class="np-wrap pt-utility__bar">
        <p class="pt-utility__note">{{ t("party.fictional", "A fictional party, built to demonstrate Polysite") }}</p>
        <nav class="pt-utility__links" :aria-label="t('party.utilityNav', 'Quick links')">
          <NuxtLink :to="localePath('/find-your-riding')">{{ t("party.riding", "Find your riding") }}</NuxtLink>
          <NuxtLink :to="localePath('/volunteer')">{{ t("party.volunteer", "Volunteer") }}</NuxtLink>
          <NuxtLink :to="localePath('/press-room')">{{ t("party.press", "Press room") }}</NuxtLink>
          <SiteSlot name="language-switcher" />
        </nav>
      </div>
    </div>

    <header class="np-header pt-header">
      <div class="np-wrap np-header__bar">
        <NuxtLink :to="localePath('/')" class="np-brand" :aria-label="siteName">
          <img v-if="site?.logo?.url" :src="site.logo.url" :alt="siteName" class="np-brand__logo" >
          <template v-else>
            <span class="np-brand__mark" aria-hidden="true"><Icon name="lucide:landmark" size="22" /></span>
            <span class="np-brand__text">
              <span class="np-brand__name">{{ siteName }}</span>
              <span v-if="tagline" class="np-brand__tagline">{{ tagline }}</span>
            </span>
          </template>
        </NuxtLink>

        <button type="button" class="np-menu-toggle" :aria-expanded="menuOpen" aria-controls="np-menu" @click="menuOpen = !menuOpen">
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="20" aria-hidden="true" />
          <span>{{ t("party.menu", "Menu") }}</span>
        </button>

        <div id="np-menu" class="np-header__panel" :class="{ 'is-open': menuOpen }">
          <nav class="np-nav" :aria-label="t('party.mainNav', 'Main')">
            <NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)" class="np-nav__link">{{ item.label }}</NuxtLink>
          </nav>
          <div class="np-header__tools">
            <SiteSlot name="search" class="np-header-search" />
            <NuxtLink :to="localePath('/join')" class="np-button pt-button--join">{{ t("party.join", "Join") }}</NuxtLink>
            <NuxtLink v-if="showDonateButton" :to="localePath('/donate')" class="np-button np-button--donate">
              <Icon name="lucide:heart" size="18" aria-hidden="true" />
              {{ t("party.donate", "Donate") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div v-if="bannerOpen && route.path !== '/'" class="pt-banner" role="region" :aria-label="t('party.banner', 'Campaign notice')">
      <div class="np-wrap pt-banner__bar">
        <p>
          <strong>{{ t("party.bannerLead", "Add your name.") }}</strong>
          {{ t("party.bannerText", "Forty thousand people have signed this week's petitions.") }}
          <NuxtLink :to="localePath('/petitions')">{{ t("party.bannerLink", "See the petitions") }}</NuxtLink>
        </p>
        <button type="button" class="pt-banner__close" :aria-label="t('party.close', 'Close')" @click="bannerOpen = false">
          <Icon name="lucide:x" size="18" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div id="content" tabindex="-1" class="np-content" :class="{ 'pt-with-rail': withRail }">
      <div class="pt-main"><slot /></div>
      <PartySideRail v-if="withRail" />
    </div>

    <SiteSlot name="share" class="np-share" />

    <footer class="np-footer">
      <div class="np-wrap">
        <div v-if="showDonateButton" class="np-footer__give">
          <p class="np-footer__give-text">{{ t("party.footerGive", "Run by people, not by corporations. Chip in what you can.") }}</p>
          <NuxtLink :to="localePath('/donate')" class="np-button np-button--donate">{{ t("party.donate", "Donate") }}</NuxtLink>
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
        <p class="pt-authorized">{{ t("party.authorized", "Authorized by the Chief Agent of the Common Ground Party. A fictional party: no real organisation, person or election is represented.") }}</p>
        <p class="np-footer__legal">
          &copy; {{ new Date().getFullYear() }} {{ siteName }}.
          <TrackingSettingsLink class="np-footer__link" />
        </p>
      </div>
    </footer>

    <PartyPopup v-if="popupAllowed" />
  </div>
</template>
