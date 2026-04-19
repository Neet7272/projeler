import type {
  ModerationStatus,
  ProjectStatus,
  User,
  Project,
} from "@prisma/client";
import type { ExternalLinks, MockOwnerProfile, TeamAd } from "@/lib/mockAds";

export type ProjectWithOwner = Project & { owner: User };

type PortfolioJson = {
  headline?: string;
  department?: string;
  year?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  behance?: string;
};

function optStr(
  o: Record<string, unknown>,
  key: string,
  maxLen: number,
): string | undefined {
  const v = o[key];
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.length > maxLen ? t.slice(0, maxLen) : t;
}

/** `Project.externalUrls` — bağlantılar + aranan roller + isteğe bağlı vitrin alanları */
export type ParsedProjectUrls = ExternalLinks & {
  lookingFor: string[];
  tagline?: string;
  deliverables?: string;
  timeCommitment?: string;
  collaborationNotes?: string;
};

function parseExternalUrls(raw: unknown): ParsedProjectUrls {
  const empty: ParsedProjectUrls = { lookingFor: [] };
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return empty;
  const o = raw as Record<string, unknown>;
  const out: ParsedProjectUrls = { lookingFor: [] };
  for (const k of [
    "figma",
    "notion",
    "competition",
    "repository",
    "portfolioUrl",
    "projectUrl",
  ] as const) {
    if (typeof o[k] === "string") {
      const s = (o[k] as string).trim();
      if (s) out[k] = s;
    }
  }
  if (Array.isArray(o.lookingFor) && o.lookingFor.every((x) => typeof x === "string")) {
    out.lookingFor = (o.lookingFor as string[])
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 24);
  }
  const tagline = optStr(o, "tagline", 220);
  const deliverables = optStr(o, "deliverables", 8000);
  const timeCommitment = optStr(o, "timeCommitment", 160);
  const collaborationNotes = optStr(o, "collaborationNotes", 4000);
  return {
    ...out,
    lookingFor: out.lookingFor ?? [],
    ...(tagline ? { tagline } : {}),
    ...(deliverables ? { deliverables } : {}),
    ...(timeCommitment ? { timeCommitment } : {}),
    ...(collaborationNotes ? { collaborationNotes } : {}),
  };
}

export function prismaStatusToUi(s: ProjectStatus): TeamAd["status"] {
  switch (s) {
    case "IDEA":
      return "Idea";
    case "PROTOTYPE":
      return "Prototype";
    case "ACTIVE":
      return "Active Development";
    default:
      return "Idea";
  }
}

export function uiStatusToPrisma(s: TeamAd["status"]): ProjectStatus {
  switch (s) {
    case "Idea":
      return "IDEA";
    case "Prototype":
      return "PROTOTYPE";
    case "Active Development":
      return "ACTIVE";
    default:
      return "IDEA";
  }
}

export function moderationToUi(m: ModerationStatus): TeamAd["moderationState"] {
  switch (m) {
    case "PENDING":
      return "Pending";
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    default:
      return "Pending";
  }
}

function portfolioToMock(u: User): MockOwnerProfile {
  const raw = u.portfolioUrls;
  const p =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as PortfolioJson)
      : {};

  return {
    name: u.name,
    headline: typeof p.headline === "string" ? p.headline : "Üye",
    department: typeof p.department === "string" ? p.department : undefined,
    year: typeof p.year === "string" ? p.year : undefined,
    skills: u.skills ?? [],
    portfolio: {
      github: typeof p.github === "string" ? p.github : undefined,
      linkedin: typeof p.linkedin === "string" ? p.linkedin : undefined,
      website: typeof p.website === "string" ? p.website : undefined,
    },
  };
}

export function mapProjectRowToTeamAd(row: ProjectWithOwner): TeamAd {
  const ext = parseExternalUrls(row.externalUrls);
  const lookingFor = ext.lookingFor ?? [];

  const links: ExternalLinks | undefined =
    ext.figma ||
    ext.notion ||
    ext.competition ||
    ext.repository ||
    ext.portfolioUrl ||
    ext.projectUrl
      ? {
          figma: ext.figma,
          notion: ext.notion,
          competition: ext.competition,
          repository: ext.repository,
          portfolioUrl: ext.portfolioUrl,
          projectUrl: ext.projectUrl,
        }
      : undefined;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: prismaStatusToUi(row.status),
    moderationState: moderationToUi(row.moderationStatus),
    tags: row.requiredSkills,
    lookingFor,
    owner: portfolioToMock(row.owner),
    links,
    ...(ext.tagline ? { tagline: ext.tagline } : {}),
    ...(ext.deliverables ? { deliverables: ext.deliverables } : {}),
    ...(ext.timeCommitment ? { timeCommitment: ext.timeCommitment } : {}),
    ...(ext.collaborationNotes
      ? { collaborationNotes: ext.collaborationNotes }
      : {}),
  };
}
