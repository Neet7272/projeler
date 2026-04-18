"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/EmptyState";
import { updateProjectStatus } from "@/actions/adminActions";
import type { TeamAd } from "@/lib/mockAds";

type ModerationView = TeamAd["moderationState"];

type Buckets = Record<ModerationView, TeamAd[]>;

type Props = {
  initial: Buckets;
};

export function ModerationQueueClient({ initial }: Props) {
  const router = useRouter();
  const [view, setView] = useState<ModerationView>("Pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ open: false });

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  const rows = useMemo(() => {
    return initial[view].map(
      (a): {
        id: string;
        title: string;
        status: string;
        owner: string;
        tags: string[];
        moderationState: TeamAd["moderationState"];
      } => ({
        id: a.id,
        title: a.title,
        status: a.status,
        owner: a.owner.name,
        tags: a.tags,
        moderationState: a.moderationState,
      })
    );
  }, [initial, view]);

  async function act(id: string, action: "approve" | "reject") {
    if (busyId) return;
    setBusyId(id);
    const res = await updateProjectStatus(
      id,
      action === "approve" ? "APPROVED" : "REJECTED"
    );
    setBusyId(null);

    if (!res.ok) {
      setToast({
        open: true,
        title: "Hata",
        description: res.error,
      });
      return;
    }

    setToast({
      open: true,
      title: action === "approve" ? "Onaylandı" : "Reddedildi",
      description: "Durum veritabanında güncellendi.",
    });
    router.refresh();
  }

  return (
    <div>
      <p className="text-sm font-medium text-[var(--muted)]">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        Moderasyon
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Marketplace’e çıkmadan önce ilanları net kriterlerle onayla.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["Pending", "Approved", "Rejected"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={
              "rounded-full border border-[var(--hairline)] px-4 py-2 text-sm transition-colors " +
              (view === v
                ? "bg-[var(--surface)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]")
            }
          >
            {v}
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-2 sm:mt-12">
        {rows.length === 0 ? (
          <EmptyState
            title="İlan yok"
            description={`${view} durumunda ilan bulunmuyor.`}
            actionLabel={view !== "Pending" ? "Pending'e dön" : undefined}
            onAction={view !== "Pending" ? () => setView("Pending") : undefined}
          />
        ) : (
          <ul className="divide-y divide-[var(--hairline)]">
            {rows.map((r) => (
              <li key={r.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {r.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                      <span className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1">
                        {r.status}
                      </span>
                      <span className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1">
                        {r.owner}
                      </span>
                      <span className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1">
                        {r.id}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-xs text-[var(--muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      onClick={() => act(r.id, "approve")}
                      disabled={busyId === r.id || r.moderationState !== "Pending"}
                      className={busyId === r.id ? "opacity-90" : undefined}
                    >
                      {busyId === r.id ? "Onaylanıyor..." : "Approve"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => act(r.id, "reject")}
                      disabled={busyId === r.id || r.moderationState !== "Pending"}
                      className={busyId === r.id ? "opacity-90" : undefined}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}
