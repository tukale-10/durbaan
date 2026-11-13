import { bookingHref, whatsappHref } from "@/lib/site";
import { TrackedLink } from "./TrackedLink";
import { ArrowRight, Calendar, WhatsApp } from "./icons";
import { cx } from "./primitives";

const btn = "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors duration-200 sm:h-14 sm:px-7 sm:text-base";

export function BookButton({ label = "Book a discovery call", variant = "primary", className }: { label?: string; variant?: "primary" | "secondary" | "outline-light"; className?: string }) {
  const href = bookingHref();
  const ext = /^https?:/.test(href);
  return (
    <TrackedLink
      event="Booking Click"
      href={href}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        btn,
        variant === "primary" && "bg-amber text-navy hover:bg-[#FFC14D]",
        variant === "secondary" && "bg-navy text-white hover:bg-navy-600",
        variant === "outline-light" && "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
        className,
      )}
    >
      <Calendar width={18} height={18} />
      {label}
      <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

/** Renders nothing until a WhatsApp Business number is configured. */
export function WhatsAppButton({ label = "Message us on WhatsApp", message, variant = "outline-light", className }: { label?: string; message?: string; variant?: "outline-light" | "outline" | "primary" | "secondary"; className?: string }) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <TrackedLink
      event="WhatsApp Click"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        btn,
        variant === "outline-light" && "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
        variant === "outline" && "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
        variant === "primary" && "bg-amber text-navy hover:bg-[#FFC14D]",
        variant === "secondary" && "bg-navy text-white hover:bg-navy-600",
        className,
      )}
    >
      <WhatsApp width={18} height={18} />
      {label}
    </TrackedLink>
  );
}
