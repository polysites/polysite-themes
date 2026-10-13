<script setup lang="ts">
// A form chosen in the CMS. Fields, spam protection and sending come from the core (useFormIntake, PolysiteFormFields);
// this file and blog.css decide how it looks.
const props = defineProps<{ heading?: string; form?: number | string | { id?: number | string } | null }>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="blog-section blog-form">
    <h2 v-if="heading">{{ heading }}</h2>
    <PolysiteFormFields :intake="intake" />
  </section>
</template>
