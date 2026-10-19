<script setup lang="ts">
// The rail beside inner pages: take-action card, quick gifts, riding finder and the latest news (when the posts plugin is there).
// The news is read straight from the CMS like the posts plugin does, and fails quietly into an empty list.
const t = useT();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const hostname = useRequestURL().hostname;
const base = import.meta.server ? config.apiBaseInternal : config.public.apiBase;
const { data: latest } = await useFetch<{ docs?: Array<{ title?: string; slug?: string; publishedAt?: string }> }>(`${base}/posts`, {
  key: `pt-rail-${hostname}`,
  query: {
    "where[and][0][site.domain][equals]": hostname,
    "where[and][1][_status][equals]": "published",
    sort: "-publishedAt",
    limit: 5,
    depth: 0,
    "select[title]": true,
    "select[slug]": true,
    "select[publishedAt]": true,
  },
  default: () => ({ docs: [] }),
});
const news = computed(() => latest.value?.docs ?? []);
const day = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" }) : "");
const riding = ref("");
const router = useRouter();
function findRiding() {
  router.push({ path: localePath("/find-your-riding"), query: riding.value ? { postal: riding.value } : {} });
}
</script>

<template>
  <aside class="pt-rail" :aria-label="t('party.rail', 'Take action')">
    <section class="pt-card pt-card--action">
      <h2>{{ t("party.railAct", "Take action") }}</h2>
      <ul>
        <li><NuxtLink :to="localePath('/petitions')">{{ t("party.railPetitions", "Sign a petition") }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/pledges')">{{ t("party.railPledges", "Add your name to a pledge") }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/surveys')">{{ t("party.railSurveys", "Take the member survey") }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/volunteer')">{{ t("party.railVolunteer", "Volunteer near you") }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/events')">{{ t("party.railEvents", "Come to an event") }}</NuxtLink></li>
      </ul>
    </section>

    <section class="pt-card">
      <h2>{{ t("party.railGive", "Chip in") }}</h2>
      <div class="pt-amounts">
        <NuxtLink v-for="a in [5, 10, 25, 50]" :key="a" :to="localePath('/donate')" class="pt-amount">${{ a }}</NuxtLink>
      </div>
      <NuxtLink :to="localePath('/monthly-giving')" class="pt-link">{{ t("party.railMonthly", "Give monthly instead") }}</NuxtLink>
    </section>

    <section class="pt-card">
      <h2>{{ t("party.railRiding", "Find your riding") }}</h2>
      <form class="pt-riding" @submit.prevent="findRiding">
        <label for="pt-postal" class="pt-sr">{{ t("party.postal", "Postal code") }}</label>
        <input id="pt-postal" v-model="riding" type="text" autocomplete="postal-code" :placeholder="t('party.postal', 'Postal code')" maxlength="7" >
        <button type="submit" class="np-button">{{ t("party.go", "Go") }}</button>
      </form>
    </section>

    <section v-if="news.length" class="pt-card">
      <h2>{{ t("party.railNews", "Latest news") }}</h2>
      <ul class="pt-news">
        <li v-for="p in news" :key="p.slug">
          <NuxtLink :to="localePath(`/news/${p.slug}`)">{{ p.title }}</NuxtLink>
          <time :datetime="p.publishedAt">{{ day(p.publishedAt) }}</time>
        </li>
      </ul>
      <NuxtLink :to="localePath('/news')" class="pt-link">{{ t("party.railAllNews", "All news") }}</NuxtLink>
    </section>
  </aside>
</template>
