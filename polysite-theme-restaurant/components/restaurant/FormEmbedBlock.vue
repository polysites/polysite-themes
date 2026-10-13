<script setup lang="ts">
// A form chosen in the CMS (reservations, contact). Fields and sending come from the core; the look is in restaurant.css.
const props = defineProps<{ heading?: string; form?: number | string | { id?: number | string } | null }>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="rest-section rest-form">
    <div class="rest-card">
      <h2 v-if="heading">{{ heading }}</h2>
      <PolysiteFormFields :intake="intake" />
    </div>
  </section>
</template>
