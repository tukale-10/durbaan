import { z } from "zod";

export const SECTORS = ["humanitarian", "health", "education", "livelihoods", "wash", "governance", "business", "corporate"] as const;
export const SERVICES = ["documentary", "video", "photo", "dashboard", "website", "system", "training", "report"] as const;
export const OFFER_LINES = ["impact", "partner", "business", "enterprise"] as const;

export const SECTOR_LABELS: Record<(typeof SECTORS)[number], string> = {
  humanitarian: "Humanitarian", health: "Health", education: "Education", livelihoods: "Livelihoods",
  wash: "WASH", governance: "Governance", business: "Business", corporate: "Corporate",
};
export const SERVICE_LABELS: Record<(typeof SERVICES)[number], string> = {
  documentary: "Documentary", video: "Video", photo: "Photo", dashboard: "Dashboard",
  website: "Website", system: "System", training: "Training", report: "Report",
};

const film = z.object({
  provider: z.enum(["youtube", "vimeo"]),
  id: z.string().min(1),
  title: z.string().min(1),
  duration: z.string().optional(),
});

export const caseStudySchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    client: z.string().min(1),
    clientVisible: z.boolean().default(true),
    clientDescriptor: z.string().optional(),
    offerLine: z.enum(OFFER_LINES),
    sectors: z.array(z.enum(SECTORS)).min(1),
    services: z.array(z.enum(SERVICES)).min(1),
    location: z.string().min(1),
    year: z.number().int().min(2000).max(2100),
    duration: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    summary: z.string().min(1).max(220),
    heroImage: z.string().min(1),
    heroAlt: z.string().min(1, "heroAlt is required for accessibility"),
    film: film.optional(),
    liveUrl: z.string().url().optional(),
    gallery: z.array(z.union([z.string(), z.object({ src: z.string(), alt: z.string().min(1) })])).default([]),
    beforeAfter: z.object({ before: z.string(), after: z.string() }).optional(),
    results: z.array(z.object({ value: z.string().min(1), label: z.string().min(1), source: z.string().optional() })).max(4).default([]),
    testimonial: z.object({ quote: z.string(), name: z.string(), role: z.string(), organization: z.string() }).optional(),
    containsPeople: z.boolean().default(true),
    consentConfirmed: z.boolean(),
  })
  .superRefine((d, ctx) => {
    if (d.containsPeople && !d.consentConfirmed && !d.draft) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["consentConfirmed"],
        message: "Media includes people but consentConfirmed is false. Confirm consent or set containsPeople: false.",
      });
    }
  });

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;

export const filmSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  client: z.string().min(1),
  location: z.string().min(1),
  year: z.number().int().optional(),
  duration: z.string().optional(),
  language: z.string().optional(),
  subtitles: z.array(z.string()).default([]),
  synopsis: z.string().min(1),
  sectors: z.array(z.enum(SECTORS)).min(1),
  provider: z.enum(["youtube", "vimeo"]),
  id: z.string().min(1),
  poster: z.string().optional(),
  posterAlt: z.string().optional(),
  caseStudy: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});
export type Film = z.infer<typeof filmSchema>;

export const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(220),
  date: z.string(),
  readingTime: z.string().optional(),
  draft: z.boolean().default(false),
});
export type Article = z.infer<typeof articleSchema>;

export const packageSchema = z.object({
  id: z.string(),
  offerLine: z.enum(OFFER_LINES),
  name: z.string(),
  lead: z.boolean().optional(),
  highlight: z.boolean().optional(),
  price: z.number().nullable(),
  unit: z.string().nullable(),
  priceNote: z.string().optional(),
  timeline: z.string(),
  pillars: z.array(z.enum(["stories", "data", "digital", "capability"])),
  summary: z.string(),
  includes: z.array(z.string()),
  note: z.string().optional(),
});
export const packagesFileSchema = z.object({
  currency: z.string(),
  offers: z.record(z.enum(OFFER_LINES), z.object({ priceDisplay: z.enum(["from", "on-request"]) })),
  packages: z.array(packageSchema),
});
export type Package = z.infer<typeof packageSchema>;

export const teamSchema = z.object({
  name: z.string(), role: z.string(), bio: z.string(), photo: z.string().nullable().optional(), order: z.number().default(99),
  draft: z.boolean().default(false),
});
export const testimonialSchema = z.object({
  quote: z.string(), name: z.string(), role: z.string(), organization: z.string(),
  offerLine: z.enum(OFFER_LINES).optional(), draft: z.boolean().default(false),
});
export const clientSchema = z.object({
  name: z.string(), logo: z.string().nullable(), permission: z.boolean(), draft: z.boolean().default(false),
});

export const photoSchema = z.object({
  id: z.string(),
  file: z.string(),
  alt: z.string().min(1),
  caption: z.string().optional(),
  consentConfirmed: z.boolean(),
});
