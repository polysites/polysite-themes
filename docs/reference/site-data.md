# Site data and composables

These are available to layouts and blocks without importing anything.

## `useSite()`

```ts
const site = await useSite();
```

Returns a ref to the current site's settings, found by the request's domain, or `null` if
there is no matching site. Use it as a top-level `await` in `<script setup>`. The result is
shared across the page, so calling it again is free.

| Field | Meaning |
| --- | --- |
| `name`, `tagline` | Site name and tagline |
| `domain` | The domain the site answers on |
| `theme` | The theme's name |
| `logo` | The uploaded logo, as `{ url, alt }` |
| `showDonateButton` | Whether to show a Donate button |
| `primaryColor`, `secondaryColor` | The two brand colors |
| `bodyFontFamily`, `headingFontFamily` | Font names |
| `googleFontsUrl` | A stylesheet that loads those fonts |
| `headerNavItems` | `{ label, href }[]` for the header menu |
| `footerColumns` | `{ heading, links: { label, href }[] }[]` |
| `socialLinks` | `{ platform, url }[]` |
| `enabledModules` | Which content modules the site has turned on |
| `extensions` | The public settings of plugins, by plugin key (`extensions.search`, `extensions.share`, ...). Plugins read these themselves; a theme normally doesn't need them. Absent when no plugin has settings for the site |

When the site offers several languages (the Languages plugin), `useSite()` is read in the visitor's language, with the
site's default as the fallback, so the tagline and the menu labels arrive translated.

Prefer `useSiteBranding`, below, over reading these by hand: it handles the missing-value
cases.

## `useSiteBranding(site)`

```ts
const {
  siteName, tagline, showDonateButton,
  brandVars, navItems, footerColumns, socialLinks, socialIcons,
} = useSiteBranding(site);
```

It must be called **after** `await useSite()`, and takes the result. It also loads the
site's Google Fonts stylesheet. Colours and fonts fall back to neutral defaults when the site has none, and the
menu, footer columns and social links are simply empty (nothing is invented). Only `siteName` falls back to a
placeholder ("Polysite Party") when the site has no name.

| Value | Type |
| --- | --- |
| `siteName`, `tagline` | string, computed |
| `showDonateButton` | boolean, computed. True unless the site turned it off |
| `brandVars` | Object to bind with `:style`. Sets `--brand-primary`, `--brand-secondary`, `--font-body`, `--font-heading` and `font-family` |
| `navItems` | `{ label, href }[]` |
| `footerColumns` | `{ heading, links }[]` |
| `socialLinks` | `{ platform, url }[]` |
| `socialIcons` | Map from platform (`instagram`, `facebook`, `youtube`, `x`, `tiktok`, `linkedin`, `other`) to an icon name |

## CSS variables

Bound by `brandVars`, available inside the layout's root element:

| Variable | Meaning |
| --- | --- |
| `--brand-primary` | The site's primary color |
| `--brand-secondary` | The site's secondary color |
| `--font-body` | Body font stack |
| `--font-heading` | Heading font stack, when the site set one |

## Components and utilities

| Name | Use |
| --- | --- |
| `NuxtLink` | Links to pages on the same site |
| `Icon` | `<Icon name="lucide:menu" />` and other Iconify sets |
| `NuxtImg` | Optimized images |
| Tailwind utility classes | Available in every template |
| `useLocalePath()` | Returns `localePath(href)`: an internal address in the visitor's language (`/about` becomes `/fr/about`). A no-op on a single-language site |
| `useSiteLanguage()` | The request's language: `code`, `dir`, `defaultCode`, `languages`, `multilingual`, `localePath(href)` |
| `useT()` | Returns `t(key, englishText, values?)`: a fixed word in the visitor's language, or the English you wrote. See [The layout](/guide/layout#languages) |
| `<SiteSlot name="..." />` | Draws what plugins put in a named slot (`search`, `language-switcher`, `share`; `app` is placed by the app). Extra attributes go to the plugin's root element |
| `<TrackingSettingsLink />` | The "Cookie settings" link; draws nothing unless the analytics plugin filled the `footer-links` slot |
| `useFormIntake()`, `formIdOf()`, `<PolysiteFormFields />` | For form blocks, see [Forms in a theme](/guide/blocks#forms-in-a-theme) |

Anything else Nuxt provides (`useRoute`, `useRouter`, `ref`, `computed`, `watch`) is
auto-imported as usual.
