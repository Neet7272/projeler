import { FadeUp } from "@/components/dashboard/FadeUp";
import { StatCard } from "@/components/dashboard/StatCard";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [pending, approved, announcements] = await Promise.all([
    prisma.project.count({ where: { moderationStatus: "PENDING" } }),
    prisma.project.count({ where: { moderationStatus: "APPROVED" } }),
    prisma.announcement.count(),
  ]);

  return (
    <div>
      <FadeUp>
        <p className="text-sm font-medium text-slate-500">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Minimal, hızlı, net. Moderasyon kuyruğunu temiz tut.
        </p>
      </FadeUp>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
        <StatCard label="Pending İlan" value={String(pending)} hint="Onay bekliyor" />
        <StatCard label="Approved İlan" value={String(approved)} hint="Marketplace’te görünür" />
        <StatCard label="Duyuru" value={String(announcements)} hint="Yayında" />
      </div>
    </div>
  );
}
