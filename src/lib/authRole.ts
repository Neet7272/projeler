/** Edge + Node ortak: JWT / session içinde rol normalizasyonu. */

export function parseAdminEmailSet(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function resolveRole(input: {
  role?: unknown;
  email?: string | null;
}): "ADMIN" | "MEMBER" {
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (email && parseAdminEmailSet().has(email)) return "ADMIN";
  if (input.role === "ADMIN" || input.role === "MEMBER") return input.role;
  return "MEMBER";
}
