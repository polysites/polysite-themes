<script setup lang="ts">
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="sh-section sh-features">
    <div class="sh-wrap">
      <h2 v-if="heading" class="sh-h2">{{ heading }}</h2>
      <ul class="sh-features__grid">
        <li v-for="(f, i) in features" :key="i" class="sh-note">
          <h3 class="sh-note__title">{{ f.title }}</h3>
          <p v-if="f.description" class="sh-note__text">{{ f.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
