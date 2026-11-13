import { BookButton } from "@/components/ui/Cta";
import { CtaBand, FilmMeta, PageHero } from "@/components/ui/blocks";
import { Eyebrow, SampleBadge, Section } from "@/components/ui/primitives";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { FilmsLibrary } from "@/components/sections/FilmsLibrary";
import { getAllFilms } from "@/lib/content";
import { SECTOR_LABELS } from "@/lib/schemas";
import { JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Films: impact documentaries from Somalia and East Africa",
  description: "Documentaries and short films by Durbaan, made with Somali-speaking crews, informed consent and subtitles in Somali and English.",
  path: "/films",
});

export default function FilmsPage() {
  const films = getAllFilms();
  const [featured, ...rest] = films;
  return (
    <>
      <PageHero eyebrow="FILMS" title={<>Real people. Real change. On screen<span className="text-amber">.</span></>} intro="Documentaries and short films, made in the language of the people in them, with informed consent and subtitles. Each film loads only when you press play, to save your data." />
      {featured ? (
        <>
          <Section tone="navy" className="!pt-8">
            <div className="container">
              <div className="flex flex-wrap items-center gap-3"><Eyebrow tone="amber">Featured documentary</Eyebrow>{featured.draft && <SampleBadge />}</div>
              <h2 className="t-2 mt-5 max-w-3xl">{featured.title}</h2>
              <p className="mt-4 max-w-2xl text-white/70">{featured.synopsis}</p>
              <VideoFacade className="mt-10" provider={featured.provider} id={featured.id} title={featured.title} duration={featured.duration} poster={featured.posterImg} overlayTitle={false} />
              <div className="mt-8"><FilmMeta f={featured} tone="dark" /></div>
            </div>
          </Section>
          {rest.length > 0 && (
            <Section tone="white">
              <div className="container">
                <FilmsLibrary films={rest} sectorLabels={SECTOR_LABELS} />
              </div>
            </Section>
          )}
        </>
      ) : (
        <Section tone="white">
          <div className="container rounded-card bg-mist p-10 text-center sm:p-16">
            <h2 className="t-3">The film library is being prepared.</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate">Ask us on a call and we will share films relevant to your sector.</p>
          </div>
        </Section>
      )}
      <CtaBand title={<>Your program deserves a film<span className="text-amber">.</span></>} intro="Our Impact Story Pack includes a 5 to 8 minute documentary, short social cuts and photo stories.">
        <BookButton />
      </CtaBand>
      <JsonLd data={films.filter((f) => !f.draft && f.provider === "youtube").map((f) => ({
        "@context": "https://schema.org", "@type": "VideoObject", name: f.title, description: f.synopsis,
        thumbnailUrl: `https://i.ytimg.com/vi/${f.id}/maxresdefault.jpg`, ...(f.year ? { uploadDate: `${f.year}-01-01` } : {}), embedUrl: `https://www.youtube-nocookie.com/embed/${f.id}`, inLanguage: f.language,
      }))} />
    </>
  );
}
