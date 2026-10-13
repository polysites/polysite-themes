import { fileURLToPath } from "node:url";

// Nuxt layer config, merged into the app that extends this theme (apps/web).
// shop.css holds the tokens, the layout and the core blocks; shop-blocks.css restyles the blocks-pack blocks.
export default defineNuxtConfig({
  css: [
    fileURLToPath(new URL("./assets/css/shop.css", import.meta.url)),
    fileURLToPath(new URL("./assets/css/shop-blocks.css", import.meta.url)),
  ],
});
