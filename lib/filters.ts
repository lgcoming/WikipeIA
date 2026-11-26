import type { TabKey, ToolSummary } from "@/lib/types";

export function normalize(text: string): string {
  return (text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase();
}

// Texto de búsqueda normalizado por herramienta: se calcula una sola vez y no en cada tecla.
const searchIndex = new WeakMap<ToolSummary, string>();
function searchableText(tool: ToolSummary) {
  let text = searchIndex.get(tool);
  if (text === undefined) {
    text = normalize(`${tool.nombre} ${tool.descripcion}`);
    searchIndex.set(tool, text);
  }
  return text;
}

export function filterByQuery<T extends ToolSummary>(tools: T[], query: string): T[] {
  const q = normalize(query.trim());
  if (!q) return tools;
  return tools.filter((t) => searchableText(t).includes(q));
}

export function filterByCategory<T extends ToolSummary>(tools: T[], categoria: string, subcategoria?: string): T[] {
  if (!categoria || categoria === "Todas las categorías") return tools;

  // Primero filtramos por categoría
  const byCategory = tools.filter((t) => t.categoria === categoria);

  // Si no hay subcategoría seleccionada, devolvemos todas las herramientas de la categoría
  if (!subcategoria) return byCategory;

  // Si hay una subcategoría seleccionada, filtramos por ella
  return byCategory.filter((t) => t.subcategoria?.includes(subcategoria));
}

export function applyTab<T extends ToolSummary>(tools: T[], tab: TabKey, favIds: string[]): T[] {
  const byNombreAsc = (a: T, b: T) => a.nombre.localeCompare(b.nombre);
  switch (tab) {
    case "Nuevas":
      return [...tools].sort((a, b) => {
        const ta = a.fechaAlta ? Date.parse(a.fechaAlta) : 0;
        const tb = b.fechaAlta ? Date.parse(b.fechaAlta) : 0;
        return tb - ta;
      });
    case "Destacadas":
      return tools.filter((t) => t.etiquetas?.includes("Destacada")).sort(byNombreAsc);
    case "Gratis":
      return tools.filter((t) => t.precio === "gratis").sort(byNombreAsc);
    case "Guardadas":
      return tools.filter((t) => favIds.includes(t.id)).sort(byNombreAsc);
    case "Todas":
    default:
      return [...tools].sort(byNombreAsc);
  }
}
