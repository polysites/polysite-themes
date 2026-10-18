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
  <section v-if="formIdOf(form)" class="rest-section rest-form">
    <div class="rest-card">
      <h2>{{ heading }}</h2>
      <p v-if="subheading" class="rest-card__lede">{{ subheading }}</p>
      <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
      <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
    </div>
  </section>
</template>
