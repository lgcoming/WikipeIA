"use client";

import type { ToolSummary } from "@/lib/types";
import { memo, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefetchToolDetails } from "@/lib/toolDetails";
import { toolPath } from "@/lib/categories";
import { FALLBACK_LOGO, getToolLogoSrc, outboundRel } from "@/lib/toolLinks";

// Las tarjetas que aparecen al filtrar entran con un fundido corto. Las del primer render no:
// la rejilla activa esta bandera después de hidratarse.
let enterAnimationsEnabled = false;
export function enableCardEnterAnimations() {
  enterAnimationsEnabled = true;
}

const PRECIO_LABEL: Record<string, string> = { gratis: "Gratis", pago: "Pago" };

type ToolCardProps = {
  tool: ToolSummary;
  saved: boolean;
  onToggleSaved: (id: string) => void;
  /** Si se indica, un clic normal abre la ficha rápida en lugar de navegar a la página. */
  onSelect?: (tool: ToolSummary) => void;
};

function ToolCard({ tool, saved, onToggleSaved, onSelect }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = imageFailed ? FALLBACK_LOGO : getToolLogoSrc(tool);
  const precioLabel = PRECIO_LABEL[tool.precio] ?? tool.precio;

  useEffect(() => {
    if (!enterAnimationsEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cardRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)" },
    );
  }, []);

  const prefetch = () => prefetchToolDetails(tool.id);

  // El nombre es un enlace real a la página de la herramienta (lo siguen buscadores, Ctrl+clic,
  // botón central...). Un clic normal en el directorio abre la ficha rápida sin salir de la página.
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onSelect || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onSelect(tool);
  };

  return (
    <div
      ref={cardRef}
      className="tool-card relative h-full rounded-2xl border border-black/15 dark:border-white/20 bg-white/80 dark:bg-white/5 p-0 flex flex-col shadow-sm cursor-pointer card-neon card-elevate card-white-glow"
      onPointerEnter={onSelect ? prefetch : undefined}
      onFocus={onSelect ? prefetch : undefined}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-white h-20 sm:h-28">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="128px"
          unoptimized
          className="object-contain p-2.5"
          onError={() => setImageFailed(true)}
        />
        {/* Efecto vidrio (brillo, velo, viñeta y borde interior) en una sola capa: ver .card-glass */}
        <div aria-hidden="true" className="card-glass absolute inset-0 pointer-events-none" />
      </div>
      <div className="p-1.5 sm:p-2.5 flex flex-col gap-1 sm:gap-2 flex-1">
        <div className="px-1">
          <h3 className="text-base font-semibold leading-snug">
            {/* El ::after estira el enlace a toda la tarjeta; los botones quedan por encima (z-10). */}
            <Link
              href={toolPath(tool.id)}
              prefetch={false}
              onClick={handleLinkClick}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-cyan-600 dark:focus-visible:after:ring-[#00d4ff]/70"
            >
              {tool.nombre}
            </Link>
          </h3>
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
            <span className="inline-flex items-center text-xs rounded-full border border-green-600/40 dark:border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-green-700 dark:text-green-400">Prueba gratis</span>
          )}
        </div>
        <div className="mt-auto flex items-center gap-1.5">
          <a
            href={tool.enlace}
            target="_blank"
            rel={outboundRel(tool.enlace)}
            aria-label={`Visitar ${tool.nombre} (se abre en una pestaña nueva)`}
            className="relative z-10 inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-white/30 dark:hover:ring-white/30 hover:bg-blue-100 dark:hover:bg-[#00d4ff]/30 border border-gray-400 dark:border-white/35 bg-blue-50 dark:bg-[#00d4ff]/20 text-gray-700 dark:text-white/85 flex-1 mx-0.5 mb-0.5 active:scale-95 active:transform"
          >
            Visitar
          </a>
          <button
            type="button"
            onClick={() => onToggleSaved(tool.id)}
            className={
              "relative z-10 inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:ring-1 hover:ring-white/30 flex-1 btn-hover-white cursor-pointer mx-0.5 mb-0.5 active:scale-95 active:transform " +
              (saved
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10")
            }
            aria-pressed={saved}
            aria-label={`${saved ? "Guardada" : "Guardar"}: ${tool.nombre}`}
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
