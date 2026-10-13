# polysite-theme-restaurant

**Restaurant (example)**: a neighbourhood restaurant or café theme for [Polysite](https://github.com/polysites/polysite),
and the showcase for the **Languages (i18n) plugin**: the demo site is fully bilingual, English and French.
Everything in it (the name "Café Tilleul", the people, the dishes and the pictures) is a made-up placeholder.

Warm and colour-led: cream paper, terracotta and olive (the site's two brand colours), serif italics for the voice, a
dark variant for `prefers-color-scheme: dark`, and no web fonts.

## What it shows

- **A bilingual site.** The layout keeps every link in the visitor's language (`useLocalePath`), keeps the language switcher in
  the header bar on every width (restyled as a two-part toggle), and translates its own fixed words ("Menu", "Skip to the
  content", the footer headings) with a dictionary registered from `plugins/restaurant-words.ts`
  (`locales/fr.json`). Without the i18n plugin the theme is simply an English site: the switcher slot draws nothing.
- **A menu** from the blocks pack's `price-list` block: starters, mains, desserts and drinks, with tags and dotted leaders.
- **Opening hours and address** (`hours-contact`, on olive), a **gallery** of polaroid-style pictures, **testimonials**,
  a **timeline** and a **team** block for the story page, a **call-to-action** band, and a **reservation form**.
- **Search** in the footer (`search` slot).
- The core's hero (split layout), text, FAQ, feature grid (numbered highlight cards) and form blocks are drawn by
  `components/restaurant/`.

## Use it

Mount the folder as `themes/polysite-theme-restaurant/`, restart the web and CMS containers, and choose **Restaurant
(example)** for a site. The site's **last menu item** is drawn as the call-to-action button (reservations).

Colours come from the site: `--brand-primary` is the terracotta, `--brand-secondary` the olive.

## The demo content

`showcase/site.json` is a complete bilingual site (six pages, one form, ten original SVG pictures) for loading into a development site to see the theme with content.

The seeder skips the French when the i18n plugin is not installed. A site's form labels cannot be translated yet, so the
reservation form's labels are written in both languages ("Name / Nom").

## Files

```text
layouts/restaurant.vue         header (brand, menu, language switcher), footer, slots
assets/css/restaurant.css      the whole look, scoped to .theme-restaurant
components/restaurant/*.vue    hero, text, FAQ, feature grid and form blocks
plugins/restaurant-words.ts    registers the French words of the layout
locales/fr.json
showcase/                      the demo site, its artwork and screenshot
```
