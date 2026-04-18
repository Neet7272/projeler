import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?next=/dashboard");
  }

  return (
    <DashboardShell memberName={session.user.name ?? "Üye"}>
      {props.children}
    </DashboardShell>
  );
}
