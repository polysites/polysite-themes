# polysite-theme-nonprofit

**Nonprofit (example)**, a theme for [Polysite](https://github.com/polysites/polysite): a warm, hopeful look for a
community charity.

Cream background, a deep teal and sunflower pair, large rounded shapes, organic picture frames, a wavy footer edge and one
unmissable Donate button. Light and dark variants, reduced-motion friendly, mobile first, AA text contrast.

## What it shows

It draws all the core's campaign blocks in its own style: `donationTiers` (round amount buttons that link to the donate page
with `?ask=<amount>`), `commitmentsGrid` ("what we do" and "our promises" cards), `leaderSpotlight` (a founder's quote on a teal
card), `signupForm` (newsletter) and the volunteer form. The `blocks-pack` blocks are restyled in
`assets/css/nonprofit-blocks.css`: key figures on a teal band, testimonials, team, timeline, gallery, hours and contact.

The header's Donate button follows the site's *Show Donate button* setting and links to `/donate`.

## Demo site

`showcase/site.json` is a complete fictional charity ("Brookside Neighbours": five pages, a volunteer form, a newsletter form,
generated SVG artwork in `showcase/images/`) to load as its own demo site.
Every name and person in it is made up, and the donate page takes no payment.

## Use it

Mount this folder as `themes/polysite-theme-nonprofit/` in a Polysite checkout, restart the web and CMS containers, then choose
**Nonprofit (example)** for a site under **Sites** in the admin.

## License

Polysite Source-Available License, version 1.0, see [LICENSE.md](LICENSE.md).
