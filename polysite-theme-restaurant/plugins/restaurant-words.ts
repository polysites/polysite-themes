import fr from "../locales/fr.json";

// The fixed words this theme prints itself (no editor writes them). French only: English is the text written in the layout, so
// it needs no dictionary. Keys carry the theme's prefix so they cannot clash with another theme's or a plugin's.
export default defineNuxtPlugin({
  name: "restaurant-words",
  dependsOn: ["strings"],
  setup(nuxtApp) {
    nuxtApp.$strings.register("fr", fr);
  },
});
