import type { MetadataRoute } from "next";
import { CATEGORIES, categoryPath, toolPath } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";
import { getAllTools } from "@/lib/tools";

// Fecha de la última revisión de los textos legales (la misma que muestran las páginas).
const LEGAL_UPDATED = new Date("2025-10-02");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const tools = getAllTools();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((category) => ({
      url: absoluteUrl(categoryPath(category.slug)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...tools.map((tool) => ({
      url: absoluteUrl(toolPath(tool.id)),
      lastModified: tool.fechaAlta ? new Date(tool.fechaAlta) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(tool.imagenes?.length ? { images: tool.imagenes.filter(Boolean) } : {}),
    })),
    { url: absoluteUrl("/informacion"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacidad"), lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terminos"), lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
