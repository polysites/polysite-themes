<script setup lang="ts">
// A narrow column of prose. bodyHTML is produced on the server from the editor's rich text (the same trust boundary as every
// other field an authenticated editor writes), so it is drawn with v-html.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="salon-text">
    <div class="salon-text__inner">
      <h2 v-if="heading" class="salon-heading">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="salon-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
