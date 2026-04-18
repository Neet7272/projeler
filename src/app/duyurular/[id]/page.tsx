import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementCoverParallax } from "@/components/announcements/AnnouncementCoverParallax";
import { Button } from "@/components/ui/Button";
import { getAnnouncementById } from "@/lib/announcementQueries";
import { prismaCategoryToUiLabel } from "@/lib/announcementMappers";
import { getSiteUrl } from "@/lib/siteUrl";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const ann = await getAnnouncementById(id);
  if (!ann) return { title: "Duyuru bulunamadı" };

  const description = ann.content.replace(/\s+/g, " ").slice(0, 180);
  const url = `${getSiteUrl()}/duyurular/${id}`;

  return {
    title: ann.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ann.title,
      description,
      type: "article",
      url,
      images: ann.coverImageUrl ? [{ url: ann.coverImageUrl }] : undefined,
    },
    twitter: {
      card: ann.coverImageUrl ? "summary_large_image" : "summary",
      title: ann.title,
      description,
    },
  };
}

export default async function AnnouncementDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const ann = await getAnnouncementById(id);
  if (!ann) notFound();

  const site = getSiteUrl();
  const url = `${site}/duyurular/${ann.id}`;
  const categoryLabel = prismaCategoryToUiLabel(ann.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ann.title,
    description: ann.content.slice(0, 300),
    datePublished: ann.createdAt,
    author: { "@type": "Organization", name: "Kent Ar-Ge Kulübü" },
    image: ann.coverImageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto w-full max-w-3xl px-6 pb-20 pt-10 sm:pt-14">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
          <Link
            href="/duyurular"
            className="rounded-full border border-[var(--hairline)] px-3 py-1 transition-colors hover:text-[var(--foreground)]"
          >
            Duyurular
          </Link>
          <span aria-hidden>·</span>
          <span>{categoryLabel}</span>
          <span aria-hidden>·</span>
          <time dateTime={ann.createdAt}>{ann.createdAt}</time>
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.08]">
          {ann.title}
        </h1>

        {ann.coverImageUrl ? (
          <div className="mt-10">
            <AnnouncementCoverParallax src={ann.coverImageUrl} alt={ann.title} />
          </div>
        ) : null}

        <div className="prose-custom mt-12 space-y-6 text-base leading-[1.85] text-[var(--muted)] sm:text-lg">
          {ann.content.split(/\n\n+/).map((para, i) => (
            <p key={i} className="whitespace-pre-wrap text-pretty">
              {para.trim()}
            </p>
          ))}
        </div>

        {ann.externalApplyUrl ? (
          <div className="mt-14 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Başvuru ve kaynak
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Resmî çağrı veya başvuru sayfasına yönlendirilirsin.
            </p>
            <div className="mt-6">
              <Button
                href={ann.externalApplyUrl}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ann.externalApplyLabel ?? "Başvuruya git"}
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mt-12">
          <Button href="/duyurular" variant="secondary">
            Tüm duyurular
          </Button>
        </div>
      </article>
    </>
  );
}
