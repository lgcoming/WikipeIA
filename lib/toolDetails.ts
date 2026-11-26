import type { ToolDetails } from "@/lib/types";

// Una petición por herramienta como máximo: la promesa se reutiliza al reabrir la ficha.
const cache = new Map<string, Promise<ToolDetails>>();

export function loadToolDetails(id: string): Promise<ToolDetails> {
  let request = cache.get(id);
  if (!request) {
    request = fetch(`/api/herramientas/${encodeURIComponent(id)}`).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<ToolDetails>;
    });
    // Si falla, se olvida para poder reintentar la próxima vez.
    request.catch(() => cache.delete(id));
    cache.set(id, request);
  }
  return request;
}

/** Precarga sin bloquear (al pasar el ratón o enfocar una tarjeta). */
export function prefetchToolDetails(id: string) {
  loadToolDetails(id).catch(() => {});
}
