import { notFound } from "next/navigation";
import Link from "next/link";
import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand, NumberedItem, PackageCard, PageHero } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Heading, Section } from "@/components/ui/primitives";
import { WorkBand, workFor } from "@/components/sections/shared";
import { offers } from "@/content/offers";
import { pillarById, pillars } from "@/content/pillars";
import { getPackages } from "@/lib/content";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const p = pillarById((await params).pillar);
  if (!p) return {};
  return pageMeta({ title: `${p.name}: ${p.promise.replace(/\.$/, "")}`, description: `${p.line} ${p.services.map((s) => s.name).join(", ")}.`, path: `/services/${p.id}` });
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const p = pillarById((await params).pillar);
  if (!p) notFound();
  const pkgs = getPackages((x) => x.pillars.includes(p.id) && x.unit !== "per month");
  const work = workFor((c) => c.services.some((s) => p.serviceTags.includes(s)));
  return (
    <>
      <PageHero eyebrow={`SERVICES · ${p.name.toUpperCase()}`} title={<>{p.promise.replace(/\.$/, "")}<span className="text-amber">.</span></>} intro={p.line}>
        <BookButton />
      </PageHero>

      <Section tone="white">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Heading eyebrow="What we deliver" title={`${p.name} services`} /></div>
          <ul className="grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-8">
            {p.services.map((s) => (
              <li key={s.name} className="bg-white p-7">
                <h3 className="font-display text-lg font-semibold tracking-display">{s.name}</h3>
                <p className="mt-2 text-[15px] text-slate">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="navy">
        <div className="container">
          <Heading tone="light" eyebrow="How it works" title="From first call to delivery." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.steps.map((s, i) => <li key={s}><NumberedItem n={i + 1} title={s} tone="dark" /></li>)}
          </ol>
        </div>
      </Section>

      <WorkBand items={work} tone="white" eyebrow={`${p.name} work`} title="Related case studies." />

      {pkgs.length > 0 && (
        <Section tone="mist">
          <div className="container">
            <Heading eyebrow="Related packages" title={`Packages that include ${p.name.toLowerCase()}.`} intro="Across our four offers. Pick the one written for organizations like yours." />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pkgs.slice(0, 6).map((pkg) => (
                <div key={pkg.id} className="flex flex-col">
                  <Link href={offers[pkg.offerLine].href} className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-navy">
                    {offers[pkg.offerLine].name} <ArrowRight width={14} height={14} />
                  </Link>
                  <div className="flex-1"><PackageCard pkg={pkg} compact /></div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <CtaBand title={<>Let us talk about {p.name.toLowerCase()}<span className="text-amber">.</span></>}>
        <BookButton />
        <WhatsAppButton />
      </CtaBand>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: p.name, path: `/services/${p.id}` }])} />
    </>
  );
}
