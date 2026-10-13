<script setup lang="ts">
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="block-faq">
    <h2 v-if="heading">{{ heading }}</h2>
    <details v-for="(item, i) in items" :key="i" class="block-faq-item">
      <summary>{{ item.question }}</summary>
      <p>{{ item.answer }}</p>
    </details>
  </section>
</template>

<style scoped>
.block-faq {
  padding: 2rem 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}
.block-faq-item {
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
}
.block-faq-item summary {
  cursor: pointer;
  font-weight: 600;
}
</style>
