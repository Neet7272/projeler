import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK ve Gizlilik Politikası",
  description:
    "Kişisel verilerin korunması ve gizlilik politikası (taslak metin).",
};

export default function KvkkPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        Yasal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        KVKK / Gizlilik Politikası
      </h1>
      <p className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-[var(--foreground)]">
        Bu sayfa <strong>yer tutucu (taslak)</strong> metindir. Yayına almadan
        önce hukuk danışmanınızla birlikte güncelleyin ve onaylayın.
      </p>
      <div className="prose-custom mt-10 space-y-6 text-sm leading-7 text-[var(--muted)]">
        <p>
          Veri sorumlusu: Ar-Ge İnovasyon ve Girişimcilik Kulübü. Platform
          üzerinden toplanan kişisel veriler (ör. ad, e-posta, profil bilgileri)
          yalnızca hizmet sunumu, güvenlik ve yasal yükümlülükler kapsamında
          işlenecektir.
        </p>
        <p>
          KVKK kapsamındaki haklarınız (bilgi talebi, düzeltme, silme, itiraz
          vb.) için kulüp iletişim kanalları üzerinden başvurabilirsiniz.
        </p>
        <p>
          <Link
            href="/sozlesme"
            className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Kullanıcı Sözleşmesi
          </Link>
          ’ni de incelemenizi öneririz.
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
