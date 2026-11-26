import { ImageResponse } from "next/og";
import { getTool, getToolIds } from "@/lib/tools";
import { priceLabel } from "@/lib/toolText";
import { SITE_URL } from "@/lib/site";

// Imagen para redes sociales de cada ficha (se genera en el build, una por herramienta).
export const alt = "Ficha de la herramienta en WikipeIA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getToolIds().map((id) => ({ id }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getTool(id);
  const name = tool?.nombre ?? "WikipeIA";
  const tags = tool ? [tool.categoria, priceLabel(tool), ...(tool.subcategoria ?? []).slice(0, 2)] : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          color: "#ffffff",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(900px 420px at 50% -10%, rgba(0, 212, 255, 0.28), transparent 70%), linear-gradient(180deg, #020617 0%, #0a0a0a 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#00d4ff" }}>
          WikipeIA · Herramientas de IA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: name.length > 18 ? 84 : 104, fontWeight: 700, letterSpacing: 1, lineHeight: 1.05 }}>
            {name}
          </div>
          {tool && (
            <div style={{ display: "flex", fontSize: 36, lineHeight: 1.35, marginTop: 26, maxWidth: 1000, color: "rgba(255, 255, 255, 0.78)" }}>
              {tool.descripcion}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "2px solid rgba(0, 212, 255, 0.45)",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255, 255, 255, 0.6)" }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
