import type { Metadata } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
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
      className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_640px_at_50%_-12%,rgba(6,182,212,0.09),transparent_55%),radial-gradient(900px_520px_at_100%_0%,rgba(14,165,233,0.07),transparent_45%),radial-gradient(700px_480px_at_0%_30%,rgba(99,102,241,0.05),transparent_50%),linear-gradient(180deg,rgb(250,250,252)_0%,var(--background)_45%,rgb(248,250,252)_100%)]"
          aria-hidden
        />
        <SessionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
