import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/*
  Content Collections map 1:1 to the Sveltia CMS collections in
  public/admin/config.yml. Image fields are stored as public URL strings
  (e.g. "/assets/images/..") because Sveltia commits uploads under
  public/assets and references them by their served path — this keeps the
  CMS round-trip lossless. (Astro's image() optimizer is reserved for
  build-time assets imported in code, not CMS-managed public files.)
*/

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
    email: z.string(),
    bookingUrl: z.string(),
    openingHours: z.array(
      z.object({
        day: z.string(),
        hours: z.string(),
      })
    ),
  }),
});

export const collections = { treatments, team, settings };
