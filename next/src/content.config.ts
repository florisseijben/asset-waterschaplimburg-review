import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  part: z.string(),
  product: z.string(),
  ownerTeam: z.string(),
  status: z.string(),
  lastReviewed: z.string(),
  summary: z.string()
});

const platform = defineCollection({
  type: "content",
  schema: baseSchema
});

const datastandaardLanding = defineCollection({
  type: "content",
  schema: baseSchema
});

const datastandaardWoordenboek = defineCollection({
  type: "content",
  schema: baseSchema
});

export const collections = {
  platform,
  datastandaardLanding,
  datastandaardWoordenboek
};
