import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
export default defineNuxtConfig({
  css: [fileURLToPath(new URL("./assets/css/helpdesk.css", import.meta.url))],
});
