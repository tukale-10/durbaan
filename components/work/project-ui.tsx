import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import type { ProjectCategory } from "@/lib/schemas";
import { ArrowRight, Capability, Data, Digital, Play, Stories } from "@/components/ui/icons";
import { cx } from "@/components/ui/primitives";

/* Client-safe: no server imports, so the filterable index can use these too. */

export type ProjectCardData = Pick<
  Project,
  "slug" | "title" | "category" | "displayClient" | "year" | "location" | "status" | "results" | "whatWeDid" | "img" | "filmId" | "filmUrl" | "liveUrl" | "featured" | "sector"
>;

export const CATEGORY_ICON: Record<ProjectCategory, typeof Stories> = {
  Documentary: Stories,
  "Photo and stories": Stories,
  Website: Digital,
  "Software and systems": Digital,
  "Brand and design": Digital,
  "Dashboard and data": Data,
  "Report and design": Data,
  Training: Capability,
};

/** Short label for chips and eyebrows. */
export const CATEGORY_SHORT: Record<ProjectCategory, string> = {
  Documentary: "Film",
  "Photo and stories": "Stories",
  Website: "Website",
  "Software and systems": "System",
  "Brand and design": "Brand",
  "Dashboard and data": "Data",
  "Report and design": "Report",
  Training: "Training",
};

export function StatusPill({ status, className }: { status?: Project["status"]; className?: string }) {
  if (!status || status === "Completed") return null;
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy shadow-sm", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
      </span>
      {status}
    </span>
  );
}

