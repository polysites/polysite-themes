<script setup lang="ts">
// The shop hero: a friendly welcome on a paper card beside a taped-up picture (the shop front, a gift card). The page
// title <h1> is hidden by assets/css/shop.css when a hero follows it, so there is one visible h1.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="sh-hero" :class="{ 'sh-hero--picture': image?.url }">
    <div class="sh-wrap sh-hero__inner">
      <div class="sh-hero__card">
        <h1 class="sh-hero__title">{{ heading }}</h1>
        <p v-if="subheading" class="sh-hero__lede">{{ subheading }}</p>
        <p v-if="ctaLabel && ctaHref" class="sh-hero__actions">
          <NuxtLink :to="ctaHref" class="sh-button">{{ ctaLabel }}</NuxtLink>
        </p>
      </div>
      <figure v-if="image?.url" class="sh-hero__picture">
        <img :src="image.url" :alt="image.alt || ''" width="1200" height="800" >
      </figure>
    </div>
  </section>
</template>
