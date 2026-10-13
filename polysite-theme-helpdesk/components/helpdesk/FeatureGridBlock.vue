<script setup lang="ts">
// Numbered steps ("your first week"), drawn as a row of compact cards.
defineProps<{ heading?: string; features: { title: string; description?: string }[] }>();
</script>

<template>
  <section class="hd-section hd-steps">
    <h2 v-if="heading">{{ heading }}</h2>
    <ol>
      <li v-for="(f, i) in features" :key="i">
        <h3>{{ f.title }}</h3>
        <p v-if="f.description">{{ f.description }}</p>
      </li>
    </ol>
  </section>
</template>
