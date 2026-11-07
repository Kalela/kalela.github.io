# kalela.github.io

Personal portfolio for **Philip Kalela** — software engineer, Nairobi, Kenya.
Live at **https://kalela.github.io**.

Built with **Angular** and **statically prerendered** (SSG) so every page ships as
real, crawlable HTML — chosen specifically for good SEO (the previous Flutter-web
build rendered to canvas and was effectively invisible to search and social crawlers).

## Stack

- Angular 22, standalone components, SCSS
- `@angular/ssr` static prerender (`outputMode: static`, `baseHref: /`)
- Font Awesome icon data rendered as inline SVG (no icon font)
- Deployed to GitHub Pages via GitHub Actions

## Develop

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Build & verify

```bash
npm run build      # prerenders to dist/portfolio/browser (+ 404.html, .nojekyll)
npm run verify     # asserts the prerendered HTML contains the real content + JSON-LD
npm test -- --watch=false   # unit tests
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds, verifies, and
publishes `dist/portfolio/browser` to GitHub Pages.

**One-time setup:** in this repo's **Settings → Pages → Build and deployment**, set
**Source** to **GitHub Actions** (instead of "Deploy from a branch").

## Content

Page content lives in typed data modules under `src/app/data/` (projects, experience,
certifications, social links, profile). Edit those to update the site. The Meet My Blank
card uses a placeholder image at `public/assets/images/work/meetmyblank.svg` — replace it
with a real screenshot and update `src/app/data/projects.ts`.

---

Design credited to [Tushar Nikam](https://champ96k.github.io/#/); adapted by Philip Kalela.
