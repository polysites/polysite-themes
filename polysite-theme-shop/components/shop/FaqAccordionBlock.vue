<script setup lang="ts">
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="sh-section sh-faq">
    <div class="sh-wrap sh-wrap--narrow">
      <h2 v-if="heading" class="sh-h2">{{ heading }}</h2>
      <div class="sh-faq__list">
        <details v-for="(item, i) in items" :key="i" class="sh-faq__item">
          <summary class="sh-faq__q">{{ item.question }}</summary>
          <p class="sh-faq__a">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
