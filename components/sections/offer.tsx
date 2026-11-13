import type { ReactNode } from "react";
import { offers, type OfferLine } from "@/content/offers";
import { getPackages } from "@/lib/content";
import { PackageCard, PackageGrid } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Heading, Section } from "@/components/ui/primitives";
import Link from "next/link";

/** Package section for an offer line. Retainers (per month) are shown as a wide strip below the grid. */
export function OfferPackages({ line, title, intro }: { line: OfferLine; title: string; intro?: string }) {
  const all = getPackages((p) => p.offerLine === line);
  const retainers = all.filter((p) => p.unit === "per month");
  const main = all.filter((p) => p.unit !== "per month");
  return (
    <Section tone="mist" id="packages">
      <div className="container">
        <Heading eyebrow={`${offers[line].name} packages`} title={title} intro={intro} />
        <div className="mt-14"><PackageGrid packages={main} /></div>
        {retainers.map((r) => (
          <div key={r.id} className="mt-5"><RetainerStrip pkg={r} /></div>
        ))}
        <p className="mt-8 text-sm text-slate">
          Prices are starting points in US dollars. Every proposal comes with three options and a fixed quote. Need something different?{" "}
          <Link href="/contact" className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">Ask us</Link>.
        </p>
      </div>
    </Section>
  );
}

function RetainerStrip({ pkg }: { pkg: ReturnType<typeof getPackages>[number] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
      <PackageCard pkg={pkg} compact />
      <div className="flex flex-col justify-center rounded-card bg-white p-8 ring-1 ring-line">
        <p className="eyebrow text-slate">Included every month</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {pkg.includes.map((i) => (
            <li key={i} className="flex items-center gap-3 border-t border-line pt-3 text-[15px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />{i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SplitStatement({ eyebrow, title, children, tone = "white" }: { eyebrow: string; title: ReactNode; children: ReactNode; tone?: "white" | "mist" }) {
  return (
    <Section tone={tone}>
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading eyebrow={eyebrow} title={title} />
        </div>
        <div className="lead text-slate lg:col-span-6 lg:col-start-7 [&>p+p]:mt-5">{children}</div>
      </div>
    </Section>
  );
}

export function OutcomeGrid({ eyebrow, title, items, tone = "navy" }: { eyebrow: string; title: string; items: { t: string; d: string }[]; tone?: "navy" | "white" }) {
  const dark = tone === "navy";
  return (
    <Section tone={tone}>
      <div className="container">
        <Heading tone={dark ? "light" : "dark"} eyebrow={eyebrow} title={title} />
        <div className={`mt-14 grid gap-px overflow-hidden rounded-card ${items.length > 3 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} ${dark ? "bg-white/10" : "bg-line ring-1 ring-line"}`}>
          {items.map((it, i) => (
            <div key={it.t} className={`p-8 sm:p-10 ${dark ? "bg-navy" : "bg-white"}`}>
              <p className="font-display text-sm text-amber">0{i + 1}</p>
              <h3 className="mt-8 font-display text-xl font-semibold leading-snug tracking-display sm:text-2xl">{it.t}</h3>
              <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-white/70" : "text-slate"}`}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function SeeAlso({ current }: { current: OfferLine }) {
  const others = (Object.keys(offers) as OfferLine[]).filter((k) => k !== current);
  return (
    <section className="border-t border-line bg-white">
      <div className="container grid gap-px py-2 sm:grid-cols-3">
        {others.map((k) => (
          <Link key={k} href={offers[k].href} className="group flex items-center justify-between gap-4 py-6 sm:px-4">
            <span>
              <span className="block text-sm text-slate">{offers[k].short}</span>
              <span className="font-display font-semibold tracking-display">{offers[k].name}</span>
            </span>
            <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
