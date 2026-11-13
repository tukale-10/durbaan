import { BookButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { Button } from "@/components/ui/primitives";
import { OfferPackages, OutcomeGrid, SeeAlso } from "@/components/sections/offer";
import { Commitments, TestimonialBand, WorkBand, workFor } from "@/components/sections/shared";
import { getPackages } from "@/lib/content";
import { serviceLd } from "@/lib/ld";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Durbaan Partner: media, data and design delivery for consultancies",
  description: "Your delivery team for stories, data and design in Somalia and East Africa. Bid support, white-label delivery, report design and Somali-speaking field media crews.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="DURBAAN PARTNER"
        title={<>Your delivery team for stories, data and design<span className="text-amber">.</span></>}
        intro="You win the contract. We deliver the documentaries, dashboards, reports and field media, under your brand or ours."
      >
        <Button href="/contact?type=Consultancy" size="lg" arrow>Send us your terms of reference</Button>
        <Button href="#packages" variant="outline-light" size="lg">Rates and packages</Button>
      </PageHero>

      <OutcomeGrid
        tone="white"
        eyebrow="How partnering works"
        title="Built around your contract, not ours."
        items={[
          { t: "Bid support", d: "Communications, visibility and M&E sections written to score, with realistic budget lines." },
          { t: "Delivery partner", d: "One point of contact and fixed reporting dates, aligned to your client's schedule." },
          { t: "White-label or co-branded", d: "Your brand, ours, or both. You decide what your client sees." },
          { t: "Confidentiality as standard", d: "Non-disclosure and non-solicitation of your client in every agreement." },
        ]}
      />

      <OfferPackages line="partner" title="Clear rates. Fixed deliverables." />

      <OutcomeGrid
        eyebrow="Why consultancies choose us"
        title="The capacity you need, where you need it."
        items={[
          { t: "Somali-speaking field crews", d: "Interviews in the respondent's language, transcripts in Somali and English." },
          { t: "Donor-standard consent and safeguarding", d: "Consent protocols and data protection your evaluators will not have to fix." },
          { t: "Fixed prices per deliverable", d: "Budget once. No day-rate drift on the media and data lines." },
          { t: "Fast turnaround", d: "Small, senior team. Decisions in hours, not weeks." },
        ]}
      />

      <WorkBand items={workFor((c) => c.offerLine === "partner")} tone="white" eyebrow="Partner work" title="Delivered with our partners." />
      <TestimonialBand offerLine="partner" />
      <Commitments />

      <CtaBand title={<>Send us your terms of reference<span className="text-amber">.</span></>} intro="We reply within one working day with a scope, a fixed price and the team we would put on it.">
        <Button href="/contact?type=Consultancy" size="lg" arrow>Send the ToR</Button>
        <BookButton label="Talk it through" variant="outline-light" />
      </CtaBand>
      <SeeAlso current="partner" />
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Partners", path: "/partners" }]), ...getPackages((p) => p.offerLine === "partner").map(serviceLd)]} />
    </>
  );
}
