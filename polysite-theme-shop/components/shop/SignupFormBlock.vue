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
  <section v-if="formIdOf(form)" class="sh-section sh-signup">
    <div class="sh-wrap sh-wrap--narrow sh-form-card sh-signup__box">
      <h2 class="sh-h2">{{ heading }}</h2>
      <p v-if="subheading" class="sh-lede">{{ subheading }}</p>
      <div class="sh-form sh-form--inline">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>
