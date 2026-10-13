# Blocks

A page is a list of blocks, and each block type has a component that draws it. Your theme
can draw any of them its own way.

## Override a block

Add a file named after the block, inside your theme's components folder:

```text
polysite-theme-bakery/
  components/
    bakery/
      HeroBlock.vue     draws `hero` blocks on sites that use this theme
```

Nothing is registered by hand. Restart once so the new file is found, and after that
edits reload on their own. The file names are listed in the
[block reference](/reference/blocks).

A theme that doesn't provide a block gets it from its parent, or from the neutral core
fallback. A theme made with `new-theme.sh` starts with all nine blocks copied from the
starter. Delete the ones you don't want to change and set a
[parent](/guide/inheritance) to inherit them.

## What a block receives

The CMS fields of the block arrive as **props**. Declare the ones you use:

```vue
<script setup lang="ts">
defineProps<{
  heading: string;
  subheading?: string;
  image?: { url?: string; alt?: string } | null;
  ctaLabel?: string;
  ctaHref?: string;
}>();
</script>

<template>
  <section class="relative">
    <img v-if="image?.url" :src="image.url" :alt="image.alt || heading" class="h-96 w-full object-cover" />
    <h1>{{ heading }}</h1>
    <p v-if="subheading">{{ subheading }}</p>
    <NuxtLink v-if="ctaLabel && ctaHref" :to="ctaHref">{{ ctaLabel }}</NuxtLink>
  </section>
</template>
```

Every block also receives `id` and `blockType`. If you don't declare them, Vue puts them on
the root element as HTML attributes. That is harmless, and you can use it, for example to
target a block with CSS.

Fields are **optional unless the CMS requires them**. Check for `undefined` before using
one, as above.

## Rules of thumb

- **Don't fetch data in a block.** Everything it needs, including images and linked
  documents, is already in its props.
- **Use `NuxtLink`** for links to pages on the same site, so navigation doesn't reload.
- **Always give images alt text**, falling back to a heading or name when the field is empty.
- **Keep the markup accessible.** Real headings, buttons for actions and links for
  navigation, and labels on form fields. The starter's blocks are a good model.
- **Rich text is HTML.** The text block's `bodyHTML` is produced on the server from the
  editor's content, and is rendered with `v-html`. Style it with `:deep()` selectors.
- **Build with the site's colors.** Use `var(--brand-primary)` and `var(--brand-secondary)`
  rather than a fixed color, so one theme works for every site.

## Forms in a theme

Forms are the one place a block does more than display its props, and Polysite does the
work for you. The `formEmbed` and `signupForm` blocks both receive a `form` prop, and two
things from the core app do the rest:

- **`useFormIntake(() => props.form)`** loads the form's fields in the browser, tracks what the
  visitor types, sends it, and keeps the errors, the confirmation and the state of the button.
  It also carries the spam protection, so you never handle a token or a trap field yourself.
- **`<PolysiteFormFields :intake="intake" />`** draws the fields, the errors and the button
  using plain markup with no styling of its own.

A block is then only the look:

```vue
<script setup lang="ts">
const props = defineProps<{ heading?: string; form?: number | string | { id?: number | string } | null }>();
const intake = useFormIntake(() => props.form);
</script>

<template>
  <section v-if="formIdOf(form)" class="my-form">
    <h2 v-if="heading">{{ heading }}</h2>
    <PolysiteFormFields :intake="intake" />
  </section>
</template>

<style scoped>
.my-form :deep(.poly-field) { margin-bottom: 1rem; }
.my-form :deep(.poly-submit) { background: var(--brand-primary); color: #fff; }
</style>
```

Style these classes (with `:deep()` in a scoped block, or from your own stylesheet):

| Class | Element |
| --- | --- |
| `poly-form` | the `<form>` |
| `poly-field`, `poly-field--<type>` | one field and its label and error; `<type>` is `text`, `email`, `select` and so on |
| `poly-label`, `poly-check` | a field label; a checkbox or radio row |
| `poly-required` | the asterisk on a required field |
| `poly-error`, `poly-form-message` | a field's error; the message under the form |
| `poly-message` | static text between fields |
| `poly-radios` | the options of a radio-button field |
| `poly-submit` | the button |
| `poly-confirmation` | what replaces the form after sending |
| `poly-privacy`, `poly-purpose`, `poly-policy-link` | the purpose text, and the link to the privacy policy |
| `poly-consent` | the consent checkbox row (a `poly-field` containing a `poly-check`) |
| `poly-captcha`, `poly-captcha-status` | the Turnstile widget's holder; the "checking" line while the built-in check runs |

Rules: render nothing when `formIdOf(form)` is empty, don't wrap the fields in your own
`<form>`, and leave the hidden trap field alone (it is off-screen on purpose).

## Adding a new kind of block

Not possible from a theme yet. Blocks are defined in the CMS, and a new type needs a
definition there as well as a component. If you need one, it has to be added to Polysite
itself, and once it exists a theme can draw it the usual way.

## Pages drawn by plugins

A content-type plugin (news and articles, for example) can draw its own pages, not through a block, so a theme gets
them without doing anything. They carry class names you can restyle from your layout's stylesheet; each plugin lists
its own in its README (for news: `plugins/posts/README.md`, "Styling it in a theme").
