<script setup lang="ts">
// "Highlights": three or four cards, each with a stamp-like number.
defineProps<{ heading?: string; features: { title: string; description?: string }[] }>();
</script>

<template>
  <section class="rest-section rest-section--wide rest-highlights">
    <h2 v-if="heading">{{ heading }}</h2>
    <ul>
      <li v-for="(f, i) in features" :key="i">
        <h3>{{ f.title }}</h3>
        <p v-if="f.description">{{ f.description }}</p>
      </li>
    </ul>
  </section>
</template>
