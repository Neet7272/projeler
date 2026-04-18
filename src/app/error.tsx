"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentionally minimal: no console noise in production.
  }, [props.error]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-10 sm:p-14">
        <p className="text-xs font-medium text-[var(--muted)]">Bir hata oluştu</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Beklenmeyen bir sorun oldu.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Yeniden denemek için sayfayı sıfırlayabilirsin. Sorun devam ederse
          biraz sonra tekrar dene.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" onClick={props.reset}>
            Tekrar dene
          </Button>
          <Button href="/" variant="secondary">
            Ana sayfa
          </Button>
        </div>
      </div>
    </div>
  );
}

