# Styling

## What you have

- **Tailwind CSS v4**, already set up for the whole app, and picking up classes used in
  your theme's files. Use utility classes in templates as the starter does. (Tailwind skips
  folders that are their own git repository, which every client theme and plugin layer is, so
  the web app writes `assets/css/layer-sources.css` each time it starts, naming every theme and
  plugin layer it found so Tailwind scans them. You never edit that file, it is git-ignored, and
  it is why a **new** theme folder needs a restart before its classes exist.)
- **Your own CSS**: plain CSS files, or `<style scoped>` inside a component.
- **Per-site variables** from the admin, available anywhere inside the layout:

| Variable | Set by |
| --- | --- |
| `--brand-primary`, `--brand-secondary` | The site's two brand colors |
| `--font-body`, `--font-heading` | The site's font choices |

Don't hard-code a brand color or font in a theme. Read these variables, so that the same
theme looks right for every site that uses it.

## Design tokens

The starter keeps its own design decisions in `assets/css/<name>.css` as CSS variables:

```css
.theme-bakery {
  --poly-container: 64rem;       /* widest content column */
  --poly-section-y: 4rem;        /* vertical padding of full-width sections */
  --poly-radius-card: 1rem;      /* corners of cards and panels */
  --poly-radius-button: 9999px;  /* corners of buttons and form fields */
}
```

Components read them with a fallback, for example `rounded-[var(--poly-radius-card,1rem)]`.
Changing a token restyles every block that uses it, which makes tokens the fastest way to
give a theme a different feel. Add your own the same way: define it in the stylesheet, and
use it with a fallback.

## Scope your CSS to your theme

All installed themes share one build, and so one stylesheet. A rule that isn't scoped
applies to **every site**, whichever theme it uses. So:

- Put tokens and theme-wide rules under your theme's class (`.theme-bakery`), which the
  layout puts on its root element.
- Don't style bare elements globally (`body { }`, `h1 { }`, `a { }`). Write
  `.theme-bakery h1 { }` instead.
- Use `<style scoped>` for rules that belong to one component.
- Don't define variables on `:root`.

## Loading your stylesheet

`nuxt.config.ts` lists it, and the starter already does this for you:

```ts
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  css: [fileURLToPath(new URL("./assets/css/bakery.css", import.meta.url))],
});
```

Add more files to the `css` array if you split your styles. Build each path this way, from
the config file's own location, so it works wherever the theme is mounted.

## Fonts

Editors choose fonts per site, and Polysite loads them. Use `var(--font-body)` and
`var(--font-heading)` rather than a font name. If your design depends on a particular
typeface, tell the people running the sites which one to enter.

## Dark mode and images

There is no built-in dark mode: add it with a media query inside your own scope. For images
that come from the CMS (`image.url`), set an explicit height or `aspect-ratio` so the page
doesn't jump while they load.

## Right-to-left languages

A site can offer Arabic, Hebrew, Persian or Urdu, and Polysite then sets `<html dir="rtl">`. A stylesheet written with
logical properties turns around by itself; one written with `left` and `right` does not. Use:

| Instead of | Write |
| --- | --- |
| `margin-left`, `padding-right`, `border-left` | `margin-inline-start`, `padding-inline-end`, `border-inline-start` |
| `left: 1rem`, `right: 0` | `inset-inline-start: 1rem`, `inset-inline-end: 0` |
| `text-align: left` | `text-align: start` |
| `float: left` | `float: inline-start` |
| a corner like `border-radius: 0 8px 8px 0` | `border-start-end-radius` and `border-end-end-radius` |
| Tailwind `ml-3`, `pr-4`, `text-left` | `ms-3`, `pe-4`, `text-start` |

An arrow drawn as a character (`→`) points the wrong way: put `class="poly-arrow"` on it and Polysite mirrors it. Centring tricks
(`left: 50%` with `translateX(-50%)`) are fine as they are. `scripts/check-rtl.mjs` lists every left/right left in a theme:

```bash
docker run --rm -v "$PWD":/w -w /w node:22 node scripts/check-rtl.mjs
```

Add `rtl-ok` in a comment on a line that is meant to be physical.
