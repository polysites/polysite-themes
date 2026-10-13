<script setup lang="ts">
// bodyHTML is computed server-side from the Lexical AST (`body`) by
// TextBlockConfig's `afterRead` hook, via Payload's own official
// `convertLexicalToHTMLAsync` -- there's no Vue-compatible Lexical renderer,
// and Payload's own is React-only. Rendered with v-html rather than escaped,
// same trust boundary as every other CMS-authored field on this page: it
// comes from an authenticated editor, not visitor input.
defineProps<{
  heading?: string;
  bodyHTML?: string;
}>();
</script>

<template>
  <section class="block-text">
    <h2 v-if="heading">{{ heading }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="bodyHTML" class="block-text-body" v-html="bodyHTML" />
  </section>
</template>

<style scoped>
.block-text {
  padding: 2rem 1.5rem;
}
.block-text-body :deep(p) {
  margin: 0 0 1em;
}
</style>
