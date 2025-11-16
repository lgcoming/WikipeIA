"use client";

import type { Tool } from "@/lib/types";
import { memo, useEffect, useMemo, useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

function ToolCard({ tool, onSelect }: { tool: Tool; onSelect?: (tool: Tool) => void }) {
  const { isFav, toggle } = useFavorites();
  // Evitar hydration mismatch: hasta que el componente monte en el cliente,
  // forzamos "no guardada" para que coincida con el SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const saved = mounted ? isFav(tool.id) : false;

  const precioLabel = useMemo(() => {
    switch (tool.precio) {
      case "gratis":
        return "Gratis";
      case "pago":
        return "Pago";
      case "freemium":
        return "Freemium";
      default:
        return tool.precio;
    }
  }, [tool.precio]);

  const imageSrc = useMemo(() => {
    const raw = (tool.imagen || "").trim();
    if (raw) return raw;
    try {
      const u = new URL(tool.enlace);
      return `https://www.google.com/s2/favicons?sz=128&domain=${u.hostname}`;
    } catch {
      return "/favicon.ico"; // placeholder local
    }
  }, [tool.imagen, tool.enlace]);

  return (
    <div
      className="tool-card relative h-full rounded-2xl border border-black/15 dark:border-white/20 bg-white/85 dark:bg-zinc-900/70 backdrop-blur p-0 flex flex-col shadow-sm cursor-pointer card-neon card-elevate card-white-glow"
      onClick={() => onSelect?.(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(tool);
        }
      }}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-white dark:bg-zinc-900 h-20 sm:h-28">
        <Image
          src={imageSrc}
          alt={tool.nombre}
          fill
          unoptimized
          className="object-contain p-2.5"
        />
        {/* Capas de vidrio blancas/grisáceas: invertido del negro anterior */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Highlight superior: solo en tema claro */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/85 to-transparent dark:from-transparent" />
          {/* Capa oscura sutil para ambos temas */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
          {/* Vignette sutil en bordes e inferior */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 dark:to-black/30" />
          {/* Borde interior sutil */}
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" />
        </div>
      </div>
      <div className="p-1.5 sm:p-2.5 flex flex-col gap-1 sm:gap-2 flex-1">
        <div className="px-1">
          <h3 className="text-base font-semibold leading-snug">{tool.nombre}</h3>
          <p className="text-[13px] text-black/80 dark:text-white/85 two-lines">
            {tool.descripcion}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0 overflow-hidden mt-1.5 mb-1.5">
          <div className="flex flex-wrap items-center gap-1 overflow-hidden">
            <span className="chip">{tool.categoria}</span>
            <span className="chip">{precioLabel}</span>
          </div>
          {tool.pruebaGratis && (
            <span className="inline-flex items-center text-xs rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-green-400">Prueba gratis</span>
          )}
        </div>
        <div className="mt-auto flex items-center gap-1.5">
          <a
            href={tool.enlace}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-[#00d4ff]/30 hover:bg-[#00d4ff]/30 hover:text-white border border-[#00d4ff]/30 bg-[#00d4ff]/20 text-[#00d4ff] flex-1 mx-0.5 mb-0.5 active:scale-95 active:transform"
            onClick={(e) => e.stopPropagation()}
          >
            Visitar
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle(tool.id);
            }}
            className={
              "inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:ring-1 hover:ring-white/30 flex-1 btn-hover-white cursor-pointer mx-0.5 mb-0.5 active:scale-95 active:transform " +
              (saved
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "border-black/10 dark:border-white/20 hover:bg.black/5 dark:hover:bg-white/10")
            }
            aria-pressed={saved}
            aria-label={saved ? "Quitar de guardadas" : "Guardar herramienta"}
            title={saved ? "Quitar de guardadas" : "Guardar herramienta"}
          >
            {saved ? "Guardada" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ToolCard);

