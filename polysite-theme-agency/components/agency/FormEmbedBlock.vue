<script setup lang="ts">
// A form chosen in the CMS. Fields, spam protection and sending come from the core (useFormIntake, PolysiteFormFields);
// the look is in assets/css/agency.css under .ag-form.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="ag-section ag-formblock">
    <div class="ag-wrap ag-wrap--form">
      <h2 v-if="heading" class="ag-h2">{{ heading }}</h2>
      <div class="ag-form">
        <PolysiteFormFields :intake="intake" />
      </div>
    </div>
  </section>
</template>
