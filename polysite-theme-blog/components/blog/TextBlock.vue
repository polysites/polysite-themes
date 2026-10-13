<script setup lang="ts">
// bodyHTML is produced on the server from the editor's content (the same trust boundary as every CMS field).
defineProps<{ heading?: string; bodyHTML?: string }>();
</script>

<template>
  <section class="blog-section blog-prose">
    <h2 v-if="heading">{{ heading }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="bodyHTML" class="blog-prose__body" v-html="bodyHTML" />
  </section>
</template>
