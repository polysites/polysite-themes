<script setup lang="ts">
// Questions and answers as native <details>, which work with the keyboard and without JavaScript.
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="salon-faq">
    <div class="salon-faq__inner">
      <h2 v-if="heading" class="salon-heading">{{ heading }}</h2>
      <div class="salon-faq__list">
        <details v-for="(item, i) in items" :key="i" class="salon-faq__item">
          <summary class="salon-faq__question">{{ item.question }}</summary>
          <p class="salon-faq__answer">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
