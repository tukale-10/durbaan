import { Suspense } from "react";
import { GuideForm } from "@/components/forms/GuideForm";
import { Check } from "@/components/ui/icons";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";
import { bookingHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Free guide: The 10 things donors check before they fund you",
  description: "A short, practical checklist for Somali NGOs and programs. What donors look at before they call, and how to fix the gaps.",
  path: "/resources/donor-ready-guide",
});

export default function GuidePage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:items-start lg:py-24">
          <div className="lg:col-span-6">
            <Eyebrow tone="amber">Free guide</Eyebrow>
            <h1 className="t-1 mt-6">The 10 things donors check before they fund you<span className="text-amber">.</span></h1>
            <p className="lead mt-6 text-white/75">Before a donor calls, they have already looked you up. This guide shows you what they check, and how to make sure each one works in your favour.</p>
            <ul className="mt-10 space-y-4">
              {[
                "What a program officer looks at in the first five minutes",
                "The difference between activities and results, and why it matters",
                "How to show safeguarding and consent practice without a policy dump",
                "A one-page self-check you can run with your team this week",
              ].map((x) => (
                <li key={x} className="flex gap-3 text-white/85"><Check width={20} height={20} className="mt-0.5 shrink-0 text-amber" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="text-navy"><Suspense><GuideForm bookingHref={bookingHref()} /></Suspense></div>
            <p className="mt-4 text-sm text-white/60">We never share your details. Unsubscribe from any email with one click.</p>
          </div>
        </div>
      </section>
      <Section tone="white" size="sm">
        <div className="container grid gap-8 text-center sm:grid-cols-3">
          {[["10", "checks donors run before they call"], ["15 min", "to read, with your team"], ["Free", "no strings, no sales call required"]].map(([a, b]) => (
            <div key={a}><p className="font-display text-4xl font-semibold tracking-display">{a}</p><p className="mt-2 text-slate">{b}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
