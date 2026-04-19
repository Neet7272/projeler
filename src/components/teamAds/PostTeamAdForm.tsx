"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createProject } from "@/actions/projectActions";
import { createProjectSchema } from "@/lib/projectCreateSchema";
import { FadeUp } from "@/components/dashboard/FadeUp";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { cardMatte } from "@/lib/uiClasses";

const suggestedSkills = [
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

const suggestedRoles = [
  "Embedded",
  "Backend",
  "Frontend",
  "UI/UX",
  "Araştırma",
  "Sunum",
  "Proje yönetimi",
] as const;

type FieldErrors = Partial<Record<string, string>>;

function TagBlock(props: {
  label: string;
  hint: string;
  tags: string[];
  draft: string;
  setDraft: (v: string) => void;
  onAdd: (t: string) => void;
  onRemove: (t: string) => void;
  suggested: readonly string[];
  error?: string;
  addLabel: string;
  placeholder: string;
}) {
  const reduceMotion = useReducedMotion();
  const canAdd = useMemo(() => {
    const t = props.draft.trim();
    if (!t) return false;
    return !props.tags.some((s) => s.toLowerCase() === t.toLowerCase());
  }, [props.draft, props.tags]);

  return (
    <section className={cn("p-6", cardMatte)}>
      <p className="text-xs font-medium text-slate-500">{props.label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{props.hint}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {props.tags.map((t) => (
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
                onClick={() => props.onRemove(t)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                aria-label={`${t} kaldır`}
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
            {props.addLabel}
          </label>
          <div className="mt-2">
            <Input
              value={props.draft}
              onChange={(e) => props.setDraft(e.target.value)}
              placeholder={props.placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canAdd) props.onAdd(props.draft);
              }}
            />
          </div>
        </div>
        <div className="pt-6 sm:pt-0">
          <Button
            variant="secondary"
            onClick={() => props.onAdd(props.draft)}
            disabled={!canAdd}
            className={!canAdd ? "opacity-50" : undefined}
          >
            Ekle
          </Button>
        </div>
      </div>

      {props.error ? (
        <p className="mt-3 text-xs text-rose-600">{props.error}</p>
      ) : null}

      <div className="mt-6">
        <p className="text-xs font-medium text-slate-500">Öneriler</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {props.suggested.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => props.onAdd(t)}
              className="inline-flex min-h-11 items-center rounded-full bg-slate-100 px-4 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PostTeamAdForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "Idea" | "Prototype" | "Active Development"
  >("Idea");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [draftSkill, setDraftSkill] = useState("");
  const [draftRole, setDraftRole] = useState("");

  const [tagline, setTagline] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [collaborationNotes, setCollaborationNotes] = useState("");
  const [linkFigma, setLinkFigma] = useState("");
  const [linkNotion, setLinkNotion] = useState("");
  const [linkRepo, setLinkRepo] = useState("");
  const [linkCompetition, setLinkCompetition] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<ToastState>({ open: false });

  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false }), 2400);
    return () => clearTimeout(t);
  }, [toast.open]);

  function addSkill(tag: string) {
    const t = tag.trim();
    if (!t) return;
    setRequiredSkills((prev) => {
      if (prev.some((p) => p.toLowerCase() === t.toLowerCase())) return prev;
      return [...prev, t];
    });
    setDraftSkill("");
  }

  function addRole(tag: string) {
    const t = tag.trim();
    if (!t) return;
    setLookingFor((prev) => {
      if (prev.some((p) => p.toLowerCase() === t.toLowerCase())) return prev;
      return [...prev, t];
    });
    setDraftRole("");
  }

  function onSubmit() {
    if (pending) return;
    setErrors({});

    const hasLinks =
      [linkFigma, linkNotion, linkRepo, linkCompetition].some(
        (s) => s.trim().length > 0,
      );

    const payload = {
      title,
      description,
      requiredSkills,
      lookingFor,
      status,
      tagline: tagline.trim() || undefined,
      deliverables: deliverables.trim() || undefined,
      timeCommitment: timeCommitment.trim() || undefined,
      collaborationNotes: collaborationNotes.trim() || undefined,
      links: hasLinks
        ? {
            figma: linkFigma.trim() || undefined,
            notion: linkNotion.trim() || undefined,
            repository: linkRepo.trim() || undefined,
            competition: linkCompetition.trim() || undefined,
          }
        : undefined,
    };

    const result = createProjectSchema.safeParse(payload);
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!next[path]) next[path] = issue.message;
      }
      setErrors(next);
      setToast({
        open: true,
        title: "Eksik veya hatalı alanlar",
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
          "Projeleriniz 24 saat içinde incelenip onaylanacaktır. Onaylandıktan sonra vitrinde görünecek.",
      });
      window.setTimeout(() => {
        router.push("/proje-vitrini");
      }, 900);
    });
  }

  return (
    <div className="max-w-3xl">
      <FadeUp>
        <p className="text-sm font-medium text-slate-500">Takım</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Takım Kur
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Zorunlu alanlar vitrinde görünür. İstersen aşağıda ek plan, zaman ve
          bağlantılarla ilanı güçlendir.
        </p>
      </FadeUp>

      <div className="mt-10 space-y-4">
        <section className={cn("p-6", cardMatte)}>
          <label className="text-xs font-medium text-slate-500">Başlık</label>
          <div className="mt-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Teknofest Sürü İHA projesi için ekip arkadaşı"
            />
          </div>
          {errors.title ? (
            <p className="mt-2 text-xs text-rose-600">{errors.title}</p>
          ) : null}
        </section>

        <section className={cn("p-6", cardMatte)}>
          <label className="text-xs font-medium text-slate-500">
            Açıklama
          </label>
          <div className="mt-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              placeholder="Problemi, hedefi ve şu anki seviyeyi yaz. Kimleri arıyorsun?"
            />
          </div>
          {errors.description ? (
            <p className="mt-2 text-xs text-rose-600">{errors.description}</p>
          ) : null}
        </section>

        <TagBlock
          label="Teknoloji / konu etiketleri"
          hint="Vitrin kartlarında görünür; arama ve filtre için kullanılır."
          tags={requiredSkills}
          draft={draftSkill}
          setDraft={setDraftSkill}
          onAdd={addSkill}
          onRemove={(t) =>
            setRequiredSkills((prev) => prev.filter((x) => x !== t))
          }
          suggested={suggestedSkills}
          error={errors.requiredSkills}
          addLabel="Yeni etiket"
          placeholder="Örn: Frontend, Unity, ROS2…"
        />

        <TagBlock
          label="Aranan roller (isteğe bağlı)"
          hint="Boş bırakılabilir. Örn: Embedded, sunum, ürün yönetimi."
          tags={lookingFor}
          draft={draftRole}
          setDraft={setDraftRole}
          onAdd={addRole}
          onRemove={(t) => setLookingFor((prev) => prev.filter((x) => x !== t))}
          suggested={suggestedRoles}
          error={errors.lookingFor}
          addLabel="Rol ekle"
          placeholder="Örn: Computer Vision, UI/UX…"
        />

        <section className={cn("p-6", cardMatte)}>
          <label className="text-xs font-medium text-slate-500">
            Proje durumu
          </label>
          <div className="mt-2">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as typeof status)
              }
              className="h-11 min-h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="Active Development">Active Development</option>
            </select>
          </div>
          {errors.status ? (
            <p className="mt-2 text-xs text-rose-600">{errors.status}</p>
          ) : null}
        </section>

        <details
          className={cn(
            cardMatte,
            "group overflow-hidden p-0 open:shadow-[var(--shadow-matte-hover)]",
          )}
        >
          <summary className="cursor-pointer list-none px-6 py-4 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-3">
              <span>İsteğe bağlı: daha fazla detay ve bağlantılar</span>
              <span className="text-xs font-medium text-cyan-700 transition-transform group-open:rotate-180">
                ▾
              </span>
            </span>
            <span className="mt-1 block text-xs font-normal text-slate-500">
              Tek satır özet, teslimatlar, zaman taahhüdü, çalışma şekli; Figma,
              Notion, repo ve yarışma linkleri.
            </span>
          </summary>
          <div className="space-y-4 border-t border-slate-200/60 px-6 py-5">
            <div>
              <label className="text-xs font-medium text-slate-500">
                Kısa özet (kart alt satırı)
              </label>
              <div className="mt-2">
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Örn: Sürü İHA için yer istasyonu ve saha testi ekibi."
                  maxLength={200}
                />
              </div>
              {errors.tagline ? (
                <p className="mt-2 text-xs text-rose-600">{errors.tagline}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                Teslimatlar / kapsam
              </label>
              <textarea
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                rows={4}
                maxLength={5000}
                className="mt-2 w-full resize-y rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                placeholder="MVP, doküman, demo, test senaryosu… Ne teslim edilecek?"
              />
              {errors.deliverables ? (
                <p className="mt-2 text-xs text-rose-600">
                  {errors.deliverables}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                Zaman taahhüdü
              </label>
              <div className="mt-2">
                <Input
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                  placeholder="Örn: Haftada 5–8 saat, Çarşamba akşamı senkron."
                  maxLength={160}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">
                Çalışma biçimi
              </label>
              <textarea
                value={collaborationNotes}
                onChange={(e) => setCollaborationNotes(e.target.value)}
                rows={3}
                maxLength={2000}
                className="mt-2 w-full resize-y rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                placeholder="Discord, hibrit buluşma, dil tercihi…"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Figma
                </label>
                <div className="mt-2">
                  <Input
                    value={linkFigma}
                    onChange={(e) => setLinkFigma(e.target.value)}
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Notion
                </label>
                <div className="mt-2">
                  <Input
                    value={linkNotion}
                    onChange={(e) => setLinkNotion(e.target.value)}
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Repo
                </label>
                <div className="mt-2">
                  <Input
                    value={linkRepo}
                    onChange={(e) => setLinkRepo(e.target.value)}
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Yarışma / resmî link
                </label>
                <div className="mt-2">
                  <Input
                    value={linkCompetition}
                    onChange={(e) => setLinkCompetition(e.target.value)}
                    placeholder="https://…"
                  />
                </div>
              </div>
            </div>
            {(errors["links.figma"] ||
              errors["links.notion"] ||
              errors["links.repository"] ||
              errors["links.competition"]) && (
              <p className="text-xs text-rose-600">
                {errors["links.figma"] ||
                  errors["links.notion"] ||
                  errors["links.repository"] ||
                  errors["links.competition"]}
              </p>
            )}
          </div>
        </details>
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
