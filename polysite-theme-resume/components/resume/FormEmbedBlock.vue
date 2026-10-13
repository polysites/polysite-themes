<script setup lang="ts">
// A form chosen in the CMS (a contact form). Fields, spam protection and sending come from the core.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="rs-section rs-form">
    <h2 v-if="heading" class="rs-heading">{{ heading }}</h2>
    <PolysiteFormFields :intake="intake" />
  </section>
</template>