/* Deterministic pseudo-random numbers from the slug, so each tile is different but stable. */
function seeded(key: string) {
  let h = 2166136261;
  for (const ch of key) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

type Motif = "chart" | "modules" | "browser" | "film" | "page";
const MOTIF: Record<ProjectCategory, Motif> = {
  Documentary: "film",
  "Photo and stories": "page",
  Website: "browser",
  "Software and systems": "browser",
  "Brand and design": "page",
  "Dashboard and data": "chart",
  "Report and design": "page",
  Training: "modules",
};

/** Abstract illustration of the kind of work: a chart, a course, a browser, a film or a document. */
function MotifArt({ motif, seed }: { motif: Motif; seed: string }) {
  const r = seeded(seed);
  const A = "#FFB020";
  const line = { stroke: "currentColor", strokeOpacity: 0.28, fill: "none", strokeWidth: 1.5 };
  const block = { fill: "currentColor", fillOpacity: 0.1 };
  if (motif === "chart") {
    const bars = Array.from({ length: 8 }, (_, i) => 40 + r() * 110 + i * 9);
    const pts = bars.map((h, i) => `${40 + i * 42 + 14},${220 - h - 18}`).join(" ");
    return (
      <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMaxYMid meet" aria-hidden>
        {[60, 100, 140, 180, 220].map((y) => <line key={y} x1="24" x2="384" y1={y} y2={y} {...line} strokeOpacity={0.12} />)}
        {bars.map((h, i) => (
          <rect key={i} x={40 + i * 42} y={220 - h} width="28" height={h} rx="5" fill={i >= 6 ? A : "currentColor"} fillOpacity={i >= 6 ? 0.95 : 0.16} />
        ))}
        <polyline points={pts} fill="none" stroke={A} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {bars.map((h, i) => <circle key={i} cx={40 + i * 42 + 14} cy={220 - h - 18} r="3.5" fill={A} />)}
      </svg>
    );
  }
  if (motif === "modules") {
    const active = Math.floor(r() * 4);
    return (
      <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMaxYMid meet" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 22 + i * 44;
          const on = i === active;
          return (
            <g key={i}>
              <rect x="60" y={y} width="320" height="34" rx="17" fill={on ? A : "currentColor"} fillOpacity={on ? 0.95 : 0.08} />
              <circle cx="80" cy={y + 17} r="9" fill={on ? "#0E1F3D" : "currentColor"} fillOpacity={on ? 1 : 0.25} />
              {on ? <path d={`M77 ${y + 12} l8 5 -8 5z`} fill={A} /> : null}
              <rect x="100" y={y + 13} width={90 + r() * 120} height="8" rx="4" fill={on ? "#0E1F3D" : "currentColor"} fillOpacity={on ? 0.55 : 0.22} />
            </g>
          );
        })}
      </svg>
    );
  }
  if (motif === "browser") {
    return (
      <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMaxYMid meet" aria-hidden>
        <rect x="40" y="18" width="350" height="224" rx="12" {...block} />
        <rect x="40" y="18" width="350" height="224" rx="12" {...line} />
        <line x1="40" x2="390" y1="44" y2="44" {...line} />
        {[58, 72, 86].map((x) => <circle key={x} cx={x} cy="31" r="4" fill="currentColor" fillOpacity="0.3" />)}
        <rect x="62" y="64" width={120 + r() * 60} height="14" rx="7" fill="currentColor" fillOpacity="0.4" />
        <rect x="62" y="86" width={160 + r() * 40} height="14" rx="7" fill="currentColor" fillOpacity="0.4" />
        <rect x="62" y="110" width="150" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
        <rect x="62" y="122" width="120" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
        <rect x="62" y="140" width="64" height="20" rx="10" fill={A} />
        <rect x="262" y="62" width="108" height="98" rx="8" fill="currentColor" fillOpacity="0.14" />
        <circle cx="300" cy="96" r="12" fill={A} fillOpacity="0.85" />
        {[0, 1, 2].map((i) => <rect key={i} x={62 + i * 106} y="176" width="96" height="50" rx="8" fill="currentColor" fillOpacity="0.1" />)}
      </svg>
    );
  }
  if (motif === "film") {
    const progress = 0.25 + r() * 0.55;
    return (
      <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMaxYMid meet" aria-hidden>
        <rect x="40" y="20" width="350" height="186" rx="12" {...block} />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i}>
            <rect x={52 + i * 28} y="28" width="14" height="8" rx="2" fill="currentColor" fillOpacity="0.22" />
            <rect x={52 + i * 28} y="190" width="14" height="8" rx="2" fill="currentColor" fillOpacity="0.22" />
          </g>
        ))}
        <circle cx="215" cy="113" r="30" fill={A} />
        <path d="M206 98 l24 15 -24 15z" fill="#0E1F3D" />
        <rect x="40" y="224" width="350" height="6" rx="3" fill="currentColor" fillOpacity="0.18" />
        <rect x="40" y="224" width={350 * progress} height="6" rx="3" fill={A} />
        <circle cx={40 + 350 * progress} cy="227" r="7" fill={A} />
      </svg>
    );
  }
  // page: a document with a photo block and text lines
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMaxYMid meet" aria-hidden>
      <g transform="rotate(-4 300 130)">
        <rect x="200" y="20" width="170" height="220" rx="10" fill="currentColor" fillOpacity="0.06" {...{ stroke: "currentColor", strokeOpacity: 0.2 }} />
      </g>
      <rect x="150" y="14" width="180" height="226" rx="10" fill="currentColor" fillOpacity="0.1" />
      <rect x="150" y="14" width="180" height="226" rx="10" {...line} />
      <rect x="166" y="30" width="148" height="76" rx="6" fill="currentColor" fillOpacity="0.16" />
      <path d="M166 106 l40 -34 30 24 22 -16 56 26 v0z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="290" cy="50" r="9" fill={A} />
      {[120, 134, 148, 162, 176, 190, 204].map((y, i) => (
        <rect key={y} x="166" y={y} width={i === 0 ? 120 : 90 + r() * 58} height={i === 0 ? 9 : 6} rx="3" fill={i === 0 ? A : "currentColor"} fillOpacity={i === 0 ? 0.95 : 0.25} />
      ))}
    </svg>
  );
}

const TILE_TONES = [
  { bg: "bg-navy", fg: "text-white", sub: "text-amber" },
  { bg: "bg-night", fg: "text-white", sub: "text-amber" },
  { bg: "bg-cream", fg: "text-navy", sub: "text-navy/60" },
];

