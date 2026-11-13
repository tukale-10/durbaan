import Link from "next/link";
import { offers, type OfferLine } from "@/content/offers";
import { pillars } from "@/content/pillars";
import { getAllCaseStudies, getClients, getTestimonials, type CaseStudy } from "@/lib/content";
import { ArrowRight, Check, Clock, Globe, Key, Shield, Tag } from "@/components/ui/icons";
import { pillarIcon } from "@/components/ui/icons";
import { Button, cx, Eyebrow, Heading, Section, SampleBadge } from "@/components/ui/primitives";
import { CaseStudyCard, NumberedItem, TestimonialBlock } from "@/components/ui/blocks";
import { Reveal } from "@/components/ui/Reveal";

/* Pillars: four cards */
export function PillarsGrid({ tone = "mist" }: { tone?: "mist" | "white" }) {
  return (
    <Section tone={tone}>
      <div className="container">
        <Heading eyebrow="What we do" title="Four ways we make your work visible." intro="Most clients start with one pillar. The strongest results come when stories, data and digital work together." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = pillarIcon[p.id];
            return (
              <Reveal key={p.id} delay={i * 70}>
                <Link href={`/services/${p.id}`} className="group flex h-full flex-col rounded-card bg-white p-7 ring-1 ring-line transition hover:-translate-y-1 hover:ring-navy/30 hover:shadow-[0_24px_48px_-28px_rgba(14,31,61,.4)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-amber"><Icon width={22} height={22} /></span>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-display">{p.name}</h3>
                  <p className="mt-2 font-medium">{p.promise}</p>
                  <p className="mt-3 text-[15px] text-slate">{p.line}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
                    Explore {p.name.toLowerCase()} <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* Audience cards, Impact larger */
export function AudienceGrid() {
  const order: OfferLine[] = ["impact", "partner", "business", "enterprise"];
  return (
    <Section tone="white">
      <div className="container">
        <Heading eyebrow="Who we work with" title="Four offers. One standard." intro="Each offer has its own team lead, its own packages and its own page. Find yours." />
        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {order.map((id, i) => {
            const o = offers[id];
            const big = id === "impact";
            return (
              <Reveal key={id} delay={i * 70} className={cx(big && "lg:row-span-2", id === "partner" && "lg:col-span-2")}>
                <Link
                  href={o.href}
                  className={cx(
                    "group relative flex h-full flex-col overflow-hidden rounded-card p-7 transition sm:p-9",
                    big ? "bg-navy text-white" : "bg-mist hover:bg-cream",
                  )}
                >
                  {big && <div aria-hidden className="dots-faint absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />}
                  <div className="relative flex items-center justify-between gap-4">
                    <Eyebrow tone={big ? "amber" : "default"}>{o.name}</Eyebrow>
                    {big && <span className="rounded-full bg-amber px-3 py-1 text-xs font-semibold text-navy">Our main practice</span>}
                  </div>
                  <p className={cx("relative mt-6 text-[15px]", big ? "text-white/65" : "text-slate")}>{o.audience}</p>
                  <h3 className={cx("relative mt-5 font-display font-semibold leading-tight tracking-display", big ? "text-3xl sm:text-[2.6rem]" : "text-2xl")}>{o.promise}</h3>
                  <p className={cx("relative mt-5 border-l-2 border-amber pl-4 text-[15px]", big ? "text-white/80" : "text-slate")}>
                    <span className="font-semibold">{big ? "The problem: " : "Problem: "}</span>{o.problem}
                  </p>
                  {big && (
                    <ul className="relative mt-8 space-y-3 text-[15px] text-white/85">
                      {["Donor-ready websites and organization profiles", "Field documentaries with consent and safeguarding", "Live M&E dashboards mapped to your logframe"].map((x) => (
                        <li key={x} className="flex gap-3"><Check width={18} height={18} className="mt-0.5 shrink-0 text-amber" />{x}</li>
                      ))}
                    </ul>
                  )}
                  {!big && (
                    <p className="relative mt-8 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-slate">Start with</span>
                      <span className="rounded-full bg-white px-3 py-1 font-semibold ring-1 ring-line">{o.leadPackage}</span>
                    </p>
                  )}
                  <span className={cx("relative mt-auto inline-flex items-center gap-2 pt-10 font-semibold", big && "text-amber")}>
                    Explore {o.name.replace("Durbaan ", "")} <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* Proof before promises: verifiable commitments. Real, not invented. */
export function Commitments({ tone = "mist", title = "What you can hold us to." }: { tone?: "mist" | "white"; title?: string }) {
  const items = [
    { icon: Tag, title: "Prices in public", text: "Every package shows a starting price and what is included. No guessing, no inflated first quote." },
    { icon: Clock, title: "Fixed timelines", text: "Most packages take 3 to 8 weeks, with fixed check-in dates agreed before we start." },
    { icon: Check, title: "Clear payment terms", text: "Under 5,000 USD: 50% to start, 50% on delivery. Larger projects: 40%, 30%, 30%." },
    { icon: Key, title: "You own the files", text: "Everything we make is yours once the project is paid in full. Raw files on request." },
    { icon: Shield, title: "Consent in their language", text: "Every person we film gives informed consent in their own language. Donor safeguarding standards, always." },
    { icon: Globe, title: "Local crews, donor standards", text: "Somali-speaking teams in the field, reporting in the format your donor requires." },
  ];
  return (
    <Section tone={tone}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading eyebrow="Proof before promises" title={title} intro="Serious clients ask hard questions before they sign. Here are our answers, in writing, before you even call." />
          </div>
          <div className="grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-8">
            {items.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white p-7">
                <Icon width={22} height={22} className="text-amber" />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-display">{title}</h3>
                <p className="mt-2 text-[15px] text-slate">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Process */
export function HowWeWork({ tone = "white" }: { tone?: "white" | "mist" | "navy" }) {
  const dark = tone === "navy";
  const steps = [
    { t: "Listen", d: "A free 30 minute discovery call. We learn who needs to see your work, and what they need to believe." },
    { t: "Plan", d: "A written proposal with three options, each with a fixed price, timeline and list of deliverables." },
    { t: "Make", d: "Production with fixed check-ins. You see drafts on agreed dates, with two rounds of changes built in." },
    { t: "Launch and measure", d: "We launch with you, train your team, and report back on what the work achieved." },
  ];
  return (
    <Section tone={tone}>
      <div className="container">
        <Heading tone={dark ? "light" : "dark"} eyebrow="How we work" title="Four steps. No surprises." />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.t}><NumberedItem n={i + 1} title={s.t} tone={dark ? "dark" : "light"}>{s.d}</NumberedItem></li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* Case studies band; hides itself when there is no work to show. */
export function WorkBand({
  items, title = "Proof, not promises.", eyebrow = "Selected work", intro, tone = "navy",
}: { items: CaseStudy[]; title?: string; eyebrow?: string; intro?: string; tone?: "navy" | "white" | "mist" }) {
  if (!items.length) return null;
  const dark = tone === "navy";
  return (
    <Section tone={tone}>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading tone={dark ? "light" : "dark"} eyebrow={eyebrow} title={title} intro={intro} />
          <Button href="/work" variant={dark ? "outline-light" : "outline"} arrow>All work</Button>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}><CaseStudyCard c={c} tone={dark ? "dark" : "light"} /></Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function workFor(filter: (c: CaseStudy) => boolean) {
  return getAllCaseStudies().filter(filter);
}

/* Testimonial band; only renders with a real (or, in preview, sample) testimonial. */
export function TestimonialBand({ offerLine }: { offerLine?: OfferLine }) {
  const all = getTestimonials();
  const t = all.find((x) => !offerLine || x.offerLine === offerLine) ?? all[0];
  if (!t) return null;
  return (
    <Section tone="cream">
      <div className="container"><TestimonialBlock t={t} /></div>
    </Section>
  );
}

/* Client logos; only those with written permission. */
export function TrustStrip({ label = "Trusted by teams working with" }: { label?: string }) {
  const clients = getClients();
  if (!clients.length) return null;
  return (
    <div className="border-b border-line bg-white">
      <div className="container flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        <p className="eyebrow shrink-0 text-slate">{label}</p>
        <ul className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-4">
          {clients.map((c) => (
            <li key={c.name} className="flex items-center gap-2 font-display text-base font-semibold text-navy/50">
              {c.draft && <SampleBadge />}
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Lead magnet band (amber). Email carries over to the gated landing page. */
export function GuideBand() {
  return (
    <section className="bg-amber text-navy">
      <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-navy" />Free guide</p>
          <h2 className="t-2 mt-5">The 10 things donors check before they fund you.</h2>
          <p className="mt-5 max-w-xl text-lg">A short, practical checklist from our work with Somali NGOs and programs. Read it in fifteen minutes. Fix the gaps before your next proposal.</p>
        </div>
        <form action="/resources/donor-ready-guide" method="get" className="lg:col-span-5">
          <label htmlFor="guide-email" className="mb-2 block text-sm font-semibold">Your work email</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="guide-email" name="email" type="email" required autoComplete="email" placeholder="name@organization.org" className="h-14 min-w-0 flex-1 rounded-full border-0 bg-white px-6 text-[16px] text-navy placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-navy" />
            <button className="h-14 shrink-0 rounded-full bg-navy px-7 font-semibold text-white hover:bg-navy-600">Get the guide</button>
          </div>
          <p className="mt-3 text-sm text-navy/75">Free. One more step to tell us where to send it.</p>
        </form>
      </div>
    </section>
  );
}
