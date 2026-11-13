import Image from "next/image";
import { getPhoto } from "@/lib/content";
import { cx, Heading, Section } from "@/components/ui/primitives";

type P = NonNullable<ReturnType<typeof getPhoto>>;

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto">
      <span className="inline-flex items-center gap-2 rounded-full bg-navy/90 px-3 py-1.5 text-xs font-medium text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        {children}
      </span>
    </figcaption>
  );
}

export function Photo({ p, sizes, className, priority }: { p: P; sizes: string; className?: string; priority?: boolean }) {
  return (
    <figure className={cx("relative overflow-hidden rounded-card bg-mist", className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} placeholder={p.blurDataURL ? "blur" : "empty"} blurDataURL={p.blurDataURL} className="object-cover" />
      {p.caption && <Caption>{p.caption}</Caption>}
    </figure>
  );
}

/** Editorial mosaic: one large photo and two stacked. Renders only the photos that have consent. */
export function FieldMosaic({ ids = ["canal-women", "canal-men", "water-point"] }: { ids?: string[] }) {
  const photos = ids.map(getPhoto).filter((p): p is P => !!p);
  if (photos.length === 0) return null;
  const [big, ...rest] = photos;
  return (
    <Section tone="white" className="!pt-0">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading
            eyebrow="From the field"
            title="We work where the work happens."
            intro="Our Somali-speaking crews film and photograph across Somalia, Somaliland, Ethiopia and Kenya, in the language of the people on screen, and with their consent."
          />
        </div>
        <div className="mt-12 grid gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <Photo p={big} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[3/2] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:min-h-[560px]" />
          {rest.slice(0, 2).map((p) => (
            <Photo key={p.id} p={p} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[3/2] lg:col-span-5" />
          ))}
        </div>
      </div>
    </Section>
  );
}

/** One wide photo, used under page heroes. */
export function PhotoBand({ id, below = "white" }: { id: string; below?: "white" | "mist" }) {
  const p = getPhoto(id);
  if (!p) return null;
  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-navy" />
      <div aria-hidden className={cx("absolute inset-x-0 bottom-0 h-1/2", below === "mist" ? "bg-mist" : "bg-white")} />
      <div className="container relative">
        <Photo p={p} sizes="(min-width: 1280px) 1240px, 100vw" className="aspect-[16/10] sm:aspect-[21/9]" priority />
      </div>
    </div>
  );
}
