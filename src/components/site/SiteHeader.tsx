"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/duyurular", label: "Duyurular" },
  { href: "/proje-vitrini", label: "Proje Vitrini" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;

/** Üst güvenli alan + satır yüksekliği; `SiteHeader` ile aynı olmalı */
const HEADER_OFFSET = "calc(3.5rem + env(safe-area-inset-top, 0px))";

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScroll.current;
    lastScroll.current = latest;
    const delta = latest - prev;
    if (latest < 20) {
      setHidden(false);
      return;
    }
    if (delta > 6) setHidden(true);
    else if (delta < -4) setHidden(false);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (hidden) setMenuOpen(false);
  }, [hidden]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{
          duration: hidden ? 0.22 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full border-b border-slate-200/70",
          "bg-white/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md",
          "supports-[backdrop-filter]:bg-white/75",
        )}
      >
        <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-h-11 min-w-0 items-center text-sm font-semibold tracking-tight text-slate-900"
          >
            Ar-Ge İnovasyon Kulübü
          </Link>

          <nav
            className="hidden items-center gap-1 text-sm text-[var(--muted)] lg:flex"
            aria-label="Ana menü"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
                  pathname === href &&
                    "bg-[var(--surface)] text-[var(--foreground)]",
                )}
              >
                {label}
              </Link>
            ))}
            {status === "loading" ? (
              <span className="flex min-h-11 items-center rounded-full px-3 py-2 text-xs opacity-60">
                …
              </span>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex min-h-11 items-center rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
                    pathname.startsWith("/dashboard") &&
                      "bg-[var(--surface)] text-[var(--foreground)]",
                  )}
                >
                  Panel
                </Link>
                {session.user.role === "ADMIN" ? (
                  <Link
                    href="/admin"
                    className={cn(
                      "flex min-h-11 items-center rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
                      pathname.startsWith("/admin") &&
                        "bg-[var(--surface)] text-[var(--foreground)]",
                    )}
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex min-h-11 items-center rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="flex min-h-11 items-center rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]"
              >
                Giriş
              </Link>
            )}
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-nav"
            className="fixed bottom-0 left-0 right-0 z-30 flex flex-col bg-[color:color-mix(in_oklab,var(--background),#000_12%)] px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-4 backdrop-blur-md lg:hidden"
            style={{ top: HEADER_OFFSET }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex min-h-0 max-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] flex-1 flex-col gap-1 overflow-y-auto overscroll-y-contain rounded-2xl border border-[var(--hairline)] bg-[var(--background)] p-2 shadow-lg touch-pan-y">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]",
                    pathname === href && "bg-[var(--surface)]",
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {status === "loading" ? (
                <span className="flex min-h-12 items-center px-4 text-sm text-[var(--muted)]">
                  Yükleniyor…
                </span>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--surface)]",
                      pathname.startsWith("/dashboard") && "bg-[var(--surface)]",
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    Panel
                  </Link>
                  {session.user.role === "ADMIN" ? (
                    <Link
                      href="/admin"
                      className={cn(
                        "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--surface)]",
                        pathname.startsWith("/admin") && "bg-[var(--surface)]",
                      )}
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center rounded-xl px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
                    onClick={() => {
                      setMenuOpen(false);
                      void signOut({ callbackUrl: "/" });
                    }}
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Giriş
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </motion.header>

      <div
        aria-hidden
        className="w-full shrink-0"
        style={{ height: HEADER_OFFSET }}
      />
    </>
  );
}
