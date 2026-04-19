import { ImageResponse } from "next/og";
import { getProjectDetailForPage } from "@/lib/projectQueries";
import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/seo";
import { truncateForOg } from "@/lib/og/truncateText";

export const runtime = "nodejs";
export const alt = "Takım ilanı önizlemesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontStack =
  'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default async function Image(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const detail = await getProjectDetailForPage(id);

  const title = detail?.ad.title ?? "Proje ilanı";
  const owner = detail?.ad.owner.name ?? "";
  const tagline = detail?.ad.tagline
    ? truncateForOg(detail.ad.tagline, 120)
    : "";
  const desc = detail
    ? truncateForOg(detail.ad.description, tagline ? 140 : 200)
    : "Kent Ar-Ge proje vitrini.";
  const tags =
    detail && detail.ad.tags.length > 0
      ? truncateForOg(detail.ad.tags.slice(0, 6).join(" · "), 72)
      : "";

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
            "linear-gradient(128deg, #020617 0%, #1e293b 40%, #0e7490 72%, #06b6d4 100%)",
          color: "#f8fafc",
          padding: 56,
          fontFamily: fontStack,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "rgb(6 182 212 / 0.2)",
                border: "1px solid rgb(165 243 252 / 0.35)",
              }}
            >
              Proje vitrini
            </div>
            {owner ? (
              <span style={{ fontSize: 22, opacity: 0.85 }}>{owner}</span>
            ) : null}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.038em",
              lineHeight: 1.08,
              maxWidth: 1060,
            }}
          >
            {truncateForOg(title, 88)}
          </div>
          {tagline ? (
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.35,
                maxWidth: 1000,
                opacity: 0.92,
              }}
            >
              {tagline}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.42,
              maxWidth: 1000,
              opacity: 0.9,
            }}
          >
            {desc}
          </div>
          {tags ? (
            <div
              style={{
                fontSize: 22,
                opacity: 0.72,
                letterSpacing: "0.02em",
              }}
            >
              {tags}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 21,
            opacity: 0.68,
          }}
        >
          <span>{SITE_SHORT_NAME}</span>
          <span style={{ opacity: 0.55, maxWidth: 720, textAlign: "right" }}>
            {SITE_NAME}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
