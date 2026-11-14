"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, pillarIcon } from "@/components/ui/icons";
import type { PillarId } from "@/content/pillars";

export type ServicesMenuItem = {
  id: PillarId;
  name: string;
  promise: string;
  line: string;
  services: string[];
  photo?: { src: string; alt: string; blurDataURL?: string };
};

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Desktop mega menu: intro, numbered pillars, and a preview of the pillar in focus. */
export function ServicesPanel({ items, onNavigate }: { items: ServicesMenuItem[]; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const a = items[active];
  const Icon = pillarIcon[a.id];

  return (
    <div className="container grid grid-cols-12">
      {/* Intro */}
      <div className="col-span-3 border-r border-white/10 py-10 pr-8">
        <p className="eyebrow text-amber">Services</p>
        <p className="mt-5 font-display text-[22px] font-semibold leading-snug tracking-display">
          Four ways to make your impact heard<span className="text-amber">.</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          Stories that move people, data that proves results, digital tools that build trust, and training so your team can keep going.
        </p>
        <Link
          href="/services"
          onClick={onNavigate}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold transition-colors hover:border-amber hover:bg-amber hover:text-navy"
        >
          Explore all services <ArrowRight width={16} height={16} />
        </Link>
      </div>

      {/* Numbered pillars */}
      <ul className="col-span-4 border-r border-white/10 px-6 py-8">
        {items.map((p, i) => {
          const on = i === active;
          return (
            <li key={p.id}>
              <Link
                href={`/services/${p.id}`}
                onClick={onNavigate}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group flex items-start gap-5 rounded-2xl px-4 py-4 transition-colors ${on ? "bg-white/[.06]" : "hover:bg-white/[.04]"}`}
              >
                <span className={`mt-1 font-display text-xs tabular-nums tracking-wider transition-colors ${on ? "text-amber" : "text-white/35"}`}>{num(i)}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className={`font-display text-lg font-semibold tracking-display transition-colors ${on ? "text-amber" : "text-white"}`}>{p.name}</span>
                    <ArrowRight
                      width={16}
                      height={16}
                      className={`shrink-0 transition-all duration-300 ${on ? "translate-x-0 text-amber opacity-100" : "-translate-x-2 opacity-0"}`}
                    />
                  </span>
                  <span className="mt-1 block text-sm text-white/60">{p.promise}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Preview of the pillar in focus */}
      <div className="col-span-5 py-8 pl-8">
        <div key={a.id} className="menu-fade grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-night">
            {a.photo ? (
              <Image src={a.photo.src} alt={a.photo.alt} fill sizes="240px" placeholder={a.photo.blurDataURL ? "blur" : "empty"} blurDataURL={a.photo.blurDataURL} className="object-cover" />
            ) : (
              <div className="dots absolute inset-0 opacity-40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
            <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber text-navy">
              <Icon />
            </span>
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="text-sm leading-relaxed text-white/70">{a.line}</p>
            <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
              {a.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${a.id}`}
              onClick={onNavigate}
              className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-amber hover:underline"
            >
              Explore {a.name} <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
