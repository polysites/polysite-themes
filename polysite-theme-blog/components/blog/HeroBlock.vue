<script setup lang="ts">
// The blog's opening: a large title and a short introduction beside an illustration. Styled in assets/css/blog.css.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
const localePath = useLocalePath();
</script>

<template>
  <section class="blog-hero">
    <div class="blog-hero__text">
      <h1>{{ heading }}</h1>
      <p v-if="subheading" class="blog-hero__lede">{{ subheading }}</p>
      <NuxtLink v-if="ctaLabel && ctaHref" :to="localePath(ctaHref)" class="blog-more">
        {{ ctaLabel }} <span aria-hidden="true">&rarr;</span>
      </NuxtLink>
    </div>
    <figure v-if="image?.url" class="blog-hero__art">
      <img :src="image.url" :alt="image.alt || ''" width="960" height="720" >
    </figure>
  </section>
</template>
