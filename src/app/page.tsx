import { Hero } from "@/components/home/Hero";
import { LandingSections } from "@/components/home/LandingSections";
import { MatchmakingHowItWorks } from "@/components/home/MatchmakingHowItWorks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ar-Ge İnovasyon Kulübü | Platform",
  description:
    "Duyurular, etkinlikler ve takım kurma marketplace’i. Premium minimal kulüp platformu.",
  openGraph: {
    title: "Ar-Ge İnovasyon Kulübü | Platform",
    description:
      "Duyurular, etkinlikler ve takım kurma marketplace’i. Premium minimal kulüp platformu.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <MatchmakingHowItWorks />
      <LandingSections />
    </div>
  );
}
