# polysite-theme-helpdesk

**Help centre (example)**: a knowledge-base theme for [Polysite](https://github.com/polysites/polysite). One of the
generic showcase themes: the demo site ("Fernleaf", a made-up planner app), its articles and its pictures are placeholders.

Calm blue and neutral greys, dense but readable, high contrast, with a dark variant for `prefers-color-scheme: dark`. System
fonts only.

## What it shows

- **A search box in the banner.** The hero block draws the search plugin's `search` slot as a large field in the middle of
  the banner (the header carries a smaller one on every other page). Without the search plugin the headline stands alone.
- **Topic cards.** The `commitmentsGrid` block is drawn as clickable category cards with an icon each (drawn in CSS).
- **A sidebar of topics on article pages.** The layout builds it from the site's own menu data: the header menu (minus its last
  item, which is the "Contact support" button) and the footer columns after the first. The home page is a full-width landing
  page without it. On a narrow screen the sidebar collapses into a "Help topics" disclosure.
- **FAQ blocks per topic**, numbered steps (the feature grid), a **status panel** (the `stats` block, its first figure shown with a
  green dot), plans (`pricing`), integration names (`logos`) and support hours (`hours-contact`) from the blocks pack.
- **A contact form** (`formEmbed`) and share buttons after an article (`share` slot, when the site turns them on).

## Use it

Mount the folder as `themes/polysite-theme-helpdesk/`, restart the web and CMS containers, and choose **Help centre
(example)** for a site. Set the site's menu so that the topics come first and the contact page is the **last** item.

## The demo content

`showcase/site.json` is a complete fictional site (six pages, one form, two original SVG pictures) for loading into a development site to see the theme with content.

`showcase/screenshot.png` is the home page at 1280 pixels wide.

## Files

```text
layouts/helpdesk.vue              top bar, sidebar of topics, footer; places the search, language and share slots
assets/css/helpdesk.css           the whole look, scoped to .theme-helpdesk
components/helpdesk/*.vue         hero (with search), text, FAQ, steps, topic cards, forms, and the topic list
showcase/                         the demo site, its artwork and screenshot
```
