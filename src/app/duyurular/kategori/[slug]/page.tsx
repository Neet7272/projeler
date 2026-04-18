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

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = parseCategorySlug(slug);
  if (!cat) return { title: "Kategori bulunamadı" };
  const meta = CATEGORY_STRIP_META[cat];
  return {
    title: `${meta.title} | Duyurular`,
    description: meta.subtitle,
    openGraph: { title: meta.title, description: meta.subtitle },
  };
}

export default async function AnnouncementCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = parseCategorySlug(slug);
  if (!cat) notFound();

  const items = await getAnnouncementsByCategory(cat, 80);
  const meta = CATEGORY_STRIP_META[cat];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Kategori
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            {meta.subtitle}
          </p>
        </div>
        <Button href="/duyurular" variant="secondary">
          Tüm şeritler
        </Button>
      </div>

      <ul className="mt-12 space-y-6">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={`/duyurular/${a.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] transition-colors hover:border-[var(--foreground)]/20 sm:flex-row"
            >
              {a.coverImageUrl ? (
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-72">
                  <Image
                    src={a.coverImageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 640px) 288px, 100vw"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <p className="text-xs text-[var(--muted)]">{a.createdAt}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:underline">
                  {a.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--muted)]">
                  {a.content}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <p className="mt-12 text-sm text-[var(--muted)]">
          Bu kategoride henüz kayıt yok.
        </p>
      ) : null}
    </div>
  );
}
