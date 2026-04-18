export function getCloudinaryCloudName(): string | undefined {
  const n = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  return n || undefined;
}

export function getCloudinaryUploadPreset(): string | undefined {
  const p = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();
  return p || undefined;
}

export function isCloudinaryUploadConfigured(): boolean {
  return Boolean(getCloudinaryCloudName() && getCloudinaryUploadPreset());
}

/** `secure_url` → `public_id` (yaklaşık; uzantı kaldırılır). */
export function publicIdFromSecureUrl(secureUrl: string): string | null {
  const marker = "/upload/";
  const i = secureUrl.indexOf(marker);
  if (i === -1) return null;
  let rest = secureUrl.slice(i + marker.length);
  rest = rest.replace(/^v\d+\//, "");
  const q = rest.indexOf("?");
  if (q !== -1) rest = rest.slice(0, q);
  const withoutExt = rest.replace(/\.[^/.]+$/, "");
  return withoutExt || null;
}
