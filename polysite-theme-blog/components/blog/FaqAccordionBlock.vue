<script setup lang="ts">
defineProps<{ heading?: string; items: { question: string; answer: string }[] }>();
</script>

<template>
  <section class="blog-section blog-faq">
    <h2 v-if="heading">{{ heading }}</h2>
    <details v-for="(item, i) in items" :key="i">
      <summary>{{ item.question }}</summary>
      <p>{{ item.answer }}</p>
    </details>
  </section>
</template>
