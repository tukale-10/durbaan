import Image from "next/image";
import Link from "next/link";
import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand } from "@/components/ui/blocks";
import { ArrowRight, ArrowUpRight, Play } from "@/components/ui/icons";
import { Eyebrow, Section, TagPill } from "@/components/ui/primitives";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { offers } from "@/content/offers";
import { getProjects, type Project } from "@/lib/content";
import { breadcrumbLd, JsonLd } from "@/lib/seo";
import { ProjectCard, ProjectTile, StatusPill, toCard } from "./project-ui";

const host = (u: string) => new URL(u).host.replace(/^www\./, "");

/** Desktop screenshot in a browser frame, with the phone view overlapping it. */
function Showcase({ p }: { p: Project }) {
  if (!p.img) return null;
  return (
    <div className="relative pb-10 sm:pb-0 sm:pr-16 lg:pr-24">
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_40px_80px_-30px_rgba(8,20,40,.7)] ring-1 ring-white/10">
        <div className="flex h-9 items-center gap-2 border-b border-line bg-mist px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          {p.liveUrl && <span className="ml-3 hidden truncate rounded-md bg-white px-3 py-0.5 text-xs text-slate ring-1 ring-line sm:block">{host(p.liveUrl)}</span>}
        </div>
        <div className="relative aspect-[16/10]">
          <Image src={p.img.src} alt={p.img.alt} fill priority sizes="(min-width: 1280px) 1100px, 100vw" placeholder={p.img.blurDataURL ? "blur" : "empty"} blurDataURL={p.img.blurDataURL} className="object-cover object-top" />
        </div>
      </div>
      {p.mobileImg && (
        <div className="absolute -bottom-2 right-4 w-[28%] max-w-[230px] rounded-[26px] bg-night p-1.5 shadow-[0_30px_60px_-20px_rgba(8,20,40,.8)] ring-1 ring-white/15 sm:bottom-[-48px] sm:right-0">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[20px]">
            <Image src={p.mobileImg.src} alt={p.mobileImg.alt} fill sizes="230px" className="object-cover object-top" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectDetail({ p }: { p: Project }) {
  const all = getProjects();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length];
  const related = all.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const more = related.length >= 2 ? related : all.filter((x) => x.slug !== p.slug && x.offerLine === p.offerLine).slice(0, 3);
  const isSite = p.img?.src.startsWith("/projects/site-");

  const facts: [string, React.ReactNode][] = [
    ["Client", p.clientFull ?? p.displayClient],
    ["Type of work", p.category],
    ["Sector", p.sector],
    ...(p.location ? [["Location", p.location] as [string, React.ReactNode]] : []),
    ...(p.year ? [["Year", p.year] as [string, React.ReactNode]] : []),
    ...(p.status ? [["Status", p.status] as [string, React.ReactNode]] : []),
    ...(p.credit ? [["Delivered", p.credit] as [string, React.ReactNode]] : []),
    ["Offer", <Link key="o" href={offers[p.offerLine].href} className="underline decoration-amber decoration-2 underline-offset-4">{offers[p.offerLine].name}</Link>],
  ];

  return (
    <article>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: p.title, path: `/work/${p.slug}` }])} />

      {/* 1. Hero */}
      <header className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="dots-faint absolute inset-y-0 right-0 hidden w-1/2 lg:block [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="container relative pb-12 pt-12 sm:pt-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
            <Link href="/work" className="hover:text-amber">Work</Link> <span aria-hidden>/</span> <span className="text-white/85">{p.displayClient}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow tone="amber">{p.category}{p.location ? ` · ${p.location}` : ""}</Eyebrow>
            <StatusPill status={p.status} />
          </div>
          <h1 className="t-1 mt-6 max-w-5xl">{p.title}</h1>
          <p className="mt-6 text-lg text-white/70">
            For <span className="font-semibold text-white">{p.clientFull ?? p.displayClient}</span>
            {p.year && <> &middot; {p.year}</>}
          </p>
          {(p.liveUrl || p.filmId) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-amber px-6 text-sm font-semibold text-navy transition-colors hover:bg-[#FFC14D]">
                  Visit {host(p.liveUrl)} <ArrowUpRight width={16} height={16} />
                </a>
              )}
              {p.filmId && isSite && (
                <a href="#film" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold hover:bg-white hover:text-navy">
                  <Play width={14} height={14} /> Watch the video
                </a>
              )}
            </div>
          )}
        </div>

        {/* 2. Visual */}
        <div className="container relative pb-16 sm:pb-24">
          {p.filmId && !isSite ? (
            <VideoFacade provider="youtube" id={p.filmId} title={p.title} poster={p.img} overlayTitle={false} />
          ) : isSite ? (
            <Showcase p={p} />
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/10 sm:aspect-[21/9]">
              <ProjectTile p={p} size="hero" />
            </div>
          )}
        </div>
      </header>

      {/* 3. Story */}
      <Section tone="white">
        <div className="container grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="divide-y divide-line rounded-card bg-mist px-6 lg:sticky lg:top-28">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-[15px]">
                  <dt className="eyebrow !text-[10px] pt-1 text-slate">{k}</dt>
                  <dd className="min-w-0 font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="space-y-14 lg:col-span-8">
            {p.challenge && (
              <section>
                <Eyebrow className="mb-4">The challenge</Eyebrow>
                <p className="font-display text-xl font-medium leading-relaxed tracking-display text-navy sm:text-2xl">{p.challenge}</p>
              </section>
            )}
            <section>
              <Eyebrow className="mb-4">What we did</Eyebrow>
              <p className="text-lg leading-relaxed text-navy/80">{p.whatWeDid}</p>
            </section>

            {p.results.length > 0 && (
              <section>
                <Eyebrow className="mb-6">Confirmed results</Eyebrow>
                <div className="grid gap-4 sm:grid-cols-3">
                  {p.results.map((r) => (
                    <div key={r.label} className="rounded-card bg-navy p-6 text-white">
                      <p className="font-display text-3xl font-semibold tracking-display text-amber sm:text-4xl">{r.value}</p>
                      <p className="mt-3 text-sm text-white/75">{r.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <Eyebrow className="mb-5">What we delivered</Eyebrow>
              <ul className="flex flex-wrap gap-2">
                {p.services.map((s) => (
                  <li key={s}><TagPill className="!px-3.5 !py-1.5 !text-[13px]">{s}</TagPill></li>
                ))}
              </ul>
            </section>

            {p.filmId && isSite && (
              <section id="film" className="scroll-mt-28">
                <Eyebrow className="mb-6">Video</Eyebrow>
                <VideoFacade provider="youtube" id={p.filmId} title={`${p.title}: video`} />
              </section>
            )}
          </div>
        </div>
      </Section>

      {/* 4. More work */}
      {more.length > 0 && (
        <Section tone="mist">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow className="mb-5">More work</Eyebrow>
                <h2 className="t-2">Related projects.</h2>
              </div>
              <Link href="/work#all" className="inline-flex items-center gap-2 font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">
                Full track record <ArrowRight width={16} height={16} />
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((x) => <li key={x.slug}><ProjectCard p={toCard(x)} /></li>)}
            </ul>
          </div>
        </Section>
      )}

      {next && next.slug !== p.slug && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line bg-white">
          <div className="container flex items-center justify-between gap-6 py-10">
            <div className="min-w-0">
              <p className="eyebrow text-slate">Next project</p>
              <p className="mt-3 truncate font-display text-xl font-semibold tracking-display sm:text-3xl">{next.title}</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber text-navy transition-transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </div>
        </Link>
      )}

      <CtaBand title={<>Want work like this<span className="text-amber">?</span></>} intro="Tell us what you need to show, prove or build, and we will walk you through similar work on a call.">
        <BookButton />
        <WhatsAppButton variant="outline-light" />
      </CtaBand>
    </article>
  );
}
