"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import type { User } from "@prisma/client";
import { FadeUp } from "@/components/dashboard/FadeUp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { updateUserProfile } from "@/actions/userActions";

const suggestedTags = [
  "Unity",
  "3D Modeling",
  "UI/UX",
  "React",
  "TypeScript",
  "Python",
] as const;

function parsePortfolioUrls(raw: User["portfolioUrls"]) {
  const p =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  return {
    github: typeof p.github === "string" ? p.github : "",
    linkedin: typeof p.linkedin === "string" ? p.linkedin : "",
    website: typeof p.website === "string" ? p.website : "",
    behance: typeof p.behance === "string" ? p.behance : "",
  };
}

type Props = {
  user: User;
};

export function ProfileSettingsClient({ user }: Props) {
  const { update } = useSession();
  const reduceMotion = useReducedMotion();

  const initialPortfolio = useMemo(
    () => parsePortfolioUrls(user.portfolioUrls),
    [user.portfolioUrls]
  );

  const [skills, setSkills] = useState<string[]>(user.skills);
  const [draftTag, setDraftTag] = useState("");

  const [github, setGithub] = useState(initialPortfolio.github);
  const [linkedin, setLinkedin] = useState(initialPortfolio.linkedin);
  const [website, setWebsite] = useState(initialPortfolio.website);
  const [behance, setBehance] = useState(initialPortfolio.behance);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false });

  const canAddTag = useMemo(() => {
    const t = draftTag.trim();
    if (!t) return false;
    return !skills.some((s) => s.toLowerCase() === t.toLowerCase());
  }, [draftTag, skills]);

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  function removeSkill(tag: string) {
    setSkills((prev) => prev.filter((t) => t !== tag));
  }

  function addSkill(tag: string) {
    const t = tag.trim();
    if (!t) return;
    setSkills((prev) => {
      if (prev.some((p) => p.toLowerCase() === t.toLowerCase())) return prev;
      return [...prev, t];
    });
    setDraftTag("");
  }

  async function onSave() {
    if (saving) return;
    setSaving(true);
    const res = await updateUserProfile({
      skills,
      portfolio: { github, linkedin, website, behance },
    });
    setSaving(false);

    if (!res.ok) {
      setToast({
        open: true,
        title: "Hata",
        description: res.error,
      });
      return;
    }

    await update();
    setToast({
      open: true,
      title: "Kaydedildi",
      description: "Profilin veritabanına yazıldı.",
    });
  }

  return (
    <div className="max-w-3xl">
      <FadeUp>
        <p className="text-sm font-medium text-[var(--muted)]">Ayarlar</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Profil
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Yeteneklerin ve portfolyo linklerin hesabına kaydedilir.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-4">
        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">Kimlik</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                Ad Soyad
              </label>
              <div className="mt-2 rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--foreground)]/90">
                {user.name}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                E-posta
              </label>
              <div className="mt-2 rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--foreground)]/90">
                {user.email}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">
            Yetenek Etiketleri
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Etiketleri ekle veya çıkar.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {skills.map((t) => (
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
                    onClick={() => removeSkill(t)}
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
                  placeholder="Örn: Unity, 3D Modeling..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canAddTag) addSkill(draftTag);
                  }}
                />
              </div>
            </div>
            <div className="pt-6 sm:pt-0">
              <Button
                variant="secondary"
                onClick={() => addSkill(draftTag)}
                disabled={!canAddTag}
                className={!canAddTag ? "opacity-50" : undefined}
              >
                Ekle
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium text-[var(--muted)]">
              Önerilen etiketler
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedTags.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => addSkill(t)}
                  className="rounded-full border border-[var(--hairline)] bg-black/0 px-3 py-1 text-left text-xs text-[var(--foreground)]/80 transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
          <p className="text-sm font-medium text-[var(--muted)]">Portfolyo</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                GitHub
              </label>
              <div className="mt-2">
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                LinkedIn
              </label>
              <div className="mt-2">
                <Input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                Website
              </label>
              <div className="mt-2">
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted)]">
                Behance
              </label>
              <div className="mt-2">
                <Input
                  value={behance}
                  onChange={(e) => setBehance(e.target.value)}
                  placeholder="https://behance.net/..."
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <Button href="/dashboard" variant="secondary">
          Dashboard
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={saving}
          className={saving ? "opacity-90" : undefined}
        >
          {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>

      <Toast state={toast} onClose={() => setToast({ open: false })} />
    </div>
  );
}
