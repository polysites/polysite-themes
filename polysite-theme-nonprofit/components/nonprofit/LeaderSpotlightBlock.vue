<script setup lang="ts">
// A person, a quote and a button, as a soft card with the portrait in an organic frame.
defineProps<{
  photo?: { url?: string; alt?: string } | null;
  name: string;
  title?: string;
  quote: string;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="np-section np-leader">
    <div class="np-wrap">
      <figure class="np-leader__card">
        <div class="np-leader__who">
          <img v-if="photo?.url" :src="photo.url" :alt="photo.alt || ''" class="np-leader__photo" width="400" height="400" >
          <figcaption>
            <p class="np-leader__name">{{ name }}</p>
            <p v-if="title" class="np-leader__title">{{ title }}</p>
          </figcaption>
        </div>
        <div class="np-leader__say">
          <blockquote class="np-leader__quote">{{ quote }}</blockquote>
          <p v-if="ctaLabel && ctaHref" class="np-leader__action">
            <NuxtLink :to="ctaHref" class="np-button np-button--light">{{ ctaLabel }}</NuxtLink>
          </p>
        </div>
      </figure>
    </div>
  </section>
</template>
