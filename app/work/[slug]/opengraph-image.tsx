import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Durbaan case study";
export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  return ogImage(c?.title ?? "Case study", `CASE STUDY · ${(c?.displayClient ?? "").toUpperCase()}`);
}
