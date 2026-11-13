import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "Durbaan", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Durbaan",
    url: site.url,
    logo: `${site.url}/brand/durbaan-seal-on-navy.svg`,
    slogan: site.tagline,
    description: site.description,
    email: site.email,
    areaServed: ["Somalia", "Kenya", "Ethiopia"].map((name) => ({ "@type": "Country", name })),
    address: [
      { "@type": "PostalAddress", addressLocality: "Mogadishu", addressCountry: "SO" },
      { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    ],
    sameAs: [site.linkedinUrl].filter(Boolean),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
