<script setup lang="ts">
// The newsletter box: a short pitch and a compact form.
const props = defineProps<{
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  form?: number | string | { id?: number | string } | null;
}>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="blog-section">
    <div class="blog-letter">
      <h2>{{ heading }}</h2>
      <p v-if="subheading">{{ subheading }}</p>
      <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
    </div>
  </section>
</template>
