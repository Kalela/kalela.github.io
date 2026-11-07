# Angular Portfolio Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Flutter-web portfolio with a statically prerendered Angular site in the `kalela.github.io` repo, same dark design, strong SEO, resume-aligned content, and a new Certifications section, auto-deployed to GitHub Pages.

**Architecture:** One Angular standalone-component app, one route (`/`), prerendered with `@angular/ssr` (SSG) to static HTML. Content lives in typed TS data modules consumed by section components. A single scroll container with `id` anchors; a nav with scroll-spy. All styling is component-scoped SCSS over a small set of global CSS custom-property tokens. SEO head is static in `index.html` plus a JSON-LD `Person` block. CI builds the prerender output and deploys via GitHub Pages Actions.

**Tech Stack:** Angular (latest stable) + `@angular/ssr`, SCSS, `@fortawesome/angular-fontawesome` (or inline SVG), GitHub Actions `actions/deploy-pages`.

**Spec:** `docs/superpowers/specs/2026-11-07-angular-port-design.md`

## Global Constraints

- Angular latest stable; standalone components; `baseHref: /`.
- Static prerender (SSG) only — no SSR server, no client-only content for crawlable text.
- Colors as CSS custom properties: `--bg:#0A192F`, `--teal:#64FFDA`, `--teal-2:#61F9D5`, `--slate-light:#CCD6F6`, `--slate:#8892B0`, `--slate-dark:#717C99`. Dark theme only.
- Canonical origin `https://kalela.github.io/` (no trailing path). Email `philipkalela@gmail.com`, phone `tel:+254717174985`.
- External links `rel="noopener"` and open in a new tab; icon-only links need `aria-label`.
- Resume/CV URL: `https://docs.google.com/document/d/1clZP-0ho2EkoRYV1V6URTT4TLuYVSaNNjuSfZkOulqs/edit?usp=sharing`.
- No new content beyond the spec's inventory. Footer credit keeps the Tushar Nikam link; suffix "💙 Angular".

## Review Focus

- **Crawler sees empty page:** the whole point — prerendered `index.html` must contain hero `<h1>`, section text, and JSON-LD. Covered by Task 12's prerender-content test.
- **Deep link / refresh on Pages 404s:** a non-root path must not hard-404; `404.html` fallback copied from `index.html`. Covered in Task 2 + Task 13 build output.
- **`_`-prefixed Angular assets 404 on Pages (Jekyll):** `.nojekyll` must be present in output. Covered in Task 2 / Task 13.
- **Missing Meet My Blank image:** placeholder must render at correct dimensions without a broken `<img>`. Covered in Task 8.
- **Narrow viewport overflow:** no horizontal scroll at phone width; rails collapse. Covered in Task 4 responsive test / manual check.

---

## Task 1: Scaffold Angular app with prerender; remove Flutter output

**Files:**
- Create: Angular project at repo root (`angular.json`, `package.json`, `src/`, `tsconfig*.json`).
- Delete: `main.dart.js`, `flutter.js`, `flutter_bootstrap.js`, `flutter_service_worker.js`, `version.json`, `.last_build_id`, `canvaskit/`, `index.html`, `manifest.json`, `favicon.png`, `icons/`, `assets/` (old Flutter build assets).
- Keep: `.git/`, `docs/`.

**Interfaces:**
- Produces: a buildable Angular app with SSR/prerender wired (`ng build` emits `dist/<app>/browser` with prerendered `index.html`), `baseHref` `/`, one route `/` rendering an empty `AppComponent` shell.

