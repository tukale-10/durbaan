import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const preview = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1" || process.env.VERCEL_ENV === "preview";
  return preview
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
