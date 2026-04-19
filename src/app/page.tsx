import { Hero } from "@/components/home/Hero";
import { LandingSections } from "@/components/home/LandingSections";
import { LandingMatchmakingFlow } from "@/components/home/LandingMatchmakingFlow";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

const title = "Ar-Ge İnovasyon Kulübü | Platform";
const description =
  "Duyurular, etkinlikler ve takım kurma marketplace’i. Premium minimal kulüp platformu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title,
    description,
    type: "website",
    url: absoluteUrl("/"),
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <LandingMatchmakingFlow />
      <LandingSections />
    </div>
  );
}