- [ ] **Step 1:** Generate the app with routing + SSR into a temp dir, then move its contents to repo root (CLI refuses to scaffold into a non-empty dir). Use `ng new portfolio --style=scss --ssr --routing --ssr --server-routing` equivalent for the installed version; enable prerendering. Set `baseHref: /` in the build config.
- [ ] **Step 2:** Remove the Flutter build artifacts listed above. Carry nothing from them except what Task 3 explicitly copies from the *source* repo.
- [ ] **Step 3:** Configure prerender for the single `/` route; confirm `outputMode`/`prerender` produces static HTML (no Node server required to serve).
- [ ] **Step 4: Verify build.** Run `npm run build`. Expected: build succeeds; `dist/.../browser/index.html` exists and contains rendered DOM (not just `<app-root></app-root>`).
- [ ] **Step 5: Commit** `chore: scaffold Angular app with prerender, remove Flutter output`.

## Task 2: Global tokens, index head/SEO shell, static site files

**Files:**
- Modify: `src/styles.scss` (tokens, resets, base `body` bg/font), `src/index.html` (head meta), `angular.json` (assets globs, prerender).
- Create: `src/robots.txt`, `src/sitemap.xml`, `public/.nojekyll` (served at output root), `src/404.html` strategy (see step), `src/manifest.webmanifest`.

**Interfaces:**
- Produces: CSS custom properties on `:root` (the six tokens above); `index.html` `<head>` with title, description, OG, Twitter, canonical, theme-color `#0A192F`, manifest link, JSON-LD `Person` script; `robots.txt` + `sitemap.xml` + `.nojekyll` emitted to output root.

- [ ] **Step 1:** Define tokens on `:root` in `styles.scss`; set `body { background: var(--bg); color: var(--slate); margin:0; }`, box-sizing reset, base font stack, `html { scroll-behavior: smooth; }`.
- [ ] **Step 2:** Write `index.html` `<head>`: `<title>Philip Kalela — Software Engineer</title>`, meta description (software engineer, Nairobi, Java/Spring Boot backend), OG (`og:title`, `og:description`, `og:type=website`, `og:url=https://kalela.github.io/`, `og:image` = profile image absolute URL), Twitter Card `summary_large_image`, `<link rel="canonical" href="https://kalela.github.io/">`, `<meta name="theme-color" content="#0A192F">`, manifest link.
- [ ] **Step 3:** Add JSON-LD `Person` `<script type="application/ld+json">` in `index.html` head: name "Philip Kalela", jobTitle "Software Engineer", url, email, `sameAs` [GitHub, LinkedIn, Upwork].
- [ ] **Step 4:** Add `robots.txt` (allow all, `Sitemap: https://kalela.github.io/sitemap.xml`) and `sitemap.xml` (single `<url>` = origin). Add `.nojekyll`. Configure `angular.json` assets so these + `public/` land at output root.
- [ ] **Step 5:** Create `manifest.webmanifest` (name "Philip Kalela", short_name "Philip", theme/background `#0A192F`, icons from carried app icons).
- [ ] **Step 6:** 404 fallback — add a post-build copy of `index.html` → `404.html` (npm script step; Task 13 wires it into CI; locally verify the script produces it).
- [ ] **Step 7: Verify.** Build; confirm `index.html` head contains canonical + JSON-LD, and `robots.txt`/`sitemap.xml`/`.nojekyll` exist in output root.
- [ ] **Step 8: Commit** `feat: global tokens, SEO head, robots/sitemap/manifest, 404 + nojekyll`.

## Task 3: Carry over image assets

**Files:**
- Create under `public/assets/images/`: `download.png`, `work/peja.png`, `work/meetmyblank.png` (placeholder), `icons/{carepay_icon.jpeg,thejitu.png,upwork_icon.png,motus_icon.png,andela_icon.png}`, `certificates/ckad-certified-kubernetes-application-developer.png`, `certificates/aws-solutions-architect-associate.png`. App icons + favicon.

**Interfaces:**
- Produces: image files referenced by later tasks at stable `/assets/images/...` URLs.

