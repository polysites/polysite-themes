<script setup lang="ts">
// The home page's opening: words on the left, the picture in an arch on the right. On a phone the picture comes first.
// Styled in assets/css/salon.css (.salon-hero*).
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
  <section class="salon-hero" :class="{ 'salon-hero--no-image': !image?.url }">
    <div class="salon-hero__inner">
      <div class="salon-hero__text">
        <h1 class="salon-hero__heading">{{ heading }}</h1>
        <p v-if="subheading" class="salon-hero__sub">{{ subheading }}</p>
        <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="salon-button">{{ ctaLabel }}</NuxtLink>
      </div>
      <div v-if="image?.url" class="salon-hero__art">
        <img :src="image.url" :alt="image.alt || ''" class="salon-hero__image" width="800" height="1000" fetchpriority="high">
      </div>
    </div>
  </section>
</template>
