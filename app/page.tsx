import Link from "next/link";
import { Seal } from "@/components/brand/marks";
import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Button, Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { FilmsBand } from "@/components/sections/FilmsBand";
import { FieldMosaic } from "@/components/sections/photos";
import { AudienceGrid, Commitments, GuideBand, HowWeWork, PillarsGrid, TestimonialBand, TrustStrip, WorkBand } from "@/components/sections/shared";
import { offers } from "@/content/offers";
import { getAllCaseStudies } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Durbaan | Your impact, heard.",
  description: "Documentaries, M&E dashboards and websites that donors and customers trust. A Somali impact communications and data studio in Mogadishu and Nairobi.",
  path: "/",
});

const facts = [
  ["7+", "years of communications and digital work in the region"],
  ["4", "countries: Somalia, Somaliland, Ethiopia and Kenya"],
  ["4", "working languages: English, Somali, Arabic and Amharic"],
  ["2", "bases: Mogadishu and Nairobi"],
];

export default function Home() {
  const work = getAllCaseStudies();
  // One story, one dashboard, one website or system, as the PRD asks; fall back to featured order.
  const pick = (tags: string[]) => work.find((c) => c.services.some((s) => tags.includes(s)));
  const featured = Array.from(new Set([pick(["documentary", "video", "photo"]), pick(["dashboard", "report"]), pick(["website", "system"]), ...work].filter(Boolean))).slice(0, 3) as typeof work;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="dots-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_78%_45%,black_10%,transparent_60%)]" />
        <div className="container relative grid gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <Eyebrow tone="amber" className="animate-fade-up">IMPACT · STORIES · DATA</Eyebrow>
            <h1 className="t-display mt-7 animate-fade-up [animation-delay:80ms]">
              Your impact,<br />heard<span className="text-amber">.</span>
            </h1>
            <p className="lead mt-8 max-w-xl text-white/75 animate-fade-up [animation-delay:160ms]">
              We help NGOs, programs and businesses in the Somali regions and East Africa prove what they do, through documentaries, data dashboards and websites that donors and customers trust.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
              <Button href="/contact" size="lg" arrow>Start a project</Button>
              <Button href="/work" size="lg" variant="outline-light">See our work</Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:col-span-5 lg:max-w-none">
            <div aria-hidden className="absolute inset-[-8%] rounded-full border border-white/10" />
            <div aria-hidden className="absolute inset-[-16%] rounded-full border border-white/5" />
            <Seal spin className="relative w-full drop-shadow-[0_40px_60px_rgba(0,0,0,.35)]" title="Durbaan seal: Impact, Stories, Data" />
          </div>
        </div>

        {/* Path selector: who are you? Clarity in ten seconds. */}
        <div className="container relative pb-14 sm:pb-20">
          <p className="eyebrow mb-4 text-white/60">Find your path</p>
          <ul className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {(["impact", "partner", "business", "enterprise"] as const).map((id) => (
              <li key={id}>
                <Link href={offers[id].href} className="group flex h-full items-center justify-between gap-4 bg-navy p-5 transition-colors hover:bg-navy-700 sm:p-6">
                  <span>
                    <span className="block text-sm text-white/60">{offers[id].short}</span>
                    <span className="mt-1 block font-display text-lg font-semibold tracking-display">{offers[id].name}</span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-amber group-hover:text-navy">
                    <ArrowRight width={18} height={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Trust: client logos (with permission) and verifiable facts */}
      <TrustStrip />
      <section className="border-b border-line bg-white">
        <div className="container grid grid-cols-2 gap-px lg:grid-cols-4">
          {facts.map(([n, l]) => (
            <div key={l} className="py-8 pr-6 sm:py-10">
              <p className="font-display text-4xl font-semibold tracking-display sm:text-5xl">{n}</p>
              <p className="mt-2 max-w-[22ch] text-sm text-slate sm:text-[15px]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The problem */}
      <Section tone="white" size="lg">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-6">The problem</Eyebrow>
            <h2 className="t-1">Good work is not enough. It has to be seen<span className="text-amber">.</span></h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="lead text-slate">Strong organizations lose funding, contracts and customers every year. Not because their work is weak, but because the people deciding cannot see it.</p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {[
                ["Donors", "fund what they can verify."],
                ["Customers", "trust what they can see."],
                ["Boards", "act on what they can understand."],
              ].map(([a, b], i) => (
                <Reveal as="li" key={a} delay={i * 80} className="flex items-baseline gap-5 py-6">
                  <span className="font-display text-sm text-amber">0{i + 1}</span>
                  <p className="font-display text-xl font-semibold tracking-display sm:text-2xl">{a} <span className="text-slate">{b}</span></p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Field photography */}
      <FieldMosaic />

      {/* 4. Pillars */}
      <PillarsGrid />

      {/* 5. Audiences */}
      <AudienceGrid />

      {/* 6. Featured work */}
      <WorkBand items={featured} intro="Real documentaries, dashboards, websites and systems. Every number we publish is confirmed by the client." />

      {/* 7. Documentaries */}
      <FilmsBand tone="night" />

      {/* 8. How we work */}
      <HowWeWork />

      {/* Proof before promises */}
      <Commitments />

      {/* 9. Testimonial */}
      <TestimonialBand />

      {/* 10. Lead magnet */}
      <GuideBand />

      {/* 11. Final CTA */}
      <CtaBand title={<>Ready to be heard<span className="text-amber">?</span></>} intro="Tell us who needs to see your work. In 30 minutes we will tell you honestly what it would take, and whether we are the right team.">
        <BookButton />
        <WhatsAppButton />
      </CtaBand>
    </>
  );
}

