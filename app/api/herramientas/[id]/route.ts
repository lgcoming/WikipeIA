import { getToolDetails, getToolIds } from "@/lib/tools";

// Una respuesta JSON estática por herramienta, generada en el build y servida desde la CDN.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getToolIds().map((id) => ({ id }));
}

// GET /api/herramientas/[id] → galería y descripción extendida de la ficha
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const details = getToolDetails(id);
  if (!details) {
    return Response.json({ error: "Herramienta no encontrada" }, { status: 404 });
  }
  return Response.json(details);
}
