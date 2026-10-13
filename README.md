<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/public/logo-horizontal-reversed.svg">
    <img src="docs/public/logo-horizontal.svg" alt="Polysite CMS" width="320">
  </picture>
</p>

<h3 align="center">Polysite Themes</h3>

<p align="center">
  The themes for <a href="https://github.com/polysites/polysite">Polysite</a>, and the guide to building your own.
</p>

<p align="center">
  <a href="LICENSE.md"><img alt="License: Polysite Source-Available" src="https://img.shields.io/badge/license-Source--Available-3E5BA6"></a>
  <img alt="Nuxt layers" src="https://img.shields.io/badge/Nuxt-layers-00DC82">
  <img alt="Status: pre-1.0" src="https://img.shields.io/badge/status-pre--1.0-orange">
</p>

<p align="center">
  <a href="#whats-here">What's here</a> ·
  <a href="#make-a-theme">Make a theme</a> ·
  <a href="#use-it-with-polysite">Use it</a> ·
  <a href="#documentation">Documentation</a> ·
  <a href="#license">License</a>
</p>

---

## What's here

A Polysite **theme** decides how a site looks: its header and footer, and how every block on
a page is drawn. Themes are picked per site at runtime, so two sites on one Polysite
installation can look completely different.

| Folder | What it is |
| --- | --- |
| [`polysite-theme-starter/`](polysite-theme-starter/) | The reference theme: all nine page blocks, a layout with places for the search, language-switcher and share plugins, and design tokens. Copy it to start your own |
| [`scripts/new-theme.sh`](scripts/new-theme.sh) | Creates a renamed copy of the starter in one command (needs `bash`, `sed` and `cp`) |
| [`docs/`](docs/) | The developer guide: how to build a theme, blocks, plugin slots and languages, CSS, and how to add it to a site |

| Example themes | Ten complete example sites, each a theme with fictional demo content (`showcase/site.json`), generated artwork and a screenshot: [`salon`](polysite-theme-salon/), [`portfolio`](polysite-theme-portfolio/), [`resume`](polysite-theme-resume/), [`blog`](polysite-theme-blog/), [`restaurant`](polysite-theme-restaurant/) (English and French), [`helpdesk`](polysite-theme-helpdesk/), [`agency`](polysite-theme-agency/), [`event`](polysite-theme-event/), [`shop`](polysite-theme-shop/) and [`nonprofit`](polysite-theme-nonprofit/). They need the `blocks-pack` plugin for a few blocks. |

Themes built for one client are kept in their own private repositories and mounted beside these; this repository holds only the starter and the example themes above.

## Make a theme

From a Polysite checkout that has this repository as its `themes/` folder:

```bash
themes/scripts/new-theme.sh bakery "Bakery"
docker compose restart web cms
```

Then open **Sites** in the admin and set a site's **Theme** to *Bakery*. It looks like the
starter, and is yours to change. The [quick start](docs/guide/quick-start.md) walks through
the first edits.

## Use it with Polysite

Clone this repository next to the Polysite core and tell the core where it is (the core's README, "Themes and plugins", has the full steps):

```bash
git clone git@github.com:polysites/polysite-themes.git      # next to the polysite folder
# in polysite/.env:  POLYSITE_THEMES_DIR=../polysite-themes
cd polysite && docker compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.workspace.yml up -d --build
```

Cloning it into a `themes/` folder inside the core still works too. In the guides, `themes/` means wherever this repository is.

Polysite finds every `themes/polysite-theme-<name>/` folder that has `layouts/<name>.vue`,
so there is nothing to register by hand. A site with no theme set (or no themes installed)
uses the core's own plain `default` layout.

Themes are fixed at build time, like plugin web parts: the published Polysite images contain
the core only, so a server that uses a theme runs an image built from source with `themes/` present
(see the Polysite docs, *Releasing*, "Plugins and themes").

## Documentation

The guide lives in [`docs/`](docs/) and builds into a small site (VitePress). To read it
locally, with no Node on your machine:

```bash
docker run --rm -p 4173:4173 -v "$(pwd)/docs:/work" -w /work -e DOCS_BASE=/ node:22 \
  sh -c "npm ci && npx vitepress dev --host 0.0.0.0 --port 4173"
```

Then open <http://localhost:4173>. The pages are also plain Markdown, readable on GitHub:

| Guide | |
| --- | --- |
| [Quick start](docs/guide/quick-start.md) | Make a theme and see it on a site |
| [How themes work](docs/guide/how-themes-work.md) | The ideas behind it |
| [The layout](docs/guide/layout.md) · [Blocks](docs/guide/blocks.md) · [Styling](docs/guide/styling.md) | What you change, including plugin slots, languages and the error page |
| [Inheriting from a theme](docs/guide/inheritance.md) | Keep only the files you change |
| [Add a theme to a site](docs/guide/installing.md) · [Troubleshooting](docs/guide/troubleshooting.md) | Running it |
| [Sharing and license](docs/guide/sharing.md) | What you may do with a theme |
| [Reference](docs/reference/blocks.md) | Block props, site data, `theme.json` |

## License

Licensed under the **Polysite Source-Available License, version 1.0**, ©
2026 Quick Support Today Inc. — see [LICENSE.md](LICENSE.md). The license covers the whole
Polysite product, including these themes, and a theme you build from them is covered too.
In short, you may use and modify them for your own internal business purposes or for
non-commercial purposes, and share a theme free of charge. For now themes can't be sold
(section 8). The license text governs. For anything beyond that, contact the licensor
through the [`polysites`](https://github.com/polysites) organization on
GitHub.

The licence is under review before the first public release, so this text may change; `LICENSE.md` is the
version that governs today.
