<script setup lang="ts">
const props = defineProps<{
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  form?: number | string | { id?: number | string } | null;
}>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="hd-section hd-form">
    <h2>{{ heading }}</h2>
    <p v-if="subheading">{{ subheading }}</p>
    <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
  </section>
</template>
