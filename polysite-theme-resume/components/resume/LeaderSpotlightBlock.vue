<script setup lang="ts">
// The top of the CV: a small portrait, the person's name and title, and their summary. (The core block is a campaign's
// "leader spotlight"; here it is simply the summary.) The call-to-action link, when set, is a plain link under the summary.
defineProps<{
  photo?: { url?: string; alt?: string } | null;
  name: string;
  title?: string;
  quote: string;
  ctaLabel?: string;
  ctaHref?: string;
}>();
const localePath = useLocalePath();
</script>

<template>
  <section class="rs-summary" :aria-label="name">
    <img v-if="photo?.url" :src="photo.url" :alt="photo.alt || ''" class="rs-summary__photo" width="120" height="120">
    <div class="rs-summary__text">
      <h2 class="rs-summary__name">{{ name }}</h2>
      <p v-if="title" class="rs-summary__title">{{ title }}</p>
      <p class="rs-summary__quote">{{ quote }}</p>
      <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="rs-summary__link">{{ ctaLabel }}</NuxtLink>
    </div>
  </section>
</template>
