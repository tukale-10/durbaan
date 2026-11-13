import Image from "next/image";
import { Drum, Seal } from "@/components/brand/marks";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { Pin, Shield } from "@/components/ui/icons";
import { Eyebrow, Heading, Section, SampleBadge } from "@/components/ui/primitives";
import { getTeam } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Durbaan: the drum that calls people to hear what matters",
  description: "Durbaan is the Somali word for drum. We are an impact communications and data studio in Mogadishu and Nairobi, founded by Ridwan Tukale.",
  path: "/about",
});

const values = [
  ["Credible", "We only publish what we can stand behind. Every number is confirmed, every story is consented."],
  ["Rooted", "We are from here. We work in the languages of the people we film and the communities we serve."],
  ["Bold", "Good work deserves to be seen. We make it impossible to ignore, without making it loud."],
  ["Warm", "We treat the people in our stories, and the clients we work with, the way we would want to be treated."],
];

export default function AboutPage() {
  const team = getTeam();
  const [founder, ...others] = team;
  return (
    <>
      <PageHero eyebrow="ABOUT" title={<>The drum that calls people to hear what matters<span className="text-amber">.</span></>} />

      {/* The drum story */}
      <Section tone="white" size="lg">
        <div className="container grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square max-w-sm rounded-full bg-cream p-12">
              <div aria-hidden className="dots absolute inset-6 rounded-full opacity-40 [mask-image:radial-gradient(circle,transparent_55%,black_56%)]" />
              <Drum className="relative h-full w-full" title="A durbaan, the Somali drum" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow className="mb-6">The drum story</Eyebrow>
            <h2 className="t-2">Durbaan is the Somali word for drum.</h2>
            <div className="lead mt-6 space-y-5 text-slate">
              <p>Before radios and phones, the drum called communities together to hear news that mattered: a gathering, a celebration, a warning, a decision.</p>
              <p>That is still the job. Our clients do work that matters in difficult places. We make sure the people who decide their future, donors, partners, boards and customers, actually hear it.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Founder */}
      {founder && (
        <Section tone="mist">
          <div className="container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-navy">
                {founder.photo ? (
                  <Image src={founder.photo} alt={`${founder.name}, ${founder.role}`} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center p-16"><Seal className="w-full max-w-[220px]" title="" aria-hidden /></div>
                )}
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Eyebrow className="mb-6">Founder</Eyebrow>
              <h2 className="t-2">{founder.name}</h2>
              <p className="mt-2 text-lg font-medium text-slate">{founder.role}</p>
              <p className="lead mt-8">{founder.bio}</p>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-3">
                {[["7+ years", "Strategic communications and digital"], ["4 countries", "Somalia, Somaliland, Ethiopia, Kenya"], ["4 languages", "English, Somali, Arabic, Amharic"]].map(([a, b]) => (
                  <div key={a} className="bg-white p-6"><dt className="font-display text-xl font-semibold tracking-display">{a}</dt><dd className="mt-1 text-sm text-slate">{b}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      )}

      {/* Team and network */}
      {others.length > 0 && (
        <Section tone="white">
          <div className="container">
            <Heading eyebrow="Team and network" title="A core team, with specialists on call." intro="Camera, editing, data and development specialists who join each project as needed." />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((m) => (
                <li key={m.name} className="rounded-card bg-mist p-6">
                  {m.draft && <SampleBadge className="mb-4" />}
                  <p className="font-display text-lg font-semibold tracking-display">{m.name}</p>
                  <p className="mt-1 text-sm text-slate">{m.role}</p>
                  <p className="mt-4 text-[15px] text-slate">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Values */}
      <Section tone="navy">
        <div className="container">
          <Heading tone="light" eyebrow="How we work" title="Four values. Every project." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d]) => (
              <li key={t} className="bg-navy p-8">
                <span className="block h-2 w-2 rounded-full bg-amber" />
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-display">{t}</h3>
                <p className="mt-3 text-[15px] text-white/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Where + Ethics */}
      <Section tone="white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-mist p-8 sm:p-10">
            <Pin className="text-amber" width={26} height={26} />
            <h2 className="t-3 mt-6">Where we work</h2>
            <p className="mt-4 text-slate">Based in <strong className="text-navy">Mogadishu</strong> and <strong className="text-navy">Nairobi</strong>, with field work across Somalia, Somaliland, Ethiopia and Kenya.</p>
          </div>
          <div className="rounded-card bg-cream p-8 sm:p-10">
            <Shield className="text-navy" width={26} height={26} />
            <h2 className="t-3 mt-6">Our ethics in the field</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              {[
                "Informed consent from every person we film or photograph, in their own language.",
                "Donor safeguarding standards, with extra protection for children and vulnerable people.",
                "No identifying details published without permission. Location data stripped from every photo.",
                "Data stored securely and shared only with the people who need it.",
              ].map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />{x}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand title={<>Let us hear about your work<span className="text-amber">.</span></>}><BookButton /></CtaBand>
    </>
  );
}
