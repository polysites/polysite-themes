import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// event.css holds the tokens, the layout and the core blocks; event-blocks.css restyles the blocks-pack blocks, styles the
// schedule and holds the print rules.
export default defineNuxtConfig({
  css: [
    fileURLToPath(new URL("./assets/css/event.css", import.meta.url)),
    fileURLToPath(new URL("./assets/css/event-blocks.css", import.meta.url)),
  ],
});
