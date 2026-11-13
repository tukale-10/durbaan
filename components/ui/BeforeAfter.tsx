"use client";
import Image from "next/image";
import { useState } from "react";

type Img = { src: string; width: number; height: number; alt: string };

/** Before and after comparison, driven by a native range input so it works with keyboard and touch. */
export function BeforeAfter({ before, after }: { before: Img; after: Img }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="relative aspect-[16/10] select-none overflow-hidden rounded-card bg-mist">
      <Image src={after.src} alt="After" fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt="Before" fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-amber" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber font-display text-xs text-navy">
          &lsaquo;&rsaquo;
        </span>
      </div>
      <span className="eyebrow absolute left-4 top-4 rounded-full bg-navy px-3 py-1 !text-[10px] text-white">Before</span>
      <span className="eyebrow absolute right-4 top-4 rounded-full bg-amber px-3 py-1 !text-[10px] text-navy">After</span>
      <label className="sr-only" htmlFor="ba-range">Drag to compare before and after</label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </figure>
  );
}
