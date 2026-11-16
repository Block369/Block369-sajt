import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const gradient = "linear-gradient(135deg, #2D46B9, #F037A5)";

/** Zajednički izgled OG slike (pregled linka na mrežama), u bojama brandbooka. */
export function renderOg(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1C1C1C",
          color: "#ffffff",
        }}
      >
        {/* kvadratni okvir u gradijentu, motiv iz brandbooka */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 70,
            width: 260,
            height: 260,
            background: gradient,
            display: "flex",
            padding: 22,
          }}
        >
          <div style={{ flex: 1, background: "#1C1C1C" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 80,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 40, letterSpacing: 10 }}>{site.name.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
            <div style={{ fontSize: 28, color: "#F037A5" }}>{eyebrow}</div>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          </div>
        </div>
        <div
          style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 12, background: gradient }}
        />
      </div>
    ),
    ogSize,
  );
}
