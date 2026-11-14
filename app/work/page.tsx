import Link from "next/link";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { TrustStrip } from "@/components/sections/shared";
import { CATEGORY_SHORT, ProjectVisual, StatusPill, toCard } from "@/components/work/project-ui";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getProjects, type Project } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work: our track record in documentaries, data, websites and systems",
  description:
    "Projects for UNOPS, Shaqodoon, NAPAD, Himilo, ADRA, Oxfam, TIGAAL and more: impact documentaries, Power BI dashboards, websites, systems and training across Somalia and East Africa.",
  path: "/work",
});

/** Towns and cities named in the projects' locations, in order of first appearance. */
function placesOf(projects: Project[]) {
  const skip = /somalia|states?$|^federal|^hirshabelle$|^usa$|^kenya$|^ethiopia$/i;
  const same: Record<string, string> = { "Belet Weyne": "Beledweyne" };
  const out: string[] = [];
  for (const p of projects) {
    const parts = [...(p.location ?? "").split(",")[0].split(/ and /), ...p.places];
    for (const raw of parts) {
      const place = same[raw.trim()] ?? raw.trim();
      if (place && !skip.test(place) && !out.includes(place)) out.push(place);
    }
  }
  return out;
}

export default function WorkPage() {
  const projects = getProjects();
  const clients = new Set(projects.filter((p) => p.client !== "Own product" && !/ program$/i.test(p.client)).map((p) => p.client.replace(/ Somalia$/, ""))).size;
  const years = projects.map((p) => Number(p.year?.slice(0, 4))).filter(Boolean);
  const since = Math.min(...years);
  const places = placesOf(projects);
  const spotlight = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured && p.results.length)].slice(0, 4);

  const stats = [
    { value: String(projects.length), label: "projects delivered or in production" },
    { value: String(clients), label: "organisations served" },
    { value: String(places.length), label: "towns and cities" },
    { value: `Since ${since}`, label: "telling, measuring and showing impact" },
  ];

  return (
    <>
      {/* 1. Hero with the numbers */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="dots-faint absolute inset-y-0 right-0 hidden w-1/2 lg:block [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="container relative pb-16 pt-14 sm:pb-20 sm:pt-20">
          <Eyebrow tone="amber" className="mb-6">Track record</Eyebrow>
          <h1 className="t-display max-w-4xl">
            Proof, not promises<span className="text-amber">.</span>
          </h1>
          <p className="lead mt-6 max-w-2xl text-white/75">
            Documentaries, dashboards, websites, systems and training for UN agencies, NGOs, programs and businesses. Every result on this page has been confirmed.
          </p>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-white/10 ring-1 ring-white/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-navy p-6 sm:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold tracking-display text-amber sm:text-5xl">{s.value}</span>
                  <span className="mt-3 block text-sm text-white/65 sm:text-[15px]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/55">
            <span className="eyebrow !text-[10px] text-white/40">On the ground in</span>
            {places.map((pl, i) => (
              <span key={pl} className="whitespace-nowrap">
                {pl}
                {i < places.length - 1 && <span className="ml-3 text-amber">&middot;</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      <TrustStrip label="Organisations we have worked with" />

      {/* 2. Spotlight */}
      <Section tone="white" className="!pt-8">
        <div className="container">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">Selected projects</Eyebrow>
            <h2 className="t-2">The work we are proudest of.</h2>
          </div>
          <ol className="mt-16 space-y-20 sm:space-y-28">
            {spotlight.map((p, i) => (
              <li key={p.slug} className="group relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                <Link href={`/work/${p.slug}`} className={`relative block lg:col-span-7 ${i % 2 ? "lg:order-last" : ""}`} tabIndex={-1} aria-hidden>
                  <ProjectVisual p={toCard(p)} sizes="(min-width: 1024px) 58vw, 100vw" priority={i === 0} className="aspect-[16/10] shadow-[0_30px_60px_-30px_rgba(14,31,61,.45)]" />
                  <StatusPill status={p.status} className="absolute left-5 top-5" />
                </Link>
                <div className="lg:col-span-5">
                  <p className="flex items-center gap-3">
                    <span className="font-display text-sm tabular-nums text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-line" />
                    <span className="eyebrow !text-[11px] text-slate">{CATEGORY_SHORT[p.category]} &middot; {p.displayClient}</span>
                  </p>
                  <h3 className="t-3 mt-5">
                    <Link href={`/work/${p.slug}`} className="hover:text-navy/80">{p.title}</Link>
                  </h3>
                  <p className="mt-4 line-clamp-4 text-slate">{p.challenge ?? p.whatWeDid}</p>
                  {p.results.length > 0 && (
                    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
                      {p.results.slice(0, 3).map((r) => (
                        <div key={r.label}>
                          <dt className="sr-only">{r.label}</dt>
                          <dd>
                            <span className="block font-display text-2xl font-semibold tracking-display text-navy">{r.value}</span>
                            <span className="mt-1.5 block text-xs leading-snug text-slate">{r.label}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={`/work/${p.slug}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-night">
                      Read the project <ArrowRight width={16} height={16} />
                    </Link>
                    {p.credit && <span className="text-xs text-slate">{p.credit}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 3. Every project */}
      <Section tone="mist" id="all">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Eyebrow className="mb-5">Every project</Eyebrow>
              <h2 className="t-2">The full track record.</h2>
            </div>
            <p className="max-w-sm text-sm text-slate">Films play on YouTube, websites open live. Some client work is confidential and is not listed here; ask us on a call.</p>
          </div>
          <WorkIndex items={projects.map(toCard)} />
        </div>
      </Section>

      <CtaBand title={<>Want work like this for your organisation<span className="text-amber">?</span></>} intro="Tell us what you need to show, prove or build. We reply within one working day.">
        <BookButton />
      </CtaBand>
    </>
  );
}
