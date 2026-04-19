import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanıcı Sözleşmesi",
  description: "Platform kullanıcı sözleşmesi (taslak metin).",
};

export default function SozlesmePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        Yasal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        Kullanıcı Sözleşmesi
      </h1>
      <p className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-[var(--foreground)]">
        Bu sayfa <strong>yer tutucu (taslak)</strong> metindir. Yayına almadan
        önce hukuk danışmanınızla birlikte güncelleyin ve onaylayın.
      </p>
      <div className="prose-custom mt-10 space-y-6 text-sm leading-7 text-[var(--muted)]">
        <p>
          Bu platformu kullanarak içerik kurallarına, moderasyon süreçlerine ve
          kulüp yönergelerine uymayı kabul etmiş sayılırsınız. İlanlar ve
          projeler yönetici onayından geçebilir; uygunsuz içerik kaldırılabilir
          veya hesap kısıtlanabilir.
        </p>
        <p>
          Hizmet &quot;olduğu gibi&quot; sunulur; mücbir sebepler ve üçüncü
          taraf hizmet kesintilerinden doğan zararlardan kulüp sorumluluğu
          sözleşmede ayrıca tanımlanmalıdır (taslak).
        </p>
        <p>
          <Link
            href="/kvkk"
            className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
          >
            KVKK / Gizlilik Politikası
          </Link>
          ’na da göz atın.
        </p>
      </div>
      <p className="mt-12">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--primary)] underline-offset-2 hover:underline"
        >
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  );
}
