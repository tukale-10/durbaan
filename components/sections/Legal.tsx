import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/blocks";
import { Section } from "@/components/ui/primitives";

export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="LEGAL" title={title} intro={`Last updated ${updated}.`} />
      <Section tone="white"><div className="container"><div className="prose-durbaan">{children}</div></div></Section>
    </>
  );
}
