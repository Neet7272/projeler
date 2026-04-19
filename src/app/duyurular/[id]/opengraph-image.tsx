import { ImageResponse } from "next/og";
import { getAnnouncementById } from "@/lib/announcementQueries";
import { prismaCategoryToUiLabel } from "@/lib/announcementMappers";
import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/seo";
import { truncateForOg } from "@/lib/og/truncateText";

export const runtime = "nodejs";
export const alt = "Duyuru önizlemesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontStack =
  'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default async function Image(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const ann = await getAnnouncementById(id);

  const title = ann?.title ?? "Duyuru";
  const badge = ann ? prismaCategoryToUiLabel(ann.category) : "Duyurular";
  const lead = ann ? truncateForOg(ann.content, 160) : truncateForOg(SITE_NAME, 120);
  const dateLine = ann?.createdAt ?? "";

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
            "linear-gradient(132deg, #020617 0%, #0f172a 42%, #164e63 78%, #0891b2 100%)",
          color: "#f8fafc",
          padding: 56,
          fontFamily: fontStack,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "rgb(255 255 255 / 0.1)",
                border: "1px solid rgb(255 255 255 / 0.18)",
              }}
            >
              {badge}
            </div>
            {dateLine ? (
              <span style={{ fontSize: 20, opacity: 0.75 }}>{dateLine}</span>
            ) : null}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              maxWidth: 1040,
            }}
          >
            {truncateForOg(title, 96)}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.45,
              maxWidth: 980,
              opacity: 0.88,
            }}
          >
            {lead}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            opacity: 0.7,
            letterSpacing: "0.06em",
          }}
        >
          <span>{SITE_SHORT_NAME}</span>
          <span style={{ opacity: 0.55 }}>{SITE_NAME}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
