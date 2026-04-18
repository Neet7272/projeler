import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileSettingsClient } from "@/components/dashboard/ProfileSettingsClient";

export default async function ProfileSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login?next=/ayarlar/profil");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return <ProfileSettingsClient user={user} />;
}
