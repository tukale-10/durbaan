import { Suspense } from "react";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { Section } from "@/components/ui/primitives";
import { WorkFilters } from "@/components/sections/WorkFilters";
import { offers } from "@/content/offers";
import { getAllCaseStudies } from "@/lib/content";
import { SECTOR_LABELS, SECTORS, SERVICE_LABELS, SERVICES } from "@/lib/schemas";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work: documentaries, dashboards, websites and systems",
  description: "Case studies from Durbaan: impact documentaries, M&E dashboards, websites and systems for NGOs, programs and businesses in Somalia and East Africa.",
  path: "/work",
});

export default function WorkPage() {
  const all = getAllCaseStudies();
  const items = all.map(({ slug, title, displayClient, sectors, services, results, summary, hero, draft, offerLine, year }) => ({ slug, title, displayClient, sectors, services, results, summary, hero, draft, offerLine, year }));
  const years = Array.from(new Set(all.map((c) => c.year))).sort((a, b) => b - a);
  const groups = [
    { key: "sector" as const, label: "Sector", options: SECTORS.map((s) => ({ value: s, label: SECTOR_LABELS[s] })) },
    { key: "service" as const, label: "Service", options: SERVICES.map((s) => ({ value: s, label: SERVICE_LABELS[s] })) },
    { key: "offer" as const, label: "Offer", options: (Object.keys(offers) as (keyof typeof offers)[]).map((k) => ({ value: k, label: offers[k].name.replace("Durbaan ", "") })) },
    { key: "year" as const, label: "Year", options: years.map((y) => ({ value: String(y), label: String(y) })) },
  ];
  return (
    <>
      <PageHero eyebrow="WORK" title={<>Proof, not promises<span className="text-amber">.</span></>} intro="Documentaries, dashboards, websites and systems. Every result we publish has been confirmed by the client." />
      <Section tone="white" className="!pt-12">
        <div className="container">
          {items.length ? (
            <Suspense>
              <WorkFilters items={items} groups={groups} />
            </Suspense>
          ) : (
            <div className="rounded-card bg-mist p-10 text-center sm:p-16">
              <h2 className="t-3">New case studies are being written up.</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate">We publish a project only once the client has approved the story and the numbers. Ask us for examples relevant to your sector on a call.</p>
            </div>
          )}
        </div>
      </Section>
      <CtaBand title={<>Want to see work like yours<span className="text-amber">?</span></>} intro="Some of our best work is confidential. On a call, we can walk you through examples relevant to your sector.">
        <BookButton />
      </CtaBand>
    </>
  );
}
