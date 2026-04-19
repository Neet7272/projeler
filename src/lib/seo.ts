import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export const SITE_NAME = "Kent Ar-Ge İnovasyon Kulübü";
export const SITE_SHORT_NAME = "Kent Ar-Ge";

export const DEFAULT_DESCRIPTION =
  "Kulüp duyuruları, yarışmalar, etkinlikler ve takım kurma vitrini. Projeye katıl veya ekibini oluştur.";

/** Sosyal doğrulama — footer ile uyumlu */
export const SITE_INSTAGRAM =
  "https://www.instagram.com/kentargekulubu/";

export const SITE_KEYWORDS = [
  "Kent Üniversitesi",
  "İstanbul Kent Üniversitesi",
  "Ar-Ge kulübü",
  "inovasyon",
  "girişimcilik",
  "takım kurma",
  "proje vitrini",
  "kulüp duyuruları",
  "hackathon",
  "yarışma",
  "TEKNOFEST",
  "TÜBİTAK",
  "kulüp platformu",
] as const;

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function optionalOgImage(): NonNullable<Metadata["openGraph"]>["images"] {
  const raw = process.env.NEXT_PUBLIC_OG_IMAGE?.trim();
  if (!raw) return undefined;
  const url = raw.startsWith("http") ? raw : absoluteUrl(raw);
  return [{ url, width: 1200, height: 630, alt: SITE_NAME }];
}

/** Kök layout için ortak Open Graph / Twitter alanları */
export function buildRootOpenGraph(): NonNullable<Metadata["openGraph"]> {
  const images = optionalOgImage();
  const hasImages = Array.isArray(images)
    ? images.length > 0
    : images != null;
  return {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: getSiteUrl(),
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    ...(hasImages ? { images } : {}),
  };
}

export function buildRootTwitter(): NonNullable<Metadata["twitter"]> {
  const site = process.env.NEXT_PUBLIC_TWITTER_SITE?.trim();
  return {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    ...(site ? { site } : {}),
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  const extraSameAs = process.env.NEXT_PUBLIC_SAME_AS_LINKS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${base}/#organization`,
        name: SITE_NAME,
        url: base,
        description: DEFAULT_DESCRIPTION,
        logo: {
          "@type": "ImageObject",
          url: `${base}/favicon.ico`,
        },
        sameAs: [SITE_INSTAGRAM, ...extraSameAs],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_NAME,
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${base}/proje-vitrini?tag={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbListNode(items: BreadcrumbItem[]): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path.startsWith("/") ? it.path : `/${it.path}`}`,
    })),
  };
}

export function schemaDocument(
  ...nodes: Record<string, unknown>[]
): Record<string, unknown> {
  return { "@context": "https://schema.org", "@graph": nodes };
}