- [ ] **Step 1:** Copy the listed images from the Flutter source repo `/home/bagman/Projects/kalela.github/assets/images/` and `web/` (favicon, app icons) into `public/assets/images/` (and `public/` for favicon/app icons). Rename `certificates/image.png` → `aws-solutions-architect-associate.png`.
- [ ] **Step 2:** Create a `work/meetmyblank.png` placeholder (simple generated PNG or reuse a neutral tile) at similar dimensions to `peja.png` so the card renders; mark it clearly replaceable.
- [ ] **Step 3: Verify** the files exist and are served (appear under output after build).
- [ ] **Step 4: Commit** `chore: carry over portfolio image assets`.

## Task 4: Content data modules

**Files:**
- Create: `src/app/data/{projects,experience,certifications,social,profile}.ts` and `src/app/data/models.ts`.

**Interfaces:**
- Produces typed exports consumed by section components:
  - `models.ts`: `interface Project { title; company?; description; url; tech: string[]; image: string }`, `interface Job { title; company; location?; duration; description; url; icon: {type:'image';src:string}|{type:'fa';name:string;bg?:string} }`, `interface Certification { name; issuer; date; image; credlyUrl }`, `interface SocialLink { label; href; icon; ariaLabel }`.
  - `projects.ts`: `PROJECTS: Project[]` (Peja, Meet My Blank) with spec values.
  - `experience.ts`: `JOBS: Job[]` (6 roles, spec values/order).
  - `certifications.ts`: `CERTIFICATIONS: Certification[]` (AWS SA Associate, CKAD).
  - `social.ts`: `SOCIALS: SocialLink[]`, plus `RESUME_URL`, `EMAIL`, `PHONE`.
  - `profile.ts`: hero + about copy, tech lists.

- [ ] **Step 1:** Define interfaces in `models.ts`.
- [ ] **Step 2:** Populate the five data files verbatim from the spec inventory (exact strings, URLs, dates, tech arrays).
- [ ] **Step 3:** (Test) Add `experience.spec.ts`: assert `JOBS.length === 6`, first job title/company is CarePay DevCo, and no job mentions "Workfleek". Run it; expect PASS.
- [ ] **Step 4: Commit** `feat: typed content data (projects, experience, certifications, social, profile)`.

## Task 5: Layout shell — page scaffold, rails, nav, scroll-spy

**Files:**
- Create: `src/app/layout/{app-shell,top-nav,side-rail,email-rail,scroll-spy.service}.*`.
- Modify: `src/app/app.component.*` to compose the shell + section outlets.

**Interfaces:**
- Consumes: `SOCIALS`, `EMAIL`, `RESUME_URL`.
- Produces: `TopNavComponent` (tabs About/Clients&Projects/Experience/Certifications/Contact + Resume button + scroll-to-top caret; emits/handles anchor navigation), `SideRailComponent` (social icons), `EmailRailComponent` (vertical email), `ScrollSpyService` with `activeSection$` driven by `IntersectionObserver`. Section ids: `about`, `projects`, `experience`, `certifications`, `contact`.

- [ ] **Step 1: (Test)** `scroll-spy.service.spec.ts`: given mock intersection entries, `activeSection$` emits the id of the most-visible section; asserts last-emitted value. Run; expect FAIL (service absent).
- [ ] **Step 2:** Implement `ScrollSpyService` using `IntersectionObserver` guarded for SSR (no `window` during prerender). Run test; expect PASS.
- [ ] **Step 3:** Build `TopNavComponent` with anchor links to `#id` (real `<a href="#id">`, so prerendered + crawlable), active class bound to `activeSection$`, Resume/CV `<a>` to `RESUME_URL`, caret link to `#top`.
- [ ] **Step 4:** Build `SideRailComponent` (SOCIALS, icon-only `<a>` with `aria-label`) and `EmailRailComponent` (vertical email `<a mailto>`).
- [ ] **Step 5:** Compose in `AppComponent`: fixed nav, left/right rails (desktop), `<main>` with section placeholders carrying the ids and an `id="top"` anchor.
- [ ] **Step 6: Verify** build + unit tests pass; prerendered HTML contains the nav links.
- [ ] **Step 7: Commit** `feat: layout shell with nav, rails, scroll-spy`.

