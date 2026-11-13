import { Legal } from "@/components/sections/Legal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Terms of service", description: "Terms for using durbaan.com and working with Durbaan.", path: "/terms" });

export default function Terms() {
  return (
    <Legal title="Terms of service" updated="13 November 2026">
      <h2>This website</h2>
      <p>The content on durbaan.com is provided for information. Prices shown are starting points in US dollars and are confirmed in a written proposal before any work begins.</p>
      <h2>Projects</h2>
      <p>Every project is governed by a written proposal or agreement that sets out scope, timeline, price and deliverables. Where that agreement differs from this page, the agreement applies.</p>
      <h2>Payments</h2>
      <ul>
        <li>Projects under 5,000 USD: 50% to start and 50% on delivery.</li>
        <li>Larger projects: 40% to start, 30% at an agreed midpoint, and 30% on delivery.</li>
        <li>Retainers are billed monthly in advance.</li>
      </ul>
      <h2>Ownership</h2>
      <p>You own the final files once the project is paid in full. We may show the work in our portfolio unless you ask us not to. Third-party assets such as licensed music or fonts remain under their own licences.</p>
      <h2>Confidentiality</h2>
      <p>We keep your information and your clients&apos; information confidential. For partner and white-label work, confidentiality and non-solicitation are included as standard.</p>
      <h2>Consent and safeguarding</h2>
      <p>We obtain informed consent from every person we film or photograph and follow donor safeguarding standards. We may decline or pause work that would put people at risk.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </Legal>
  );
}
