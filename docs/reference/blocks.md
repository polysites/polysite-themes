# Blocks and their props

Each block type has a file name to use under `components/<theme>/`, and receives the fields
below as props. Every block also receives `id` and `blockType`. Props marked **required**
are always present; check the rest for `undefined`.

An *image* is `{ url?: string; alt?: string }`, and may be `null`.

| `blockType` | File name |
| --- | --- |
| `hero` | `HeroBlock.vue` |
| `textBlock` | `TextBlock.vue` |
| `faqAccordion` | `FaqAccordionBlock.vue` |
| `featureGrid` | `FeatureGridBlock.vue` |
| `formEmbed` | `FormEmbedBlock.vue` |
| `signupForm` | `SignupFormBlock.vue` |
| `leaderSpotlight` | `LeaderSpotlightBlock.vue` |
| `donationTiers` | `DonationTiersBlock.vue` |
| `commitmentsGrid` | `CommitmentsGridBlock.vue` |

## hero

A large banner with a heading and an optional image and button.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | required |
| `subheading` | string | |
| `image` | image | |
| `ctaLabel`, `ctaHref` | string | The button shows when both are set |

## textBlock

A heading and rich text.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | |
| `bodyHTML` | string | HTML rendered on the server from the editor's content. Render with `v-html` |

## faqAccordion

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | |
| `items` | `{ question: string; answer: string }[]` | required |

## featureGrid

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | |
| `features` | `{ title: string; description?: string }[]` | required |

## formEmbed

A form chosen in the CMS. Draw it with `PolysiteFormFields` (see [Forms in a theme](/guide/blocks#forms-in-a-theme)); nothing shows until a form is chosen.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | |
| `form` | id, or `{ id }` | The form to show. Pass it to `useFormIntake` |

## signupForm

A compact sign-up box over a form chosen in the CMS.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | required |
| `subheading` | string | |
| `ctaLabel` | string | Button text; overrides the form's own label |
| `form` | id, or `{ id }` | The form to submit to. Nothing shows until one is chosen |

## leaderSpotlight

A person, a quote and a button.

| Prop | Type | |
| --- | --- | --- |
| `name` | string | required |
| `quote` | string | required |
| `title` | string | |
| `photo` | image | |
| `ctaLabel`, `ctaHref` | string | The button shows when both are set |

## donationTiers

A row of suggested amounts linking to the donate page.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | required |
| `amounts` | `{ amount: number }[]` | required |
| `donateHref` | string | Defaults to `/donate` |

## commitmentsGrid

A grid of cards, each with a heading, text and an optional link.

| Prop | Type | |
| --- | --- | --- |
| `heading` | string | required |
| `items` | `{ heading: string; body?: string; ctaLabel?: string; ctaHref?: string }[]` | required |

The starter's version of each block is the best reference for how the props are used.
