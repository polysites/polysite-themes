<script setup lang="ts">
// Three or four short promises, each with a numeral in a soft circle.
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="salon-features">
    <div class="salon-features__inner">
      <h2 v-if="heading" class="salon-heading">{{ heading }}</h2>
      <ol class="salon-features__list">
        <li v-for="(f, i) in features" :key="i" class="salon-features__item">
          <span class="salon-features__number" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="salon-features__title">{{ f.title }}</h3>
          <p v-if="f.description" class="salon-features__text">{{ f.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
