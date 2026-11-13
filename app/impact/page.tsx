import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand, Faq, faqLd, PageHero } from "@/components/ui/blocks";
import { Button, Heading, Section } from "@/components/ui/primitives";
import { OfferPackages, OutcomeGrid, SeeAlso, SplitStatement } from "@/components/sections/offer";
import { Commitments, GuideBand, TestimonialBand, WorkBand, workFor } from "@/components/sections/shared";
import { faq } from "@/content/faq";
import experience from "@/content/experience.json";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";
import { getPackages } from "@/lib/content";
import { serviceLd } from "@/lib/ld";

export const metadata = pageMeta({
  title: "Durbaan Impact: NGO communications, documentaries and M&E dashboards in Somalia",
  description: "Your impact, visible and credible to donors. Donor-ready websites, impact documentaries and live M&E dashboards for Somali NGOs and development programs.",
  path: "/impact",
});

export default function ImpactPage() {
  const work = workFor((c) => c.offerLine === "impact");
  return (
    <>
      <PageHero
        eyebrow="DURBAAN IMPACT"
        title={<>Your impact, visible and credible to donors<span className="text-amber">.</span></>}
        intro="Somali NGOs and development programs work hard in difficult places. We make sure donors, partners and communities can see it, trust it and fund more of it."
      >
        <BookButton label="Book a free donor-readiness call" />
        <Button href="#packages" variant="outline-light" size="lg">See packages and prices</Button>
      </PageHero>

      <SplitStatement eyebrow="The challenge" title="Donors are looking. Can they see you?">
        <p>Donors now look for local partners they can fund directly. They check your website, your reports, your data and your stories before they call.</p>
        <p>Many strong organizations lose out because their work is invisible. Not weak. Invisible.</p>
      </SplitStatement>

      <OutcomeGrid
        eyebrow="What changes when you work with us"
        title="Three things donors will notice."
        items={[
          { t: "Donors find a professional organization online.", d: "A clear, fast website and organization profile that pass a due diligence check in minutes." },
          { t: "Your reports carry real stories and clear numbers.", d: "People filmed with consent and dignity, next to results your donors can verify." },
          { t: "Your team can show results at any time.", d: "A live dashboard means you answer donor questions the same day, not at the next reporting deadline." },
        ]}
      />

      <OfferPackages line="impact" title="Choose where to start." intro="Each package is a fixed scope with a fixed timeline. The Impact Showcase combines all three and saves about 15%." />

      <WorkBand items={work} tone="white" eyebrow="Relevant work" title="Programs we have made visible." />

      {experience.names.length > 0 && (
        <Section tone="white" size="sm">
          <div className="container">
            <p className="eyebrow text-slate">Our team has delivered for programs funded by or implemented with</p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3 font-display text-lg font-semibold text-navy/60">
              {experience.names.map((n: string) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </Section>
      )}

      <TestimonialBand offerLine="impact" />
      <Commitments tone="white" />

      <Section tone="mist" id="faq">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading eyebrow="Questions" title="What program teams ask us." />
          </div>
          <div className="lg:col-span-8"><Faq items={faq} /></div>
        </div>
      </Section>

      <GuideBand />

      <CtaBand title={<>Book a free 30 minute donor-readiness call<span className="text-amber">.</span></>} intro="We will look at your website, reports and data the way a donor would, and tell you the three things to fix first. No obligation.">
        <BookButton label="Book the call" />
        <WhatsAppButton message="Hello Durbaan, I would like a donor-readiness call for our organization." />
      </CtaBand>
      <SeeAlso current="impact" />
      <JsonLd data={[faqLd(faq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Impact", path: "/impact" }]), ...getPackages((p) => p.offerLine === "impact").map(serviceLd)]} />
    </>
  );
}
