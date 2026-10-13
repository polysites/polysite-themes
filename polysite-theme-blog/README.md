# polysite-theme-blog

**Blog (example)**: a personal writer's blog theme for [Polysite](https://github.com/polysites/polysite).
One of the generic showcase themes: everything in it (the name "Small Hours", the writer, the posts and the
pictures) is a made-up placeholder.

It is reading-first: paper and ink colours with a dark variant, a serif at a measure of about 65 characters,
a centred masthead instead of a bar, and long-form articles.

## What it shows

- **The journal.** The posts plugin's list and article pages, restyled in `assets/css/blog.css`: an editorial list with
  small thumbnails, category filters, a magazine-width picture and a drop cap on the first paragraph of an article.
  Set the news section's address and label per site (the demo uses `journal` / "Journal").
- **Reading time and byline.** The article's byline and date come from the plugin; the reading time is worked out in the
  browser from the words on the page (see `layouts/blog.vue`) and drawn by CSS.
- **Search in the masthead** (`search` slot) and **share buttons under the post** (`share` slot, the site chooses
  "where the theme puts it").
- **An RSS link** in the footer (`/feed.xml`, drawn by the posts plugin).
- **A newsletter box**: the `signupForm` block, restyled as a boxed letter.
- Blocks restyled or overridden: hero, text, FAQ, feature grid (as numbered notes), form embed, sign-up form; and, from
  the blocks pack, stats, timeline and CTA.

## Use it

Mount the folder as `themes/polysite-theme-blog/`, restart the web and CMS containers and choose **Blog (example)** for a
site under **Sites**. No other setting is needed. It works with only the core; the posts, search and share plugins add the
journal, the search box and the share buttons.

The colours come from the site's two brand colours (`--brand-primary` is the accent; the demo uses a brick red). The fonts
are system fonts, so nothing is downloaded from outside.

## The demo content

`showcase/site.json` is a complete fictional site (six pages, nine posts in three categories, two forms) and
`showcase/images/` holds its original SVG artwork. It is demo content you can load into a development site to see the theme with content.

`showcase/screenshot.png` is the home page at 1280 pixels wide.

## Files

```text
layouts/blog.vue            masthead, content column, footer; places the search, language and share slots
assets/css/blog.css         the whole look: tokens (.theme-blog), blocks, posts, forms, footer, dark mode
components/blog/*.vue       the blocks this theme draws itself
showcase/                   the demo site and its artwork
```

All rules are scoped to `.theme-blog`, because every installed theme shares one stylesheet.
