# polysite-theme-event

**Event (example)**, a theme for [Polysite](https://github.com/polysites/polysite): a loud, high-contrast poster
look for a one-weekend conference or festival.

Huge capitals, thick black outlines, hard offset shadows and flat colour. The date and venue are plain text in the hero (no
scripts, no countdown timer). Light mode is a yellow-and-cream poster, dark mode is a night version of it. The site's primary
colour is the accent (red) and its secondary colour the pop colour (yellow).

## What it shows

- A hero with the name, a taped-on date and venue label and a poster picture; a stats band; speakers with `team`; ticket
  tiers with `pricing`; sponsors with `logos`; venue details with `hours-contact` and a `gallery` (including a site plan);
  an FAQ; a registration form.
- **The schedule** (`components/event/ScheduleBlock.vue` replaces the plugin's plain schedule for sites using this theme):
  a jump link per day, sessions as rows with coloured room labels, a "Print this schedule" button, and print styles in
  `assets/css/event-blocks.css` that drop the header, footer and buttons and put each day on its own page.

## Demo site

`showcase/site.json` is a complete fictional festival ("Sundial Weekend": five pages, a registration form, generated SVG
artwork in `showcase/images/`) to load as its own demo site.
Everything in it is made up.

## Use it

Mount this folder as `themes/polysite-theme-event/` in a Polysite checkout, restart the web and CMS containers, then choose
**Event (example)** for a site under **Sites** in the admin. The last menu item that points at tickets, a registration page or
"book"/"join" is drawn as the header's button.

## License

Polysite Source-Available License, version 1.0, see [LICENSE.md](LICENSE.md).
