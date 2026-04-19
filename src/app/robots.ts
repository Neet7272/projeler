import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/ayarlar",
          "/ilan-ver",
          "/api/",
          "/auth/",
          "/takim-kur",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
