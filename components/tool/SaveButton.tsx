"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { useIsClient } from "@/hooks/useIsClient";

/** Botón Guardar / Guardada de la ficha de una herramienta (favoritos en el navegador). */
export default function SaveButton({ id, name, className = "" }: { id: string; name: string; className?: string }) {
  const { ids, toggle } = useFavorites();
  // Hasta hidratar se muestra sin guardar, igual que el HTML del servidor.
  const saved = useIsClient() && ids.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={`${saved ? "Guardada" : "Guardar"}: ${name}`}
      title={saved ? "Quitar de guardadas" : "Guardar herramienta"}
      className={
        "inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60 " +
        (saved
          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
          : "border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:bg-white/5 dark:text-white/90 dark:hover:border-white/35 dark:hover:bg-white/10") +
        (className ? ` ${className}` : "")
      }
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
      </svg>
      {saved ? "Guardada" : "Guardar"}
    </button>
  );
}
