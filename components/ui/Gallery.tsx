"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "./icons";

type Img = { src: string; width: number; height: number; blurDataURL?: string; alt: string };

/** Image grid with a keyboard-friendly lightbox (Esc to close, arrow keys to move, focus returned on close). */
export function Gallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    dialog.current?.close();
    setOpen(null);
    opener.current?.focus();
  }, []);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (open !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 && images.length > 2 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-card bg-mist"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open image: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" placeholder={img.blurDataURL ? "blur" : "empty"} blurDataURL={img.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-night/95 p-0 text-white backdrop:bg-night/90"
        aria-label="Image viewer"
      >
        {open !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
              <p className="eyebrow text-white/70">{open + 1} / {images.length}</p>
              <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close image viewer">
                <Close />
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={images[open].src} alt={images[open].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <button type="button" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Previous image">
                <ArrowRight className="rotate-180" />
              </button>
              <p className="text-center text-sm text-white/80">{images[open].alt}</p>
              <button type="button" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Next image">
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
