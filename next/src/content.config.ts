import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  part: z.string(),
  product: z.string(),
  ownerTeam: z.string(),
  status: z.string(),
  lastReviewed: z.string(),
  summary: z.string(),
  heroTitle: z.string().optional()
});

const platform = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    heroActions: z.array(z.object({
      label: z.string(),
      href: z.string(),
      variant: z.string()
    })).optional(),
    platformFlow: z.array(z.object({
      title: z.string(),
      text: z.string()
    })).optional(),
    parts: z.array(z.object({
      title: z.string(),
      text: z.string(),
      href: z.string().optional()
    })).optional()
  })
});

const datastandaardLanding = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    systems: z.array(z.object({
      title: z.string(),
      text: z.string()
    })).optional(),
    disciplines: z.array(z.object({
      title: z.string(),
      text: z.string()
    })).optional(),
    products: z.array(z.object({
      title: z.string(),
      text: z.string(),
      href: z.string().optional()
    })).optional()
  })
});

const datastandaardWoordenboek = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    searchIntro: z.string().optional(),
    productRelations: z.array(z.object({
      title: z.string(),
      links: z.array(z.object({
        label: z.string(),
        href: z.string().optional()
      }))
    })).optional(),
    nextCapabilities: z.array(z.object({
      title: z.string(),
      text: z.string()
    })).optional()
  })
});

export const collections = {
  platform,
  "datastandaard-landing": datastandaardLanding,
  "datastandaard-woordenboek": datastandaardWoordenboek
};
