// Acceso al catálogo desde el servidor (páginas y rutas). No importar desde componentes cliente:
// incluiría el JSON completo en el JavaScript que descarga el navegador.
import toolsData from "@/data/tools.json";
import type { Tool, ToolDetails, ToolSummary } from "@/lib/types";

const tools = toolsData as Tool[];
const byId = new Map(tools.map((tool) => [tool.id, tool]));

/** Datos ligeros para el directorio: sin galería ni descripción extendida. */
export function toSummary(tool: Tool): ToolSummary {
  const summary: ToolSummary & Partial<ToolDetails> = { ...tool };
  delete summary.imagenes;
  delete summary.descripcionDetallada;
  return summary;
}

export function getToolSummaries(): ToolSummary[] {
  return tools.map(toSummary);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolIds(): string[] {
  return tools.map((tool) => tool.id);
}

export function getTool(id: string): Tool | undefined {
  return byId.get(id);
}

export function getToolDetails(id: string): ToolDetails | null {
  const tool = byId.get(id);
  if (!tool) return null;
  return { imagenes: tool.imagenes ?? [], descripcionDetallada: tool.descripcionDetallada };
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.categoria === category);
}

const isFeatured = (tool: Tool) => tool.etiquetas?.includes("Destacada") ?? false;

/** Orden de los listados: destacadas primero y después por nombre. */
export function sortForListing<T extends Tool | ToolSummary>(list: T[]): T[] {
  return [...list].sort(
    (a, b) => Number(isFeatured(b as Tool)) - Number(isFeatured(a as Tool)) || a.nombre.localeCompare(b.nombre, "es"),
  );
}

/**
 * Alternativas a una herramienta: primero las que comparten subcategoría, después las de su
 * categoría. Cada grupo empieza en un punto distinto según la herramienta, para que las fichas no
 * enlacen siempre a las mismas y todas reciban enlaces internos.
 */
export function getRelatedTools(tool: Tool, limit = 8): Tool[] {
  const subs = new Set(tool.subcategoria ?? []);
  const candidates = tools.filter((other) => other.id !== tool.id && other.categoria === tool.categoria);

  const score = (other: Tool) => (other.subcategoria ?? []).filter((s) => subs.has(s)).length;
  const offset = [...tool.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rotate = <T,>(list: T[]) => (list.length ? [...list.slice(offset % list.length), ...list.slice(0, offset % list.length)] : list);

  const sameSub = rotate(sortForListing(candidates.filter((other) => score(other) > 0)));
  const sameCategory = rotate(sortForListing(candidates.filter((other) => score(other) === 0)));
  return [...sameSub, ...sameCategory].slice(0, limit);
}
