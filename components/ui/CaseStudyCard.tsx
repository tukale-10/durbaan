import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { SECTOR_LABELS, SERVICE_LABELS } from "@/lib/schemas";
import { ArrowRight } from "./icons";
import { cx, SampleBadge, TagPill } from "./primitives";

export type CaseStudyCardData = Pick<CaseStudy, "slug" | "title" | "displayClient" | "sectors" | "services" | "results" | "summary" | "hero" | "draft">;

/* ---------- Case studies ---------- */
export function CaseStudyCard({ c, tone = "light", priority = false }: { c: CaseStudyCardData; tone?: "light" | "dark"; priority?: boolean }) {
  const result = c.results[0];
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist">
        <Image src={c.hero.src} alt={c.hero.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder={c.hero.blurDataURL ? "blur" : "empty"} blurDataURL={c.hero.blurDataURL} priority={priority} className="object-cover transition duration-700 group-hover:scale-[1.03]" />
        {c.draft && <SampleBadge className="absolute left-4 top-4" />}
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className={cx("eyebrow", tone === "dark" ? "text-white/60" : "text-slate")}>
          {c.displayClient} <span className="text-amber">&middot;</span> {SECTOR_LABELS[c.sectors[0]]}
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-display">
          <Link href={`/work/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link>
        </h3>
        {result ? (
          <p className={cx("mt-4 flex items-baseline gap-3 border-t pt-4", tone === "dark" ? "border-white/15" : "border-line")}>
            <span className="font-display text-2xl font-semibold text-amber">{result.value}</span>
            <span className={cx("text-sm", tone === "dark" ? "text-white/70" : "text-slate")}>{result.label}</span>
          </p>
        ) : (
          <p className={cx("mt-3 text-[15px]", tone === "dark" ? "text-white/70" : "text-slate")}>{c.summary}</p>
        )}
        <span className={cx("mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold", tone === "dark" ? "text-amber" : "text-navy")}>
          Read the case study <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ServiceTags({ services, tone = "light" }: { services: CaseStudy["services"]; tone?: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map((s) => <TagPill key={s} tone={tone}>{SERVICE_LABELS[s]}</TagPill>)}
    </div>
  );
}

