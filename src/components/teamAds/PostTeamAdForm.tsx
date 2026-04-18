"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createProject } from "@/actions/projectActions";
import { FadeUp } from "@/components/dashboard/FadeUp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";

const schema = z.object({
  title: z.string().min(6, "Başlık en az 6 karakter olmalı."),
  description: z.string().min(40, "Açıklama en az 40 karakter olmalı."),
  requiredSkills: z
    .array(z.string().min(1))
    .min(1, "En az 1 yetenek etiketi eklemelisin."),
  status: z.enum(["Idea", "Prototype", "Active Development"]),
});

type FormValues = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const suggested = [
  "Unity",
  "3D Modeling",
  "UI/UX",
  "Frontend",
  "React",
  "React Native",
  "Figma",
  "Python",
  "AI/ML",
] as const;

export function PostTeamAdForm() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormValues["status"]>("Idea");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [draftTag, setDraftTag] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<ToastState>({ open: false });

  const canAddTag = useMemo(() => {
    const t = draftTag.trim();
    if (!t) return false;
    return !requiredSkills.some((s) => s.toLowerCase() === t.toLowerCase());
  }, [draftTag, requiredSkills]);

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  function addTag(tag: string) {
    const t = tag.trim();
    if (!t) return;
    setRequiredSkills((prev) => {
      if (prev.some((p) => p.toLowerCase() === t.toLowerCase())) return prev;
      return [...prev, t];
    });
    setDraftTag("");
  }

  function removeTag(tag: string) {
    setRequiredSkills((prev) => prev.filter((t) => t !== tag));
  }

  function onSubmit() {
    if (pending) return;
    setErrors({});

    const values: FormValues = {
      title,
      description,
      requiredSkills,
      status,
    };

    const result = schema.safeParse(values);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setToast({
        open: true,
        title: "Eksik alanlar var",
        description: "Formu göndermeden önce hataları düzelt.",
      });
      return;
    }

    startTransition(async () => {
      const res = await createProject(result.data);
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
        title: "Gönderildi",
        description:
          "Projen moderasyon kuyruğunda. Onaylandıktan sonra vitrinde görünecek.",
      });
      window.setTimeout(() => {
        router.push("/proje-vitrini");
      }, 900);
    });
  }

  return (
    <div className="max-w-3xl">
      <FadeUp>
        <p className="text-sm font-medium text-[var(--muted)]">Takım</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Takım Kur
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Projeni net ve kısa anlat. Doğru etiketler, doğru ekip.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-4">
        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <label className="text-xs font-medium text-[var(--muted)]">Başlık</label>
          <div className="mt-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Teknofest Sürü İHA projesi için ekip arkadaşı"
            />
          </div>
          {errors.title ? (
            <p className="mt-2 text-xs text-rose-300">{errors.title}</p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <label className="text-xs font-medium text-[var(--muted)]">
            Açıklama
          </label>
          <div className="mt-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--foreground)]/90 placeholder:text-[var(--muted)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
              placeholder="Problemi, hedefi ve şu anki seviyeyi yaz. Kimleri arıyorsun?"
            />
          </div>
          {errors.description ? (
            <p className="mt-2 text-xs text-rose-300">{errors.description}</p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <p className="text-xs font-medium text-[var(--muted)]">
            Gerekli Yetenekler
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Etiketleri ekle/çıkar.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {requiredSkills.map((t) => (
                <motion.span
                  key={t}
                  layout
                  initial={
                    reduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, y: 6, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.98, y: 4, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  <span className="text-[var(--foreground)]/80">{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="rounded-full border border-[var(--hairline)] bg-black/0 px-2 py-0.5 text-[10px] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                    aria-label={`${t} etiketini kaldır`}
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="text-xs font-medium text-[var(--muted)]">
                Yeni etiket
              </label>
              <div className="mt-2">
                <Input
                  value={draftTag}
                  onChange={(e) => setDraftTag(e.target.value)}
                  placeholder="Örn: Frontend, Unity, UI/UX..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canAddTag) addTag(draftTag);
                  }}
                />
              </div>
            </div>
            <div className="pt-6 sm:pt-0">
              <Button
                variant="secondary"
                onClick={() => addTag(draftTag)}
                disabled={!canAddTag}
                className={!canAddTag ? "opacity-50" : undefined}
              >
                Ekle
              </Button>
            </div>
          </div>

          {errors.requiredSkills ? (
            <p className="mt-3 text-xs text-rose-300">{errors.requiredSkills}</p>
          ) : null}

          <div className="mt-6">
            <p className="text-xs font-medium text-[var(--muted)]">
              Önerilen etiketler
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggested.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => addTag(t)}
                  className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-left text-xs text-[var(--foreground)]/80 transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <label className="text-xs font-medium text-[var(--muted)]">
            Proje Durumu
          </label>
          <div className="mt-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as FormValues["status"])}
              className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-black/0 px-4 text-sm text-[var(--foreground)]/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="Active Development">Active Development</option>
            </select>
          </div>
          {errors.status ? (
            <p className="mt-2 text-xs text-rose-300">{errors.status}</p>
          ) : null}
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <Button href="/proje-vitrini" variant="secondary">
          Proje vitrini
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={pending}
          className={pending ? "opacity-90" : undefined}
        >
          {pending ? "Oluşturuluyor..." : "Proje Oluştur"}
        </Button>
      </div>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}