## Task 6: Hero section

**Files:** Create `src/app/sections/hero/hero.component.*`. Consumes `profile`, `EMAIL`.

- [ ] **Step 1:** Render kicker, `<h1>Philip Kalela.</h1>`, subhead, tagline, "Get In Touch" `<a mailto>`. Exact copy from spec.
- [ ] **Step 2:** SCSS: large fluid type via `clamp()`, teal accents, spacing.
- [ ] **Step 3: Verify** prerendered HTML contains the `<h1>` text "Philip Kalela." Build.
- [ ] **Step 4: Commit** `feat: hero section`.

## Task 7: About section

**Files:** Create `src/app/sections/about/about.component.*`. Consumes `profile`.

- [ ] **Step 1:** Section header "01. About Me"; bio paragraphs (exact spec copy: "Hello! I'm Philip…", "currently working as a backend software engineer at Carepay International", "Here are some of the technologies I've been working with recently:").
- [ ] **Step 2:** Tech list as a two-column grid with a briefcase glyph per item: Java, Spring Boot, Dart, Flutter, AWS, Kubernetes, Bitbucket Pipelines.
- [ ] **Step 3:** Profile image (`download.png`, `alt="Philip Kalela"`) wrapped in an `<a>` to LinkedIn, with the teal offset-card framing from the original.
- [ ] **Step 4:** SCSS: two-column on desktop, stack on narrow.
- [ ] **Step 5: Verify** prerendered HTML contains "About Me" and "Carepay". Build.
- [ ] **Step 6: Commit** `feat: about section`.

## Task 8: Projects section

**Files:** Create `src/app/sections/projects/{projects.component.*,project-card.component.*}`. Consumes `PROJECTS`.

**Interfaces:** `ProjectCardComponent` input `project: Project`.

- [ ] **Step 1:** Section header "02. Some of my featured projects"; map `PROJECTS` to cards.
- [ ] **Step 2:** `ProjectCardComponent`: image (`<img [src]>` with `alt`, `loading="lazy"`), title (+ company), description panel, tech tags, external link icon(s) with `aria-label`. Clicking the image/title opens `project.url`.
- [ ] **Step 3:** Placeholder image path for Meet My Blank renders without a broken image (Review Focus).
- [ ] **Step 4:** SCSS mirroring the current overlapped image/description look, but responsive (stack on narrow).
- [ ] **Step 5: Verify** prerendered HTML contains "Peja Newsletter" and "Meet My Blank". Build.
- [ ] **Step 6: Commit** `feat: projects section`.

## Task 9: Experience section

**Files:** Create `src/app/sections/experience/{experience.component.*,job-item.component.*}`. Consumes `JOBS`.

- [ ] **Step 1:** Header "03. My work experience"; vertical timeline divider; map `JOBS`.
- [ ] **Step 2:** `JobItemComponent` input `job: Job`: icon (image or FA with bg), title | company `<a>`, duration, description, links.
- [ ] **Step 3:** SCSS: timeline rail + rows, responsive.
- [ ] **Step 4: Verify** prerendered HTML contains "CarePay DevCo" and all six companies; does NOT contain "Workfleek". Build.
- [ ] **Step 5: Commit** `feat: experience section (resume-aligned)`.

## Task 10: Certifications section

**Files:** Create `src/app/sections/certifications/{certifications.component.*,cert-card.component.*}`. Consumes `CERTIFICATIONS`.

**Interfaces:** `CertCardComponent` input `cert: Certification`.

