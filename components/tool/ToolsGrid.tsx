"use client";

import type { ToolSummary } from "@/lib/types";
import ToolCard, { enableCardEnterAnimations } from "./ToolCard";
import { memo, useCallback, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useIsClient } from "@/hooks/useIsClient";

type ToolsGridProps = {
  tools: ToolSummary[];
  onSelect?: (tool: ToolSummary) => void;
};

function ToolsGrid({ tools, onSelect }: ToolsGridProps) {
  const { ids, toggle } = useFavorites();
  // Hasta hidratar, ninguna aparece guardada para coincidir con el HTML del servidor.
  const mounted = useIsClient();

  useEffect(() => {
    enableCardEnterAnimations();
  }, []);

  // Foco de luz que sigue al ratón: un único manejador para toda la rejilla que actualiza
  // las variables --mx/--my de la tarjeta bajo el cursor (el dibujo lo hace el CSS).
  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".tool-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  if (!tools?.length) {
    return (
      <div role="status" className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-white/15">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-700/15 dark:bg-[#00d4ff]/10 dark:text-[#00d4ff] dark:ring-[#00d4ff]/20">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
        <p className="mt-4 font-semibold text-gray-900 dark:text-white">No hay herramientas que coincidan</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
          Prueba con otra búsqueda, cambia de pestaña o elige otra categoría.
        </p>
      </div>
    );
  }

  return (
    <ul
      onPointerMove={handlePointerMove}
      className="grid w-full max-w-[69rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-5 items-stretch px-8 sm:px-0"
    >
      {tools.map((t) => (
        <li key={t.id} data-reveal className="h-full">
          <ToolCard
            tool={t}
            saved={mounted && ids.includes(t.id)}
            onToggleSaved={toggle}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}

export default memo(ToolsGrid);
