<script setup lang="ts">
// bodyHTML is produced on the server from the editor's content.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="np-section np-text">
    <div class="np-wrap np-wrap--narrow">
      <h2 v-if="heading" class="np-h2">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="np-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
