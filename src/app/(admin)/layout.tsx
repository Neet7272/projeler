import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout(props: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login?next=/admin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.role !== "ADMIN") {
    notFound();
  }

  return (
    <AdminShell adminName={user.name}>{props.children}</AdminShell>
  );
}
