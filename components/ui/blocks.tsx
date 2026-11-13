import Link from "next/link";
import type { ReactNode } from "react";
import { getPackagesFile } from "@/lib/content";
import type { Package, Film } from "@/lib/schemas";
import { ArrowRight, ArrowUpRight, Check, Clock, Plus } from "./icons";
import { cx, Eyebrow, formatUSD, Rhythm, SampleBadge, TagPill } from "./primitives";

/* ---------- Page hero (navy, bold outside) ---------- */
export function PageHero({ eyebrow, title, intro, children, aside }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="dots-faint absolute inset-y-0 right-0 hidden w-1/3 lg:block [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="container relative grid gap-12 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="amber" className="mb-6">{eyebrow}</Eyebrow>
          <h1 className="t-1 animate-fade-up">{title}</h1>
          {intro && <p className="lead mt-7 max-w-2xl text-white/75 animate-fade-up [animation-delay:120ms]">{intro}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-3 animate-fade-up [animation-delay:200ms]">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>
      <div className="container"><div className="h-px bg-white/10" /></div>
    </section>
  );
}

/* ---------- Packages ---------- */
export function priceLabel(pkg: Package) {
  const file = getPackagesFile();
  const display = file.offers[pkg.offerLine]?.priceDisplay ?? "on-request";
  if (display === "on-request" || pkg.price == null) return { main: "Price on request", sub: undefined };
  return { main: `${formatUSD(pkg.price)} ${file.currency}`, prefix: "Starting from", sub: [pkg.unit, pkg.priceNote].filter(Boolean).join(", ") || undefined };
}

