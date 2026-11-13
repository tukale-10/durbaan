import Link from "next/link";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { ArrowRight, pillarIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/primitives";
import { HowWeWork } from "@/components/sections/shared";
import { pillars } from "@/content/pillars";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services: stories, data, digital and capability",
  description: "Impact documentaries, M&E dashboards, websites, systems and AI training. Every Durbaan service, by pillar.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="SERVICES" title={<>Everything we make, in four pillars<span className="text-amber">.</span></>} intro="Stories show the human side. Data proves the results. Digital makes it credible. Capability keeps it going after we leave." />
      <Section tone="white">
        <div className="container space-y-6">
          {pillars.map((p) => {
            const Icon = pillarIcon[p.id];
            return (
              <article key={p.id} className="grid gap-8 rounded-card bg-mist p-7 sm:p-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-amber"><Icon width={22} height={22} /></span>
                  <h2 className="mt-6 font-display text-3xl font-semibold tracking-display">{p.name}</h2>
                  <p className="mt-2 text-lg font-medium">{p.promise}</p>
                  <Link href={`/services/${p.id}`} className="mt-6 inline-flex items-center gap-2 font-semibold">
                    Explore {p.name.toLowerCase()} <ArrowRight width={18} height={18} />
                  </Link>
                </div>
                <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-8">
                  {p.services.map((s) => (
                    <li key={s.name} className="border-t border-navy/10 pt-4">
                      <h3 className="font-semibold">{s.name}</h3>
                      <p className="mt-1 text-[15px] text-slate">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>
      <HowWeWork tone="mist" />
      <CtaBand title={<>Not sure where to start<span className="text-amber">?</span></>} intro="Tell us who needs to see your work. We will recommend the smallest project that makes the biggest difference.">
        <BookButton />
      </CtaBand>
    </>
  );
}
