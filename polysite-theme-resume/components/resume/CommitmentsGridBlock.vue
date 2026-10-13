<script setup lang="ts">
// Projects as a plain list: a title, one paragraph and an optional link. (The core block is a campaign's "commitments".)
defineProps<{
  heading: string;
  items: { heading: string; body?: string; ctaLabel?: string; ctaHref?: string }[];
}>();
const localePath = useLocalePath();
</script>

<template>
  <section class="rs-section rs-projects">
    <h2 class="rs-heading">{{ heading }}</h2>
    <ul class="rs-projects__list">
      <li v-for="(item, i) in items" :key="i" class="rs-projects__item">
        <h3 class="rs-projects__title">{{ item.heading }}</h3>
        <p v-if="item.body" class="rs-projects__body">{{ item.body }}</p>
        <NuxtLink v-if="item.ctaLabel && item.ctaHref" :to="localePath(item.ctaHref)" class="rs-projects__link">{{ item.ctaLabel }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>
