import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SessionProvider } from "@/components/providers/SessionProvider";
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  SITE_KEYWORDS,
  getMetadataBase,
  buildRootOpenGraph,
  buildRootTwitter,
  organizationJsonLd,
} from "@/lib/seo";

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
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE_NAME, url: getMetadataBase().href }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: buildRootOpenGraph(),
  twitter: buildRootTwitter(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light",
};

const orgLd = organizationJsonLd();

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
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
