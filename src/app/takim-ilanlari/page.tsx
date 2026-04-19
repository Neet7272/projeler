import { Suspense } from "react";
import type { Metadata } from "next";
import { TeamAdsMarketplace } from "@/components/teamAds/TeamAdsMarketplace";
import { getProjects } from "@/lib/projectQueries";
import { absoluteUrl } from "@/lib/seo";

const canonical = absoluteUrl("/proje-vitrini");

export const metadata: Metadata = {
  title: "Proje Vitrini",
  description: "Projeleri keşfet, filtrele ve takımlara katıl.",
  alternates: { canonical },
  openGraph: {
    title: "Proje Vitrini",
    description: "Projeleri keşfet, filtrele ve takımlara katıl.",
    type: "website",
    url: canonical,
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proje Vitrini",
    description: "Projeleri keşfet, filtrele ve takımlara katıl.",
  },
};

export default async function TeamAdsPage() {
  const projects = await getProjects();

  return (
    <Suspense>
      <TeamAdsMarketplace projects={projects} />
    </Suspense>
  );
}

