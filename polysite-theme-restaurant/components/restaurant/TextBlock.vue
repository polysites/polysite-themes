<script setup lang="ts">
defineProps<{ heading?: string; bodyHTML?: string }>();
</script>

<template>
  <section class="rest-section rest-prose">
    <h2 v-if="heading">{{ heading }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="bodyHTML" class="rest-prose__body" v-html="bodyHTML" />
  </section>
</template>
