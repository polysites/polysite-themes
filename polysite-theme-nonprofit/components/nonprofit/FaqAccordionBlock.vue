<script setup lang="ts">
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="np-section np-faq">
    <div class="np-wrap np-wrap--narrow">
      <h2 v-if="heading" class="np-h2">{{ heading }}</h2>
      <div class="np-faq__list">
        <details v-for="(item, i) in items" :key="i" class="np-faq__item">
          <summary class="np-faq__q">{{ item.question }}</summary>
          <p class="np-faq__a">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
