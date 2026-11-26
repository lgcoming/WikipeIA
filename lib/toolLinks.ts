import type { ToolSummary } from "@/lib/types";

// Utilidades sobre los enlaces e imágenes de una herramienta (válidas en servidor y cliente).

export const FALLBACK_LOGO = "/favicon.ico";

/** Logotipo: el definido en el catálogo o, si no hay, el favicon del sitio de la herramienta. */
export function getToolLogoSrc(tool: Pick<ToolSummary, "imagen" | "enlace">): string {
  const raw = (tool.imagen || "").trim();
  if (raw) return raw;
  try {
    return `https://www.google.com/s2/favicons?sz=128&domain=${new URL(tool.enlace).hostname}`;
  } catch {
    return FALLBACK_LOGO;
  }
}

// Parámetros de seguimiento de los programas de afiliados que usa el catálogo.
const AFFILIATE_PARAMS = ["via", "fpr", "fp_ref", "ref", "af", "_get"];

/**
 * Atributo rel de los enlaces a herramientas. Google pide marcar los enlaces de afiliado como
 * "sponsored" para que no cuenten como recomendación editorial.
 */
export function outboundRel(url: string): string {
  try {
    const params = new URL(url).searchParams;
    if (AFFILIATE_PARAMS.some((p) => params.has(p))) return "sponsored noopener noreferrer";
  } catch {}
  return "noopener noreferrer";
}

/** URL del sitio oficial sin parámetros de seguimiento (para mostrarla y en datos estructurados). */
export function officialUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname === "/" ? "/" : u.pathname}`;
  } catch {
    return url;
  }
}

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
