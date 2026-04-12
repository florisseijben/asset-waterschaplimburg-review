import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.coerce.string(),
  slug: z.coerce.string(),
  part: z.coerce.string(),
  product: z.coerce.string(),
  ownerTeam: z.coerce.string(),
  status: z.coerce.string(),
  lastReviewed: z.any().optional(),
  summary: z.coerce.string(),
  heroTitle: z.coerce.string().optional()
});

const platform = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    heroActions: z.any().optional(),
    platformFlow: z.any().optional(),
    parts: z.any().optional()
  })
});

const datastandaardLanding = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    systems: z.any().optional(),
    disciplines: z.any().optional(),
    products: z.any().optional()
  })
});

const datastandaardWoordenboek = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    searchIntro: z.coerce.string().optional(),
    productRelations: z.any().optional(),
    nextCapabilities: z.any().optional()
  })
});

const datastandaardObjectenhandboek = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    systems: z.any().optional(),
    disciplines: z.any().optional()
  })
});

const datastandaardObjectenhandboekSystems = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    definition: z.coerce.string().optional(),
    definitionSource: z.coerce.string().optional(),
    terms: z.any().optional(),
    contextNote: z.coerce.string().optional(),
    subtypes: z.any().optional(),
    families: z.any().optional(),
    contentSections: z.any().optional(),
    relatedProducts: z.any().optional(),
    productRelations: z.any().optional(),
    nextSteps: z.any().optional()
  })
});

const datastandaardObjectenhandboekObjects = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    hierarchy: z.any().optional(),
    definition: z.coerce.string().optional(),
    definitionSource: z.coerce.string().optional(),
    terms: z.any().optional(),
    contextNote: z.coerce.string().optional(),
    subtypes: z.any().optional(),
    metadata: z.any().optional(),
    contentSections: z.any().optional(),
    productRelations: z.any().optional(),
    nextSteps: z.any().optional()
  })
});

export const collections = {
  platform,
  "datastandaard-landing": datastandaardLanding,
  "datastandaard-woordenboek": datastandaardWoordenboek,
  "datastandaard-objectenhandboek": datastandaardObjectenhandboek,
  "datastandaard-objectenhandboek-systems": datastandaardObjectenhandboekSystems,
  "datastandaard-objectenhandboek-objects": datastandaardObjectenhandboekObjects
};
