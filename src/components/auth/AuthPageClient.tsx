"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { registerWithCredentials } from "@/actions/authActions";
import { cn } from "@/lib/cn";

type Tab = "login" | "register";

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
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/dashboard";
  const reduceMotion = useReducedMotion();

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ open: false });

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  async function onLogin() {
    if (loading) return;
    setLoading(true);
    setLoginError(null);

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.ok !== true) {
      const code = res?.code;
      const err = res?.error;
      const message =
        err === "CredentialsSignin" || code === "credentials"
          ? "E-posta veya şifre hatalı."
          : err
            ? `Giriş yapılamadı (${err}).`
            : "Giriş yapılamadı. Bağlantını kontrol edip tekrar dene.";
      setLoginError(message);
      setToast({
        open: true,
        title: "Giriş başarısız",
        description: message,
      });
      return;
    }

    setToast({
      open: true,
      title: "Giriş başarılı",
      description: "Yönlendiriliyorsun.",
    });
    router.push(next);
    router.refresh();
  }

  async function onGoogle() {
    if (loading) return;
    setLoading(true);
    setLoginError(null);
    setRegisterError(null);
    await signIn("google", { callbackUrl: next });
    setLoading(false);
  }

  async function onRegister() {
    if (loading) return;
    setRegisterError(null);
    setLoginError(null);
    setLoading(true);

    const reg = await registerWithCredentials({
      email: email.trim().toLowerCase(),
      password,
      name: name.trim(),
    });

    if (!reg.ok) {
      setLoading(false);
      setRegisterError(reg.error);
      return;
    }

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.ok !== true) {
      const message =
        res?.error === "CredentialsSignin"
          ? "Hesap oluşturuldu ancak oturum açılamadı (kimlik doğrulama). Giriş sekmesinden dene."
          : "Hesap oluşturuldu ancak oturum açılamadı. Giriş sekmesinden dene.";
      setRegisterError(message);
      setTab("login");
      return;
    }

    setToast({
      open: true,
      title: "Hoş geldin",
      description: "Hesabın hazır. Yönlendiriliyorsun.",
    });
    router.push(next);
    router.refresh();
  }

  const canLogin =
    email.trim().includes("@") && password.length >= 1;
  const canRegister =
    name.trim().length >= 2 && email.trim().length > 3 && password.length >= 8;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]">
        <div className="border-b border-[var(--hairline)] px-8 pt-8 sm:px-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Auth
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Giriş Yap / Kaydol
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Kulüp platformuna eriş: profilini tamamla, projelere başvur, vitrine çık.
          </p>

          <div className="relative mt-8 flex gap-0">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setRegisterError(null);
                  setLoginError(null);
                }}
                className={cn(
                  "relative flex-1 pb-3 text-sm font-medium transition-colors",
                  tab === t
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]/80"
                )}
              >
                {t === "login" ? "Giriş Yap" : "Kayıt Ol"}
                {tab === t ? (
                  <motion.span
                    layoutId="auth-tab-indicator"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--foreground)]"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 py-8 sm:px-10">
          {googleOAuthUi ? (
            <div className="mb-8 space-y-3">
              <button
                type="button"
                onClick={() => void onGoogle()}
                disabled={loading}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.06),0_12px_40px_-20px_rgba(15,23,42,0.35)] transition hover:border-slate-300 hover:shadow-[0_12px_48px_-18px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:opacity-60"
              >
                <GoogleGlyph className="h-5 w-5 shrink-0" />
                Google ile devam et
              </button>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span className="h-px flex-1 bg-[var(--hairline)]" />
                veya e-posta ile
                <span className="h-px flex-1 bg-[var(--hairline)]" />
              </div>
            </div>
          ) : (
            <p className="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-950/90">
              Google girişi için sunucuda{" "}
              <code className="rounded bg-black/10 px-1">AUTH_GOOGLE_ID</code> /{" "}
              <code className="rounded bg-black/10 px-1">AUTH_GOOGLE_SECRET</code> ve isteğe bağlı
              istemci butonu için{" "}
              <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>{" "}
              tanımlayın (aynı OAuth Client ID).
            </p>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: tab === "login" ? -12 : 12 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: tab === "login" ? 12 : -12 }
              }
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {tab === "register" ? (
                <div>
                  <label className="text-xs font-medium text-[var(--muted)]">
                    Ad Soyad
                  </label>
                  <div className="mt-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adın ve soyadın"
                      autoComplete="name"
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <label className="text-xs font-medium text-[var(--muted)]">
                  E-posta
                </label>
                <div className="mt-2">
                  <Input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--muted)]">
                  Şifre
                </label>
                <div className="mt-2">
                  <Input
                    type="password"
                    autoComplete={
                      tab === "login" ? "current-password" : "new-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 8 karakter"
                  />
                </div>
              </div>

              {tab === "register" && registerError ? (
                <motion.p
                  initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200"
                >
                  {registerError}
                </motion.p>
              ) : null}

              {tab === "login" && loginError ? (
                <motion.p
                  initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200"
                  role="alert"
                >
                  {loginError}
                </motion.p>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {tab === "login" ? (
              <Button
                variant="primary"
                onClick={onLogin}
                disabled={loading || !canLogin}
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onRegister}
                disabled={loading || !canRegister}
              >
                {loading ? "Kaydediliyor..." : "Kayıt Ol"}
              </Button>
            )}
            <Button href="/" variant="secondary">
              Ana sayfa
            </Button>
          </div>
        </div>
      </div>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}