- [ ] **Step 1:** Header "04. Certifications"; row of cert cards.
- [ ] **Step 2:** `CertCardComponent`: badge `<img>` with `alt`, name, issuer, date, "Verify on Credly" `<a href=credlyUrl>` (new tab, `aria-label`).
- [ ] **Step 3:** SCSS: card grid matching the theme; responsive wrap.
- [ ] **Step 4: Verify** prerendered HTML contains "AWS Certified Solutions Architect" and "CKAD"/"Kubernetes Application Developer" and both Credly URLs. Build.
- [ ] **Step 5: Commit** `feat: certifications section`.

## Task 11: Contact section + footer

**Files:** Create `src/app/sections/contact/contact.component.*`. Consumes `EMAIL`.

- [ ] **Step 1:** "05. What's Next?" kicker, "Get In Touch" heading, paragraph, "Say Hello" `<a mailto>`.
- [ ] **Step 2:** Footer: "Designed by [Tushar Nikam](https://champ96k.github.io/#/) modified for self by Philip Kalela 💙 Angular" — Tushar Nikam is a real `<a>`.
- [ ] **Step 3: Verify** prerendered HTML contains "Get In Touch" and the footer credit with the Tushar Nikam link. Build.
- [ ] **Step 4: Commit** `feat: contact section and footer`.

## Task 12: SEO verification test + meta service wiring

**Files:** Create `src/app/seo.spec.ts` (or a build-time node check script `scripts/check-prerender.mjs`). Modify `AppComponent`/root to set `Title`/`Meta` via Angular services as a backstop.

**Interfaces:** Consumes the built `dist/.../browser/index.html`.

- [ ] **Step 1: (Test)** `scripts/check-prerender.mjs`: after build, read `dist/.../browser/index.html`; assert it contains "Philip Kalela." (hero `<h1>`), `application/ld+json`, the canonical origin, and at least one job company string. Exit non-zero on failure.
- [ ] **Step 2:** Wire `Title`/`Meta` in the root component to set title + description at runtime as a backstop (prerender already bakes them; this keeps them correct if JS hydrates).
- [ ] **Step 3: Verify** run build then `node scripts/check-prerender.mjs`; expect PASS. Add it as an `npm run verify` script.
- [ ] **Step 4: Commit** `test: prerender SEO content check + meta backstop`.

## Task 13: GitHub Actions deploy workflow

**Files:** Create `.github/workflows/deploy.yml`. Create/verify post-build `404.html` + `.nojekyll` handling.

**Interfaces:** Deploys `dist/.../browser` to GitHub Pages.

- [ ] **Step 1:** Workflow: on push to `main` (+ manual `workflow_dispatch`), permissions `pages: write`, `id-token: write`; jobs: build (Node LTS, `npm ci`, `npm run build`, `npm run verify`, copy `index.html`→`404.html`, ensure `.nojekyll`), `upload-pages-artifact` of the browser dir; deploy with `actions/deploy-pages`. Concurrency group `pages`.
- [ ] **Step 2:** Confirm the artifact path points at the prerendered `browser` output dir.
- [ ] **Step 3: Verify** `npm run build && npm run verify` locally succeeds; workflow YAML lints (valid syntax).
- [ ] **Step 4: Commit** `ci: GitHub Actions build + prerender deploy to Pages`.

## Task 14: README + cleanup

**Files:** Modify `README.md`. Remove any leftover Flutter references.

- [ ] **Step 1:** Rewrite `README.md`: what the site is, Angular + prerender, `npm start` / `npm run build` / `npm run verify`, deploy via Actions, and the one-time Pages "Source → GitHub Actions" step.
- [ ] **Step 2:** Grep the repo for stray Flutter leftovers; remove.
- [ ] **Step 3: Verify** clean `git status` after build output is gitignored (`dist/`, `node_modules/`, `.angular/`).
- [ ] **Step 4: Commit** `docs: README for the Angular site`.

## Final

- [ ] Run full build + verify + unit tests. Push branch, open PR to `main` (do not merge).
- [ ] Request a whole-branch code review (fresh reviewer) before merge.
- [ ] Report the one-time Pages "Source → GitHub Actions" step to the maintainer.
