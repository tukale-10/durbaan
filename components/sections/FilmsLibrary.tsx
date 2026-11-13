"use client";
import { useMemo, useState } from "react";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { cx, SampleBadge } from "@/components/ui/primitives";

export type FilmItem = {
  slug: string; title: string; client: string; location: string; duration?: string; language?: string; subtitles: string[];
  synopsis: string; sectors: string[]; provider: "youtube" | "vimeo"; id: string; draft: boolean;
  posterImg?: { src: string; width: number; height: number; blurDataURL?: string };
};

export function FilmsLibrary({ films, sectorLabels }: { films: FilmItem[]; sectorLabels: Record<string, string> }) {
  const [sector, setSector] = useState("");
  const [language, setLanguage] = useState("");
  const sectors = useMemo(() => Array.from(new Set(films.flatMap((f) => f.sectors))), [films]);
  const languages = useMemo(() => Array.from(new Set(films.map((f) => f.language).filter((l): l is string => !!l))), [films]);
  const list = films.filter((f) => (!sector || f.sectors.includes(sector)) && (!language || f.language === language));

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" aria-pressed={on} onClick={onClick} className={cx("h-10 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition", on ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-line hover:ring-navy")}>
      {children}
    </button>
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-2 !text-[10px] text-slate">Sector</span>
        <Chip on={!sector} onClick={() => setSector("")}>All</Chip>
        {sectors.map((s) => <Chip key={s} on={sector === s} onClick={() => setSector(s)}>{sectorLabels[s] ?? s}</Chip>)}
        {languages.length > 1 && (
          <>
            <span className="eyebrow ml-4 mr-2 !text-[10px] text-slate">Language</span>
            <Chip on={!language} onClick={() => setLanguage("")}>All</Chip>
            {languages.map((l) => <Chip key={l} on={language === l} onClick={() => setLanguage(l)}>{l}</Chip>)}
          </>
        )}
      </div>
      <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
        {list.map((f) => (
          <li key={f.slug}>
            <VideoFacade provider={f.provider} id={f.id} title={f.title} duration={f.duration} poster={f.posterImg} overlayTitle={false} />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="eyebrow text-slate">{f.client} · {f.location}</p>
              {f.draft && <SampleBadge />}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-display">{f.title}</h3>
            <p className="mt-2 text-[15px] text-slate">{f.synopsis}</p>
            {(f.duration || f.language) && (
              <p className="mt-3 text-sm text-slate">{[f.duration, f.language, f.subtitles.length ? `Subtitles: ${f.subtitles.join(", ")}` : ""].filter(Boolean).join(" · ")}</p>
            )}
          </li>
        ))}
      </ul>
      {!list.length && <p className="mt-10 text-slate">No films match. Try another filter.</p>}
    </>
  );
}
