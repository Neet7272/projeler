import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({ where: { id: session.user.id } });
}

/** Oturum + DB tutarlılığı; üye veya admin. Bkz. `serverActionSecurity.ts`. */
export async function requireAuthedMemberUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return null;
  if (user.role !== "MEMBER" && user.role !== "ADMIN") return null;
  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}
