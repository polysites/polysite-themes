<script setup lang="ts">
// A statement: huge type, a small line under it, and the picture (if there is one) at full width below.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
const localePath = useLocalePath();
</script>

<template>
  <section class="pf-hero">
    <div class="pf-hero__inner">
      <h1 class="pf-hero__heading">{{ heading }}</h1>
      <div class="pf-hero__meta">
        <p v-if="subheading" class="pf-hero__sub">{{ subheading }}</p>
        <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="pf-link">{{ ctaLabel }}</NuxtLink>
      </div>
    </div>
    <img v-if="image?.url" :src="image.url" :alt="image.alt || ''" class="pf-hero__image" width="1200" height="900">
  </section>
</template>
