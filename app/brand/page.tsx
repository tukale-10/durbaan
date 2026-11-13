import Image from "next/image";
import { Drum, Seal } from "@/components/brand/marks";
import { PageHero } from "@/components/ui/blocks";
import { Download } from "@/components/ui/icons";
import { Heading, Section } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Brand kit and press", description: "Durbaan logos, colors and fonts for partners, media and event organizers.", path: "/brand" });

const colors = [
  ["Navy", "#0E1F3D", "bg-navy text-white"], ["Beeyo Amber", "#FFB020", "bg-amber text-navy"], ["Drum Cream", "#F5E6C8", "bg-cream text-navy"],
  ["Night", "#081428", "bg-night text-white"], ["Slate", "#5B6475", "bg-slate text-white"], ["Mist", "#F6F7F9", "bg-mist text-navy ring-1 ring-line"], ["White", "#FFFFFF", "bg-white text-navy ring-1 ring-line"],
];

export default function BrandPage() {
  return (
    <>
      <PageHero eyebrow="BRAND KIT" title={<>Using the Durbaan brand<span className="text-amber">.</span></>} intro="Logos, colors and fonts for partners, media and event organizers. Please do not stretch, recolor or redraw the marks.">
        <a href="/downloads/durbaan-brand-kit.zip" download className="inline-flex h-14 items-center gap-2 rounded-full bg-amber px-7 font-semibold text-navy hover:bg-[#FFC14D]"><Download />Download the logo kit (ZIP)</a>
      </PageHero>
      <Section tone="white">
        <div className="container">
          <Heading eyebrow="Logos" title="Marks" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <figure className="flex aspect-square flex-col items-center justify-center rounded-card bg-navy p-10"><Seal className="w-full max-w-[220px]" /><figcaption className="mt-6 text-sm text-white/70">Seal. Use at 40 px and above.</figcaption></figure>
            <figure className="flex aspect-square flex-col items-center justify-center rounded-card bg-mist p-10"><Drum className="w-full max-w-[180px]" /><figcaption className="mt-6 text-sm text-slate">Drum icon. Use below 40 px.</figcaption></figure>
            <figure className="flex aspect-square flex-col items-center justify-center gap-10 rounded-card bg-mist p-8">
              <Image src="/brand/durbaan-lockup-light-bg.svg" alt="Durbaan lockup for light backgrounds" width={419} height={100} className="w-full" />
              <div className="w-full rounded-xl bg-navy p-4"><Image src="/brand/durbaan-lockup-dark-bg.svg" alt="Durbaan lockup for dark backgrounds" width={419} height={100} className="w-full" /></div>
              <figcaption className="text-sm text-slate">Compact lockups, light and dark.</figcaption>
            </figure>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <div className="container">
          <Heading eyebrow="Colors" title="Palette" intro="Text on amber is always navy. Amber is for focus: one highlight per section." />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {colors.map(([n, h, c]) => (
              <li key={n} className={`flex aspect-[3/4] flex-col justify-end rounded-card p-4 ${c}`}><p className="font-semibold">{n}</p><p className="text-sm opacity-75">{h}</p></li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="white">
        <div className="container grid gap-5 md:grid-cols-2">
          <div className="rounded-card bg-mist p-8"><p className="eyebrow text-slate">Display and headings</p><p className="mt-4 font-display text-4xl font-semibold tracking-display sm:text-5xl">Unbounded</p><p className="mt-2 text-slate">SemiBold 600. Eyebrows in Regular 400, uppercase, wide tracking.</p></div>
          <div className="rounded-card bg-mist p-8"><p className="eyebrow text-slate">Body</p><p className="mt-4 text-5xl font-semibold">Inter</p><p className="mt-2 text-slate">Regular, Medium and SemiBold. 16 to 18 px, line height 1.6.</p></div>
        </div>
        <p className="container mt-10 text-slate">Press enquiries: <a href={`mailto:${site.email}`} className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">{site.email}</a></p>
      </Section>
    </>
  );
}
