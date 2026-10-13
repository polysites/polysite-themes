<script setup lang="ts">
// A section of prose. bodyHTML comes from the editor's rich text, rendered on the server (same trust boundary as every
// other editor field).
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="rs-section">
    <h2 v-if="heading" class="rs-heading">{{ heading }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="bodyHTML" class="rs-prose" v-html="bodyHTML" />
  </section>
</template>
