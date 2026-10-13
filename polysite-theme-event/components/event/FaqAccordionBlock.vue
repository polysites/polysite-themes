<script setup lang="ts">
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="ev-section ev-faq">
    <div class="ev-wrap ev-wrap--narrow">
      <h2 v-if="heading" class="ev-h2">{{ heading }}</h2>
      <div class="ev-faq__list">
        <details v-for="(item, i) in items" :key="i" class="ev-faq__item">
          <summary class="ev-faq__q">{{ item.question }}</summary>
          <p class="ev-faq__a">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
