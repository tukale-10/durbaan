import type { Package } from "./schemas";
import { site } from "./site";

export function serviceLd(p: Package) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    description: p.summary,
    provider: { "@type": "Organization", name: "Durbaan", url: site.url },
    areaServed: ["Somalia", "Kenya", "Ethiopia"],
    ...(p.price != null && p.offerLine !== "enterprise"
      ? { offers: { "@type": "Offer", priceCurrency: "USD", price: p.price, priceSpecification: { "@type": "PriceSpecification", minPrice: p.price, priceCurrency: "USD" } } }
      : {}),
  };
}
