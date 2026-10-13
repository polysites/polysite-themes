<script setup lang="ts">
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
  <section class="bg-neutral-50 px-4 py-[var(--poly-section-y,4rem)] sm:px-8">
    <div class="mx-auto grid max-w-4xl overflow-hidden rounded-[var(--poly-radius-card,1rem)] shadow-sm sm:grid-cols-2">
      <div class="flex flex-col items-center justify-center gap-4 bg-white p-10">
        <div
          class="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-neutral-200 to-neutral-100 text-neutral-400"
        >
          <img v-if="photo?.url" :src="photo.url" :alt="photo.alt || name" class="h-full w-full object-cover" >
          <Icon v-else name="lucide:user-round" size="64" />
        </div>
        <div class="text-center">
          <p class="text-lg font-extrabold text-neutral-900">{{ name }}</p>
          <p v-if="title" class="text-sm text-neutral-500">{{ title }}</p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-6 bg-[var(--brand-secondary,#1a1a1a)] p-10 text-white">
        <Icon name="lucide:quote" size="28" class="opacity-60" />
        <blockquote class="text-xl font-semibold leading-snug">&ldquo;{{ quote }}&rdquo;</blockquote>
        <NuxtLink
          v-if="ctaLabel && ctaHref"
          :to="ctaHref"
          class="w-fit rounded-[var(--poly-radius-button,9999px)] bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-200"
        >
          {{ ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
