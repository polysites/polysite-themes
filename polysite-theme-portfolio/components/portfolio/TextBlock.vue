<script setup lang="ts">
// Prose with its heading as a small label in a left column (above the text on a phone). bodyHTML comes from the editor's rich
// text, rendered on the server: the same trust boundary as every other editor field.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="pf-text">
    <div class="pf-text__inner">
      <h2 v-if="heading" class="pf-label">{{ heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="bodyHTML" class="pf-prose" v-html="bodyHTML" />
    </div>
  </section>
</template>
