# Rudra Naresh — Portfolio

Dark-themed, glassmorphism single-page portfolio built with **React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion**.

## Folder Structure

```
rudra-portfolio/
├── index.html                  # App shell — Google Fonts loaded here
├── package.json
├── vite.config.js              # Change `base` for GitHub Pages
├── tailwind.config.js          # Custom fonts, colors, keyframes
├── postcss.config.js
├── .gitignore
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Composes all sections
    ├── index.css               # Tailwind + glass/gradient/tag utilities
    ├── hooks/
    │   └── useTypewriter.js    # Typewriter cycling animation hook
    └── components/
        ├── Navbar.jsx          # Fixed nav, active section tracking, mobile menu
        ├── Hero.jsx            # Full-screen hero, orb bg, floating terminal card
        ├── Experience.jsx      # Animated vertical timeline
        ├── Projects.jsx        # Filterable 3-col card grid with expand/collapse
        ├── Life.jsx            # Skills, leadership, competitions, interests
        ├── Contact.jsx         # Contact cards + CTA
        └── Footer.jsx          # Minimal footer with socials
```

## Quick Start

```bash
# 1. Navigate into the folder
cd rudra-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server (opens at http://localhost:5173)
npm run dev
```

## Build for Production

```bash
npm run build
# Output in /dist — ready to deploy
```

## Deploy to Vercel (Recommended — zero config)

1. Push the `rudra-portfolio` folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. Vercel auto-detects Vite. Click **Deploy**. Done.
4. Your site is live at `your-name.vercel.app`.

## Deploy to GitHub Pages

1. In `vite.config.js`, change `base: '/'` → `base: '/rudra-portfolio/'`
   (replace `rudra-portfolio` with your actual repo name).

2. In `package.json`, update the deploy script:
   ```json
   "homepage": "https://rudranaresh0201.github.io/rudra-portfolio"
   ```

3. Run:
   ```bash
   npm run deploy
   ```
   This runs `vite build` then pushes `/dist` to the `gh-pages` branch.

4. In GitHub repo Settings → Pages → set Source to `gh-pages` branch.

## Customisation Cheatsheet

| What                  | Where                                      |
|-----------------------|--------------------------------------------|
| Name / bio            | `src/components/Hero.jsx`                  |
| Typewriter roles      | `ROLES` array in `Hero.jsx`                |
| Work experience       | `TIMELINE` array in `Experience.jsx`       |
| Projects              | `PROJECTS` array in `Projects.jsx`         |
| Skills / leadership   | Data objects in `Life.jsx`                 |
| Contact links         | `CONTACT_ITEMS` in `Contact.jsx`           |
| Accent colors         | `tailwind.config.js` + CSS vars in `index.css` |

## Tech Stack

- **React 18** — UI
- **Vite 5** — build tool & dev server
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — scroll animations, layout transitions
- **Lucide React** — icons
- **gh-pages** — GitHub Pages deployment helper

## RAG / Agentic AI Insight of the Day

The `useTypewriter` hook is essentially a **finite state machine** —
`(wordIndex, charIndex, isDeleting)` defines the state space, and each
`setTimeout` tick is a state transition. The same FSM pattern is used
in **LangGraph / LangChain** agent loops where the graph node is the state
and edge conditions are transitions — you're already thinking in graphs!
