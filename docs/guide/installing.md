# Add a theme to a site

## Locally

1. Put the theme folder in your Polysite checkout as `themes/polysite-theme-<name>/`. If you
   created it with `new-theme.sh` it is already there.
2. Restart the containers that scan the folder:

   ```bash
   docker compose restart web cms
   ```

3. In the admin, open **Sites**, choose a site, set **Theme** to your theme's label, and save.

Polysite treats a folder as a theme when both of these are true:

- the folder is named `polysite-theme-<name>` with a lowercase name, and
- it contains `layouts/<name>.vue`.

The label in the admin's dropdown comes from `theme.json`. If `theme.json` is missing or can't
be read, the dropdown shows the raw name instead. A site can only be saved with a theme that is
installed (the admin says "Unknown theme" otherwise).

Changing a site's theme is an administrator task.

## The core's default

Polysite ships a plain default layout and plain blocks, used when a site has no theme or a
theme doesn't provide a block. A theme is never needed for a site to render, only for it to
look the way you want. With no themes installed at all, the Theme list offers just "Default".

## In production

The theme folders are **not part of the main Polysite repository**, and the published Polysite
images contain the core only. Themes are Nuxt layers, so they are fixed when the web image is
built: a server that uses a theme runs an image built from source with `themes/` beside the
code, not the stock image. How that derived image is built and pointed at (`POLYSITE_CMS_IMAGE`,
`POLYSITE_WEB_IMAGE`, and labelling it with `POLYSITE_VERSION`) is in the Polysite docs under
*Releasing*, "Plugins and themes". In outline, on the machine that builds:

```bash
cd polysite   # the core; polysite-themes sits next to it
git clone git@github.com:polysites/polysite-themes.git ../polysite-themes   # first time only
git -C ../polysite-themes pull                                                    # to update
# add a private client theme inside the polysite-themes folder: git clone <its repository> polysite-theme-<name>
docker compose -f docker-compose.yml -f docker-compose.workspace.yml build web cms   # builds with the current themes
```

Then deploy that image the way the Polysite docs describe. If you forget the `pull`, the build
contains the previous version of your themes. (The exact production steps are still being
settled with the release process: to confirm against the Polysite *Deploying* guide.)

The CMS container also reads the `themes/` folder, but only to fill the Theme dropdown.

## Using several theme repositories

Everything beside the starter in `themes/` is picked up the same way, whatever repository it
came from. A client theme kept in its own repository can sit next to the ones from this
repository; just clone it into `themes/`.

## Removing a theme

Switch every site that uses the theme to another one first, then delete the folder and
restart. Don't remove a theme that a site still points at.
