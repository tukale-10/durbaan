export const site = {
  name: "Durbaan",
  tagline: "Your impact, heard.",
  seal: "IMPACT · STORIES · DATA",
  promise: "We make your work visible and credible to the people who decide your future.",
  description:
    "Durbaan is a Somali impact communications and data studio. Documentaries, M&E dashboards and websites for NGOs, programs and businesses across Somalia, Somaliland, Ethiopia and Kenya.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://durbaan.com").replace(/\/$/, ""),
  email: process.env.CONTACT_TO_EMAIL || "hello@durbaan.com",
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  locations: ["Mogadishu", "Nairobi"],
  fieldCountries: ["Somalia", "Somaliland", "Ethiopia", "Kenya"],
};

/** Draft and sample content is only ever shown outside production, or on an explicit preview flag. */
export const SHOW_DRAFTS =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

export function whatsappHref(message = "Hello Durbaan, I would like to talk about a project.") {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Book-a-call destination: the booking tool if configured, otherwise the contact page booking section. */
export function bookingHref() {
  return site.bookingUrl || "/contact#book";
}

export const nav = [
  { href: "/impact", label: "Impact" },
  { href: "/partners", label: "Partners" },
  { href: "/business", label: "Business" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];
