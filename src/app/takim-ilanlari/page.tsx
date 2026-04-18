import { Suspense } from "react";
import type { Metadata } from "next";
import { TeamAdsMarketplace } from "@/components/teamAds/TeamAdsMarketplace";
import { getProjects } from "@/lib/projectQueries";

export const metadata: Metadata = {
  title: "Proje Vitrini",
  description: "Projeleri keşfet, filtrele ve takımlara katıl.",
  openGraph: {
    title: "Proje Vitrini",
    description: "Projeleri keşfet, filtrele ve takımlara katıl.",
    type: "website",
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

