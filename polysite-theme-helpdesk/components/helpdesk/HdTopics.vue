<script setup lang="ts">
// The topic navigation of an article page: the site's header menu (minus its last item, the contact button) and footer columns.
// Drawn twice by the layout: always open in the sidebar on wide screens, and as a collapsed disclosure on narrow ones.
defineProps<{
  topics: { label: string; href: string }[];
  columns: { heading: string; links?: { label: string; href: string }[] }[];
}>();
const localePath = useLocalePath();
</script>

<template>
  <div class="hd-topics">
    <ul class="hd-topics__list">
      <li v-for="item in topics" :key="item.label">
        <NuxtLink :to="localePath(item.href)">{{ item.label }}</NuxtLink>
      </li>
    </ul>
    <div v-for="col in columns" :key="col.heading" class="hd-topics__group">
      <h2>{{ col.heading }}</h2>
      <ul>
        <li v-for="l in col.links ?? []" :key="l.label">
          <NuxtLink :to="localePath(l.href)">{{ l.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
