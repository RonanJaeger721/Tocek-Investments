import { ImageResponse } from "next/og";
export const alt = "Zadzamatura — Growing possibilities. Beyond borders.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#133b2c",
          color: "#f7f6f0",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 32, letterSpacing: 6, display: "flex" }}>
          ZADZAMATURA · BY TOCEK INVESTMENTS
        </div>
        <div
          style={{
            fontFamily: "serif",
            fontSize: 80,
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Growing possibilities.</span>
          <span style={{ color: "#d5c391", fontStyle: "italic" }}>
            Beyond borders.
          </span>
        </div>
        <div style={{ fontSize: 20, letterSpacing: 3, display: "flex" }}>
          SEED · AGRICULTURE · PARTNERSHIPS
        </div>
      </div>
    ),
    size,
  );
}
