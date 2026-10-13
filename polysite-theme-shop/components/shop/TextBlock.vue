<script setup lang="ts">
// bodyHTML is produced on the server from the editor's content.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="sh-section sh-text">
    <div class="sh-wrap sh-wrap--narrow">
      <h2 v-if="heading" class="sh-h2">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="sh-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
