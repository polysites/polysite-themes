<script setup lang="ts">
// A form chosen in the CMS, drawn in this theme's style. The fields, the spam
// protection and the submitting all come from useFormIntake and
// PolysiteFormFields in the core app; this file only decides how it looks. The
// `poly-*` class names are the hooks to style.
const props = defineProps<{
  heading?: string;
  form?: number | string | { id?: number | string } | null;
}>();

const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="px-4 py-[var(--poly-section-y,4rem)] sm:px-8">
    <div class="starter-form mx-auto max-w-xl">
      <h2 v-if="heading" class="mb-6 text-center text-2xl font-extrabold tracking-tight text-neutral-900">{{ heading }}</h2>
      <PolysiteFormFields :intake="intake" />
    </div>
  </section>
</template>

<style scoped>
.starter-form :deep(.poly-form) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.starter-form :deep(.poly-field) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.starter-form :deep(.poly-label),
.starter-form :deep(.poly-check) {
  font-size: 0.875rem;
  font-weight: 600;
  color: #262626;
}
.starter-form :deep(.poly-check) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}
.starter-form :deep(.poly-radios) {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.starter-form :deep(input:not([type="checkbox"]):not([type="radio"])),
.starter-form :deep(select),
.starter-form :deep(textarea) {
  width: 100%;
  padding: 0.65rem 1rem;
  font: inherit;
  border: 1px solid #d4d4d4;
  border-radius: var(--poly-radius-button, 9999px);
  background: #fff;
}
.starter-form :deep(textarea) {
  border-radius: var(--poly-radius-card, 1rem);
}
.starter-form :deep(input:focus-visible),
.starter-form :deep(select:focus-visible),
.starter-form :deep(textarea:focus-visible) {
  outline: 2px solid var(--brand-primary, #f26522);
  outline-offset: 1px;
}
.starter-form :deep([aria-invalid="true"]) {
  border-color: #b91c1c;
}
.starter-form :deep(.poly-required) {
  color: #b91c1c;
}
.starter-form :deep(.poly-error) {
  margin: 0;
  font-size: 0.85rem;
  color: #b91c1c;
}
.starter-form :deep(.poly-form-message) {
  text-align: center;
}
.starter-form :deep(.poly-submit) {
  align-self: center;
  padding: 0.7rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  background: var(--brand-primary, #f26522);
  border: 0;
  border-radius: var(--poly-radius-button, 9999px);
  cursor: pointer;
}
.starter-form :deep(.poly-submit:hover:not(:disabled)) {
  opacity: 0.9;
}
.starter-form :deep(.poly-submit:disabled) {
  opacity: 0.6;
  cursor: progress;
}
.starter-form :deep(.poly-confirmation) {
  padding: 1.25rem;
  text-align: center;
  border-radius: var(--poly-radius-card, 1rem);
  background: #f5f5f5;
}
.starter-form :deep(.poly-privacy) {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  
}
.starter-form :deep(.poly-purpose) {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #525252;
}
.starter-form :deep(.poly-policy-link) {
  margin-left: 0.25rem;
  text-decoration: underline;
}
</style>
