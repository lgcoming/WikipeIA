import { ImageResponse } from "next/og";

// Imagen que muestran redes sociales y mensajería al compartir un enlace (se genera en el build).
export const alt = "WikipeIA, directorio de herramientas de inteligencia artificial en español";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          color: "#ffffff",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(900px 420px at 50% -10%, rgba(0, 212, 255, 0.28), transparent 70%), linear-gradient(180deg, #020617 0%, #0a0a0a 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#00d4ff" }}>
          Directorio de IA en español
        </div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, marginTop: 18, letterSpacing: 2 }}>WikipeIA</div>
        <div style={{ display: "flex", fontSize: 38, lineHeight: 1.35, marginTop: 28, maxWidth: 940, color: "rgba(255, 255, 255, 0.78)" }}>
          Más de 200 herramientas de inteligencia artificial organizadas por categoría, con filtros y favoritos.
        </div>
        <div style={{ display: "flex", marginTop: 56, height: 4, width: 160, backgroundColor: "#00d4ff", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
