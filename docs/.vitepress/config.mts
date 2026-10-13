import { defineConfig } from "vitepress";

// Served from https://<org>.github.io/polysite-themes/ on GitHub Pages;
// DOCS_BASE=/ builds for local preview or a custom domain.
const base = process.env.DOCS_BASE ?? "/polysite-themes/";

export default defineConfig({
  title: "Polysite Themes",
  description: "Build themes for Polysite: start from the starter, restyle it, add it to a site.",
  base,
  lang: "en",
  cleanUrls: true,
  lastUpdated: true,
  head: [["link", { rel: "icon", href: `${base}favicon.svg`, type: "image/svg+xml" }]],

  themeConfig: {
    logo: { light: "/logo-horizontal.svg", dark: "/logo-horizontal-reversed.svg", alt: "Polysite CMS" },
    siteTitle: false,
    nav: [
      { text: "Quick start", link: "/guide/quick-start" },
      { text: "Guide", link: "/guide/how-themes-work" },
      { text: "Reference", link: "/reference/blocks" },
    ],
    sidebar: [
      {
        text: "Get started",
        items: [
          { text: "Overview", link: "/guide/" },
          { text: "Quick start", link: "/guide/quick-start" },
          { text: "How themes work", link: "/guide/how-themes-work" },
        ],
      },
      {
        text: "Build a theme",
        items: [
          { text: "The layout", link: "/guide/layout" },
          { text: "Blocks", link: "/guide/blocks" },
          { text: "Styling", link: "/guide/styling" },
          { text: "Inheriting from a theme", link: "/guide/inheritance" },
        ],
      },
      {
        text: "Ship it",
        items: [
          { text: "Add a theme to a site", link: "/guide/installing" },
          { text: "Testing and troubleshooting", link: "/guide/troubleshooting" },
          { text: "Sharing and license", link: "/guide/sharing" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Blocks and their props", link: "/reference/blocks" },
          { text: "Site data and composables", link: "/reference/site-data" },
          { text: "theme.json", link: "/reference/theme-json" },
        ],
      },
    ],
    outline: { level: [2, 3] },
    search: { provider: "local" },
    footer: {
      message: "Released under the Polysite Source-Available License. Not open source.",
      copyright: "© 2026 Quick Support Today Inc.",
    },
  },
});
