# Testing and troubleshooting

## How to test a theme

1. **Use a real site with real content.** The demo sites have most block types. Open pages
   that use each block you changed.
2. **Click through, don't just load.** Navigate between pages with the menu. Bugs that only
   show after client-side navigation, such as a drawer that stays open, are invisible on a
   fresh load.
3. **Try more than one site.** Put your theme on a second site with different colors and
   fonts, and check nothing is hard-coded.
4. **Try empty and long content.** A block with no optional fields, a very long heading, a
   page with no image.
5. **Check small screens and keyboard use.** Tab through the header and menus.
6. **Look at the browser console.** A theme should add no warnings.

## "I don't see my change"

| Symptom | Likely cause and fix |
| --- | --- |
| A new theme isn't in the admin's dropdown | The folder isn't named `polysite-theme-<name>`, has no `layouts/<name>.vue`, or the containers weren't restarted. Restart `web` and `cms` |
| A new block file has no effect | New files are only discovered at start-up. Restart `web`. Check the folder name matches the theme name exactly, and the file is named like `HeroBlock.vue` |
| An edit to an existing file doesn't show | Reload once. If it still doesn't, check the web container's log for a compile error |
| `theme.json` parent change has no effect | Parent links are read at start-up. Restart `web` |
| A page shows a plain, unstyled block | No theme in the chain provides that block, so the core fallback was used. Check the file name and folder |
| A page shows "Unknown block type" | The block type isn't one Polysite knows. It has to be added to Polysite itself |
| A Tailwind class does nothing | Tailwind builds only the classes it finds as complete strings in your files. Write `px-6`, not `"px-" + n`. Restart `web` if the theme folder is new: the list of folders Tailwind scans (`apps/web/assets/css/layer-sources.css`) is rewritten at start. A class used *only* in a client theme or plugin layer once generated nothing; that is fixed by this file, so if it still happens check the file lists your theme |
| A link on a multi-language site goes to the English page | The link is not wrapped in `localePath()`, see [The layout](/guide/layout#languages) |
| A plugin's part (search box, share buttons, language switcher) does not show | The layout has no `<SiteSlot name="..." />` for it, or the site has that feature switched off (a slot draws nothing then), see [The layout](/guide/layout#places-for-plugins-slots) |
| A style leaks onto other sites | The CSS isn't scoped. Put it under your theme's class, see [Styling](/guide/styling) |
| Menus stay open after a click | Close them on route change, see [The layout](/guide/layout) |
| The page returns a 500 | Read the web container's log (`docker logs polysite-web-1`). The first error line names the file |

## Useful commands

```bash
docker logs --tail 40 polysite-web-1      # compile errors and warnings
docker restart polysite-web-1             # pick up new files and parent changes
```

Wait for the site to answer before testing again: a request during a restart can hang for
several seconds rather than fail.

## Checklist before you share a theme

- [ ] It works on at least two sites with different colors and fonts
- [ ] No brand color, font, name or logo is hard-coded
- [ ] CSS is scoped to the theme's class, nothing global
- [ ] Internal links use `NuxtLink` and `localePath()`
- [ ] The layout places the `search`, `language-switcher` and `share` slots (they draw nothing when a site has the feature off)
- [ ] Images have alt text and menus work from the keyboard
- [ ] No copy or imagery belongs to a real organization; demo content is fictional
- [ ] `theme.json` has a clear label
- [ ] The README says what the theme looks like and which Polysite version you tested with
- [ ] `LICENSE.md` is included, see [Sharing and license](/guide/sharing)
