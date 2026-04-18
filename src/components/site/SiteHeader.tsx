"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-[color:color-mix(in_oklab,var(--background),transparent_25%)] backdrop-blur supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--background),transparent_25%)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[var(--foreground)]"
        >
          Ar-Ge İnovasyon Kulübü
        </Link>
        <nav className="flex items-center gap-1 text-sm text-[var(--muted)]">
          <Link
            href="/duyurular"
            aria-current={pathname === "/duyurular" ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
              pathname === "/duyurular" &&
                "bg-[var(--surface)] text-[var(--foreground)]"
            )}
          >
            Duyurular
          </Link>
          <Link
            href="/proje-vitrini"
            aria-current={pathname === "/proje-vitrini" ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
              pathname === "/proje-vitrini" &&
                "bg-[var(--surface)] text-[var(--foreground)]"
            )}
          >
            Proje Vitrini
          </Link>
          <Link
            href="/hakkimizda"
            aria-current={pathname === "/hakkimizda" ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
              pathname === "/hakkimizda" &&
                "bg-[var(--surface)] text-[var(--foreground)]"
            )}
          >
            Hakkımızda
          </Link>
          {status === "loading" ? (
            <span className="rounded-full px-3 py-2 text-xs opacity-60">
              …
            </span>
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
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
                    "rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]",
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
                className="rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]"
              >
                Çıkış
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full px-3 py-2 transition-colors hover:text-[var(--foreground)]"
            >
              Giriş
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