export function PackageCard({ pkg, compact = false }: { pkg: Package; compact?: boolean }) {
  const price = priceLabel(pkg);
  const dark = pkg.highlight;
  return (
    <article className={cx("relative flex h-full flex-col rounded-card p-7 sm:p-8", dark ? "bg-navy text-white" : "bg-white ring-1 ring-line")}>
      <div className="flex min-h-7 items-center">
        {pkg.highlight && <TagPill tone="amber">Best value</TagPill>}
        {pkg.lead && !pkg.highlight && <TagPill>Start here</TagPill>}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-tight tracking-display">{pkg.name}</h3>
      <div className={cx("mt-6 border-y py-5", dark ? "border-white/15" : "border-line")}>
        {"prefix" in price && price.prefix && <p className={cx("text-xs font-medium uppercase tracking-[0.14em]", dark ? "text-white/60" : "text-slate")}>{price.prefix}</p>}
        <p className="mt-1 font-display text-[1.65rem] font-semibold tracking-display">{price.main}</p>
        {price.sub && <p className={cx("mt-1 text-sm", dark ? "text-white/70" : "text-slate")}>{price.sub}</p>}
        <p className={cx("mt-3 inline-flex items-center gap-2 text-sm", dark ? "text-white/80" : "text-navy")}><Clock width={16} height={16} className="text-amber" />{pkg.timeline}</p>
      </div>
      <p className={cx("mt-5 text-[15px] leading-relaxed", dark ? "text-white/80" : "text-slate")}>{pkg.summary}</p>
      {!compact && (
        <ul className="mt-6 space-y-3 text-[15px]">
          {pkg.includes.map((i) => (
            <li key={i} className="flex gap-3">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-amber" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      )}
      {pkg.note && <p className={cx("mt-4 text-sm", dark ? "text-white/60" : "text-slate")}>{pkg.note}</p>}
      <div className="mt-auto pt-8">
        <Link
          href={`/contact?package=${pkg.id}`}
          aria-label={`Discuss the ${pkg.name} package`}
          className={cx("group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full font-semibold transition-colors", dark ? "bg-amber text-navy hover:bg-[#FFC14D]" : "bg-navy text-white hover:bg-navy-600")}
        >
          Discuss this package
          <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function PackageGrid({ packages }: { packages: Package[] }) {
  return (
    <div className={cx("grid gap-5 md:grid-cols-2", packages.length >= 3 && "xl:grid-cols-3", packages.length === 4 && "xl:grid-cols-4")}>
      {packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
    </div>
  );
}

export { CaseStudyCard, ServiceTags } from "./CaseStudyCard";

/* ---------- Films ---------- */
export function FilmMeta({ f, tone = "light" }: { f: Film; tone?: "light" | "dark" }) {
  return (
    <dl className={cx("grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4", tone === "dark" ? "text-white/80" : "text-navy")}>
      {[["Client", f.client], ["Location", f.location], ["Duration", f.duration], ["Language", `${f.language}${f.subtitles.length ? `, subtitles in ${f.subtitles.join(" and ")}` : ""}`]].map(([k, v]) => (
        <div key={k}>
          <dt className={cx("eyebrow !text-[10px]", tone === "dark" ? "text-white/50" : "text-slate")}>{k}</dt>
          <dd className="mt-1">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Testimonial ---------- */
export function TestimonialBlock({ t }: { t: { quote: string; name: string; role: string; organization: string; draft?: boolean } }) {
  return (
    <figure className="relative mx-auto max-w-4xl text-center">
      {t.draft && <SampleBadge className="mb-6" />}
      <span aria-hidden className="block font-display text-7xl leading-none text-amber">&ldquo;</span>
      <blockquote className="mt-2 font-display text-2xl font-semibold leading-snug tracking-display sm:text-[2.1rem]">{t.quote}</blockquote>
      <figcaption className="mt-8 text-[15px]">
        <span className="font-semibold">{t.name}</span>
        <span className="text-slate"> &middot; {t.role}, {t.organization}</span>
      </figcaption>
    </figure>
  );
}

/* ---------- FAQ (no JS needed) ---------- */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-display text-lg font-semibold tracking-display [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist transition-transform duration-300 group-open:rotate-45 group-open:bg-amber">
              <Plus width={18} height={18} />
            </span>
          </summary>
          <p className="max-w-3xl pb-5 pr-12 text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/* ---------- Stat ---------- */
export function StatCard({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" | "cream" }) {
  return (
    <div className={cx("rounded-card p-6", tone === "light" && "bg-white ring-1 ring-line", tone === "dark" && "bg-white/5 ring-1 ring-white/10", tone === "cream" && "bg-cream")}>
      <p className={cx("font-display text-4xl font-semibold tracking-display sm:text-5xl", tone === "dark" ? "text-amber" : "text-navy")}>{value}</p>
      <p className={cx("mt-3 text-[15px]", tone === "dark" ? "text-white/75" : "text-slate")}>{label}</p>
    </div>
  );
}

/* ---------- Final CTA band ---------- */
export function CtaBand({ title, intro, children, eyebrow = "Next step" }: { title: ReactNode; intro?: ReactNode; children: ReactNode; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="dots-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
      <div className="container relative py-24 sm:py-32">
        <Rhythm className="mb-8" />
        <Eyebrow tone="light" dot={false} className="mb-5">{eyebrow}</Eyebrow>
        <h2 className="t-1 max-w-4xl">{title}</h2>
        {intro && <p className="lead mt-6 max-w-2xl text-white/75">{intro}</p>}
        <div className="mt-10 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}

/* ---------- Numbered list item ---------- */
export function NumberedItem({ n, title, children, tone = "light" }: { n: number; title: string; children?: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className={cx("border-t pt-6", tone === "dark" ? "border-white/15" : "border-navy/15")}>
      <p className={cx("font-display text-sm", tone === "dark" ? "text-amber" : "text-slate")}>{String(n).padStart(2, "0")}</p>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-display">{title}</h3>
      {children && <div className={cx("mt-3 text-[15px] leading-relaxed", tone === "dark" ? "text-white/70" : "text-slate")}>{children}</div>}
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline decoration-amber decoration-2 underline-offset-4">
      {children} <ArrowUpRight width={16} height={16} />
    </a>
  );
}
