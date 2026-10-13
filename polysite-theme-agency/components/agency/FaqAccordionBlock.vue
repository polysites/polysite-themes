<script setup lang="ts">
defineProps<{
  heading?: string;
  items: { question: string; answer: string }[];
}>();
</script>

<template>
  <section class="ag-section ag-faq">
    <div class="ag-wrap ag-wrap--narrow">
      <h2 v-if="heading" class="ag-h2">{{ heading }}</h2>
      <div class="ag-faq__list">
        <details v-for="(item, i) in items" :key="i" class="ag-faq__item">
          <summary class="ag-faq__q">{{ item.question }}</summary>
          <p class="ag-faq__a">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
