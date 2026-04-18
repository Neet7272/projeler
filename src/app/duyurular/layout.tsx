import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Kulüp duyuruları, etkinlikler ve yarışmalar.",
  openGraph: {
    title: "Duyurular",
    description: "Kulüp duyuruları, etkinlikler ve yarışmalar.",
    type: "website",
  },
};

export default function AnnouncementsLayout(props: { children: React.ReactNode }) {
  return props.children;
}

