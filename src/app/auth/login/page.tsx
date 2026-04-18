import { Suspense } from "react";
import { AuthPageClient } from "@/components/auth/AuthPageClient";

function AuthFallback() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg items-center justify-center px-6 py-24">
      <p className="text-sm text-[var(--muted)]">Yükleniyor…</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthPageClient />
    </Suspense>
  );
}
