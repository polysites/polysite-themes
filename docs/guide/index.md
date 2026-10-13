# Overview

This is the developer guide for building **Polysite themes**.

A theme decides how a Polysite site looks: the header and footer, and how every block
on a page is drawn. The core Polysite app handles data, routing, SEO and caching, so
a theme is only presentation: Vue components and CSS.

## What is in this repository

| Folder | What it is |
| --- | --- |
| `polysite-theme-starter/` | The reference theme. Copy it to start your own |
| `scripts/new-theme.sh` | Creates a renamed copy of the starter in one command |
| `docs/` | This guide |

This repository sits next to a Polysite checkout (or inside it as `themes/`). Client
themes that live in their own repositories can sit beside the others in this folder.

## What you need

- A running Polysite development stack. See *Getting started* in the main Polysite docs.
- Git and Docker. You do not need Node.js on your machine.
- Basic Vue and CSS. Tailwind CSS v4 is available but optional.

## Where to go next

1. [Quick start](/guide/quick-start): make a theme and see it on a site in a few minutes.
2. [How themes work](/guide/how-themes-work): the ideas behind it, so the rest makes sense.
3. [The layout](/guide/layout), [Blocks](/guide/blocks) and [Styling](/guide/styling):
   the three things you change to make a theme your own.
4. [Add a theme to a site](/guide/installing) and
   [Testing and troubleshooting](/guide/troubleshooting).
