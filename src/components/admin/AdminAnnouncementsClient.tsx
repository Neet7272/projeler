"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import {
  type Announcement,
  type AnnouncementPriority,
} from "@/lib/mockAnnouncements";
import {
  prismaCategoryToUiLabel,
  type AnnouncementCategoryUiLabel,
} from "@/lib/announcementMappers";
import { CloudinaryImageField } from "@/components/media/CloudinaryImageField";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "@/actions/announcementActions";

const schema = z.object({
  title: z.string().min(6, "Başlık en az 6 karakter olmalı."),
  content: z.string().min(20, "İçerik en az 20 karakter olmalı."),
  coverImageUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Cover Image URL `http(s)://` ile başlamalı.",
    }),
  priority: z.enum(["High", "Normal", "Low"]),
  category: z.enum(["Yarışmalar", "Etkinlikler", "Kulüp etkinlikleri"]),
  externalApplyUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Başvuru URL’si `http(s)://` ile başlamalı.",
    }),
  externalApplyLabel: z.string().trim().max(80).optional(),
});

type Values = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Values, string>>;

function priorityDot(p: AnnouncementPriority) {
  if (p === "High") return "bg-rose-400";
  if (p === "Low") return "bg-white/30";
  return "bg-amber-300";
}

type Props = {
  initialItems: Announcement[];
};

