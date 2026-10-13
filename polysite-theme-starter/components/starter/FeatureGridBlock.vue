<script setup lang="ts">
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="block-feature-grid">
    <h2 v-if="heading">{{ heading }}</h2>
    <ul>
      <li v-for="(f, i) in features" :key="i">
        <h3>{{ f.title }}</h3>
        <p v-if="f.description">{{ f.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.block-feature-grid {
  padding: 2rem 1.5rem;
}
.block-feature-grid ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
}
.block-feature-grid li {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.25rem;
}
.block-feature-grid h3 {
  margin: 0 0 0.5rem;
}
</style>
