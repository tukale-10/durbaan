import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { BookButton, WhatsAppButton } from "@/components/ui/Cta";
import { Faq, faqLd, PageHero } from "@/components/ui/blocks";
import { Calendar, LinkedIn, Mail, Pin } from "@/components/ui/icons";
import { Eyebrow, Heading, Section } from "@/components/ui/primitives";
import { faq } from "@/content/faq";
import { getPackages } from "@/lib/content";
import { JsonLd, pageMeta } from "@/lib/seo";
import { bookingHref, site, whatsappHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Durbaan: start a project",
  description: "Start a project with Durbaan. Book a free 30 minute discovery call, message us on WhatsApp, or send us your brief. We reply within one working day.",
  path: "/contact",
});

const AUD: Record<string, string> = { impact: "NGO or program", partner: "Consultancy", business: "Business", enterprise: "Corporate or institution" };

export default function ContactPage() {
  const packages = Object.fromEntries(getPackages().map((p) => [p.id, { name: p.name, audience: AUD[p.offerLine] }]));
  const wa = whatsappHref();
  const calEmbed = site.bookingUrl && /cal\.com/.test(site.bookingUrl) ? `${site.bookingUrl}${site.bookingUrl.includes("?") ? "&" : "?"}embed=true&theme=light` : null;
  return (
    <>
      <PageHero eyebrow="START A PROJECT" title={<>Tell us who needs to see your work<span className="text-amber">.</span></>} intro="Choose what suits you: a short form, a call, or a WhatsApp message. Whichever you pick, a senior person replies within one working day." />

      <Section tone="white" className="!pt-14">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading eyebrow="Send us a brief" title="Project enquiry" size="t-2" />
            <div className="mt-10">
              <Suspense><ContactForm bookingHref={bookingHref()} packages={packages} /></Suspense>
            </div>
          </div>
          <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
            <div className="rounded-card bg-navy p-7 text-white">
              <Calendar className="text-amber" width={24} height={24} />
              <h2 className="mt-5 font-display text-xl font-semibold tracking-display">Free 30 minute discovery call</h2>
              <p className="mt-2 text-[15px] text-white/70">Talk to us about your goals, budget and timeline. No obligation.</p>
              <div className="mt-6"><BookButton label="Book a call" className="w-full" /></div>
            </div>
            {wa && (
              <div className="rounded-card bg-mist p-7">
                <h2 className="font-display text-xl font-semibold tracking-display">Prefer WhatsApp?</h2>
                <p className="mt-2 text-[15px] text-slate">The fastest way to reach us in the region.</p>
                <div className="mt-6"><WhatsAppButton label="Message us" variant="secondary" className="w-full" /></div>
              </div>
            )}
            <div className="rounded-card p-7 ring-1 ring-line">
              <ul className="space-y-4 text-[15px]">
                <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 font-medium hover:underline"><Mail className="text-amber" />{site.email}</a></li>
                {site.linkedinUrl && <li><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium hover:underline"><LinkedIn className="text-amber" />LinkedIn</a></li>}
                <li className="flex items-start gap-3"><Pin className="mt-0.5 shrink-0 text-amber" /><span><strong>Mogadishu</strong> and <strong>Nairobi</strong><br /><span className="text-slate">Field work across Somalia, Somaliland, Ethiopia and Kenya</span></span></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="mist" id="book">
        <div className="container">
          <Heading eyebrow="Book a call" title="Pick a time that suits you." intro="Thirty minutes, by video or phone. We will ask about your work, your audience and your deadline, and tell you honestly what it would take." />
          <div className="mt-10">
            {calEmbed ? (
              <iframe src={calEmbed} title="Book a discovery call with Durbaan" loading="lazy" className="h-[720px] w-full rounded-card bg-white ring-1 ring-line" />
            ) : site.bookingUrl ? (
              <BookButton label="Open the booking page" variant="secondary" />
            ) : (
              <div className="rounded-card bg-white p-8 ring-1 ring-line">
                <p className="text-slate">Online booking is being set up. In the meantime, send the form above or email <a href={`mailto:${site.email}?subject=Discovery%20call`} className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">{site.email}</a> with two or three times that suit you.</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Eyebrow className="mb-5">Before you ask</Eyebrow><h2 className="t-2">Common questions.</h2></div>
          <div className="lg:col-span-8"><Faq items={faq} /></div>
        </div>
      </Section>
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
