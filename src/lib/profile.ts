import type { User } from "@prisma/client";

type PortfolioJson = {
  github?: string;
  linkedin?: string;
  website?: string;
  behance?: string;
};

export function computeProfileComplete(user: {
  skills: string[];
  portfolioUrls: User["portfolioUrls"];
}): boolean {
  const raw = user.portfolioUrls;
  const p =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as PortfolioJson)
      : {};

  return Boolean(
    user.skills.length > 0 ||
      (typeof p.github === "string" && p.github.length > 0) ||
      (typeof p.linkedin === "string" && p.linkedin.length > 0) ||
      (typeof p.website === "string" && p.website.length > 0) ||
      (typeof p.behance === "string" && p.behance.length > 0)
  );
}
