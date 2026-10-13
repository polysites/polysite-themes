# Quick start

You will create a theme called **bakery**, add it to a site, and change how it looks.
It takes a few minutes.

## Before you start

Have a Polysite development stack running with the demo data. The main docs'
*Getting started* page covers it, and you should be able to open a site such as
`http://voidslate.localhost`.

## 1. Put this repository in `themes/`

If your Polysite checkout has no `themes/` folder yet, clone this repository into it:

```bash
git clone git@github.com:polysites/polysite-themes.git ../polysite-themes   # next to the polysite folder
```

If `themes/` already exists (it may hold client themes), you can skip this.

## 2. Create your theme

From the Polysite checkout:

```bash
themes/scripts/new-theme.sh bakery "Bakery"
```

This copies the starter to `themes/polysite-theme-bakery/` and renames everything
that needs renaming. The name is lowercase letters, digits and hyphens. The second
argument is the label editors will see in the admin.

## 3. Restart so Polysite finds it

New folders are discovered at start-up:

```bash
docker compose restart web cms
```

## 4. Choose it for a site

1. Open the admin at `http://polysite.localhost/admin` and sign in.
2. Open **Sites** and pick a site.
3. Set **Theme** to **Bakery** and save.

Reload the site. It looks the same as the starter, which is the point: you now have a
complete theme that is yours to change.

## 5. Make your first change

Open `themes/polysite-theme-bakery/assets/css/bakery.css` and make buttons square:

```css
.theme-bakery {
  --poly-radius-button: 0.25rem;
}
```

Save and reload. The call-to-action buttons and form fields lose their round ends.
Editing an existing file updates the page on its own; only *new* files and folders
need a restart.

## 6. Change a block

Open `components/bakery/HeroBlock.vue`. Change the heading's classes, for example swap
`font-black` for `font-light`, and save. Only the Bakery site's hero changes, because
the component belongs to your theme.

## 7. Change the layout

Open `layouts/bakery.vue` and edit the header or footer markup. The navigation, logo
and footer links still come from each site's settings in the admin.

## What next

- [How themes work](/guide/how-themes-work) explains what you just did.
- [Inheriting from a theme](/guide/inheritance) shows how to keep only the files you
  changed, instead of a full copy of the starter.
- [Testing and troubleshooting](/guide/troubleshooting) covers "I don't see my change".