/** Designed tile for projects without imagery: an illustration of the work, the type and the client. */
export function ProjectTile({ p, size = "card" }: { p: Pick<Project, "category" | "displayClient" | "title" | "slug">; size?: "card" | "hero" }) {
  const tone = TILE_TONES[Math.floor(seeded(p.slug + "tone")() * TILE_TONES.length)];
  const hero = size === "hero";
  return (
    <div className={cx("absolute inset-0 overflow-hidden", tone.bg, tone.fg)}>
      <div aria-hidden className="dots-faint absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_20%_100%,black,transparent_60%)]" />
      <div className={cx("absolute", hero ? "inset-x-[6%] bottom-[38%] top-[8%] sm:inset-x-auto sm:inset-y-[10%] sm:right-[4%] sm:w-[62%]" : "bottom-[36%] right-[6%] top-[18%] w-[72%]")}>
        <MotifArt motif={MOTIF[p.category]} seed={p.slug} />
      </div>
      <div className={cx("absolute bottom-0 left-0", hero ? "max-w-full p-6 sm:max-w-[60%] sm:p-12" : "max-w-[90%] p-5")}>
        {hero && <p className={cx("eyebrow !text-[10px]", tone.sub)}>{p.category}</p>}
        <p className={cx("font-display font-semibold leading-tight tracking-display", hero ? "mt-2 text-2xl sm:text-5xl" : "line-clamp-2 text-base")}>{p.displayClient}</p>
      </div>
    </div>
  );
}

/** Image, screenshot (top-aligned, framed) or designed tile. */
export function ProjectVisual({ p, sizes, priority, className }: { p: ProjectCardData; sizes: string; priority?: boolean; className?: string }) {
  const screenshot = p.img?.src.startsWith("/projects/site-");
  return (
    <div className={cx("relative overflow-hidden rounded-card bg-mist", className)}>
      {p.img ? (
        <>
          <Image
            src={p.img.src}
            alt={p.img.alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={p.img.blurDataURL ? "blur" : "empty"}
            blurDataURL={p.img.blurDataURL}
            className={cx("object-cover transition duration-700 group-hover:scale-[1.03]", screenshot && "object-top")}
          />
          {screenshot && <div aria-hidden className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-navy/10" />}
          {(p.filmId || p.filmUrl) && !screenshot && (
            <span aria-hidden className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play width={18} height={18} />
            </span>
          )}
        </>
      ) : (
        <ProjectTile p={p} />
      )}
    </div>
  );
}

export function ProjectCard({ p, tone = "light", priority = false }: { p: ProjectCardData; tone?: "light" | "dark"; priority?: boolean }) {
  const result = p.results[0];
  const dark = tone === "dark";
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative">
        <ProjectVisual p={p} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={priority} className="aspect-[16/10]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-navy/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {CATEGORY_SHORT[p.category]}
          </span>
          <StatusPill status={p.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className={cx("eyebrow !text-[11px]", dark ? "text-white/55" : "text-slate")}>
          {p.displayClient}
          {p.year && (
            <>
              {" "}<span className="text-amber">&middot;</span> {p.year}
            </>
          )}
        </p>
        <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug tracking-display">
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {p.title}
          </Link>
        </h3>
        {result ? (
          <p className={cx("mt-4 flex items-baseline gap-3 border-t pt-4", dark ? "border-white/15" : "border-line")}>
            <span className="font-display text-2xl font-semibold text-amber">{result.value}</span>
            <span className={cx("text-sm", dark ? "text-white/70" : "text-slate")}>{result.label}</span>
          </p>
        ) : (
          <p className={cx("mt-2.5 line-clamp-2 text-[15px]", dark ? "text-white/65" : "text-slate")}>{p.whatWeDid}</p>
        )}
        <span className={cx("mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold", dark ? "text-amber" : "text-navy")}>
          View project <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export const toCard = (p: Project): ProjectCardData => ({
  slug: p.slug, title: p.title, category: p.category, displayClient: p.displayClient, year: p.year, location: p.location, status: p.status,
  results: p.results, whatWeDid: p.whatWeDid, img: p.img, filmId: p.filmId, filmUrl: p.filmUrl, liveUrl: p.liveUrl, featured: p.featured, sector: p.sector,
});
