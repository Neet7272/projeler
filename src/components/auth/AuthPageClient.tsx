"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.56 2.96-2.24 5.48-4.78 7.18l7.73 6C44.21 37.03 48 31.57 48 24c0-1.49-.13-2.94-.38-4.36z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

const googleOAuthUi =
  typeof process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID === "string" &&
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.length > 0;

export function AuthPageClient() {
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/dashboard";
  const [loading, setLoading] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  async function onGoogle() {
    if (loading || !legalAccepted) return;
    setLoading(true);
    await signIn("google", { callbackUrl: next });
    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]">
        <div className="border-b border-[var(--hairline)] px-8 pt-8 sm:px-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Auth
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Giriş Yap
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Kulüp platformuna erişmek için Google hesabınla oturum aç.
          </p>
        </div>

        <div className="px-8 py-8 sm:px-10">
          {googleOAuthUi ? (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => void onGoogle()}
                disabled={loading || !legalAccepted}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.06),0_12px_40px_-20px_rgba(15,23,42,0.35)] transition hover:border-slate-300 hover:shadow-[0_12px_48px_-18px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:pointer-events-none disabled:opacity-50"
              >
                <GoogleGlyph className="h-5 w-5 shrink-0" />
                {loading ? "Yönlendiriliyor…" : "Google ile devam et"}
              </button>

              <label className="flex cursor-pointer gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--background)]/40 p-4 text-left">
                <input
                  type="checkbox"
                  checked={legalAccepted}
                  onChange={(e) => setLegalAccepted(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--hairline)] text-[var(--primary)] focus:ring-[var(--ring)]"
                />
                <span className="text-sm leading-6 text-[var(--muted)]">
                  <Link
                    href="/sozlesme"
                    className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Kullanıcı Sözleşmesi
                  </Link>
                  {" ve "}
                  <Link
                    href="/kvkk"
                    className="font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    KVKK / Gizlilik Politikası
                  </Link>
                  ’nı okudum; Google ile giriş yaparak bu metinleri kabul ettiğimi
                  beyan ederim.
                </span>
              </label>
            </div>
          ) : (
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-950/90">
              Google girişi için sunucuda{" "}
              <code className="rounded bg-black/10 px-1">AUTH_GOOGLE_ID</code> /{" "}
              <code className="rounded bg-black/10 px-1">AUTH_GOOGLE_SECRET</code> ve isteğe bağlı
              istemci uyarısı için{" "}
              <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>{" "}
              tanımlayın.
            </p>
          )}

          <div className="mt-8">
            <Button href="/" variant="secondary" className="w-full sm:w-auto">
              Ana sayfa
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
