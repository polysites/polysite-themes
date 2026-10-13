# theme.json

Every theme has a `theme.json` at its root.

```json
{
  "label": "Bakery",
  "description": "Warm and rounded.",
  "parent": "starter"
}
```

| Key | Required | Meaning |
| --- | --- | --- |
| `label` | recommended | The name shown in the admin's Theme dropdown. Without it the dropdown shows the folder name |
| `description` | no | A short note for people choosing a theme. Not shown yet |
| `parent` | no | The name of a theme to inherit blocks from, the part after `polysite-theme-`. See [Inheriting from a theme](/guide/inheritance) |

`label` is read when the CMS starts, and `parent` when the web app starts, so restart
`cms` and `web` after changing either.

## Other files a theme has

| File | Purpose |
| --- | --- |
| `layouts/<name>.vue` | **Required.** The site chrome. Without it the folder isn't treated as a theme |
| `components/<name>/*.vue` | The blocks this theme draws |
| `assets/css/<name>.css` | Design tokens and theme CSS |
| `nuxt.config.ts` | Loads the stylesheet. Merged into the app's config |
| `package.json` | A normal package file, as the starter has. Keep `"type": "module"` |
| `LICENSE.md` | Include it if you share the theme |

## Naming

- Folder: `polysite-theme-<name>`
- `<name>`: lowercase letters, digits and hyphens, starting with a letter
- A hyphenated name becomes PascalCase in component names: `my-theme` gives `MyThemeHeroBlock`
