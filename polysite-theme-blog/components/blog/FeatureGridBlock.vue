<script setup lang="ts">
// "Notes" in the blog: a numbered list of short entries.
defineProps<{ heading?: string; features: { title: string; description?: string }[] }>();
</script>

<template>
  <section class="blog-section blog-notes">
    <h2 v-if="heading">{{ heading }}</h2>
    <ol>
      <li v-for="(f, i) in features" :key="i">
        <h3>{{ f.title }}</h3>
        <p v-if="f.description">{{ f.description }}</p>
      </li>
    </ol>
  </section>
</template>
