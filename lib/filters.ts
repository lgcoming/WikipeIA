import type { Tool } from "@/lib/types";
import type { TabKey } from "@/lib/types";

export function normalize(text: string): string {
  return (text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase();
}

export function filterByQuery(tools: Tool[], query: string): Tool[] {
  const q = normalize(query.trim());
  if (!q) return tools;
  return tools.filter((t) => {
    const hay = normalize(`${t.nombre} ${t.descripcion}`);
    return hay.includes(q);
  });
}

export function filterByCategory(tools: Tool[], categoria: string): Tool[] {
  if (!categoria || categoria === "Todas las categorías") return tools;
  return tools.filter((t) => t.categoria === categoria);
}

export function applyTab(tools: Tool[], tab: TabKey, favIds: string[]): Tool[] {
  const byNombreAsc = (a: Tool, b: Tool) => a.nombre.localeCompare(b.nombre);
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
