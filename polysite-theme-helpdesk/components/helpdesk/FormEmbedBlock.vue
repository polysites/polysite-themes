<script setup lang="ts">
const props = defineProps<{ heading?: string; form?: number | string | { id?: number | string } | null }>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="hd-section hd-form">
    <h2 v-if="heading">{{ heading }}</h2>
    <PolysiteFormFields :intake="intake" />
  </section>
</template>
