<script setup lang="ts">
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="np-section np-features">
    <div class="np-wrap">
      <h2 v-if="heading" class="np-h2">{{ heading }}</h2>
      <ul class="np-features__grid">
        <li v-for="(f, i) in features" :key="i" class="np-note">
          <h3 class="np-note__title">{{ f.title }}</h3>
          <p v-if="f.description" class="np-note__text">{{ f.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
