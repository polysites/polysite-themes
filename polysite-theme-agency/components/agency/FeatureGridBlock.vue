<script setup lang="ts">
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="ag-section ag-features">
    <div class="ag-wrap">
      <h2 v-if="heading" class="ag-h2 ag-h2--center">{{ heading }}</h2>
      <ul class="ag-features__grid">
        <li v-for="(f, i) in features" :key="i" class="ag-feature">
          <span class="ag-feature__no" aria-hidden="true">{{ String(i + 1).padStart(2, "0") }}</span>
          <h3 class="ag-feature__title">{{ f.title }}</h3>
          <p v-if="f.description" class="ag-feature__text">{{ f.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
