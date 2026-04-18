export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  const base = raw.startsWith("http") ? raw : `https://${raw}`;
  return base.replace(/\/$/, "");
}
