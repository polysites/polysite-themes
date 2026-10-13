<script setup lang="ts">
// bodyHTML is produced on the server from the editor's content (an authenticated editor, not visitor input).
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="ag-section ag-text">
    <div class="ag-wrap ag-wrap--narrow">
      <h2 v-if="heading" class="ag-h2">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="ag-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
