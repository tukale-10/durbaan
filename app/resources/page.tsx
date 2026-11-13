import Link from "next/link";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Heading, SampleBadge, Section } from "@/components/ui/primitives";
import { GuideBand } from "@/components/sections/shared";
import { getAllArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resources: guides for NGO communications and M&E",
  description: "Free guides and articles on donor readiness, ethical storytelling, M&E dashboards and credible websites for Somali NGOs and programs.",
  path: "/resources",
});

export default function ResourcesPage() {
  const articles = getAllArticles();
  return (
    <>
      <PageHero eyebrow="RESOURCES" title={<>Free tools to make your work visible<span className="text-amber">.</span></>} intro="Practical guides from our work with NGOs, programs and businesses in the region." />
      <GuideBand />
      {articles.length > 0 && (
        <Section tone="white">
          <div className="container">
            <Heading eyebrow="Articles" title="Notes from the field." />
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/resources/${a.slug}`} className="group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="eyebrow text-slate">{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}{a.readingTime ? ` · ${a.readingTime}` : ""}</p>
                        {a.draft && <SampleBadge />}
                      </div>
                      <h2 className="mt-3 font-display text-xl font-semibold tracking-display sm:text-2xl">{a.title}</h2>
                      <p className="mt-2 max-w-2xl text-slate">{a.description}</p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist transition group-hover:bg-amber"><ArrowRight /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
      <CtaBand title={<>Prefer to talk it through<span className="text-amber">?</span></>}><BookButton /></CtaBand>
    </>
  );
}
