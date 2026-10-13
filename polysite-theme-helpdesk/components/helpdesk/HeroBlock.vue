<script setup lang="ts">
// The banner of the help centre: a headline and, in the middle of it, the site search (the plugin's `search` slot).
// The picture is decoration only. Without the search plugin the headline stands alone.
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
  <section class="hd-hero">
    <img v-if="image?.url" :src="image.url" alt="" class="hd-hero__art" aria-hidden="true" >
    <div class="hd-hero__inner">
      <h1>{{ heading }}</h1>
      <p v-if="subheading" class="hd-hero__lede">{{ subheading }}</p>
      <SiteSlot name="search" class="hd-search hd-search--hero" />
      <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="hd-hero__link">{{ ctaLabel }}</NuxtLink>
    </div>
  </section>
</template>
