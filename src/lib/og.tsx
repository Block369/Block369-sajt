import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Zajednički izgled OG slike (pregled linka na mrežama). */
export function renderOg(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1e3a5f", // TODO: brend boja
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 28, opacity: 0.7 }}>{eyebrow}</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
