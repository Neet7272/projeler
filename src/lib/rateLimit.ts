/**
 * Basit bellek içi hız sınırlama (serverless örneği başına).
 * Üretimde kalıcı limit için Redis / Vercel KV önerilir.
 */
const buckets = new Map<string, number[]>();

function prune(key: string, windowMs: number, now: number) {
  const arr = buckets.get(key) ?? [];
  const next = arr.filter((t) => now - t < windowMs);
  if (next.length === 0) buckets.delete(key);
  else buckets.set(key, next);
  return next;
}

/** @returns true izin var, false limit aşıldı */
export function allowRateLimit(
  key: string,
  max: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const arr = prune(key, windowMs, now);
  if (arr.length >= max) return false;
  arr.push(now);
  buckets.set(key, arr);
  return true;
}
