import { Legal } from "@/components/sections/Legal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Privacy policy", description: "How Durbaan collects, uses and protects your information.", path: "/privacy" });

export default function Privacy() {
  return (
    <Legal title="Privacy policy" updated="13 November 2026">
      <p>Durbaan respects your privacy. This policy explains what we collect through durbaan.com, why, and what you can ask us to do with it.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Enquiries.</strong> When you use our contact form we receive your name, email, phone or WhatsApp number (optional), organization, and what you tell us about your project.</li>
        <li><strong>Guide requests.</strong> Your name, email, organization and role, so we can send you the guide.</li>
        <li><strong>Newsletter.</strong> Your email address, only if you tick the box to subscribe.</li>
        <li><strong>Analytics.</strong> We use privacy-friendly analytics that do not use cookies and do not collect personal data. We see page views and anonymous events such as form submissions.</li>
      </ul>
      <h2>How we use it</h2>
      <p>Only to reply to you, send what you asked for, and, if you subscribed, send occasional emails. We never sell or rent your information.</p>
      <h2>Who processes it</h2>
      <p>We use trusted providers to run this website: email delivery, spam protection, booking and website hosting. Embedded films load from YouTube or Vimeo only when you press play, and YouTube films use its privacy-enhanced mode.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries are kept for up to two years, or for as long as we work together. Newsletter subscriptions last until you unsubscribe.</p>
      <h2>Your rights</h2>
      <p>You can ask us to see, correct or delete your information at any time. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will reply within 30 days.</p>
      <h2>People in our stories</h2>
      <p>Everyone we film or photograph gives informed consent in their own language. We strip location data from photos before publishing, and we do not publish identifying details of children or vulnerable people without explicit permission.</p>
    </Legal>
  );
}
