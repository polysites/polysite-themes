# polysite-theme-party

A campaign look for a political party, a movement or a union: a utility bar with the join, volunteer and donate links, a bold header, a
sidebar of action cards beside every inner page, a pop-up that appears once per visit, and a footer with a signed authorization line.

It is a child of the Nonprofit theme (`"parent": "nonprofit"` in `theme.json`), so every page block is drawn by the Nonprofit blocks;
this theme only changes the colour tokens and adds the page chrome (`layouts/party.vue`, `components/party/`, `assets/css/party.css`).

The side rail shows the latest news when the posts plugin is installed. The pop-up shows once per browser session, never on the donate
or join page, and is closed with its button, the Escape key or a click on the backdrop. Fixed words can be translated with `useT()`.
Everything in the showcase is fictional.
