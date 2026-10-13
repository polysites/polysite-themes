<script setup lang="ts">
// A split hero: a dark olive panel with the words, and the picture beside it. Styled in assets/css/restaurant.css.
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
  <section class="rest-hero">
    <div class="rest-hero__panel">
      <h1>{{ heading }}</h1>
      <p v-if="subheading" class="rest-hero__lede">{{ subheading }}</p>
      <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="rest-button rest-button--light">{{ ctaLabel }}</NuxtLink>
    </div>
    <figure v-if="image?.url" class="rest-hero__art">
      <img :src="image.url" :alt="image.alt || ''" width="960" height="720" >
    </figure>
  </section>
</template>
