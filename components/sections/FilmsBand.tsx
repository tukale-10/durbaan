import Link from "next/link";
import { FilmMeta } from "@/components/ui/blocks";
import { ArrowRight } from "@/components/ui/icons";
import { Eyebrow, SampleBadge, Section } from "@/components/ui/primitives";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { getAllFilms } from "@/lib/content";

/** Featured documentary plus a row of further films. Each player loads only on click. */
export function FilmsBand({ tone = "navy", eyebrow = "Documentaries", title = "Real people. Real change. On screen.", limit = 4 }: { tone?: "navy" | "night"; eyebrow?: string; title?: string; limit?: number }) {
  const films = getAllFilms();
  if (!films.length) return null;
  const [featured, ...rest] = films;
  return (
    <Section tone={tone}>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow tone="light" className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="t-2">{title}</h2>
          </div>
          <Link href="/films" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-semibold transition-colors hover:bg-white hover:text-navy">
            Film library <ArrowRight width={18} height={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <VideoFacade provider={featured.provider} id={featured.id} title={featured.title} duration={featured.duration} poster={featured.posterImg} overlayTitle={false} />
          </div>
          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow tone="amber">Featured</Eyebrow>
              {featured.draft && <SampleBadge />}
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-display">{featured.title}</h3>
            <p className="mt-4 text-white/70">{featured.synopsis}</p>
            <div className="mt-6 [&_dl]:grid-cols-2 [&_dl]:sm:grid-cols-2"><FilmMeta f={featured} tone="dark" /></div>
          </div>
        </div>

        {rest.length > 0 && (
          <ul className="mt-14 grid gap-x-5 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {rest.slice(0, limit).map((f) => (
              <li key={f.slug}>
                <VideoFacade provider={f.provider} id={f.id} title={f.title} poster={f.posterImg} compact />
                <p className="eyebrow mt-4 !text-[10px] text-white/55">{f.location}</p>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-display">{f.title}</h3>
                <p className="mt-1 text-sm text-white/60">{f.client}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
