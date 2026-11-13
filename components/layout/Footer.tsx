import Link from "next/link";
import { Seal } from "@/components/brand/marks";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LinkedIn, Mail, Pin, WhatsApp } from "@/components/ui/icons";
import { site, whatsappHref } from "@/lib/site";

const cols = [
  { title: "Offers", links: [["/impact", "Durbaan Impact"], ["/partners", "Durbaan Partner"], ["/business", "Durbaan Business"], ["/enterprise", "Durbaan Enterprise"]] },
  { title: "Services", links: [["/services/stories", "Stories"], ["/services/data", "Data"], ["/services/digital", "Digital"], ["/services/capability", "Capability"]] },
  { title: "Company", links: [["/about", "About"], ["/work", "Work"], ["/films", "Films"], ["/resources", "Resources"], ["/brand", "Brand kit"]] },
];

export function Footer() {
  const wa = whatsappHref();
  return (
    <footer className="bg-night text-white">
      <div className="container grid grid-cols-1 gap-14 py-20 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
        <div className="lg:col-span-4">
          <Seal className="h-[120px] w-[120px]" />
          <p className="mt-6 font-display text-2xl font-semibold tracking-display">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-[15px] text-white/65">Impact communications and data studio. Mogadishu and Nairobi.</p>
          <div className="mt-8 max-w-sm">
            <p className="eyebrow mb-3 text-white/60">Impact Notes</p>
            <NewsletterForm />
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8 [&>*]:min-w-0">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="eyebrow text-amber">{c.title}</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                {c.links.map(([href, label]) => (
                  <li key={href}><Link href={href} className="text-white/80 hover:text-amber">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow text-amber">Contact</p>
            <ul className="mt-5 space-y-3 text-[15px] text-white/80">
              <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-amber"><Mail width={16} height={16} className="shrink-0" /><span className="break-all">{site.email}</span></a></li>
              {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber"><WhatsApp width={16} height={16} />WhatsApp</a></li>}
              {site.linkedinUrl && <li><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber"><LinkedIn width={16} height={16} />LinkedIn</a></li>}
              <li className="inline-flex items-start gap-2"><Pin width={16} height={16} className="mt-1 shrink-0" />Mogadishu and Nairobi</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Durbaan. {site.seal}</p>
          <p className="flex gap-6"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link><Link href="/brand" className="hover:text-white">Brand kit</Link></p>
        </div>
      </div>
    </footer>
  );
}
