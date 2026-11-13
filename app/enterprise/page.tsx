import fs from "node:fs";
import path from "node:path";
import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { Download } from "@/components/ui/icons";
import { Button, Heading, Section } from "@/components/ui/primitives";
import { OfferPackages, OutcomeGrid, SeeAlso } from "@/components/sections/offer";
import { TestimonialBand, WorkBand, workFor } from "@/components/sections/shared";
import { getPackages } from "@/lib/content";
import { serviceLd } from "@/lib/ld";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Durbaan Enterprise: annual reports, corporate films and data platforms",
  description: "Your performance, clear to your board and your public. Annual and impact reports, corporate story series, enterprise data platforms and AI fluency programs.",
  path: "/enterprise",
});

const CAPABILITY_PDF = "/downloads/durbaan-capabilities-statement.pdf";

export default function EnterprisePage() {
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", CAPABILITY_PDF));
  return (
    <>
      <PageHero
        eyebrow="DURBAAN ENTERPRISE"
        title={<>Your performance, clear to your board and your public<span className="text-amber">.</span></>}
        intro="Annual and impact reports, corporate films, data platforms and AI training for organizations that need to communicate at scale."
      >
        <Button href="/contact?type=Corporate%20or%20institution" size="lg" arrow>Request a proposal</Button>
        {hasPdf && <Button href={CAPABILITY_PDF} variant="outline-light" size="lg" external>Capabilities statement</Button>}
      </PageHero>

      <OutcomeGrid
        tone="white"
        eyebrow="For telecoms, banks, remittance companies, large firms and agencies"
        title="Scattered numbers become one clear story."
        items={[
          { t: "Your board sees one version of the truth.", d: "A central data model and role-based dashboards, so every department reports from the same numbers." },
          { t: "Your public sees what you contribute.", d: "Annual and impact reports in print and on the web, with films that people actually watch." },
          { t: "Your people work faster and safer.", d: "Practical AI training and custom workflows, with a policy guide for safe use." },
        ]}
      />

      <OfferPackages line="enterprise" title="Scoped to your organization." intro="Enterprise work is scoped and priced with you. Most engagements start with a paid discovery phase." />

      <WorkBand items={workFor((c) => c.offerLine === "enterprise")} tone="white" eyebrow="Enterprise work" title="For institutions that report at scale." />
      <TestimonialBand offerLine="enterprise" />

      {hasPdf && (
        <Section tone="cream" size="sm">
          <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Heading eyebrow="For procurement teams" title="Capabilities statement" intro="Company profile, registration, team and references in one PDF." />
            <a href={CAPABILITY_PDF} className="inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-navy px-7 font-semibold text-white"><Download />Download PDF</a>
          </div>
        </Section>
      )}

      <CtaBand title={<>Request a proposal<span className="text-amber">.</span></>} intro="Share your brief, or tell us the problem. We will come back with a scoped approach, team and timeline.">
        <Button href="/contact?type=Corporate%20or%20institution" size="lg" arrow>Request a proposal</Button>
        <BookButton label="Book a briefing call" variant="outline-light" />
      </CtaBand>
      <SeeAlso current="enterprise" />
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Enterprise", path: "/enterprise" }]), ...getPackages((p) => p.offerLine === "enterprise").map(serviceLd)]} />
    </>
  );
}
