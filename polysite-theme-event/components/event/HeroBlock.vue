<script setup lang="ts">
// The event hero: the name in huge capitals, the date and place on a taped-on label (the subheading), one big button and
// the poster picture. The page title <h1> is hidden by assets/css/event.css when a hero follows it.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="ev-hero" :class="{ 'ev-hero--poster': image?.url }">
    <div class="ev-wrap ev-hero__inner">
      <div class="ev-hero__copy">
        <h1 class="ev-hero__title">{{ heading }}</h1>
        <p v-if="subheading" class="ev-hero__when">{{ subheading }}</p>
        <div v-if="ctaLabel && ctaHref" class="ev-hero__actions">
          <NuxtLink :to="ctaHref" class="ev-button">{{ ctaLabel }}</NuxtLink>
        </div>
      </div>
      <figure v-if="image?.url" class="ev-hero__poster">
        <img :src="image.url" :alt="image.alt || ''" width="800" height="800" >
      </figure>
    </div>
  </section>
</template>
