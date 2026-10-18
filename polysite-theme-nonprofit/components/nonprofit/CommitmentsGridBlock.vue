<script setup lang="ts">
// Cards for "what we do" or "our promises": a heading, some words and an optional link, each with a round numbered badge.
defineProps<{
  heading: string;
  items: { heading: string; body?: string; ctaLabel?: string; ctaHref?: string }[];
}>();
</script>

<template>
  <section class="np-section np-commit">
    <div class="np-wrap">
      <h2 class="np-h2 np-h2--center">{{ heading }}</h2>
      <ul class="np-commit__grid">
        <li v-for="(item, i) in items" :key="i" class="np-commit__card">
          <span class="np-commit__badge" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="np-commit__title">{{ item.heading }}</h3>
          <p v-if="item.body" class="np-commit__text">{{ item.body }}</p>
          <NuxtLink v-if="item.ctaLabel && item.ctaHref" :to="item.ctaHref" class="np-commit__link">
            {{ item.ctaLabel }}<span class="poly-arrow" aria-hidden="true"> &rarr;</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
