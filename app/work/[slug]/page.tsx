import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand, ExternalLink, ServiceTags, StatCard, TestimonialBlock } from "@/components/ui/blocks";
import { Gallery } from "@/components/ui/Gallery";
import { ArrowRight } from "@/components/ui/icons";
import { Mdx } from "@/components/ui/Mdx";
import { Eyebrow, SampleBadge, Section } from "@/components/ui/primitives";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { offers } from "@/content/offers";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { SECTOR_LABELS, SERVICE_LABELS } from "@/lib/schemas";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return { ...pageMeta({ title: c.title, description: c.summary, path: `/work/${c.slug}` }), robots: c.draft ? { index: false } : undefined };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const all = getAllCaseStudies();
  const next = all[(all.findIndex((x) => x.slug === c.slug) + 1) % all.length];

  const facts: [string, React.ReactNode][] = [
    ["Client", c.displayClient],
    ["Sector", c.sectors.map((s) => SECTOR_LABELS[s]).join(", ")],
    ["Location", c.location],
    ["Year", c.year],
    ...(c.duration ? [["Duration", c.duration] as [string, React.ReactNode]] : []),
    ["Offer", <Link key="o" href={offers[c.offerLine].href} className="underline decoration-amber decoration-2 underline-offset-4">{offers[c.offerLine].name}</Link>],
  ];

  return (
    <article>
      {/* 1. Hero */}
      <header className="bg-navy text-white">
        <div className="container pb-12 pt-12 sm:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
            <Link href="/work" className="hover:text-amber">Work</Link> <span aria-hidden>/</span> <span className="text-white/85">{c.displayClient}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow tone="amber">{c.displayClient} · {c.location}</Eyebrow>
            {c.draft && <SampleBadge />}
          </div>
          <h1 className="t-1 mt-6 max-w-5xl">{c.title}</h1>
          <p className="lead mt-6 max-w-3xl text-white/75">{c.summary}</p>
          <div className="mt-8"><ServiceTags services={c.services} tone="dark" /></div>
        </div>
        <div className="container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-card bg-night">
            <Image src={c.hero.src} alt={c.hero.alt} fill priority sizes="(min-width: 1280px) 1240px, 100vw" placeholder={c.hero.blurDataURL ? "blur" : "empty"} blurDataURL={c.hero.blurDataURL} className="object-cover" />
          </div>
        </div>
      </header>

      {/* 2. At a glance + 3/4. Narrative */}
      <Section tone="white">
        <div className="container grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="rounded-card bg-mist p-7 lg:sticky lg:top-28">
              <p className="eyebrow text-slate">At a glance</p>
              <dl className="mt-6 space-y-4 text-[15px]">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[96px_1fr] gap-3 border-t border-line pt-4">
                    <dt className="text-slate">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[96px_1fr] gap-3 border-t border-line pt-4">
                  <dt className="text-slate">Services</dt>
                  <dd className="font-medium">{c.services.map((s) => SERVICE_LABELS[s]).join(", ")}</dd>
                </div>
              </dl>
              {c.liveUrl && <p className="mt-6"><ExternalLink href={c.liveUrl}>Visit the live project</ExternalLink></p>}
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6"><Mdx source={c.body} /></div>
        </div>
      </Section>

      {/* 5. Media */}
      {(c.film || c.galleryImages.length > 0 || c.beforeAfterImages) && (
        <Section tone="mist">
          <div className="container space-y-16">
            {c.film && (
              <div>
                <Eyebrow className="mb-6">The film</Eyebrow>
                <VideoFacade provider={c.film.provider} id={c.film.id} title={c.film.title} duration={c.film.duration} poster={c.hero} />
              </div>
            )}
            {c.beforeAfterImages && (
              <div>
                <Eyebrow className="mb-6">Before and after</Eyebrow>
                <BeforeAfter before={c.beforeAfterImages.before} after={c.beforeAfterImages.after} />
              </div>
            )}
            {c.galleryImages.length > 0 && (
              <div>
                <Eyebrow className="mb-6">Gallery</Eyebrow>
                <Gallery images={c.galleryImages} />
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 6. Results: only real, confirmed numbers */}
      {c.results.length > 0 && (
        <Section tone="navy">
          <div className="container">
            <Eyebrow tone="amber" className="mb-6">Results</Eyebrow>
            <h2 className="t-2 max-w-3xl">What changed.</h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.results.map((r) => <StatCard key={r.label} value={r.value} label={r.label} tone="dark" />)}
            </div>
            {c.results.some((r) => r.source) && <p className="mt-6 text-sm text-white/55">Sources: {c.results.filter((r) => r.source).map((r) => r.source).join("; ")}.</p>}
          </div>
        </Section>
      )}

      {/* 7. Testimonial */}
      {c.testimonial && (
        <Section tone="cream"><div className="container"><TestimonialBlock t={c.testimonial} /></div></Section>
      )}

      {/* 8. Next */}
      {next && next.slug !== c.slug && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line bg-white">
          <div className="container flex items-center justify-between gap-6 py-12">
            <div>
              <p className="eyebrow text-slate">Next case study</p>
              <p className="mt-3 font-display text-xl font-semibold tracking-display sm:text-3xl">{next.title}</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber text-navy transition-transform group-hover:translate-x-1"><ArrowRight /></span>
          </div>
        </Link>
      )}

      <CtaBand title={<>Want results like these<span className="text-amber">?</span></>}>
        <BookButton />
        <WhatsAppButton />
      </CtaBand>
      <JsonLd data={[
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: c.title, path: `/work/${c.slug}` }]),
        { "@context": "https://schema.org", "@type": "CreativeWork", name: c.title, description: c.summary, image: `${site.url}${c.hero.src}`, dateCreated: String(c.year), creator: { "@type": "Organization", name: "Durbaan" } },
        ...(c.film?.provider === "youtube" ? [{ "@context": "https://schema.org", "@type": "VideoObject", name: c.film.title, description: c.summary, thumbnailUrl: `${site.url}${c.hero.src}`, uploadDate: `${c.year}-01-01`, embedUrl: `https://www.youtube-nocookie.com/embed/${c.film.id}` }] : []),
      ]} />
    </article>
  );
}
