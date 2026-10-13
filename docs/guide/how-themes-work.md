# How themes work

## A theme is a Nuxt layer

Polysite's public site is a Nuxt app. A theme is a [Nuxt layer](https://nuxt.com/docs/getting-started/layers):
a folder of Vue components, layouts and config that the app *extends*. Polysite finds
every `themes/polysite-theme-<name>/` folder that contains `layouts/<name>.vue` and
extends them all, with no list to maintain.

## One build, many looks

All installed themes are bundled into the same build, and a **site** chooses which
one it uses. Each request looks up the site by its domain, reads its `theme` field,
and renders that theme's layout and blocks (`<NuxtLayout :name="site.theme">`, which is why
a layout is named after its theme rather than `default.vue`). A site with no theme set uses
the core's own plain `default` layout. So two sites on one installation can look completely
different without a second deployment.

A new site starts on the starter theme when it is installed, otherwise on the first theme
found. The Theme list in the admin is filled from the `themes/` folder when the CMS starts, and
a site can only be saved with a theme that is installed.

That has one consequence that shapes everything else: **themes share a single
namespace**. If two themes both define a component called `HeroBlock`, one would
silently replace the other for every site. Polysite avoids this by naming theme
components after their folder:

| File | Registered as |
| --- | --- |
| `components/starter/HeroBlock.vue` | `StarterHeroBlock` |
| `components/bakery/HeroBlock.vue` | `BakeryHeroBlock` |
| `components/my-theme/HeroBlock.vue` | `MyThemeHeroBlock` |

## How a block gets drawn

A page in the CMS is a list of blocks, each with a type such as `hero` or `faqAccordion`.
For every block, Polysite uses the first component it finds in this order:

1. **The site's theme:** `components/<theme>/<Name>Block.vue`
2. **That theme's parent**, and its parent's parent (set in `theme.json`)
3. **The core fallback:** a deliberately plain version built into Polysite

So a theme only needs to provide the blocks it wants to draw differently. See
[Blocks](/guide/blocks) and [Inheriting from a theme](/guide/inheritance).

## What the core owns, and what a theme owns

| The core app | A theme |
| --- | --- |
| Fetching pages and site settings from the CMS | The header, navigation and footer |
| Routing, SEO tags, caching and revalidation | How each block looks |
| Picking the right theme and block per request | Design tokens and CSS |
| Per-site custom CSS and JavaScript from the admin | Client-specific pages and components |
| A plain fallback for every block | Anything visual an editor can't set in the admin |
| The language of a request (`/fr/...`), `<html lang dir>`, `hreflang` and the sitemap | Keeping its own links in the visitor's language (`localePath`) |
| The parts plugins draw (search box, language switcher, share buttons, consent notice) | Deciding where those parts go in the layout, and how they look |
| The 404 and server-error page, with its words in the visitor's language | Nothing: it is outside every layout, so a theme cannot restyle it |

Editors set the logo, brand colors, fonts, navigation, footer links and social links
per site in the admin. Your theme reads them instead of hard-coding them, which is why
the same theme can serve many sites.

## What a theme can't do yet

A theme can restyle and replace the blocks that exist. It **cannot add a new kind of
block**, because every block also needs a definition in the CMS that editors fill in,
and a theme can't ship that today. If you need a new block type, it has to be added to
Polysite itself.

A theme **cannot restyle the error page** either. It is the app's own `error.vue`, which renders
outside any layout (it must work even when the site could not be loaded), so it carries Polysite's
mark and colours in every theme.
