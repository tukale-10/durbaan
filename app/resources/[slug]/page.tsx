import { notFound } from "next/navigation";
import Link from "next/link";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand } from "@/components/ui/blocks";
import { Mdx } from "@/components/ui/Mdx";
import { Eyebrow, SampleBadge, Section } from "@/components/ui/primitives";
import { GuideBand } from "@/components/sections/shared";
import { getAllArticles } from "@/lib/content";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
const find = (slug: string) => getAllArticles().find((a) => a.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug);
  if (!a) return {};
  return { ...pageMeta({ title: a.title, description: a.description, path: `/resources/${a.slug}` }), robots: a.draft ? { index: false } : undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug);
  if (!a) notFound();
  return (
    <article>
      <header className="bg-navy text-white">
        <div className="container max-w-4xl pb-16 pt-12 sm:pb-20 sm:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60"><Link href="/resources" className="hover:text-amber">Resources</Link></nav>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow tone="amber">{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}{a.readingTime ? ` · ${a.readingTime}` : ""}</Eyebrow>
            {a.draft && <SampleBadge />}
          </div>
          <h1 className="t-1 mt-6">{a.title}</h1>
          <p className="lead mt-6 text-white/75">{a.description}</p>
        </div>
      </header>
      <Section tone="white"><div className="container max-w-4xl"><Mdx source={a.body} /></div></Section>
      <GuideBand />
      <CtaBand title={<>Want a second opinion<span className="text-amber">?</span></>}><BookButton label="Book a free 30 minute call" /></CtaBand>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, datePublished: a.date, author: { "@type": "Organization", name: "Durbaan" }, publisher: { "@type": "Organization", name: "Durbaan", logo: { "@type": "ImageObject", url: `${site.url}/brand/durbaan-seal-on-navy.svg` } } },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: a.title, path: `/resources/${a.slug}` }]),
      ]} />
    </article>
  );
}
