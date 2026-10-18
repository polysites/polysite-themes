<script setup lang="ts">
// A form chosen in the CMS; fields, spam protection and sending come from the core, the look from assets/css/event.css.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="ev-section ev-formblock">
    <div class="ev-wrap ev-wrap--form">
      <h2 v-if="heading" class="ev-h2">{{ heading }}</h2>
      <div class="ev-form">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" />
      </div>
    </div>
  </section>
</template>
