<script setup lang="ts">
// A form chosen in the CMS (the booking or enquiry form), drawn as a soft card. The fields, spam protection and sending come from
// useFormIntake and PolysiteFormFields in the core; this file and assets/css/salon.css only decide how it looks. Nothing shows
// until an editor links a form.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="salon-form">
    <div class="salon-form__card">
      <h2 v-if="heading" class="salon-heading salon-heading--left">{{ heading }}</h2>
      <PolysiteFormFields :intake="intake" />
    </div>
  </section>
</template>
