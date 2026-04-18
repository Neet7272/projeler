"use client";

import { useMemo, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import {
  getCloudinaryCloudName,
  isCloudinaryUploadConfigured,
  publicIdFromSecureUrl,
} from "@/lib/cloudinary";
import { Upload } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/Input";

type UploadInfo = {
  secure_url?: string;
  public_id?: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectClassName?: string;
};

export function CloudinaryImageField({
  label,
  value,
  onChange,
  helperText,
  aspectClassName = "aspect-video",
}: Props) {
  const cloudName = getCloudinaryCloudName();
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const configured = isCloudinaryUploadConfigured();
  const [localPublicId, setLocalPublicId] = useState<string | null>(null);

  const displayPublicId = useMemo(() => {
    if (localPublicId) return localPublicId;
    if (!value || !cloudName || !value.includes("res.cloudinary.com"))
      return null;
    return publicIdFromSecureUrl(value);
  }, [localPublicId, value, cloudName]);

  if (!configured) {
    return (
      <div className="space-y-2">
        {label ? (
          <label className="text-xs font-medium text-[var(--muted)]">{label}</label>
        ) : null}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... (Cloudinary kapalıyken URL)"
        />
        <p className="text-xs leading-5 text-amber-200/90">
          Cloudinary yükleme kapalı. `.env` içinde{" "}
          <code className="rounded bg-black/20 px-1">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> ve{" "}
          <code className="rounded bg-black/20 px-1">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code>{" "}
          tanımlayınca sürükle-bırak yükleme açılır.
        </p>
        {helperText ? (
          <p className="text-xs text-[var(--muted)]">{helperText}</p>
        ) : null}
        {value && !value.includes("res.cloudinary.com") ? (
          <div
            className={cn(
              "relative mt-2 overflow-hidden rounded-xl border border-[var(--hairline)]",
              aspectClassName,
              "max-h-52 w-full max-w-md"
            )}
          >
            <Image src={value} alt="" fill className="object-cover" sizes="400px" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {label ? (
        <label className="text-xs font-medium text-[var(--muted)]">{label}</label>
      ) : null}
      <CldUploadWidget
        uploadPreset={preset}
        options={{
          maxFiles: 1,
          sources: ["local", "url"],
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
          maxFileSize: 8_000_000,
        }}
        onSuccess={(result) => {
          const info = result?.info as UploadInfo | undefined;
          if (info?.secure_url) onChange(info.secure_url);
          if (info?.public_id) setLocalPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className={cn(
              "flex min-h-11 w-full max-w-md items-center justify-center gap-2 rounded-xl border border-cyan-500/35 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-cyan-950/50 px-4 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)] transition hover:border-cyan-400/50 hover:shadow-[0_0_28px_-2px_rgba(34,211,238,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            )}
          >
            <Upload className="h-5 w-5 shrink-0 text-cyan-300" strokeWidth={2} aria-hidden />
            Görsel yükle (Cloudinary)
          </button>
        )}
      </CldUploadWidget>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="İsteğe bağlı: URL yapıştır veya yukarıdan yükle"
        className="text-xs sm:text-sm"
      />
      {helperText ? (
        <p className="text-xs text-[var(--muted)]">{helperText}</p>
      ) : null}
      {displayPublicId && cloudName ? (
        <div
          className={cn(
            "relative mt-2 overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950/40",
            aspectClassName,
            "max-h-56 w-full max-w-md"
          )}
        >
          <CldImage
            src={displayPublicId}
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, 400px"
            alt=""
            className="object-cover"
          />
        </div>
      ) : value ? (
        <div
          className={cn(
            "relative mt-2 overflow-hidden rounded-xl border border-[var(--hairline)]",
            aspectClassName,
            "max-h-56 w-full max-w-md"
          )}
        >
          <Image src={value} alt="" fill className="object-cover" sizes="400px" />
        </div>
      ) : null}
    </div>
  );
}
