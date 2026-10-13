#!/usr/bin/env bash
# Creates polysite-theme-<name>/ from the starter theme, renamed and ready to
# mount. Needs only bash, sed and cp. Usage:
#
#   scripts/new-theme.sh <name> ["Display label"]
#
# <name> is lowercase letters, digits and hyphens, starting with a letter.
set -euo pipefail

name="${1:-}"
label="${2:-}"

if ! [[ "$name" =~ ^[a-z][a-z0-9-]*$ ]]; then
  echo "Usage: scripts/new-theme.sh <name> [\"Display label\"]" >&2
  echo "  <name>: lowercase letters, digits and hyphens, starting with a letter (e.g. bakery)" >&2
  exit 1
fi
[ -n "$label" ] || label="$name"

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$root/polysite-theme-starter"
dest="$root/polysite-theme-$name"

if [ "$name" = "starter" ] || [ -e "$dest" ]; then
  echo "Refusing to overwrite $dest" >&2
  exit 1
fi

cp -r "$src" "$dest"
rm -rf "$dest/.git" "$dest/node_modules" "$dest/.nuxt"

mv "$dest/layouts/starter.vue" "$dest/layouts/$name.vue"
mv "$dest/components/starter" "$dest/components/$name"
mv "$dest/assets/css/starter.css" "$dest/assets/css/$name.css"

# portable in-place edit (GNU and BSD sed)
edit() { sed -i.bak "$1" "$2" && rm -f "$2.bak"; }

edit "s/theme-starter/theme-$name/g" "$dest/layouts/$name.vue"
edit "s#css/starter.css#css/$name.css#" "$dest/layouts/$name.vue"
edit "s/theme-starter/theme-$name/g" "$dest/assets/css/$name.css"
edit "s#assets/css/starter.css#assets/css/$name.css#" "$dest/nuxt.config.ts"
edit "s/polysite-theme-starter/polysite-theme-$name/g" "$dest/package.json"
edit "s#\"description\": \".*\"#\"description\": \"A Polysite theme layer, extended by apps/web. Not run standalone.\"#" "$dest/package.json"
edit "s#\"label\": \".*\"#\"label\": \"$label\"#" "$dest/theme.json"
edit "s#\"description\": \".*\"#\"description\": \"A Polysite theme.\"#" "$dest/theme.json"

cat > "$dest/README.md" <<README
# polysite-theme-$name

$label, a theme for [Polysite](https://github.com/polysites/polysite).

Created from \`polysite-theme-starter\`. See the Polysite Themes docs for how to edit
the layout, the blocks in \`components/$name/\`, and the tokens in
\`assets/css/$name.css\`.

## Use it

Mount this folder as \`themes/polysite-theme-$name/\` in a Polysite checkout, restart
the web and CMS containers, then choose it for a site under **Sites** in the admin.

## License

Polysite Source-Available License, version 1.0, see [LICENSE.md](LICENSE.md).
README

echo "Created $dest"
echo "Next: docker compose restart web cms, then pick \"$label\" for a site in the admin."
