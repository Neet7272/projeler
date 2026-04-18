import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
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
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_50%_-10%,rgba(255,255,255,0.10),transparent_60%)] dark:bg-[radial-gradient(1000px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
        <SessionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </SessionProvider>
        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto w-full max-w-6xl px-6 text-sm text-white/60">
            © {new Date().getFullYear()} Ar-Ge İnovasyon ve Girişimcilik Kulübü
          </div>
        </footer>
      </body>
    </html>
  );
}
