# Dermatologie Nazareth

Static website for the Dermatologie Nazareth practice. Dutch-language, built with
**Astro 5** (static site generation), **Tailwind CSS 4**, and **Sveltia CMS**,
deployed to **Cloudflare Pages**.

## Prerequisites

- Node 22 + npm 10
- A Chromium-based browser (Chrome / Edge / Brave) if you want to use the CMS
  locally or take screenshots

## Setup

```bash
npm install
```

`node_modules/` is not committed; this restores it from `package-lock.json`.

## Develop

```bash
npm run dev      # http://localhost:4321
```

## Test, build & preview

```bash
npm test         # unit tests (Node built-in test runner)
npm run build    # outputs static site to dist/
npm run preview
```

## Content management (Sveltia CMS)

**All copy on the site is CMS-managed** — the `.astro` components only provide
structure. The CMS is organized so it's clear where each text appears:

- **Pagina's** — one entry per page. The *Homepagina* entry has one field group
  per visual section, in page order (openingsbeeld, welkomsttekst, sectie
  huidarts, sectie praktijk, …); each group has a Dutch hint explaining where
  it shows. The sub pages (Behandelingen / Praktijk / Afspraak / Contact) have
  a title + intro. Every page also has a collapsed *Zoekmachines (SEO)* group.
- **Behandelingen** — one entry per treatment; shown as cards on
  `/behandelingen`, and on the homepage when *Uitgelicht* is checked.
- **Team** — one entry per team member; each gets its own photo + bio section
  on `/praktijk` (sections alternate photo side and background tone
  automatically as members are added). The homepage "Uw huidarts" section
  shows the member selected in *Pagina's → Homepagina* (name, photo **and bio**
  come from the team entry — single source of truth).
- **Instellingen → Contactgegevens** — address, phone, e-mail, booking URL and
  opening hours, used by the footer, contact page and the Afspraak page. All
  "Afspraak maken" buttons navigate to `/afspraak`; that page shows the phone
  number (click-to-call) while `bookingUrl` is empty and switches to an online
  agenda button once it is filled. In texts, `{telefoon}` marks where the
  clickable phone number goes. The e-mail field may be left empty — the
  address is then shown nowhere (footer, contact page, structured data) until
  it is filled in.
- **Instellingen → Aankondiging (pop-up)** — site-wide announcement dialog
  (e.g. "Opening najaar 2026"): toggle it on/off and edit title/text. Visitors
  see it once per browser session; an edited message shows again.

Collections map 1:1 to the Astro content collections in `src/content.config.ts`.
New CMS entries get clean ASCII slugs (`slug:` block in `config.yml`), so
accents/punctuation in titles can't produce messy filenames or URLs.

The CMS bundle is **pinned to an exact version** in `public/admin/index.html`;
bump it deliberately (see comment there) rather than floating `latest`.

### Local editing

For **local** editing Sveltia uses the browser's File System Access API — no
proxy server or login needed:

1. Run `npm run dev`.
2. In **Chrome / Edge / Brave** (not Firefox/Safari) open
   **`http://localhost:4321/admin/index.html`**
   (use the full `index.html` path — bare `/admin/` 404s under `astro dev`/`preview`;
   it resolves fine on Cloudflare Pages).
3. Click **"Work with Local Repository"** and select the repo root.
4. Edit content; changes write straight to `src/content/…` and the dev server
   live-reloads. Sveltia does **no** Git operations — commit/push yourself.

## Deploy (Cloudflare Pages)

- Build command: `npm run build` · Output dir: `dist` · branch `main`
  (Node version comes from the committed `.node-version` file)
- Pure static — **no** `@astrojs/cloudflare` adapter needed.
- **Before the client can edit in production**, the Sveltia GitHub backend needs
  an OAuth proxy: deploy the [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth)
  Cloudflare Worker, register a GitHub OAuth App pointing at it, then set
  `base_url` in `public/admin/config.yml`. (Not yet done.)

## Project structure

```
src/
  content.config.ts      # collections: homePage, pages, treatments, team, settings
  content/
    pages/               # per-page copy (home.json + sub pages), CMS "Pagina's"
    treatments/  team/   # markdown collections
    settings/            # contact singleton (JSON)
  layouts/BaseLayout.astro
  components/            # Header, Footer, Seo, Spotlight, TreatmentCard
  lib/text.ts            # paragraphs() helper for multiline CMS text fields
  pages/                 # index/behandelingen/praktijk/afspraak (built out); contact (stub)
  styles/global.css      # Tailwind 4 @theme brand tokens + @font-face + components
public/
  admin/                 # Sveltia CMS (index.html + config.yml)
  fonts/  assets/        # webfonts, logo variants (green/white png, mark, og jpg), images
```

## Status

**MVP scaffold complete; all copy CMS-managed.** Brand system (green `#60675b`
/ pink `#d7b0b2`, Gotham Rounded), base layout, header/footer, and a built-out
home page styled after the reference practice
[dermatologielatem.be](https://dermatologielatem.be) (HTML5 UP "Stellar"
layout): full-screen hero, alternating spotlight bands, a treatments grid
(entries marked *Uitgelicht*), practical-info band, contact CTA. The
`behandelingen` page lists all treatments; `praktijk` introduces the team as
alternating spotlight bands (one per `team` entry — layout verified with one
and with two members); `contact` is a styled stub with CMS-managed copy.

Texts (8 treatments, doctor bio, practical info) are adapted from
[dermatodepinte.be](https://www.dermatodepinte.be), per the project brief;
Dr. Borderé's bio is fact-checked against that site.
Photos are a person-free selection from that site (only images without
identifiable people; two show anonymous gloved hands / a skin close-up) —
replace with the practice's own photos when available.

Five treatment cards use stock photos from [Pexels](https://www.pexels.com)
([license](https://www.pexels.com/license/): free for commercial use, no
attribution required), also selected to show no identifiable people. Source
photo IDs, for provenance: algemene dermatologie 5701545, huidkankerscreening
4046561, lasertherapie 37078056, epilatielaser 16032366, botox 29113585
(`https://www.pexels.com/photo/<id>/`).

Implementation notes:

- The overlay header's transparent→solid scroll behaviour is driven by a single
  `data-solid` attribute; all state styling is declarative
  (`data-solid:`/`group-data-solid:` Tailwind variants in `Header.astro`).

### Next (phase 2)

- `behandelingen/[slug]` detail pages (bodies already in the CMS); `contact`
  (map, route, hours).
- Fill in via the CMS: the e-mail address (left blank — hidden everywhere
  until filled), `bookingUrl` once the online agenda exists, Nazareth-specific
  texts and photos.
- Deploy + wire Sveltia OAuth (see above).
- Confirm a **Gotham Rounded webfont licence** (commercial font) or swap the font
  vars in `src/styles/global.css` for a free match (e.g. Nunito / Quicksand).
- SEO / accessibility / Lighthouse pass.

## Optional: visual screenshots

`playwright-core` is a devDependency. Install the browser once, then capture the
running site (start `npm run dev` first):

```bash
npx playwright-core install chromium   # one-time
npm run screenshot                     # writes to .screenshots/
```
