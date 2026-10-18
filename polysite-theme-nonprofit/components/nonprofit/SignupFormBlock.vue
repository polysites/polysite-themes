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
  <section v-if="formIdOf(form)" class="np-section np-signup">
    <div class="np-wrap np-wrap--narrow np-form-card np-signup__box">
      <h2 class="np-h2">{{ heading }}</h2>
      <p v-if="subheading" class="np-lede">{{ subheading }}</p>
      <div class="np-form np-form--inline">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>
