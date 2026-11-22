import { ImageResponse } from "next/og";

export const alt = "MAAYIL: Tradition, Tailored to You.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF5EF",
          color: "#4A101C",
          border: "18px solid #EBC9A8",
        }}
      >
        <div style={{ fontSize: 160, fontStyle: "italic", fontFamily: "serif" }}>Maayil</div>
        <div style={{ fontSize: 34, letterSpacing: 8, color: "#970018", marginTop: 8 }}>TRADITION, TAILORED TO YOU.</div>
      </div>
    ),
    size,
  );
}
