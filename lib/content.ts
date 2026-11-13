import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { SHOW_DRAFTS } from "./site";
import {
  articleSchema, caseStudySchema, photoSchema, clientSchema, filmSchema, packagesFileSchema, teamSchema, testimonialSchema,
  type Article, type CaseStudyFrontmatter, type Film, type Package,
} from "./schemas";
import packagesJson from "@/content/packages.json";
import testimonialsJson from "@/content/testimonials.json";
import clientsJson from "@/content/clients.json";
import photosJson from "@/content/photos.json";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

type MediaInfo = { width: number; height: number; blurDataURL?: string };
function loadManifest(): Record<string, MediaInfo> {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "lib/generated/media-manifest.json"), "utf8"));
  } catch {
    return {};
  }
}

export type Img = { src: string; width: number; height: number; blurDataURL?: string; alt: string };

function resolveImage(base: string, rel: string, alt: string): Img {
  const file = path.basename(rel).replace(/\.(jpe?g|png|webp|tiff?)$/i, ".jpg");
  const src = `${base}/${file}`;
  const info = loadManifest()[src];
  if (!info) throw new Error(`Image not found after media sync: ${rel} (expected ${src}). Run "npm run media".`);
  return { src, alt, ...info };
}

function fail(file: string, error: unknown): never {
  const msg = error instanceof Error ? error.message : String(error);
  throw new Error(`Invalid content in ${path.relative(ROOT, file)}:\n${msg}`);
}

export type CaseStudy = Omit<CaseStudyFrontmatter, "gallery" | "beforeAfter"> & {
  body: string;
  hero: Img;
  galleryImages: Img[];
  beforeAfterImages?: { before: Img; after: Img };
  displayClient: string;
};

export const getAllCaseStudies = cache((): CaseStudy[] => {
  const dir = path.join(CONTENT, "work");
  if (!fs.existsSync(dir)) return [];
  const items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const file = path.join(dir, d.name, "index.mdx");
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      const parsed = caseStudySchema.safeParse({ slug: d.name, ...data });
      if (!parsed.success) fail(file, parsed.error);
      const fm = parsed.data;
      const base = `/work/${fm.slug}`;
      return {
        ...fm,
        body: content,
        hero: resolveImage(base, fm.heroImage, fm.heroAlt),
        galleryImages: fm.gallery.map((g, i) =>
          typeof g === "string" ? resolveImage(base, g, `${fm.title}, image ${i + 1}`) : resolveImage(base, g.src, g.alt),
        ),
        beforeAfterImages: fm.beforeAfter && {
          before: resolveImage(base, fm.beforeAfter.before, "Before"),
          after: resolveImage(base, fm.beforeAfter.after, "After"),
        },
        displayClient: fm.clientVisible ? fm.client : fm.clientDescriptor || "Confidential client",
      } satisfies CaseStudy;
    })
    .filter((c) => SHOW_DRAFTS || !c.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year || a.title.localeCompare(b.title));
  return items;
});

export const getCaseStudy = (slug: string) => getAllCaseStudies().find((c) => c.slug === slug);

export const getAllFilms = cache((): (Film & { posterImg?: Img })[] => {
  const dir = path.join(CONTENT, "films");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const file = path.join(dir, f);
      const { data } = matter(fs.readFileSync(file, "utf8"));
      const parsed = filmSchema.safeParse({ slug: f.replace(/\.mdx$/, ""), ...data });
      if (!parsed.success) fail(file, parsed.error);
      const film = parsed.data;
      return { ...film, posterImg: film.poster ? resolveImage("/films", film.poster, film.posterAlt || film.title) : undefined };
    })
    .filter((f) => SHOW_DRAFTS || !f.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || (b.year ?? 0) - (a.year ?? 0));
});

export const getAllArticles = cache((): (Article & { body: string })[] => {
  const dir = path.join(CONTENT, "resources");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const file = path.join(dir, f);
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      const parsed = articleSchema.safeParse({ slug: f.replace(/\.mdx$/, ""), ...data });
      if (!parsed.success) fail(file, parsed.error);
      return { ...parsed.data, body: content };
    })
    .filter((a) => SHOW_DRAFTS || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPackagesFile = cache(() => packagesFileSchema.parse(packagesJson));
export const getPackages = (filter?: (p: Package) => boolean) =>
  filter ? getPackagesFile().packages.filter(filter) : getPackagesFile().packages;

export const getTeam = cache(() => {
  const dir = path.join(CONTENT, "team");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => teamSchema.parse(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))))
    .filter((t) => SHOW_DRAFTS || !t.draft)
    .sort((a, b) => a.order - b.order);
});

export const getTestimonials = cache(() =>
  testimonialSchema.array().parse(testimonialsJson).filter((t) => SHOW_DRAFTS || !t.draft),
);

/** Only clients with written permission are ever shown in production. */
export const getClients = cache(() => {
  const manifest = loadManifest();
  return clientSchema
    .array()
    .parse(clientsJson)
    .filter((c) => (c.permission && !c.draft) || (SHOW_DRAFTS && c.draft))
    .map((c) => ({ ...c, logoSize: c.logo ? manifest[c.logo] : undefined }));
});

/** Field photos. Only photos with confirmed consent are ever returned. */
export const getPhotos = cache(() =>
  photoSchema
    .array()
    .parse(photosJson.photos)
    .filter((p) => p.consentConfirmed)
    .map((p) => ({ ...resolveImage("/photos", p.file, p.alt), id: p.id, caption: p.caption })),
);
export const getPhoto = (id: string) => getPhotos().find((p) => p.id === id);
