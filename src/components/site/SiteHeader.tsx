"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/duyurular", label: "Duyurular" },
  { href: "/proje-vitrini", label: "Proje Vitrini" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[color:color-mix(in_oklab,var(--background),transparent_18%)] backdrop-blur-md supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--background),transparent_18%)]">
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
                pathname === href && "bg-[var(--surface)] text-[var(--foreground)]"
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
                    "bg-[var(--surface)] text-[var(--foreground)]"
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
                      "bg-[var(--surface)] text-[var(--foreground)]"
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
          className="fixed inset-0 top-14 z-30 flex flex-col bg-[color:color-mix(in_oklab,var(--background),#000_12%)] px-4 pb-8 pt-4 backdrop-blur-md lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto rounded-2xl border border-[var(--hairline)] bg-[var(--background)] p-2 shadow-lg">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]",
                  pathname === href && "bg-[var(--surface)]"
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
                    pathname.startsWith("/dashboard") && "bg-[var(--surface)]"
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
                      pathname.startsWith("/admin") && "bg-[var(--surface)]"
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
    </header>
  );
}