export function AdminAnnouncementsClient({ initialItems }: Props) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [toast, setToast] = useState<ToastState>({ open: false });

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [priority, setPriority] = useState<AnnouncementPriority>("Normal");
  const [category, setCategory] =
    useState<AnnouncementCategoryUiLabel>("Kulüp etkinlikleri");
  const [externalApplyUrl, setExternalApplyUrl] = useState("");
  const [externalApplyLabel, setExternalApplyLabel] = useState("");

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  const values = useMemo<Values>(
    () => ({
      title,
      content,
      coverImageUrl: coverImageUrl.trim() || undefined,
      priority,
      category,
      externalApplyUrl: externalApplyUrl.trim() || undefined,
      externalApplyLabel: externalApplyLabel.trim() || undefined,
    }),
    [title, content, coverImageUrl, priority, category, externalApplyUrl, externalApplyLabel]
  );

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setErrors({});
    setTitle("");
    setContent("");
    setCoverImageUrl("");
    setPriority("Normal");
    setCategory("Kulüp etkinlikleri");
    setExternalApplyUrl("");
    setExternalApplyLabel("");
    setOpen(true);
  }

  function openEdit(a: Announcement) {
    setMode("edit");
    setEditingId(a.id);
    setErrors({});
    setTitle(a.title);
    setContent(a.content);
    setCoverImageUrl(a.coverImageUrl ?? "");
    setPriority(a.priority);
    setCategory(prismaCategoryToUiLabel(a.category));
    setExternalApplyUrl(a.externalApplyUrl ?? "");
    setExternalApplyLabel(a.externalApplyLabel ?? "");
    setOpen(true);
  }

  async function submit() {
    if (saving) return;
    setErrors({});

    const result = schema.safeParse(values);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Values | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSaving(true);

    if (mode === "create") {
      const res = await createAnnouncement(result.data);
      setSaving(false);
      if (!res.ok) {
        setToast({
          open: true,
          title: "Hata",
          description: res.error,
        });
        return;
      }
    } else if (editingId) {
      const res = await updateAnnouncement(editingId, result.data);
      setSaving(false);
      if (!res.ok) {
        setToast({
          open: true,
          title: "Hata",
          description: res.error,
        });
        return;
      }
    } else {
      setSaving(false);
      return;
    }

    setOpen(false);
    setTitle("");
    setContent("");
    setCoverImageUrl("");
    setPriority("Normal");
    setCategory("Kulüp etkinlikleri");
    setExternalApplyUrl("");
    setExternalApplyLabel("");
    setToast({
      open: true,
      title: mode === "create" ? "Duyuru oluşturuldu" : "Duyuru güncellendi",
      description: "Kayıt veritabanına yazıldı.",
    });
    router.refresh();
  }

  async function confirmDelete(id: string) {
    if (saving) return;
    setSaving(true);
    const res = await deleteAnnouncement(id);
    setSaving(false);
    if (!res.ok) {
      setToast({
        open: true,
        title: "Hata",
        description: res.error,
      });
      return;
    }
    setConfirmDeleteId(null);
    setToast({
      open: true,
      title: "Silindi",
      description: "Duyuru kaldırıldı.",
    });
    router.refresh();
  }

  const panelClass = cn(
    "border border-[var(--hairline)] bg-[var(--background)]",
    isMobile
      ? "absolute inset-x-0 bottom-0 rounded-t-3xl"
      : "w-[min(92vw,560px)] rounded-3xl"
  );

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Duyurular
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Duyuruları yönet. Öncelik seviyesi minimal ama net.
          </p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          Create Announcement
        </Button>
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-2 sm:mt-12">
        <ul className="divide-y divide-[var(--hairline)]">
          {initialItems.map((a) => (
            <li key={a.id} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  {a.coverImageUrl ? (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
                      <div className="relative h-36 w-full">
                        <Image
                          src={a.coverImageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        priorityDot(a.priority)
                      )}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {a.title}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {a.content}
                  </p>
                  <p className="mt-3 text-xs text-[var(--muted)]">
                    {prismaCategoryToUiLabel(a.category)} • {a.createdAt} •{" "}
                    {a.id}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => openEdit(a)}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setConfirmDeleteId(a.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
              aria-label="Modalı kapat"
            />

            <motion.div
              className={panelClass}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : isMobile
                    ? { y: "100%" }
                    : { opacity: 0, y: 10, filter: "blur(6px)" }
              }
              animate={
                isMobile
                  ? { y: 0 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : isMobile
                    ? { y: "100%" }
                    : { opacity: 0, y: 8, filter: "blur(6px)" }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] px-6 py-5">
                <div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Duyuru
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                    {mode === "create" ? "Yeni duyuru oluştur" : "Duyuruyu düzenle"}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                  onClick={() => setOpen(false)}
                >
                  Kapat
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      Başlık
                    </label>
                    <div className="mt-2">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Örn: Hackathon Başlıyor"
                      />
                    </div>
                    {errors.title ? (
                      <p className="mt-2 text-xs text-rose-300">{errors.title}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      İçerik
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        className="w-full resize-none rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--foreground)]/90 placeholder:text-[var(--muted)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                        placeholder="Net ve kısa bir açıklama yaz."
                      />
                    </div>
                    {errors.content ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.content}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      Kategori
                    </label>
                    <div className="mt-2">
                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(
                            e.target.value as AnnouncementCategoryUiLabel
                          )
                        }
                        className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-black/0 px-4 text-sm text-[var(--foreground)]/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                      >
                        <option value="Yarışmalar">Yarışmalar</option>
                        <option value="Etkinlikler">Etkinlikler</option>
                        <option value="Kulüp etkinlikleri">
                          Kulüp etkinlikleri
                        </option>
                      </select>
                    </div>
                    {errors.category ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.category}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      Dış başvuru URL (opsiyonel)
                    </label>
                    <div className="mt-2">
                      <Input
                        value={externalApplyUrl}
                        onChange={(e) => setExternalApplyUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    {errors.externalApplyUrl ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.externalApplyUrl}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      Başvuru butonu metni (opsiyonel)
                    </label>
                    <div className="mt-2">
                      <Input
                        value={externalApplyLabel}
                        onChange={(e) => setExternalApplyLabel(e.target.value)}
                        placeholder="Örn: Resmi başvuruya git"
                      />
                    </div>
                    {errors.externalApplyLabel ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.externalApplyLabel}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <CloudinaryImageField
                      label="Kapak görseli (opsiyonel)"
                      value={coverImageUrl}
                      onChange={setCoverImageUrl}
                      helperText="Cloudinary ile yükle veya URL yapıştır. Boş bırakılabilir."
                    />
                    {errors.coverImageUrl ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.coverImageUrl}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--muted)]">
                      Öncelik
                    </label>
                    <div className="mt-2">
                      <select
                        value={priority}
                        onChange={(e) =>
                          setPriority(e.target.value as AnnouncementPriority)
                        }
                        className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-black/0 px-4 text-sm text-[var(--foreground)]/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                      >
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    {errors.priority ? (
                      <p className="mt-2 text-xs text-rose-300">
                        {errors.priority}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    Vazgeç
                  </Button>
                  <Button
                    variant="primary"
                    onClick={submit}
                    disabled={saving}
                    className={saving ? "opacity-90" : undefined}
                  >
                    {saving ? "Kaydediliyor..." : mode === "create" ? "Oluştur" : "Kaydet"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDeleteId ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
              onClick={() => setConfirmDeleteId(null)}
              aria-label="Onayı kapat"
            />

            <motion.div
              className={panelClass}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : isMobile
                    ? { y: "100%" }
                    : { opacity: 0, y: 10, filter: "blur(6px)" }
              }
              animate={
                isMobile
                  ? { y: 0 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : isMobile
                    ? { y: "100%" }
                    : { opacity: 0, y: 8, filter: "blur(6px)" }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] px-6 py-5">
                <div>
                  <p className="text-xs font-medium text-[var(--muted)]">Onay</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                    Silmek istediğine emin misin?
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Kapat
                </button>
              </div>

              <div className="px-6 py-6">
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Bu işlem geri alınamaz.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    Vazgeç
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => confirmDelete(confirmDeleteId)}
                    disabled={saving}
                    className={saving ? "opacity-90" : undefined}
                  >
                    {saving ? "Siliniyor..." : "Evet, sil"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}
