# Design: Port the Flutter-web portfolio to Angular (for SEO)

**Date:** 2026-11-07
**Status:** Approved
**Target repo:** `Kalela/kalela.github.io` (serves the live site at `https://kalela.github.io`
root — previously held the committed Flutter build output). The Angular project is built here.
**Left untouched:** `Kalela/kalela.github` (the Flutter source repo) — archived original.

## Intent & the why

The portfolio was a Flutter-web SPA. Flutter web paints to `<canvas>` (CanvasKit) / a
non-semantic DOM entirely client-side, so crawlers and social-preview bots get an empty
HTML shell — no headings, text, or links. Google's JS rendering is unreliable; other
crawlers see nothing. That is the whole reason for the move.

**Goal:** a visually equivalent portfolio that is excellent for SEO — real, crawlable,
prerendered HTML with semantic structure and proper metadata — rebuilt in Angular and
deployed to the same GitHub Pages URL.

## Goals

- Rebuild in **Angular (latest stable)** with **static prerendering (SSG)** so every
  page ships real HTML at build time (GitHub Pages serves static files only).
- Preserve the look: Brittany-Chiang dark theme — bg `#0A192F`, teal `#64FFDA`/`#61F9D5`,
  light slate `#CCD6F6`, muted slate body text.
- Preserve content and behavior: all sections, scrolling section nav, Resume/CV button,
  social links, email/phone actions, responsive desktop/mobile layouts.
- SEO-strong: semantic HTML, good title/description, Open Graph + Twitter Card, JSON-LD
  `Person`, `sitemap.xml`, `robots.txt`.
- Align work history to the resume (dates, titles, descriptions, tech).
- Add a Certifications section (CKAD + AWS Solutions Architect – Associate).
- Build in `kalela.github.io`; leave `kalela.github` untouched.
- GitHub Actions workflow builds the prerendered site and deploys on push to `main`.

## Non-goals

- No redesign/rebrand. Visual parity; small polish only. The new Certifications section
  reuses the existing visual language.
- No content beyond the agreed set (Peja + Meet My Blank), resume work history, and certs.
  Jay FM and Hooli Tours dropped.
- No native mobile/desktop targets.
- No CMS/backend/analytics/contact-form backend. Links stay `mailto:`/`tel:`/external.
- No blog/multi-page architecture (one page; the single route only gives prerender a target).

## Anti-goals

- Anything that renders content client-side-only so crawlers see an empty shell.
- Copying Flutter's absolute-positioning / `MediaQuery`-math into CSS. Use idiomatic
  responsive CSS.
- A heavy UI framework (Material/Bootstrap/Tailwind) for a small bespoke page.

## Constraints

- **Hosting:** GitHub Pages at root `kalela.github.io` → `baseHref` `/`. Static only; SSG.
- **Deploy repo (confirmed):** site served from `kalela.github.io`, previously from
  hand-committed Flutter output on `main`, no CNAME. Angular built there; deploys via
  GitHub Actions. Flutter source repo not touched.
- SPA deep-link fallback: `404.html` (copy of `index.html`).
- `.nojekyll` so Pages serves `_`-prefixed Angular assets.

## Content inventory (Flutter desktop tree + resume)

- **Hero:** "Hello There, my name is" / "Philip Kalela." / "Welcome to my little corner on
  the internet." / "I'm a Software Engineer based in Nairobi, KE building exceptional
  software solutions." + "Get In Touch" button (mailto).
- **01. About Me:** bio (enjoys creating optimal business solutions; currently a backend
  software engineer at Carepay International) + tech list: Java, Spring Boot, Dart, Flutter,
  AWS, Kubernetes, Bitbucket Pipelines. Profile image `download.png` → LinkedIn.
- **02. Featured projects** ("02. Some of my featured projects"):
  - **Peja Newsletter | Sonder Softwares** — `https://peja-newsletter.net`, `work/peja.png`,
    tech "Spring Boot|Java", "MySql Kubernetes", "Angular".
  - **Meet My Blank** — `https://meetmyblank.com`, "A lead and referral tracking system for
    professionals." Tech: Java, Flutter, Docker, GCP. Image `work/meetmyblank.png` (placeholder
    until supplied).
- **03. Work experience** (resume-aligned, 6 roles, newest first; Workfleek dropped):
  1. **Software Engineer | CarePay DevCo, Kenya** — Jan 2023–present. `carepay_icon.jpeg`,
     `carepay.com`. Tech: Java, Spring Boot, Kafka, GraphQL, Kubernetes, MySQL, Datadog.
     "Designed and maintained microservices for a healthcare claims platform handling
     thousands of daily transactions; optimized Spring Boot services (JPA, Kafka, GraphQL)
     to cut API latency; led architecture and debugging for distributed systems on Kubernetes."
  2. **Freelance Software Engineer | Upwork** — Feb 2021–present. `upwork_icon.png`, Upwork
     profile. Tech: Java, Docker, Flutter, GCP. "Designed and maintain Meet My Blank; built
     and optimized Appium test suites on Docker; Top Rated freelancer with 100% client
     satisfaction."
  3. **Software Engineer | TheJitu, Kenya** — Aug 2021–Dec 2022. `thejitu.png`, `thejitu.com`.
     Tech: Java, Spring Boot, MyBatis, Jenkins, MySQL, CloudWatch. "Delivered backend features
     for enterprise clients; improved integration-test reliability and runtime; supported
     ReactJS frontend work and CI/CD on Jenkins + AWS."
  4. **Software Engineer | Finaccess Kenya** — Oct 2019–Nov 2020. Font Awesome icon,
     `finaccess.co`. Tech: Java, Spring Boot (Spring Batch), MySQL, Native Android. "Built
     Spring Boot services for a ledger system with integrated credit scoring; implemented
     M-PESA statement ingestion pipelines; designed REST APIs for the Android team."
  5. **Game Developer | Motus Nova (remote via Andela)** — Mar 2019–Dec 2019. `motus_icon.png`,
     `motusnova.com`. Tech: C#, Unity. "Developed and maintained Unity/C# rehabilitation games
     for robotic stroke-therapy devices; implemented gameplay logic and optimized interaction
     with the robotic engine."
  6. **Software Engineer | Andela Kenya** — Mar 2018–Apr 2020. `andela_icon.png`, `andela.com`.
     Tech: Java, Native Android, Unity/C#. "Completed a full-time engineering training program;
     contributed to internal and partner projects in an agile environment."
