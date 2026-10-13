<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/polysite-logo-reversed.svg">
    <img src=".github/assets/polysite-logo.svg" alt="Polysite CMS" width="280">
  </picture>
</p>

<h3 align="center">polysite-theme-starter</h3>

<p align="center">
  The reference theme for <a href="https://github.com/polysites/polysite">Polysite</a>:<br>
  every block, a plain layout and a design-tokens stylesheet, ready to copy and make your own.
</p>

<p align="center">
  <a href="LICENSE.md"><img alt="License: Polysite Source-Available" src="https://img.shields.io/badge/license-Source--Available-3E5BA6"></a>
  <img alt="Nuxt layer" src="https://img.shields.io/badge/Nuxt-layer-00DC82">
  <img alt="Status: pre-1.0" src="https://img.shields.io/badge/status-pre--1.0-orange">
</p>

<p align="center">
  <a href="#what-this-is">What this is</a> ·
  <a href="#make-your-own-theme">Make your own theme</a> ·
  <a href="#how-blocks-are-picked">How blocks are picked</a> ·
  <a href="#whats-in-this-theme">What's inside</a> ·
  <a href="#license">License</a>
</p>

---

## What this is

A Polysite theme owns how a site *looks*. The core app owns data, routing, SEO and
caching, and ships only a plain fallback for each block so a site never breaks.
This repository is the complete, designed version of that look: all nine page
blocks (hero, text, FAQ, feature grid, form embed, signup form, leader spotlight,
donation tiers, commitments grid), a header and footer with places for the search
box, language switcher and share buttons that plugins draw, and a small set of design
tokens.

It is meant to be **copied**. Start every new theme from here, change the CSS, edit
the blocks you want to look different, and leave the rest alone.

## Make your own theme

This theme lives in the [`polysite-themes`](https://github.com/polysites/polysite-themes)
repository, which is the `themes/` folder of a Polysite checkout. From the Polysite root:

```bash
themes/scripts/new-theme.sh bakery "Bakery"
docker compose restart web cms
```

That copies this theme to `themes/polysite-theme-bakery/` and renames the layout, the
`components/` folder, the stylesheet and the CSS class for you. Then open **Sites** in the
admin, pick a site, and set its **Theme** to *Bakery*.

To do it by hand, copy the folder to `polysite-theme-<yourname>` (lowercase), rename
`layouts/starter.vue`, `components/starter/` and `assets/css/starter.css` to your name, change
the `theme-starter` class in the layout and the stylesheet, update the path in
`nuxt.config.ts`, and set a `label` in `theme.json`. (The script leaves the helper class
names that start with `starter-`, such as `starter-header-search`, as they are: they only
need to match between the layout and the stylesheet, so rename them if you like.)

The full walkthrough is in the Polysite Themes guide (`docs/` in that repository).

### Two ways to build

- **Copy everything** (set no `parent`). You own every block. Best for a very
  different design.
- **Inherit** (set `"parent": "starter"` in `theme.json`) and keep only the files you
  change. A block your theme doesn't provide comes from the starter, so a theme can
  be a layout plus one or two blocks. Best for most themes.

## How blocks are picked

For every block on a page, Polysite looks for a component in this order and uses
the first it finds:

1. the **site's theme**: `components/<theme>/<Name>Block.vue`
2. that theme's **parent**, then the parent's parent, and so on
3. the plain **core fallback**

Components are named by their folder, so `components/starter/HeroBlock.vue` is
`StarterHeroBlock` and `components/bakery/HeroBlock.vue` is `BakeryHeroBlock`. That
is why every theme can have its own `HeroBlock` even though all installed themes are
bundled into one build.

| Block (`blockType`) | File to add or override |
| --- | --- |
| `hero` | `HeroBlock.vue` |
| `textBlock` | `TextBlock.vue` |
| `faqAccordion` | `FaqAccordionBlock.vue` |
| `featureGrid` | `FeatureGridBlock.vue` |
| `formEmbed` | `FormEmbedBlock.vue` |
| `signupForm` | `SignupFormBlock.vue` |
| `leaderSpotlight` | `LeaderSpotlightBlock.vue` |
| `donationTiers` | `DonationTiersBlock.vue` |
| `commitmentsGrid` | `CommitmentsGridBlock.vue` |

A block receives the fields defined for it in the CMS as props; open the starter's
version to see exactly which. Adding a **new** kind of block also needs a block
definition in the CMS, which themes can't ship yet.

## Colors, fonts and tokens

Logo, brand colors, fonts, navigation, footer and social links are edited per site
in the admin and arrive as `--brand-primary`, `--brand-secondary`, `--font-body` and
`--font-heading`. Don't hard-code them.

`assets/css/starter.css` holds the theme's own tokens: container width, section
spacing, and card and button radius. They are scoped to the `.theme-starter` class on
the layout's root element instead of `:root`, because every installed theme shares
one build and a global rule would restyle every site. Components read them with a
fallback, `var(--poly-radius-card, 1rem)`, so a theme that inherits these blocks
without loading the file looks the same.

## What's in this theme

```text
layouts/starter.vue          header, navigation, footer, and the search, language-switcher and share slots
components/starter/*.vue     the nine blocks
assets/css/starter.css       design tokens, scoped to .theme-starter, and the styling of the search and share slots
nuxt.config.ts               loads the stylesheet into the app that extends this theme
theme.json                   the admin dropdown label, a description, and an optional parent
```

**Plugin slots and languages.** The layout draws `<SiteSlot name="search" />` in the header, `<SiteSlot name="language-switcher" />`
beside it and `<SiteSlot name="share" />` after the page; each draws nothing when the plugin is not installed or the
site has the feature off. All internal links go through `localePath()`, so they keep the visitor's language. The
guide's *The layout* page lists the slots and the `poly-*` classes the plugins draw.

**Placeholder content.** Copy and imagery in demos are fictional stand-ins, not any
real organization's branding.

## Local development

This theme is not run on its own. Keep it in a Polysite checkout under `themes/`
and use the core fast dev loop; see the main README.

## License

Licensed under the **Polysite Source-Available License, version 1.0**, ©
2026 Quick Support Today Inc. — see [LICENSE.md](LICENSE.md). The license
covers the whole Polysite product, including this theme, and a theme you build from
it is covered too; section 6 explains what you may do with themes and plugins. In
short, you may use and modify it for your own internal business purposes, or for
non-commercial purposes, and share it free of charge for non-commercial purposes.
Selling it or offering it as a service needs a separate written agreement. The
license text governs. For commercial use, contact the licensor through the
[`polysites`](https://github.com/polysites) organization on GitHub.
