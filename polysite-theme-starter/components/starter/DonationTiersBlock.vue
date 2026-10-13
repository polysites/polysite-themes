<script setup lang="ts">
const props = defineProps<{
  heading: string;
  amounts: { amount: number }[];
  donateHref?: string;
}>();

const base = () => props.donateHref || "/donate";

// Visual selection only -- every tier still links straight through to the
// donate page with ?ask=<amount> the same way it always has; this just
// highlights which one the visitor is about to pick.
const selected = ref<number | null>(null);
</script>

<template>
  <section class="bg-[var(--brand-secondary,#1a1a1a)] px-4 py-14 text-center text-white sm:px-8">
    <h2 class="text-sm font-bold uppercase tracking-wider">{{ heading }}</h2>
    <div class="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
      <a
        v-for="(a, i) in amounts"
        :key="i"
        :href="`${base()}?ask=${a.amount}`"
        class="rounded-[var(--poly-radius-button,9999px)] px-5 py-2 text-sm font-bold transition"
        :class="selected === i ? 'bg-white text-neutral-900' : 'bg-white/10 text-white hover:bg-white/20'"
        @click="selected = i"
      >
        ${{ a.amount }}
      </a>
      <a
        :href="base()"
        class="rounded-[var(--poly-radius-button,9999px)] px-5 py-2 text-sm font-bold transition"
        :class="selected === -1 ? 'bg-white text-neutral-900' : 'bg-white/10 text-white hover:bg-white/20'"
        @click="selected = -1"
      >
        Other
      </a>
    </div>
  </section>
</template>
