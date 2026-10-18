<script setup lang="ts">
// A compact sign-up box over a form chosen in the CMS. Behaviour is shared with
// every other form (useFormIntake, PolysiteFormFields); this file is the look.
// Nothing shows until an editor links a form, so a visitor never sees a button
// that goes nowhere.
const props = defineProps<{
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="px-4 py-14 text-center sm:px-8">
    <div class="starter-signup mx-auto max-w-lg">
      <h2 class="text-2xl font-extrabold tracking-tight text-neutral-900">{{ heading }}</h2>
      <p v-if="subheading" class="mt-2 text-neutral-600">{{ subheading }}</p>
      <div class="mt-6">
        <PolysiteSignatureCount v-if="intake.signatures" :count="intake.signatures.count" :goal="intake.signatures.goal" />
        <PolysiteFormFields :intake="intake" :submit-label="ctaLabel" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.starter-signup :deep(.poly-form) {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
}
.starter-signup :deep(.poly-field) {
  flex: 1 1 11rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: start;
}
/* in a compact box the placeholder-style layout needs no visible labels */
.starter-signup :deep(.poly-label) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.starter-signup :deep(input:not([type="checkbox"])),
.starter-signup :deep(select) {
  width: 100%;
  padding: 0.65rem 1rem;
  font: inherit;
  font-size: 0.875rem;
  border: 1px solid #d4d4d4;
  border-radius: var(--poly-radius-button, 9999px);
  background: #fff;
}
.starter-signup :deep(input:focus-visible),
.starter-signup :deep(select:focus-visible) {
  outline: 2px solid var(--brand-primary, #f26522);
  outline-offset: 1px;
}
.starter-signup :deep([aria-invalid="true"]) {
  border-color: #b91c1c;
}
.starter-signup :deep(.poly-check) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}
.starter-signup :deep(.poly-error) {
  margin: 0;
  font-size: 0.8rem;
  color: #b91c1c;
}
.starter-signup :deep(.poly-form-message) {
  flex-basis: 100%;
  text-align: center;
}
.starter-signup :deep(.poly-submit) {
  flex: 0 0 auto;
  padding: 0.7rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  background: var(--brand-primary, #f26522);
  border: 0;
  border-radius: var(--poly-radius-button, 9999px);
  cursor: pointer;
}
.starter-signup :deep(.poly-submit:hover:not(:disabled)) {
  opacity: 0.9;
}
.starter-signup :deep(.poly-submit:disabled) {
  opacity: 0.6;
  cursor: progress;
}
.starter-signup :deep(.poly-confirmation) {
  padding: 1rem;
  border-radius: var(--poly-radius-card, 1rem);
  background: #f5f5f5;
}
.starter-signup :deep(.poly-privacy) {
  flex-basis: 100%;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.starter-signup :deep(.poly-purpose) {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #525252;
}
.starter-signup :deep(.poly-policy-link) {
  margin-inline-start: 0.25rem;
  text-decoration: underline;
}
</style>
