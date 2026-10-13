<script setup lang="ts">
// The agency hero: a big statement, one call to action and, when an editor adds a picture, a framed product shot. The
// page's own <h1> (the page title) is hidden by assets/css/agency.css when a hero follows it, so there is one visible h1.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="ag-hero" :class="{ 'ag-hero--art': image?.url }">
    <div class="ag-wrap ag-hero__inner">
      <div class="ag-hero__copy">
        <h1 class="ag-hero__title">{{ heading }}</h1>
        <p v-if="subheading" class="ag-hero__lede">{{ subheading }}</p>
        <div v-if="ctaLabel && ctaHref" class="ag-hero__actions">
          <NuxtLink :to="ctaHref" class="ag-button ag-button--primary">{{ ctaLabel }}</NuxtLink>
        </div>
      </div>
      <figure v-if="image?.url" class="ag-hero__art">
        <img :src="image.url" :alt="image.alt || ''" width="720" height="560" >
      </figure>
    </div>
  </section>
</template>
