"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { submitApplication } from "@/actions/applicationActions";

const schema = z.object({
  message: z.string().min(30, "En az 30 karakter yazmalısın."),
  portfolioUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 0 || /^https?:\/\//i.test(v), {
      message: "Link `http(s)://` ile başlamalı.",
    }),
});

type Values = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Values, string>>;

export function ApplicationModal(props: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  adTitle: string;
  projectId: string;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [message, setMessage] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const values = useMemo(
    () => ({ message, portfolioUrl: portfolioUrl.trim() || undefined }),
    [message, portfolioUrl]
  );

  async function submit() {
    if (submitting) return;
    setErrors({});
    setApiError(null);

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

    setSubmitting(true);
    const res = await submitApplication({
      projectId: props.projectId,
      coverLetter: result.data.message,
      portfolioLink: result.data.portfolioUrl,
    });
    setSubmitting(false);

    if (!res.ok) {
      setApiError(res.error);
      return;
    }

    props.onClose();
    props.onSuccess();
    setMessage("");
    setPortfolioUrl("");
  }

  const panelClass = cn(
    "border border-[var(--hairline)] bg-[var(--background)]",
    isMobile
      ? "absolute inset-x-0 bottom-0 rounded-t-3xl"
      : "w-[min(92vw,520px)] rounded-3xl"
  );

  return (
    <AnimatePresence>
      {props.open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={props.onClose}
            aria-label="Başvuru penceresini kapat"
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
                  Ekibe Katıl
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                  {props.adTitle}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                onClick={props.onClose}
              >
                Kapat
              </button>
            </div>

            <div className="px-6 py-6">
              <label className="text-xs font-medium text-[var(--muted)]">
                Kendinden bahset
              </label>
              <div className="mt-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3 text-sm text-[var(--foreground)]/90 placeholder:text-[var(--muted)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                  placeholder="Bu projeye neden uygunsun? Hangi katkıları yapabilirsin?"
                />
              </div>
              {errors.message ? (
                <p className="mt-2 text-xs text-rose-300">{errors.message}</p>
              ) : null}

              <div className="mt-5">
                <label className="text-xs font-medium text-[var(--muted)]">
                  Portfolyo linki (opsiyonel)
                </label>
                <div className="mt-2">
                  <Input
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                {errors.portfolioUrl ? (
                  <p className="mt-2 text-xs text-rose-300">
                    {errors.portfolioUrl}
                  </p>
                ) : null}
              </div>

              {apiError ? (
                <p className="mt-4 text-xs text-rose-300">{apiError}</p>
              ) : null}

              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={props.onClose}>
                  Vazgeç
                </Button>
                <Button
                  variant="primary"
                  onClick={submit}
                  disabled={submitting}
                  className={submitting ? "opacity-90" : undefined}
                >
                  {submitting ? "Gönderiliyor..." : "Katılma Talebi Gönder"}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

