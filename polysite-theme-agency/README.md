# polysite-theme-agency

**Agency (example)**, a theme for [Polysite](https://github.com/polysites/polysite): a confident marketing look for a
consultancy or software company.

Big type, generous white space, pill buttons and one gradient accent drawn in CSS from the site's two brand colours (no
images needed). It has a light and a dark variant (`prefers-color-scheme`), honours `prefers-reduced-motion`, and is built
mobile first with visible keyboard focus and AA text contrast.

## What it shows

- A hero with a call to action and an optional product picture; a quiet logos strip; a numbered feature grid; key figures
  (`stats`); three-plan `pricing` with the recommended plan marked in words and by a gradient border; `testimonials`;
  an FAQ accordion; a closing `cta` panel; a contact form.
- The news section from the posts plugin (the list and the articles), the header search box and the language links
  (plugin slots), and share buttons after the content.

The blocks from the `blocks-pack` plugin are restyled in `assets/css/agency-blocks.css`; the core blocks (hero, text, FAQ,
feature grid, forms) are components in `components/agency/`.

## Demo site

`showcase/site.json` is a complete fictional site ("Fernlight Studio": five pages, four posts, two forms, generated SVG
artwork in `showcase/images/`) to load as its own demo site. Every name, brand and person in it is made up.

## Use it

Mount this folder as `themes/polysite-theme-agency/` in a Polysite checkout, restart the web and CMS containers, then choose
**Agency (example)** for a site under **Sites** in the admin. Set the site's primary colour to something dark enough for white
text (the buttons use white on the accent) and its secondary colour to a contrasting hue for the gradient.

## License

Polysite Source-Available License, version 1.0, see [LICENSE.md](LICENSE.md).
