# The layout

The layout is the site chrome that wraps every page: the header, navigation, footer
and anything else that appears on all pages. It lives at `layouts/<name>.vue` and its
file name must match the theme's folder (`polysite-theme-bakery` needs
`layouts/bakery.vue`). Polysite ignores a theme folder that has no such file.

Unlike a standard Nuxt app, the file is **not** called `default.vue`. Several themes
share one build, so each names its layout after itself, and the app picks one per
request with `<NuxtLayout :name="site.theme">`.

## A minimal layout

```vue
<script setup lang="ts">
const site = await useSite();
const localePath = useLocalePath();
const { siteName, navItems, footerColumns, brandVars } = useSiteBranding(site);
</script>

<template>
  <div class="site-shell theme-bakery" :style="brandVars">
    <header>
      <NuxtLink :to="localePath('/')">{{ siteName }}</NuxtLink>
      <nav>
        <NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <slot />

    <footer>
      <div v-for="col in footerColumns" :key="col.heading">
        <h4>{{ col.heading }}</h4>
        <NuxtLink v-for="l in col.links ?? []" :key="l.label" :to="localePath(l.href)">{{ l.label }}</NuxtLink>
      </div>
    </footer>
  </div>
</template>
```

`localePath` keeps a visitor's links in their language on a multi-language site and changes nothing on a
single-language one (see [Languages](#languages) below).

Three things in it are required, and the rest is yours:

- **`const site = await useSite()`** loads the current site's settings. It must be a
  top-level `await` in `<script setup>`, and `useSiteBranding` must come after it.
- **`:style="brandVars"` on the root element** applies the site's brand colors and
  fonts as CSS variables. Without it, `--brand-primary` and friends are not defined.
- **`<slot />`** is where the page renders.

Keep the `site-shell` class on the root, as every bundled theme does.

## What `useSiteBranding` gives you

| Value | What it is |
| --- | --- |
| `siteName`, `tagline` | Text for the header |
| `showDonateButton` | Whether the site wants a Donate button |
| `brandVars` | Style object to bind on the root element |
| `navItems` | The header menu, as `{ label, href }` |
| `footerColumns` | Footer columns, as `{ heading, links: [{ label, href }] }` |
| `socialLinks`, `socialIcons` | Social links as `{ platform, url }`, and an icon name for each platform |

Colours and fonts have neutral defaults when a site sets none. The menu, footer columns and social links
have none: a new site shows only its name until someone adds them, so nothing links to a page the site
doesn't have. (If a site has no name at all, `siteName` falls back to the placeholder "Polysite Party".)
`site.logo?.url` is the uploaded logo, when there is one. The full list is in the
[reference](/reference/site-data).

## Use NuxtLink for links to your own pages

`<NuxtLink :to="localePath('/about')">` switches pages in the browser without reloading, and a plain
`<a href>` reloads the whole app each time. Use `NuxtLink` for internal links, and a normal
`<a>` for `mailto:`, `tel:` and external addresses.

## Menus that open and close

State in the layout survives page changes, because the layout isn't re-created. A drawer
or dropdown that was open when a visitor clicked a link stays open unless you close it. Do
that when the route changes:

```ts
const menuOpen = ref(false);
const router = useRouter();
watch(() => router.currentRoute.value.fullPath, () => { menuOpen.value = false; });
```

Use `router.currentRoute`, as above. `useRoute()` inside a layout can hold the previous
page's route during a transition, so the watcher may not fire.

## Icons

`<Icon name="lucide:menu" />` draws an icon from the [Lucide](https://lucide.dev) set, and
other Iconify sets work the same way. Nothing needs installing.

## A "Cookie settings" link

If a site uses tracking tools that ask visitors first, visitors need a way to change their answer.
Place `<TrackingSettingsLink />` in the footer. It shows the "Cookie settings" link when the analytics plugin is installed and the site has a tool that asks, and nothing otherwise, so
it is safe on every site. It reopens Polysite's consent notice, whose classes (`poly-tracking*`) you can
restyle.

```vue
<footer>
  <p>&copy; {{ siteName }} <TrackingSettingsLink /></p>
</footer>
```

## Places for plugins: slots

Plugins add their own parts to a page through named slots, and a layout decides where each one goes. The layout
draws a slot with `<SiteSlot name="..." />`. A slot is **empty when no plugin fills it, or when the site has that
feature switched off**: it draws nothing at all, no wrapper and no gap, so it is safe to place on every theme,
whether or not any plugin is installed.

| Slot | Filled by | What it draws | Where to put it |
| --- | --- | --- | --- |
| `search` | Search plugin | A search box (`<form role="search">`) when the site has search on | The header |
| `language-switcher` | Languages (i18n) plugin | The links to this page in the languages it exists in | The header |
| `share` | Share plugin | The share buttons, when the site chose *where the theme puts it* and this kind of page is ticked | After the page's content |
| `app` | Several plugins | Things with no place of their own (a floating bar, the consent notice, head tags) | Already placed once by the app. Leave it alone |

```vue
<header>
  <!-- logo and menu ... -->
  <SiteSlot name="search" class="my-search" />
  <SiteSlot name="language-switcher" />
</header>

<slot />

<SiteSlot name="share" class="my-share" />
```

Any `class` (or other attribute) you give a slot is handed to the plugin's own root element: the `<form>` of the
search box, the `<nav>` of the share buttons. That is how to size or space them without a wrapper that stays
behind, empty, when the plugin is off. A wrapper around a slot would keep its padding and its place in a flex or
grid row even when there is nothing inside.

### Styling what a plugin draws

A plugin draws plain markup with `poly-` classes and leaves the look to you. Its own styles are minimal and follow the
text colour of whatever they sit in (`currentColor`), so a dark header gives you light controls without extra work.
Scope your rules to your theme's root class (`.theme-bakery .my-search .poly-search-input`) so they stay inside this
theme and win over the plugin's own rules.

| Plugin | Classes you can style |
| --- | --- |
| Search box | `poly-search-form`, `poly-search-input`, `poly-search-button` (and `poly-search-hidden`, the visually hidden label: leave it alone) |
| Search results page | `poly-search`, `poly-search-status`, `poly-search-hint`, `poly-search-results`, `poly-search-list`, `poly-search-item`, `poly-search-type`, `poly-search-snippet`, `poly-search-pages`; matches are wrapped in `<mark>` |
| Share buttons | `poly-share` (with a look modifier such as `poly-share--icons`, a place modifier `poly-share--inline` or `poly-share--floating`, and for the floating bar `poly-share--side` or `poly-share--bottom`), `poly-share-heading`, `poly-share-list`, `poly-share-item`, `poly-share-icon`, `poly-share-name`, `poly-share-status`, the two extra buttons `poly-share-native` and `poly-share-copy`, and one class per network (`poly-share-facebook`, `poly-share-x`, ...); `--poly-share-radius`, `--poly-share-bg` and `--poly-share-fg` set the corner radius and the floating bar's colours |
| Language switcher | `poly-language-switcher` (a `<nav>` holding a list of links; the current language has `aria-current="true"`) |
| Consent notice and "Cookie settings" link (analytics) | `poly-tracking`, `poly-tracking-text`, `poly-tracking-actions`, `poly-tracking-accept`, `poly-tracking-decline`, `poly-tracking-link`, `poly-tracking-settings` |

The plugins ship their own minimal styles, so each of these works unstyled. The starter theme only places and restyles
two of them in `assets/css/starter.css`: the header search box (`.starter-header-search`) and the share buttons
(`.starter-share`, which also sets `--poly-share-radius` to match its buttons). It leaves the language switcher on the
plugin's own look. Copy from there; the class names to match are the ones in the table above.

The share plugin has one more rule. A site can ask for its buttons *floating* (a bar over the page, drawn by the app
itself, no theme needed) or *where the theme puts it*. Only the second uses your `share` slot, and it then draws
nothing anywhere else, so a theme that places the slot never ends up with two sets of buttons.

## Languages

A site can offer several languages (the Languages plugin). Their addresses start with the language: `/fr/about`.
The app writes `<html lang dir>`, the `hreflang` links and the language-aware sitemap for you, so a theme does not.
What a theme must do is **keep its links in the visitor's language**:

```ts
const localePath = useLocalePath();   // a no-op on a site with one language
```

```vue
<NuxtLink :to="localePath('/')">{{ siteName }}</NuxtLink>
<NuxtLink v-for="item in navItems" :key="item.label" :to="localePath(item.href)">{{ item.label }}</NuxtLink>
```

Do this for the logo, the menu, the footer links and any fixed link you write yourself (such as `/donate`). Skip it and
a French visitor who clicks "About" lands on the English page. Put `<SiteSlot name="language-switcher" />` in the header
so visitors can change language. A theme that does none of this still works, in the site's default language.

Fixed words in your own markup that no editor writes ("Donate", "Menu") are English unless you translate them.
`useT()` reads a dictionary per language: `const t = useT();` then `t("theme.donate", "Donate")`. The second argument is
the English text, shown when a language has no entry, so English needs no dictionary. To add a language's words, register
a dictionary from a Nuxt plugin of your theme (a file in your theme's `plugins/` folder):

```ts
// polysite-theme-bakery/plugins/bakery-words.ts
import fr from "../locales/fr.json";

export default defineNuxtPlugin({
  name: "bakery-words",
  dependsOn: ["strings"],
  setup(nuxtApp) {
    nuxtApp.$strings.register("fr", fr);   // { "bakery.donate": "Faire un don", ... }
  },
});
```

Every installed theme is in the same build, so a theme's plugin runs for every site whatever its theme: give your keys
a prefix of your own (`bakery.`) so they cannot clash with another theme's, and with the core's and plugins' (`form.`,
`error.`, `language.`, `share.`, `search.`). A word with no entry for a language shows its English text, never a key.
The Languages plugin already supplies French, Spanish and German for the core's own words.

## The error page

The 404 and server-error page is the app's own (`error.vue`), outside every layout, so a theme does not draw it and
cannot restyle it. Its words follow the visitor's language, read from the address (`/fr/nothing` is a French 404 on a
site that offers French), and the home link keeps the language. If you want those words in another language, register
a dictionary with these keys, the same way as above: `error.notFound.heading`, `error.notFound.title`,
`error.notFound.detail`, `error.server.heading`, `error.server.detail`, `error.home` and `error.back`.

## Things that are not the layout's job

- **Per-site custom CSS and JavaScript** that an administrator enters is injected by the
  app for every theme. Don't re-add it.
- **Fetching page content.** Pages arrive already loaded; see [Blocks](/guide/blocks).
