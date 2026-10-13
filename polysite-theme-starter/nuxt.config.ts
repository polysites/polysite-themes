import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// The tokens stylesheet is the main place to change this theme's look.
export default defineNuxtConfig({
  css: [fileURLToPath(new URL("./assets/css/starter.css", import.meta.url))],
});
