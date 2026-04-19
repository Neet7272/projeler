import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getAnnouncementsByCategory } from "@/lib/announcementQueries";
import {
  CATEGORY_STRIP_META,
  parseCategorySlug,
} from "@/lib/announcementCategories";
import {
  absoluteUrl,
  breadcrumbListNode,
  schemaDocument,
} from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = parseCategorySlug(slug);
  if (!cat) return { title: "Kategori bulunamadı" };
  const meta = CATEGORY_STRIP_META[cat];
  const url = absoluteUrl(`/duyurular/kategori/${slug}`);
  const title = `${meta.title} | Duyurular`;
  return {
    title,
    description: meta.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.subtitle,
      type: "website",
      url,
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.subtitle,
    },
  };
}

const listCardClass =
  "group block overflow-hidden rounded-2xl border border-slate-200/65 bg-white/90 shadow-[var(--shadow-matte)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/28 hover:shadow-[var(--shadow-matte-hover)]";

export default async function AnnouncementCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = parseCategorySlug(slug);
  if (!cat) notFound();

  const items = await getAnnouncementsByCategory(cat, 80);
  const meta = CATEGORY_STRIP_META[cat];

  const jsonLd = schemaDocument(
    breadcrumbListNode([
      { name: "Ana sayfa", path: "/" },
      { name: "Duyurular", path: "/duyurular" },
      { name: meta.title, path: `/duyurular/kategori/${slug}` },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Kategori
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {meta.subtitle}
          </p>
        </div>
        <Button href="/duyurular" variant="secondary">
          Tüm şeritler
        </Button>
      </div>

      <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {items.map((a) => (
          <li key={a.id}>
            <Link href={`/duyurular/${a.id}`} className={listCardClass}>
              {a.coverImageUrl ? (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={a.coverImageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200/80" />
              )}
              <div className="p-6 sm:p-7">
                <p className="text-xs text-slate-500">{a.createdAt}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 decoration-sky-600/0 decoration-2 underline-offset-4 transition-colors group-hover:underline group-hover:decoration-sky-600/70">
                  {a.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                  {a.content}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <p className="mt-16 text-sm text-slate-600">
          Bu kategoride henüz kayıt yok.
        </p>
      ) : null}
    </div>
    </>
  );
}
