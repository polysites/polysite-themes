<script setup lang="ts">
// The programme, drawn for this theme: a jump link per day, every session as a row (time, title, speaker, room), a coloured
// room label, and a "Print this schedule" button. The print styles in assets/css/event.css put each day on its own page.
// This replaces the blocks-pack plugin's plain schedule for sites that use this theme, so it reads the same props.
import { useId } from "vue";

type Session = { time?: string; title?: string; speaker?: string; room?: string; description?: string };
type Day = { label?: string; sessions?: Session[] };

defineOptions({ inheritAttrs: false });
const props = defineProps<{ heading?: string; days?: Day[]; id?: string; blockType?: string }>();
const t = useT();
const uid = useId();

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// "10:00 - 11:00" becomes two <time> elements; anything else is shown as written.
const parts = (time: unknown): { text: string; datetime?: string }[] => {
  const whole = str(time);
  const m = /^(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})$/.exec(whole);
  if (!m) return whole ? [{ text: whole }] : [];
  const hm = (h: string, min: string) => `${h.padStart(2, "0")}:${min}`;
  return [
    { text: `${m[1]}:${m[2]}`, datetime: hm(m[1]!, m[2]!) },
    { text: " to " },
    { text: `${m[3]}:${m[4]}`, datetime: hm(m[3]!, m[4]!) },
  ];
};

const title = computed(() => str(props.heading));
// Rooms are numbered in order of first appearance so each gets its own colour (see .ev-room--1 to --4).
const roomIndex = computed(() => {
  const seen: string[] = [];
  for (const day of props.days ?? []) for (const s of day.sessions ?? []) {
    const r = str(s.room);
    if (r && !seen.includes(r)) seen.push(r);
  }
  return (room: string) => (seen.indexOf(room) % 4) + 1;
});
const days = computed(() =>
  (props.days ?? [])
    .filter((d) => Array.isArray(d.sessions) && d.sessions.length)
    .map((d, i) => ({
      key: `${uid}-day-${i}`,
      label: str(d.label),
      sessions: (d.sessions ?? [])
        .filter((s) => str(s.title))
        .map((s) => ({
          parts: parts(s.time),
          title: str(s.title),
          speaker: str(s.speaker),
          room: str(s.room),
          description: str(s.description),
        })),
    })),
);
const printPage = () => window.print();
</script>

<template>
  <section v-if="title || days.length" class="ev-section ev-schedule" :aria-labelledby="title ? `${uid}-h` : undefined">
    <div class="ev-wrap">
      <div class="ev-schedule__head">
        <h2 v-if="title" :id="`${uid}-h`" class="ev-h2">{{ title }}</h2>
        <button type="button" class="ev-button ev-button--small ev-print" @click="printPage">
          <Icon name="lucide:printer" size="18" aria-hidden="true" />
          {{ t("event.print", "Print this schedule") }}
        </button>
      </div>
      <nav v-if="days.length > 1" class="ev-schedule__jump" :aria-label="t('event.days', 'Jump to a day')">
        <a v-for="day in days" :key="day.key" :href="`#${day.key}`" class="ev-chip">{{ day.label }}</a>
      </nav>
      <div v-for="day in days" :id="day.key" :key="day.key" class="ev-day">
        <component :is="title ? 'h3' : 'h2'" v-if="day.label" class="ev-day__label">{{ day.label }}</component>
        <ol class="ev-sessions">
          <li v-for="(s, j) in day.sessions" :key="j" class="ev-session">
            <p class="ev-session__time">
              <template v-for="(part, k) in s.parts" :key="k"><time v-if="part.datetime" :datetime="part.datetime">{{ part.text }}</time><template v-else>{{ part.text }}</template></template>
            </p>
            <div class="ev-session__body">
              <component :is="title ? 'h4' : 'h3'" class="ev-session__title">{{ s.title }}</component>
              <p v-if="s.speaker" class="ev-session__speaker">{{ s.speaker }}</p>
              <p v-if="s.description" class="ev-session__text">{{ s.description }}</p>
            </div>
            <p v-if="s.room" class="ev-room" :class="`ev-room--${roomIndex(s.room)}`">
              <span class="ev-sr-only">{{ t("event.room", "Room") }}: </span>{{ s.room }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
