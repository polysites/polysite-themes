<script setup lang="ts">
// Skills as a compact definition list: the group on the left, what is in it on the right.
defineProps<{
  heading?: string;
  features: { title: string; description?: string }[];
}>();
</script>

<template>
  <section class="rs-section rs-skills">
    <h2 v-if="heading" class="rs-heading">{{ heading }}</h2>
    <dl class="rs-skills__list">
      <div v-for="(f, i) in features" :key="i" class="rs-skills__row">
        <dt class="rs-skills__term">{{ f.title }}</dt>
        <dd v-if="f.description" class="rs-skills__def">{{ f.description }}</dd>
      </div>
    </dl>
  </section>
</template>
