<script setup lang="ts">
// Suggested gift amounts. Every amount links to the donate page with ?ask=<amount> (what the core's version does too); the
// selected one is only highlighted. "Another amount" goes to the plain donate page. Words are translatable with useT().
const props = defineProps<{
  heading: string;
  amounts: { amount: number }[];
  donateHref?: string;
}>();

const t = useT();
const base = () => props.donateHref || "/donate";
const selected = ref<number | null>(null);
</script>

<template>
  <section class="np-section np-donate">
    <div class="np-wrap np-wrap--narrow np-donate__box">
      <h2 class="np-h2 np-h2--center">{{ heading }}</h2>
      <ul class="np-donate__amounts">
        <li v-for="(a, i) in amounts" :key="i">
          <a
            :href="`${base()}?ask=${a.amount}`"
            class="np-amount"
            :class="{ 'is-selected': selected === i }"
            :aria-current="selected === i ? 'true' : undefined"
            @click="selected = i"
          >
            <span class="np-amount__currency" aria-hidden="true">$</span>{{ a.amount }}
          </a>
        </li>
        <li>
          <a :href="base()" class="np-amount np-amount--other" :class="{ 'is-selected': selected === -1 }" @click="selected = -1">
            {{ t("nonprofit.otherAmount", "Another amount") }}
          </a>
        </li>
      </ul>
      <p class="np-donate__note">{{ t("nonprofit.donateNote", "Every gift, large or small, goes straight to the work.") }}</p>
    </div>
  </section>
</template>
