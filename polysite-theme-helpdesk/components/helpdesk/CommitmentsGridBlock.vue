<script setup lang="ts">
// "Browse by topic": cards that each link to a topic page. (The block is called commitments in the CMS; here it is the category grid.)
defineProps<{
  heading: string;
  items: { heading: string; body?: string; ctaLabel?: string; ctaHref?: string }[];
}>();
const localePath = useLocalePath();
</script>

<template>
  <section class="hd-section hd-section--wide hd-topiccards">
    <h2>{{ heading }}</h2>
    <ul>
      <li v-for="(item, i) in items" :key="i" class="hd-topiccard">
        <h3>
          <NuxtLink v-if="item.ctaHref" :to="localePath(item.ctaHref)" class="hd-topiccard__link">{{ item.heading }}</NuxtLink>
          <template v-else>{{ item.heading }}</template>
        </h3>
        <p v-if="item.body">{{ item.body }}</p>
        <span v-if="item.ctaLabel" class="hd-topiccard__more" aria-hidden="true">{{ item.ctaLabel }} <span class="poly-arrow">&rarr;</span></span>
      </li>
    </ul>
  </section>
</template>
