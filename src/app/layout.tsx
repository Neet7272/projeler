import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ar-Ge İnovasyon ve Girişimcilik Kulübü",
    template: "%s | Ar-Ge İnovasyon Kulübü",
  },
  description: "Kulüp duyuruları ve takım kurma (matchmaking) platformu.",
  openGraph: {
    title: "Ar-Ge İnovasyon ve Girişimcilik Kulübü",
    description: "Kulüp duyuruları ve takım kurma (matchmaking) platformu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_520px_at_50%_-8%,rgba(6,182,212,0.08),transparent_58%),radial-gradient(800px_480px_at_90%_20%,rgba(14,165,233,0.06),transparent_55%)]" />
        <SessionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
