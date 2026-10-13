import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// agency.css holds the tokens and the core blocks; agency-blocks.css restyles the blocks-pack blocks and the plugins' pages.
export default defineNuxtConfig({
  css: [
    fileURLToPath(new URL("./assets/css/agency.css", import.meta.url)),
    fileURLToPath(new URL("./assets/css/agency-blocks.css", import.meta.url)),
  ],
});
