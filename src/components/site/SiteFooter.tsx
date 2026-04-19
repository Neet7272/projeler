import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--surface)] py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Ar-Ge İnovasyon ve Girişimcilik Kulübü
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Duyurular, proje vitrini ve takım eşleştirme için kulüp platformu.
          </p>
        </div>
        <nav
          className="flex flex-col gap-3 text-sm sm:items-end"
          aria-label="Yasal ve yardım bağlantıları"
        >
          <Link
            href="/sozlesme"
            className="font-medium text-[var(--foreground)] underline-offset-4 transition-colors hover:text-[var(--primary)] hover:underline"
          >
            Kullanıcı Sözleşmesi
          </Link>
          <Link
            href="/kvkk"
            className="font-medium text-[var(--foreground)] underline-offset-4 transition-colors hover:text-[var(--primary)] hover:underline"
          >
            KVKK / Gizlilik Politikası
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-[var(--hairline)] px-6 pt-6 text-xs text-[var(--muted)]">
        © {year} Ar-Ge İnovasyon ve Girişimcilik Kulübü. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
