import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsApp } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <TrackedLink
      event="WhatsApp Click"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Durbaan on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(8,20,40,.5)] transition-transform hover:scale-105 md:hidden"
    >
      <WhatsApp width={28} height={28} />
    </TrackedLink>
  );
}
