import { ImageResponse } from "next/og";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Varsayılan paylaşım görseli — LinkedIn / X / WhatsApp önizlemesi.
 * Özel görsel için `NEXT_PUBLIC_OG_IMAGE` (layout `openGraph.images`) kullanılabilir.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background:
            "linear-gradient(128deg, #020617 0%, #0f172a 38%, #155e75 72%, #0891b2 100%)",
          color: "#f8fafc",
          padding: 56,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 5,
                borderRadius: 999,
                background: "linear-gradient(90deg, #22d3ee, #a5f3fc)",
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Kent Ar-Ge
            </span>
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              opacity: 0.88,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {DEFAULT_DESCRIPTION}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            opacity: 0.65,
            letterSpacing: "0.08em",
          }}
        >
          <span>İstanbul Kent Üniversitesi</span>
          <span style={{ opacity: 0.5 }}>duyurular · vitrin · ekip</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
