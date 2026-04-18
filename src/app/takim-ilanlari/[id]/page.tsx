import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdDetailClient } from "@/components/teamAds/AdDetailClient";
import { getProjectDetailForPage } from "@/lib/projectQueries";
import { getSiteUrl } from "@/lib/siteUrl";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const detail = await getProjectDetailForPage(id);
  if (!detail) return { title: "Proje bulunamadı" };

  const { ad, createdAtIso } = detail;
  const description = ad.description.replace(/\s+/g, " ").slice(0, 160);
  const url = `${getSiteUrl()}/takim-ilanlari/${id}`;
  const keywords = [...ad.tags, ...ad.lookingFor].slice(0, 24);

  return {
    title: ad.title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ad.title,
      description,
      type: "article",
      url,
      publishedTime: createdAtIso,
    },
    twitter: {
      card: "summary_large_image",
      title: ad.title,
      description,
    },
  };
}

export default async function TeamAdDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const detail = await getProjectDetailForPage(id);
  if (!detail) notFound();

  const { ad, createdAtIso } = detail;
  const site = getSiteUrl();
  const url = `${site}/takim-ilanlari/${ad.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: ad.title,
    description: ad.description.replace(/\s+/g, " ").slice(0, 500),
    dateCreated: createdAtIso,
    url,
    author: {
      "@type": "Person",
      name: ad.owner.name,
    },
    keywords: [...ad.tags, ...ad.lookingFor].join(", "),
    about: ad.lookingFor.length
      ? ad.lookingFor.map((s) => ({ "@type": "Thing", name: s }))
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdDetailClient ad={ad} />
    </>
  );
}
