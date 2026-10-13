import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
export default defineNuxtConfig({
  css: [fileURLToPath(new URL("./assets/css/restaurant.css", import.meta.url))],
});
