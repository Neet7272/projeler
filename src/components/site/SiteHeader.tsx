"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Mobil üst çubukta hamburger alanını vurgula: kullanıcı ana menü rotalarından birindeyken (ör. `/duyurular`). Ana sayfa nötr kalır. */
function isPrimaryNavContext(pathname: string) {
  if (pathname === "/" || pathname === "") return false;
  if (pathname.startsWith("/duyurular")) return true;
  if (pathname.startsWith("/proje-vitrini")) return true;
  if (pathname.startsWith("/hakkimizda")) return true;
  if (pathname.startsWith("/dashboard")) return true;
  if (pathname.startsWith("/admin")) return true;
  return false;
}

/** Tam ekran mobil menüde aktif bağlantı (alt rotalar dahil). */
function isMobileNavLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "";
  if (href === "/dashboard")
    return pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinks = [
  { href: "/duyurular", label: "Duyurular" },
  { href: "/proje-vitrini", label: "Proje Vitrini" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;

/** Güvenli alan + `h-16` — spacer ile aynı */
const HEADER_OFFSET = "calc(4rem + env(safe-area-inset-top, 0px))";

const MOBILE_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/proje-vitrini", label: "Proje Vitrini" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/dashboard", label: "Yönetim Paneli" },
] as const;

/**
 * Phase 27: Üst çubuk **transform yok** (scroll-hide kaldırıldı — mobil kırılma riski).
 * Mobil tam ekran menü yalnızca `menuOpen === true` iken `document.body` portalında render.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const navContextActive = isPrimaryNavContext(pathname);

  useLayoutEffect(() => {
    setPortalEl(document.body);
  }, []);

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

  const navListContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.065,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  } as const;

  const navListItem = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
    },
  } as const;

  const mobileMenu =
    portalEl &&
    createPortal(
      <AnimatePresence mode="wait">
        {menuOpen ? (
          <motion.div
            key="mobile-menu-root"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed inset-0 z-[100000] isolate overflow-x-hidden overflow-y-auto bg-slate-50 md:hidden"
            style={{
              paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -top-32 left-1/2 h-[min(55vh,28rem)] w-[140%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(6,182,212,0.14),transparent)] blur-3xl" />
              <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_65%)] blur-2xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative flex min-h-[100dvh] w-full max-w-full flex-col"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.04,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="flex w-full items-center justify-between gap-3 px-4"
              >
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="min-w-0 flex-1 truncate text-left text-sm font-semibold tracking-tight text-slate-900"
                >
                  Ar-Ge İnovasyon Kulübü
                </Link>
                <motion.button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: reduceMotion ? 1 : 0.92 }}
                  transition={{ type: "spring", stiffness: 480, damping: 22 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_10px_30px_-12px_rgb(15,23,42,0.2)] backdrop-blur-sm transition-colors hover:border-cyan-200/80 hover:bg-cyan-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  aria-label="Menüyü kapat"
                >
                  <X className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                </motion.button>
              </motion.div>

              <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                <motion.nav
                  className="w-full max-w-sm"
                  aria-label="Mobil menü bağlantıları"
                  variants={navListContainer}
                  initial="hidden"
                  animate="show"
                >
                  <ul className="space-y-3.5 text-center">
                    {MOBILE_LINKS.map(({ href, label }) => {
                      const active = isMobileNavLinkActive(pathname, href);
                      return (
                        <motion.li key={href} variants={navListItem}>
                          <motion.div
                            whileTap={{ scale: reduceMotion ? 1 : 0.985 }}
                            transition={{
                              type: "spring",
                              stiffness: 520,
                              damping: 28,
                            }}
                          >
                            <Link
                              href={href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "relative block w-full overflow-hidden rounded-3xl py-4 pl-8 pr-6 text-3xl font-semibold tracking-tight transition-[box-shadow,transform,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                                active
                                  ? "border border-cyan-300/70 bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/60 text-cyan-950 shadow-[0_20px_50px_-18px_rgba(6,182,212,0.45),0_1px_0_rgb(255,255,255,0.9)_inset] ring-1 ring-cyan-200/40"
                                  : "border border-slate-200/80 bg-white text-slate-900 shadow-[0_14px_40px_rgb(15,23,42,0.07)] hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_18px_44px_-16px_rgb(15,23,42,0.12)]",
                              )}
                            >
                              {active ? (
                                <>
                                  <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-y-3 left-3 w-1 rounded-full bg-gradient-to-b from-cyan-400 via-cyan-500 to-sky-600 shadow-[0_0_14px_rgba(6,182,212,0.55)]"
                                  />
                                  <span
                                    aria-hidden
                                    className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl"
                                  />
                                </>
                              ) : null}
                              <span className="relative">{label}</span>
                            </Link>
                          </motion.div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.nav>

                <motion.div
                  className="mt-10 w-full max-w-sm text-center"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: reduceMotion ? 0.05 : 0.48,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                >
                  {status === "loading" ? (
                    <p className="text-sm text-slate-500">Yükleniyor…</p>
                  ) : session ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 460,
                        damping: 26,
                      }}
                      className="w-full rounded-2xl border border-slate-200/90 bg-white/95 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_12px_32px_-14px_rgb(15,23,42,0.12)] backdrop-blur-sm transition-colors hover:border-cyan-200/60 hover:bg-cyan-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      onClick={() => {
                        setMenuOpen(false);
                        void signOut({ callbackUrl: "/" });
                      }}
                    >
                      Çıkış yap
                    </motion.button>
                  ) : (
                    <motion.div
                      whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 460,
                        damping: 26,
                      }}
                    >
                      <Link
                        href="/auth/login"
                        className="block w-full rounded-2xl border border-slate-200/90 bg-white/95 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_12px_32px_-14px_rgb(15,23,42,0.12)] backdrop-blur-sm transition-colors hover:border-cyan-200/60 hover:bg-cyan-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        Giriş yap
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      portalEl,
    );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full border-b border-slate-200/70",
          "bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/75",
          "pt-[env(safe-area-inset-top,0px)]",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="min-w-0 flex-1 truncate py-2 pr-2 text-left text-sm font-semibold leading-snug tracking-tight text-slate-900 md:flex-none md:max-w-[min(42vw,20rem)]"
          >
            Ar-Ge İnovasyon Kulübü
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-1 text-sm text-[var(--muted)] md:flex"
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

          <motion.button
            type="button"
            whileTap={{ scale: reduceMotion ? 1 : 0.94 }}
            transition={{ type: "spring", stiffness: 520, damping: 28 }}
            className={cn(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] md:hidden",
              "min-h-11 min-w-11",
              navContextActive && !menuOpen
                ? "border border-cyan-200/90 bg-gradient-to-br from-cyan-50 via-white to-sky-50 text-cyan-950 shadow-[0_1px_0_rgb(255,255,255,0.85)_inset,0_8px_22px_-12px_rgb(6,182,212,0.45)]"
                : "border border-transparent text-slate-900 hover:bg-slate-100/90",
              menuOpen &&
                "border-cyan-300/80 bg-gradient-to-br from-cyan-100/90 to-sky-50 text-cyan-950 shadow-[0_10px_28px_-14px_rgb(6,182,212,0.55)]",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {navContextActive && !menuOpen ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(6,182,212,0.22),transparent_55%)]"
                initial={false}
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: [0.65, 1, 0.75], scale: [1, 1.03, 1] }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : null}
            <span className="relative flex h-6 w-6 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="mobile-close-icon"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: -92, scale: 0.82 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: 88, scale: 0.82 }
                    }
                    transition={{
                      duration: reduceMotion ? 0.12 : 0.24,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="h-6 w-6 shrink-0" strokeWidth={2.35} aria-hidden />
                  </motion.span>
                ) : (
                  <motion.span
                    key="mobile-menu-icon"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: 88, scale: 0.82 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: -92, scale: 0.82 }
                    }
                    transition={{
                      duration: reduceMotion ? 0.12 : 0.24,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu className="h-6 w-6 shrink-0" strokeWidth={2.35} aria-hidden />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </header>

      {mobileMenu}

      <div
        aria-hidden
        className="w-full shrink-0"
        style={{ height: HEADER_OFFSET }}
      />
    </>
  );
}
