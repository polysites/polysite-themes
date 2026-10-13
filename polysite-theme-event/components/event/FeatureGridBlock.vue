<script setup lang="ts">
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="ev-section ev-features">
    <div class="ev-wrap">
      <h2 v-if="heading" class="ev-h2">{{ heading }}</h2>
      <ul class="ev-features__grid">
        <li v-for="(f, i) in features" :key="i" class="ev-card">
          <h3 class="ev-card__title">{{ f.title }}</h3>
          <p v-if="f.description" class="ev-card__text">{{ f.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
