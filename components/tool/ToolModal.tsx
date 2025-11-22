"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";

export default function ToolModal({
  tool,
  open,
  onClose,
}: {
  tool: Tool | null;
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { isFav, toggle } = useFavorites();

  const images: string[] = useMemo(() => {
    const arr: string[] = [];
    if (tool?.imagenes && tool.imagenes.length) {
      arr.push(...tool.imagenes.filter(Boolean));
    }
    // Solo usar imagen principal si no hay imágenes de galería
    if (arr.length === 0 && tool?.imagen && tool.imagen.trim()) {
      arr.push(tool.imagen);
    }
    // Solo usar favicon como último recurso
    if (arr.length === 0) arr.push("/favicon.ico");
    return Array.from(new Set(arr));
  }, [tool]);

  const clamp = useCallback((i: number) => (images.length ? (i + images.length) % images.length : 0), [images.length]);
  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp]);
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp]);
  const setSlide = useCallback((i: number) => setIndex(clamp(i)), [clamp]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) setZoom(1);
  }, [isFullscreen]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
          setZoom(1);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev, isFullscreen, toggleFullscreen, handleZoomIn, handleZoomOut]);

  useEffect(() => {
    // Reset galería al abrir una nueva herramienta
    if (open) {
      setIndex(0);
      setZoom(1);
      setIsFullscreen(false);
    }
  }, [open, tool?.id]);

  const handleToggleFavorite = () => {
    if (tool) {
      toggle(tool.id);
    }
  };

  const isToolFavorite = tool ? isFav(tool.id) : false;

  if (!open || !tool) return null;

  // Modo pantalla completa
  if (isFullscreen) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full"
              style={{ transform: `scale(${zoom})` }}
            >
              <Image
                src={images[index]}
                alt={`${tool.nombre} ${index + 1}`}
                width={1200}
                height={800}
                unoptimized
                className="object-contain max-w-full max-h-full"
              />
            </motion.div>

            {/* Controles de pantalla completa */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleZoomOut}
                className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white hover:bg-black/90 transition"
                aria-label="Alejar"
              >
                −
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white hover:bg-black/90 transition"
                aria-label="Acercar"
              >
                +
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white hover:bg-black/90 transition"
                aria-label="Salir de pantalla completa"
              >
                ✕
              </button>
            </div>

            {/* Navegación en pantalla completa */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg text-white hover:bg-black/90 transition"
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg text-white hover:bg-black/90 transition"
                  aria-label="Siguiente"
                >
                  ›
                </button>
              </>
            )}

            {/* Indicador de imagen */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm">
                {index + 1} / {images.length}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 dark:bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
          layout
        >
          {/* Header con botón cerrar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.nombre}</h2>
              {tool.etiquetas?.includes("Destacada") && (
                <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  ⭐ Destacada
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg border border-gray-300 dark:border-white/15 p-2 hover:bg-red-500/20 hover:border-red-500/50 transition text-gray-700 dark:text-white"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Columna izquierda: Galería */}
            <div className="relative p-3 bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl aspect-[18/9] shadow-xl border border-gray-200 dark:border-white/10 w-full h-full">
                <motion.div
                  key={images[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full flex items-center justify-center p-2"
                >
                  <Image
                    src={images[index]}
                    alt={`${tool.nombre} ${index + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </motion.div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-lg hover:bg-black/90 transition shadow-lg"
                      aria-label="Anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-lg hover:bg-black/90 transition shadow-lg"
                      aria-label="Siguiente"
                    >
                      ›
                    </button>
                  </>
                )}
                {/* Botón de pantalla completa */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-2 right-2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-sm hover:bg-black/90 transition shadow-lg"
                  aria-label="Pantalla completa"
                >
                  ⛶
                </button>
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        className={
                          "h-1.5 rounded-full transition-all " +
                          (i === index ? "w-6 bg-white shadow-lg" : "w-1.5 bg-white/40 hover:bg-white/60")
                        }
                        aria-label={`Ver imagen ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: Información */}
            <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/10 py-5 px-5 gap-3.5">
              {/* Descripción breve */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-1.5">Descripción</h3>
                <p className="text-sm text-gray-700 dark:text-white/90 leading-snug">{tool.descripcion}</p>
              </div>

              {/* Metadatos */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-1.5">Información</h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 text-gray-900 dark:text-white/90">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {tool.categoria}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 text-gray-900 dark:text-white/90">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tool.precio === "gratis" ? "Gratis" : tool.precio === "pago" ? "De pago" : tool.precio}
                  </span>
                  {tool.pruebaGratis && (
                    <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-green-600 dark:text-green-400">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Prueba gratis
                    </span>
                  )}
                  {tool.etiquetas?.filter(tag => tag !== "Destacada").map((tag) => (
                    <span key={tag} className="text-xs rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 text-gray-800 dark:text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Descripción detallada */}
              {tool.descripcionDetallada && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-1.5">Detalles</h3>
                  <p className="text-sm text-gray-700 dark:text-white/75 leading-snug">{tool.descripcionDetallada}</p>
                </div>
              )}

              {/* Footer acciones */}
              <div className="mt-auto pt-2.5 border-t border-gray-200 dark:border-white/10 flex items-center gap-1.5">
                <a
                  href={tool.enlace}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-[#00d4ff]/30 hover:bg-[#00d4ff]/30 hover:text-white border border-[#00d4ff]/30 bg-[#00d4ff]/20 text-[#00d4ff] flex-1 mx-0.5 mb-0.5 active:scale-95 active:transform"
                >
                  Visitar
                </a>
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={
                    "inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:ring-1 hover:ring-white/30 flex-1 btn-hover-white cursor-pointer mx-0.5 mb-0.5 active:scale-95 active:transform " +
                    (isToolFavorite
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : "border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10")
                  }
                  aria-pressed={isToolFavorite}
                  aria-label={isToolFavorite ? "Quitar de guardadas" : "Guardar herramienta"}
                  title={isToolFavorite ? "Quitar de guardadas" : "Guardar herramienta"}
                >
                  {isToolFavorite ? "Guardada" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

