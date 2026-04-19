"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import type { User } from "@prisma/client";
import { FadeUp } from "@/components/dashboard/FadeUp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { CloudinaryImageField } from "@/components/media/CloudinaryImageField";
import { updateUserProfile } from "@/actions/userActions";
import { cn } from "@/lib/cn";
import { cardMatte } from "@/lib/uiClasses";

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
  const [profileImage, setProfileImage] = useState(user.image ?? "");

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
      image: profileImage,
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
        <p className="text-sm font-medium text-slate-500">Ayarlar</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Profil
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Yeteneklerin ve portfolyo linklerin hesabına kaydedilir.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-4">
        <section className={cn("p-6", cardMatte)}>
          <p className="text-sm font-medium text-slate-500">Profil fotoğrafı</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Cloudinary ile yükle; oturum ve vitrin görünürlüğünde kullanılır.
          </p>
          <div className="mt-4 max-w-md">
            <CloudinaryImageField
              label="Profil görseli"
              value={profileImage}
              onChange={setProfileImage}
              aspectClassName="aspect-square max-h-48"
            />
          </div>
        </section>

        <section className={cn("p-6", cardMatte)}>
          <p className="text-sm font-medium text-slate-500">Kimlik</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-500">
                Ad Soyad
              </label>
              <div className="mt-2 rounded-xl border border-slate-200/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800">
                {user.name}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                E-posta
              </label>
              <div className="mt-2 rounded-xl border border-slate-200/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800">
                {user.email}
              </div>
            </div>
          </div>
        </section>

        <section className={cn("p-6", cardMatte)}>
          <p className="text-sm font-medium text-slate-500">
            Yetenek Etiketleri
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
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
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
                >
                  <span className="font-medium text-slate-800">{t}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(t)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
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
              <label className="text-xs font-medium text-slate-500">
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
            <p className="text-xs font-medium text-slate-500">
              Önerilen etiketler
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedTags.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => addSkill(t)}
                  className="inline-flex min-h-11 items-center rounded-full bg-slate-100 px-4 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={cn("p-6", cardMatte)}>
          <p className="text-sm font-medium text-slate-500">Portfolyo</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-500">
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
              <label className="text-xs font-medium text-slate-500">
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
              <label className="text-xs font-medium text-slate-500">
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
              <label className="text-xs font-medium text-slate-500">
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
