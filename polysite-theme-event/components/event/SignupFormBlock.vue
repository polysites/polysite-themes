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
  <section v-if="formIdOf(form)" class="ev-section ev-signup">
    <div class="ev-wrap ev-wrap--narrow ev-signup__box">
      <h2 class="ev-h2">{{ heading }}</h2>
      <p v-if="subheading" class="ev-lede">{{ subheading }}</p>
      <div class="ev-form ev-form--inline">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>
