import { z } from "zod";

const optionalHttpUrl = z
  .string()
  .max(600)
  .optional()
  .transform((s) => {
    const t = s?.trim();
    return t && t.length > 0 ? t : undefined;
  })
  .refine(
    (v) => {
      if (v === undefined) return true;
      try {
        const u = new URL(v);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Geçerli bir http(s) adresi gir." },
  );

const optionalLinks = z
  .object({
    figma: optionalHttpUrl,
    notion: optionalHttpUrl,
    repository: optionalHttpUrl,
    competition: optionalHttpUrl,
  })
  .optional();

/** İstemci + sunucu — `createProject` ile aynı kurallar */
export const createProjectSchema = z.object({
  title: z.string().min(6).max(160),
  description: z.string().min(40).max(12000),
  requiredSkills: z
    .array(z.string().min(1).max(48))
    .min(1)
    .max(24),
  lookingFor: z.array(z.string().min(1).max(56)).max(16).default([]),
  status: z.enum(["Idea", "Prototype", "Active Development"]),
  tagline: z
    .string()
    .max(200)
    .optional()
    .transform((s) => (s?.trim() ? s.trim().slice(0, 200) : undefined)),
  deliverables: z
    .string()
    .max(5000)
    .optional()
    .transform((s) => (s?.trim() ? s.trim().slice(0, 5000) : undefined)),
  timeCommitment: z
    .string()
    .max(160)
    .optional()
    .transform((s) => (s?.trim() ? s.trim().slice(0, 160) : undefined)),
  collaborationNotes: z
    .string()
    .max(2000)
    .optional()
    .transform((s) => (s?.trim() ? s.trim().slice(0, 2000) : undefined)),
  links: optionalLinks,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export function buildProjectExternalUrls(data: CreateProjectInput): Record<string, unknown> {
  const urls: Record<string, unknown> = {
    lookingFor: data.lookingFor,
  };
  if (data.tagline) urls.tagline = data.tagline;
  if (data.deliverables) urls.deliverables = data.deliverables;
  if (data.timeCommitment) urls.timeCommitment = data.timeCommitment;
  if (data.collaborationNotes) urls.collaborationNotes = data.collaborationNotes;
  const L = data.links;
  if (L?.figma) urls.figma = L.figma;
  if (L?.notion) urls.notion = L.notion;
  if (L?.repository) urls.repository = L.repository;
  if (L?.competition) urls.competition = L.competition;
  return urls;
}