- **04. Certifications** (NEW; between Work and Contact): cards with badge image, name,
  issuer, date, Credly link.
  1. **AWS Certified Solutions Architect – Associate** — AWS, Sept 2025. Badge
     `certificates/aws-solutions-architect-associate.png`. Credly
     `https://www.credly.com/badges/79175da0-716b-42f7-9d3c-61ba05986797/public_url`.
  2. **Certified Kubernetes Application Developer (CKAD)** — Linux Foundation, May 2024. Badge
     `certificates/ckad-certified-kubernetes-application-developer.png`. Credly
     `https://www.credly.com/badges/303ebc56-a2c2-4d2c-ada9-935bd107ca64/public_url`.
     (Resume marks expired; default no "expired" label.)
- **05. Get In Touch:** "05. What's Next?" / "Get In Touch" / "Whether you have a question or
  just want to say hi, I'll try my best to get back to you!" + "Say Hello" button (mailto).
  Footer: "Designed by **Tushar Nikam**" (link `https://champ96k.github.io/#/`) "modified for
  self by Philip Kalela 💙 Angular".
- **Top nav:** scroll-to-top caret + tabs About · Clients/Projects · Experience ·
  Certifications · Contact Us + **Resume/CV** → Google Doc
  `docs.google.com/document/d/1clZP-0ho2EkoRYV1V6URTT4TLuYVSaNNjuSfZkOulqs`. Scrolls to section.
- **Left rail:** Upwork, GitHub (`github.com/Kalela`), LinkedIn, phone (`tel:+254717174985`),
  email (`mailto:philipkalela@gmail.com`).
- **Right rail (desktop):** vertical `philipkalela@gmail.com`.
- **Responsive:** desktop ≥1000px, mobile below.

Assets carried from the Flutter repo `assets/images/`: `download.png`, `work/peja.png`,
`icons/{carepay_icon.jpeg,thejitu.png,upwork_icon.png,motus_icon.png,andela_icon.png}`, cert
badges `ckad-certified-kubernetes-application-developer.png` and `image.png`
(→ `aws-solutions-architect-associate.png`), favicon + app icons. New `work/meetmyblank.png`
supplied later. Dropped: `jay_fm_splash.png`, `hooli_tours_splash.png`, client logos.

## How it gets made (decided)

- **Framework:** Angular latest stable, standalone components, Angular CLI. One trivial route.
- **Rendering:** `@angular/ssr` prerender (SSG). `baseHref` `/`.
- **Styling:** SCSS, component-scoped, CSS custom properties for tokens. Flexbox/grid,
  `clamp()`/`rem`, media queries. Dark theme only.
- **Icons:** Font Awesome brand/solid for social/tech; lightest mechanism.
- **SEO:** static `index.html` head — title, meta description, OG, Twitter, canonical
  `https://kalela.github.io/`, theme-color, JSON-LD `Person` (name, job title, url, sameAs:
  GitHub/LinkedIn/Upwork, email). `robots.txt` + `sitemap.xml`. Angular `Title`/`Meta`.
- **PWA/manifest:** `manifest.webmanifest`, name "Philip Kalela"/short "Philip", colors
  `#0A192F`. No service worker unless trivial.
- **Repo layout:** Angular at repo root on feature branch, PR to `main`. Remove Flutter output
  (`main.dart.js`, `canvaskit/`, `flutter*.js`, `version.json`, `.last_build_id`, Flutter
  `assets/`). Source images copied from `kalela.github`. `README.md` for the Angular site.
- **Deploy:** `.github/workflows/deploy.yml` — on push to `main`: Node, `npm ci`, prerender
  build, upload Pages artifact, `actions/deploy-pages`. Maintainer flips Pages Source →
  "GitHub Actions". `.nojekyll` added.

## Improvements (in scope)

- Fluid responsive layout (keep a mobile breakpoint, fluid between).
- Accessible markup: landmarks, `alt`, focus styles, `aria-label` on icon links.
- Faster first paint / small payload vs CanvasKit.
- Smooth-scroll nav + scroll-spy active-section highlight.

## Testing

Unit test for scroll-spy/active-section logic; a build-time check that prerendered
`index.html` contains the hero `<h1>` text and the JSON-LD block. CLI lint. Verification
focuses on "the rendered HTML really contains the content".

## Maintainer decisions (resolved)

- Target repo `kalela.github.io`; `kalela.github` untouched; GitHub Actions deploy.
- Desktop tree canonical; stale mobile tree discarded.
- Projects: Peja + Meet My Blank.
- Resume/CV: desktop Google Doc link.
- Work: resume-aligned, 6 roles (Workfleek dropped).
- New Certifications section (CKAD + AWS SA Associate), Credly links.

## One-time maintainer action after merge

`kalela.github.io` → Settings → Pages → Build and deployment → Source → **GitHub Actions**.
Only manual step; deploys automatic thereafter.
