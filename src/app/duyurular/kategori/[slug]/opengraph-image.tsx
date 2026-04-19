import { ImageResponse } from "next/og";
import {
  CATEGORY_STRIP_META,
  parseCategorySlug,
} from "@/lib/announcementCategories";
import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/seo";
import { truncateForOg } from "@/lib/og/truncateText";

export const runtime = "edge";
export const alt = "Duyuru kategorisi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontStack =
  'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = parseCategorySlug(slug);
  const meta = cat ? CATEGORY_STRIP_META[cat] : null;
  const title = meta?.title ?? "Kategori";
  const subtitle = meta
    ? truncateForOg(meta.subtitle, 200)
    : "Kulüp duyuruları ve etkinlikler.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(125deg, #0f172a 0%, #1e293b 45%, #155e75 82%, #0d9488 100%)",
          color: "#f1f5f9",
          padding: 56,
          fontFamily: fontStack,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            Duyurular · Kategori
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: 960,
              opacity: 0.88,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            opacity: 0.65,
          }}
        >
          <span>{SITE_SHORT_NAME}</span>
          <span style={{ opacity: 0.5 }}>{SITE_NAME}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
