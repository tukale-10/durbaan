import type { MetadataRoute } from "next";
import { pillars } from "@/content/pillars";
import { getAllArticles, getAllCaseStudies, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/impact", "/partners", "/business", "/enterprise", "/services", "/work", "/films", "/about", "/resources", "/resources/donor-ready-guide", "/brand", "/contact", "/privacy", "/terms"];
  const priority = (p: string) => (p === "" ? 1 : p === "/impact" ? 0.9 : ["/partners", "/business", "/enterprise", "/work", "/contact"].includes(p) ? 0.8 : 0.6);
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: priority(p) })),
    ...pillars.map((p) => ({ url: `${site.url}/services/${p.id}`, lastModified: now, priority: 0.7 })),
    ...getProjects().map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...getAllCaseStudies().filter((c) => !c.draft).map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...getAllArticles().filter((a) => !a.draft).map((a) => ({ url: `${site.url}/resources/${a.slug}`, lastModified: new Date(a.date), priority: 0.6 })),
  ];
}
