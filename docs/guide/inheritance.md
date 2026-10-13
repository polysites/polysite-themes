# Inheriting from a theme

A theme can name a **parent**. For every block it doesn't provide itself, Polysite then
uses the parent's version, so your theme only needs the files that differ.

## Set a parent

In your theme's `theme.json`:

```json
{
  "label": "Bakery",
  "parent": "starter"
}
```

The value is the parent's name: the part after `polysite-theme-`. Then delete the block
files you don't want to change from `components/bakery/`. Keep the ones you do.

A theme with a parent can be as small as:

```text
polysite-theme-bakery/
  layouts/bakery.vue          the header and footer (every theme needs its own)
  components/bakery/
    HeroBlock.vue             the one block that looks different
  assets/css/bakery.css       tokens
  nuxt.config.ts
  theme.json                  { "label": "Bakery", "parent": "starter" }
  package.json
```

Restart the web container after changing `theme.json`, because the parent links are read
when the app starts.

## The lookup order

For each block, Polysite checks the site's theme, then its parent, then the parent's
parent, and so on, then falls back to the neutral core version. The first match wins. The
themes in your own repository can use this: set `"parent": "starter"` and override
only what differs.

A theme always needs **its own layout**. Layouts are not inherited.

## Copy or inherit?

| Copy the starter (no parent) | Inherit (`"parent": "starter"`) |
| --- | --- |
| You own every block and can change any of them without surprises | You maintain only the files you changed |
| A very different design | A design that is mostly the starter's, restyled |
| Starter improvements never reach you | Starter improvements reach you automatically |

Inheriting is the better default. The trade-off is that a change to the parent's blocks
changes your theme too, so the parent and the child are best kept in step.

## Make inherited blocks look right in your theme

An inherited block is drawn with the **parent's markup** inside **your layout**. Two things
follow:

- Your theme's tokens must reach it. That is why the starter's blocks read their tokens
  with a fallback, `var(--poly-radius-card, 1rem)`: set the same variable under your own
  class and the inherited blocks pick it up, and if you don't, they use the default.
- Don't rely on your own CSS classes inside a block you didn't write. Style through
  tokens, or override the block.

## Limits

- Loops are ignored: if `a` names `b` and `b` names `a`, the chain stops at the repeat.
- The chain is limited to eight themes.
- A parent that isn't installed is skipped, and the core fallback is used for those blocks.
