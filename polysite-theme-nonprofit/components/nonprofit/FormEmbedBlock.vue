<script setup lang="ts">
// A form chosen in the CMS. Fields, spam protection and sending come from the core; the
// look is in assets/css/nonprofit.css under .np-form.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="np-section np-formblock">
    <div class="np-wrap np-wrap--form">
      <div class="np-form-card">
        <h2 v-if="heading" class="np-h2">{{ heading }}</h2>
        <div class="np-form">
          <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
          <PolysiteFormFields :intake="intake" />
        </div>
      </div>
    </div>
  </section>
</template>
