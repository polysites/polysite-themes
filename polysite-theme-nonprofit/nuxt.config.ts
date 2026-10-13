import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// nonprofit.css holds the tokens, the layout and the core blocks; nonprofit-blocks.css restyles the blocks-pack blocks.
export default defineNuxtConfig({
  css: [
    fileURLToPath(new URL("./assets/css/nonprofit.css", import.meta.url)),
    fileURLToPath(new URL("./assets/css/nonprofit-blocks.css", import.meta.url)),
  ],
});
