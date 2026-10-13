<script setup lang="ts">
// A compact sign-up box (for example a newsletter) over a form chosen in the CMS. Nothing shows until a form is linked.
const props = defineProps<{
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="ag-section ag-signup">
    <div class="ag-wrap ag-wrap--narrow ag-signup__box">
      <h2 class="ag-h2">{{ heading }}</h2>
      <p v-if="subheading" class="ag-lede">{{ subheading }}</p>
      <div class="ag-form ag-form--inline">
        <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>
