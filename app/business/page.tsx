import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { CtaBand, PageHero } from "@/components/ui/blocks";
import { Button } from "@/components/ui/primitives";
import { OfferPackages, OutcomeGrid, SeeAlso } from "@/components/sections/offer";
import { Commitments, TestimonialBand, WorkBand, workFor } from "@/components/sections/shared";
import { getPackages } from "@/lib/content";
import { serviceLd } from "@/lib/ld";
import { breadcrumbLd, JsonLd, pageMeta, } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Durbaan Business: websites, branding and dashboards for growing businesses",
  description: "Look like the business you already are. Brand identity, websites, photo and video, dashboards and custom systems for clinics, schools, hotels and retailers in Mogadishu and Nairobi.",
  path: "/business",
});

export default function BusinessPage() {
  const wa = whatsappHref("Hello Durbaan, I would like a quote for my business.");
  return (
    <>
      <PageHero
        eyebrow="DURBAAN BUSINESS"
        title={<>Look like the business you already are<span className="text-amber">.</span></>}
        intro="Your customers check you online before they visit. We give you the brand, website, content and systems to win their trust."
      >
        {wa ? <WhatsAppButton label="Get a quote on WhatsApp" variant="primary" message="Hello Durbaan, I would like a quote for my business." /> : <Button href="/contact?type=Business" size="lg" arrow>Get a quote</Button>}
        <Button href="#packages" variant="outline-light" size="lg">See packages</Button>
      </PageHero>

      <OutcomeGrid
        tone="white"
        eyebrow="For clinics, schools, hotels, restaurants, logistics and retail"
        title="What your customers check before they call."
        items={[
          { t: "That you are real.", d: "A verified Google profile, a proper website and a phone number that works on WhatsApp." },
          { t: "That you are good.", d: "Real photos of your place, your team and your work. Not stock images." },
          { t: "That you are organized.", d: "Simple systems for bookings, orders and stock, so nothing falls through." },
        ]}
      />

      <OfferPackages line="business" title="Packages for every stage." intro="Start with the Business Credibility Kit. Add film, data or a system when you are ready." />

      <WorkBand items={workFor((c) => c.offerLine === "business")} tone="white" eyebrow="Business work" title="Businesses we have helped look the part." />
      <TestimonialBand offerLine="business" />
      <Commitments />

      <CtaBand title={<>Message us on WhatsApp for a quote<span className="text-amber">.</span></>} intro="Tell us what your business does and what you need. We reply the same day with a price.">
        {wa ? <WhatsAppButton label="Message us on WhatsApp" variant="primary" message="Hello Durbaan, I would like a quote for my business." /> : <Button href="/contact?type=Business" size="lg" arrow>Ask for a quote</Button>}
        <BookButton label="Book a call" variant="outline-light" />
      </CtaBand>
      <SeeAlso current="business" />
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Business", path: "/business" }]), ...getPackages((p) => p.offerLine === "business").map(serviceLd)]} />
    </>
  );
}
