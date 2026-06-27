import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['culture', 'style', 'atelier', 'mecanique']),
    image: z.string().optional(),
    author: z.string().default('Scott'),
    readingTime: z.number(),
  }),
});

const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    name: z.string(),
    ref: z.string(),
    gamme: z.enum(['Initiale', 'Signature']),
    images: z.array(z.string()).default([]),
    specs: z.object({
      mouvement: z.string(),
      cadran: z.string(),
      boitier: z.string(),
      bracelet: z.string(),
      etancheite: z.string(),
    }),
    story: z.string(),
  }),
});

export const collections = { journal, realisations };
