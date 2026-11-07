# rudranaresh0201.github.io/portfolio

Live: **https://rudranaresh0201.github.io/portfolio/**

Warm off-white paper, Instrument Serif headings over Inter, one burnt-orange accent. No analytics, no cookies, no tracking.

## Notes on the build

React 18 + Vite + Tailwind. The only runtime dependencies are `react`,
`react-dom` and `react-router-dom`. There is no animation library: the site
barely moves on purpose, and `prefers-reduced-motion` is respected for the
little that does.

Two things worth knowing if you edit it:

- **One accent.** `accent` (burnt orange) is for links, emphasis and hover.
  `ok` (green), `bad` (red) and `warn` mean verified, disproven and
  honest-error in the verimcp console, and nothing else.
- **Projects live in one array** (`src/components/Projects.jsx`). Each gets a
  card on the home page and its own page at `#/projects/<id>`.
- **Never build a Tailwind class name at runtime.** Tailwind scans source text,
  so `` `bg-${tone}` `` gets purged and silently renders as nothing. Write the
  full class name out, the way `VERDICT` in `src/components/Console.jsx` does.

Links are only added for things that are actually reachable. A `live: true`
flag on a link (see `src/components/Links.jsx`) marks something deployed and
running, not just a repo you can read.

## Local

```bash
npm install
npm run dev
```

## Deploy

Publishes `dist/` to the `gh-pages` branch:

```bash
npm run deploy
```
