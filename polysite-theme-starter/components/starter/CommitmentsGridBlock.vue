<script setup lang="ts">
// Items live directly on the block now (see apps/cms/src/blocks/
// CommitmentsGrid.ts) instead of being fetched from a separate collection.
defineProps<{
  heading: string;
  items: { heading: string; body?: string; ctaLabel?: string; ctaHref?: string }[];
}>();
</script>

<template>
  <section class="px-4 py-[var(--poly-section-y,4rem)] sm:px-8">
    <div class="mx-auto max-w-[var(--poly-container,64rem)]">
      <h2 class="mb-10 text-center text-2xl font-extrabold tracking-tight text-neutral-900">{{ heading }}</h2>
      <ul class="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="rounded-[var(--poly-radius-card,1rem)] border border-neutral-200 p-6 text-start transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-primary,#f26522)] text-white"
          >
            <Icon name="lucide:check" size="18" />
          </div>
          <h3 class="mb-2 text-base font-bold text-neutral-900">{{ item.heading }}</h3>
          <p v-if="item.body" class="text-sm leading-relaxed text-neutral-600">{{ item.body }}</p>
          <NuxtLink
            v-if="item.ctaLabel && item.ctaHref"
            :to="item.ctaHref"
            class="mt-3 inline-block text-sm font-bold text-[var(--brand-primary,#f26522)] hover:underline"
          >
            {{ item.ctaLabel }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
