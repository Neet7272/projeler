import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

const protectedPrefixes = [
  "/dashboard",
  "/ayarlar",
  "/ilan-ver",
  "/takim-kur",
  "/admin",
];

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/auth/login") && req.auth) {
    const raw = req.nextUrl.searchParams.get("next");
    const target =
      raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
    return NextResponse.redirect(new URL(target, req.nextUrl.origin));
  }

  const isProtected = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!req.auth && isProtected) {
    const url = new URL("/auth/login", req.nextUrl.origin);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/auth/login",
    "/dashboard/:path*",
    "/ayarlar/:path*",
    "/ilan-ver",
    "/takim-kur",
    "/admin/:path*",
  ],
};
