import { getAllCaseStudies, getCaseStudy, getProject, getProjects } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Durbaan project";
export function generateStaticParams() {
  const projects = getProjects().map((p) => ({ slug: p.slug }));
  return [...projects, ...getAllCaseStudies().filter((c) => !projects.some((p) => p.slug === c.slug)).map((c) => ({ slug: c.slug }))];
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const p = getProject(slug);
  if (p) return ogImage(p.title, `${p.category.toUpperCase()} · ${p.displayClient.toUpperCase()}`);
  const c = getCaseStudy(slug);
  return ogImage(c?.title ?? "Case study", `CASE STUDY · ${(c?.displayClient ?? "").toUpperCase()}`);
}
