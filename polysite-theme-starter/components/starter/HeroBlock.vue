<script setup lang="ts">
// `image` was a real field on the Hero block's CMS schema this whole time
// (Payload returns it fully populated at depth:1 -- an upload relationship
// isn't lazy) but this component never accepted or rendered it, so setting
// it in the admin had no visible effect no matter what. Not a caching issue;
// the prop simply didn't exist.
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="relative">
    <img
      v-if="image?.url"
      :src="image.url"
      :alt="image.alt || heading"
      class="h-[420px] w-full object-cover sm:h-[520px]"
    >
    <div
      class="flex flex-col items-center gap-3 px-6 py-20 text-center"
      :class="
        image?.url
          ? 'absolute inset-0 justify-center bg-gradient-to-t from-black/70 via-black/25 to-transparent text-white'
          : 'justify-center text-neutral-900'
      "
    >
      <h1 class="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">{{ heading }}</h1>
      <p v-if="subheading" class="max-w-xl text-lg opacity-90">{{ subheading }}</p>
      <NuxtLink
        v-if="ctaLabel && ctaHref"
        :to="ctaHref"
        class="mt-2 rounded-[var(--poly-radius-button,9999px)] bg-[var(--brand-primary,#f26522)] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
      >
        {{ ctaLabel }}
      </NuxtLink>
    </div>
  </section>
</template>
