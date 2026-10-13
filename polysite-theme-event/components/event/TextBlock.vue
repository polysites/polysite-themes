<script setup lang="ts">
// bodyHTML is produced on the server from the editor's content.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="ev-section ev-text">
    <div class="ev-wrap ev-wrap--narrow">
      <h2 v-if="heading" class="ev-h2">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="ev-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
