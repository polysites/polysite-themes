<script setup lang="ts">
// The charity hero: a warm welcome and one clear call to action beside a picture in an organic frame. The page
// title <h1> is hidden by assets/css/nonprofit.css when a hero follows it, so there is one visible h1.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="np-hero" :class="{ 'np-hero--picture': image?.url }">
    <div class="np-wrap np-hero__inner">
      <div class="np-hero__card">
        <h1 class="np-hero__title">{{ heading }}</h1>
        <p v-if="subheading" class="np-hero__lede">{{ subheading }}</p>
        <p v-if="ctaLabel && ctaHref" class="np-hero__actions">
          <NuxtLink :to="ctaHref" class="np-button">{{ ctaLabel }}</NuxtLink>
        </p>
      </div>
      <figure v-if="image?.url" class="np-hero__picture">
        <img :src="image.url" :alt="image.alt || ''" width="1200" height="800" >
      </figure>
    </div>
  </section>
</template>
