import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const title = "Duyurular";
const description = "Kulüp duyuruları, etkinlikler ve yarışmalar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/duyurular") },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl("/duyurular"),
    locale: "tr_TR",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function AnnouncementsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

