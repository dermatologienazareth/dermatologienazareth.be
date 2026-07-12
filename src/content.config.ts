import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/*
  Content Collections map 1:1 to the Sveltia CMS collections in
  public/admin/config.yml. Image fields are stored as public URL strings
  (e.g. "/assets/images/..") because Sveltia commits uploads under
  public/assets and references them by their served path — this keeps the
  CMS round-trip lossless. (Astro's image() optimizer is reserved for
  build-time assets imported in code, not CMS-managed public files.)

  All page copy lives in src/content/pages/ so the site owner edits it via
  the CMS "Pagina's" collection; the .astro pages only provide structure.
*/

/** <title> + meta description, editable per page. */
const seo = z.object({
  title: z.string(),
  description: z.string(),
});

const treatments = defineCollection({
  loader: glob({ base: './src/content/treatments', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    order: z.number().default(0),
  }),
});

// Homepage copy, one field group per visual section (top to bottom). A
// singleton like `settings`: the parser wraps the flat JSON object written by
// Sveltia into one record so getEntry('homePage', 'home') resolves it.
const homePage = defineCollection({
  loader: file('./src/content/pages/home.json', {
    parser: (text) => [{ id: 'home', ...JSON.parse(text) }],
  }),
  schema: z.object({
    id: z.string(),
    seo,
    hero: z.object({
      title: z.string(),
      tagline: z.string(),
      ctaLabel: z.string(),
    }),
    intro: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
    }),
    doctorSpotlight: z.object({
      eyebrow: z.string(),
      // Sveltia relation value: the slug of a `team` entry. The name, photo
      // and bio are rendered from that entry, so the bio has a single source.
      member: z.string(),
      ctaLabel: z.string(),
    }),
    practiceSpotlight: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      image: z.string().optional(),
      ctaLabel: z.string(),
    }),
    treatmentsSection: z.object({
      eyebrow: z.string(),
      title: z.string(),
      ctaLabel: z.string(),
    }),
    practicalSection: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          text: z.string(),
        })
      ),
    }),
    contactCta: z.object({
      eyebrow: z.string(),
      title: z.string(),
      // "{telefoon}" in the text is replaced with a clickable phone number.
      text: z.string(),
      ctaLabel: z.string(),
    }),
  }),
});

// Copy for the simple sub pages. Explicit allowlist (not "*.json") so a stray
// file in the folder can never break the shared schema; home.json has its own
// richer collection above.
const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: ['behandelingen.json', 'praktijk.json', 'contact.json', 'afspraak.json'],
  }),
  schema: z.object({
    seo,
    title: z.string(),
    intro: z.string(),
  }),
});

// Site-wide announcement pop-up, toggled and worded by the site owner
// (CMS: Instellingen → Aankondiging).
const announcement = defineCollection({
  loader: file('./src/content/settings/announcement.json', {
    parser: (text) => [{ id: 'announcement', ...JSON.parse(text) }],
  }),
  schema: z.object({
    id: z.string(),
    enabled: z.boolean(),
    title: z.string(),
    text: z.string().default(''),
  }),
});

// Singleton: a single JSON record edited via a Sveltia "files" collection.
// Sveltia writes the fields as one flat object; the parser wraps that into a
// single record so getEntry('settings', 'contact') resolves it.
const settings = defineCollection({
  loader: file('./src/content/settings/contact.json', {
    parser: (text) => [{ id: 'contact', ...JSON.parse(text) }],
  }),
  schema: z.object({
    id: z.string(),
    practiceName: z.string(),
    addressLine: z.string(),
    postalCode: z.string(),
    city: z.string(),
    phone: z.string(),
    // Short qualifier shown next to the phone number (e.g. when bookings run
    // through another practice's line); empty once no longer needed.
    phoneNote: z.string().default(''),
    // Empty while the practice mailbox is not yet active — the address is
    // then shown nowhere (footer, contact page, structured data).
    email: z.string().default(''),
    // Empty while online booking is unavailable — "Afspraak maken" buttons
    // then fall back to a tel: link to `phone`.
    bookingUrl: z.string(),
    openingHours: z.array(
      z.object({
        day: z.string(),
        hours: z.string(),
      })
    ),
  }),
});

export const collections = { treatments, team, homePage, pages, announcement, settings };
