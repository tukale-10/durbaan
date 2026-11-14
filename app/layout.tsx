import type { Metadata, Viewport } from "next";
import { Inter, Unbounded } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PILLAR_PHOTO, pillars } from "@/content/pillars";
import { getPhoto } from "@/lib/content";
import { JsonLd, organizationLd } from "@/lib/seo";
import { nav, site, whatsappHref } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--font-unbounded" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Durbaan | Impact communications and data studio", template: "%s | Durbaan" },
  description: site.description,
  applicationName: "Durbaan",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Durbaan", locale: "en", url: "/" },
  twitter: { card: "summary_large_image" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { themeColor: "#0E1F3D", width: "device-width", initialScale: 1 };

function servicesMenu() {
  return pillars.map((p) => {
    const ph = getPhoto(PILLAR_PHOTO[p.id]);
    return {
      id: p.id,
      name: p.name,
      promise: p.promise,
      line: p.line,
      services: p.services.map((s) => s.name),
      photo: ph ? { src: ph.src, alt: ph.alt, blurDataURL: ph.blurDataURL } : undefined,
    };
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable}`}>
      <body>
        <Header nav={nav} whatsapp={whatsappHref()} services={servicesMenu()} />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={organizationLd()} />
        {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />}
        {plausible && <Script id="plausible-init" strategy="afterInteractive">{`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}</Script>}
      </body>
    </html>
  );
}
