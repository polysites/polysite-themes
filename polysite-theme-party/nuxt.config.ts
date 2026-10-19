import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// party.css only changes the Nonprofit tokens and adds the campaign chrome; every block is the Nonprofit theme's.
export default defineNuxtConfig({
  css: [fileURLToPath(new URL("./assets/css/party.css", import.meta.url))],
});
