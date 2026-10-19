<script setup lang="ts">
// A once-per-visit pop-up: appears after a few seconds, never again in the same browser session once closed. Esc, the close button
// and a click on the backdrop all dismiss it; focus moves into the dialog and returns to the page when it closes.
const t = useT();
const localePath = useLocalePath();
const open = ref(false);
const dialog = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
let opener: HTMLElement | null = null;
const KEY = "pt-popup-seen";

function seen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
function close() {
  open.value = false;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode: it may show again, which is harmless */
  }
  opener?.focus?.();
}
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) close();
}
onMounted(() => {
  if (seen()) return;
  timer = setTimeout(async () => {
    opener = document.activeElement as HTMLElement | null;
    open.value = true;
    await nextTick();
    dialog.value?.focus();
  }, 7000);
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div v-if="open" class="pt-popup" @click.self="close">
    <div ref="dialog" class="pt-popup__card" role="dialog" aria-modal="true" aria-labelledby="pt-popup-title" tabindex="-1">
      <button type="button" class="pt-popup__close" :aria-label="t('party.close', 'Close')" @click="close">
        <Icon name="lucide:x" size="20" aria-hidden="true" />
      </button>
      <p class="pt-popup__eyebrow">{{ t("party.popupEyebrow", "This week") }}</p>
      <h2 id="pt-popup-title" class="pt-popup__title">{{ t("party.popupTitle", "Ten thousand more names by Friday") }}</h2>
      <p>{{ t("party.popupText", "Sign a petition, add your name to a pledge, or chip in. It takes a minute and it is how we win.") }}</p>
      <div class="pt-popup__actions">
        <NuxtLink :to="localePath('/petitions')" class="np-button" @click="close">{{ t("party.popupSign", "Add your name") }}</NuxtLink>
        <NuxtLink :to="localePath('/donate')" class="np-button np-button--donate" @click="close">{{ t("party.popupGive", "Chip in $5") }}</NuxtLink>
      </div>
      <button type="button" class="pt-popup__skip" @click="close">{{ t("party.popupSkip", "Not now") }}</button>
    </div>
  </div>
</template>
