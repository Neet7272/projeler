"use client";

import { usePathname } from "next/navigation";
import PostTeamAdPage from "@/app/(dashboard)/ilan-ver/page";
import { useAuthGate } from "@/lib/authGate";

export default function TeamBuildRedirectPage() {
  const pathname = usePathname();
  const gate = useAuthGate(pathname || "/takim-kur");

  if (!gate.requireMemberAndProfile()) return null;
  return <PostTeamAdPage />;
}

