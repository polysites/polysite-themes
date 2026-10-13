<script setup lang="ts">
// A list of services or principles as ruled rows: a number, a big title and a short description.
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="pf-rows">
    <div class="pf-rows__inner">
      <h2 v-if="heading" class="pf-label">{{ heading }}</h2>
      <ol class="pf-rows__list">
        <li v-for="(f, i) in features" :key="i" class="pf-rows__item">
          <span class="pf-rows__number" aria-hidden="true">{{ String(i + 1).padStart(2, "0") }}</span>
          <h3 class="pf-rows__title">{{ f.title }}</h3>
          <p v-if="f.description" class="pf-rows__text">{{ f.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
