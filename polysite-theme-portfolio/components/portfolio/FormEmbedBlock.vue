<script setup lang="ts">
// A form chosen in the CMS, drawn with underlined fields. Fields, spam protection and sending come from the core
// (useFormIntake, PolysiteFormFields). Nothing shows until an editor links a form.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="pf-form">
    <div class="pf-form__inner">
      <h2 v-if="heading" class="pf-label">{{ heading }}</h2>
      <div class="pf-form__body">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" />
      </div>
    </div>
  </section>
</template>
