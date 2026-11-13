"use client";
import Image from "next/image";
import { useState } from "react";
import { Play } from "./icons";
import { track } from "@/lib/analytics";

type Props = {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
  duration?: string;
  poster?: { src: string; width: number; height: number; blurDataURL?: string };
  className?: string;
};

/** Click-to-load player: shows a poster and loads the heavy player only when asked. Saves mobile data. */
export function VideoFacade({ provider, id, title, duration, poster, className = "" }: Props) {
  const [active, setActive] = useState(false);
  const embed =
    provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1`
      : `https://player.vimeo.com/video/${id}?autoplay=1&texttrack=en`;
  const posterSrc = poster?.src ?? (provider === "youtube" ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-card bg-night ${className}`}>
      {active ? (
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setActive(true);
            track("Film Play", { title });
          }}
          className="group absolute inset-0 h-full w-full text-left"
          aria-label={`Play film: ${title}${duration ? `, ${duration}` : ""}`}
        >
          {posterSrc && (
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"
              placeholder={poster?.blurDataURL ? "blur" : "empty"}
              blurDataURL={poster?.blurDataURL}
            />
          )}
          <span className="absolute inset-0 bg-night/30" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-amber text-navy shadow-[0_0_0_10px_rgba(255,176,32,.18)] transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
              <Play width={30} height={30} className="ml-1" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
            <span className="font-display text-base font-semibold sm:text-xl">{title}</span>
            {duration && <span className="eyebrow shrink-0 text-white/80">{duration}</span>}
          </span>
        </button>
      )}
    </div>
  );
}
