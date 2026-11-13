import { getAllArticles } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Durbaan article";
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAllArticles().find((x) => x.slug === slug);
  return ogImage(a?.title ?? "Resources", "RESOURCES");
}
