"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ToolDetails, ToolSummary } from "@/lib/types";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { loadToolDetails } from "@/lib/toolDetails";
import { toolPath } from "@/lib/categories";
import { outboundRel } from "@/lib/toolLinks";

// Solo las imágenes de nuestro Blob pasan por el optimizador de Next (AVIF/WebP y tamaño justo);
// el resto de orígenes no está autorizado en next.config y se sirve tal cual.
const BLOB_ORIGIN = "https://qykyvqh1qam7ipk4.public.blob.vercel-storage.com/";
const isOptimizable = (src: string) => src.startsWith(BLOB_ORIGIN);

type DetailsState = { id: string; data: ToolDetails | null; failed: boolean };

export default function ToolModal({
  tool,
  open,
  onClose,
}: {
  tool: ToolSummary | null;
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [detailsState, setDetailsState] = useState<DetailsState | null>(null);
  const { isFav, toggle } = useFavorites();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toolId = tool?.id;

  // Galería y descripción extendida: se piden al abrir la ficha (normalmente ya precargadas).
  useEffect(() => {
    if (!open || !toolId) return;
    let active = true;
    loadToolDetails(toolId).then(
      (data) => active && setDetailsState({ id: toolId, data, failed: false }),
      () => active && setDetailsState({ id: toolId, data: null, failed: true }),
    );
    return () => {
      active = false;
    };
  }, [open, toolId]);

  const current = detailsState && detailsState.id === toolId ? detailsState : null;
  const details = current?.data ?? null;
  const loadingDetails = !current;

  // Foco al botón de cerrar al abrir y vuelta al elemento anterior al cerrar.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previous?.focus?.();
  }, [open]);

  const images: string[] = useMemo(() => {
    const arr: string[] = [];
    if (details?.imagenes?.length) {
      arr.push(...details.imagenes.filter(Boolean));
    }
    // Solo usar imagen principal si no hay imágenes de galería
    if (arr.length === 0 && tool?.imagen && tool.imagen.trim()) {
      arr.push(tool.imagen);
    }
    // Solo usar favicon como último recurso
    if (arr.length === 0) arr.push("/favicon.ico");
    return Array.from(new Set(arr));
  }, [details, tool]);

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

  // Reset galería al abrir una nueva herramienta (durante el render, sin efecto)
  const galleryKey = `${open}:${tool?.id ?? ""}`;
  const [prevGalleryKey, setPrevGalleryKey] = useState(galleryKey);
  if (galleryKey !== prevGalleryKey) {
    setPrevGalleryKey(galleryKey);
    if (open) {
      setIndex(0);
      setZoom(1);
      setIsFullscreen(false);
    }
  }

  const handleToggleFavorite = () => {
    if (tool) {
      toggle(tool.id);
    }
  };

  const isToolFavorite = tool ? isFav(tool.id) : false;

  if (!open || !tool) return null;

  const currentImage = images[index] ?? images[0];

  // Modo pantalla completa
  if (isFullscreen) {
    return (
      <AnimatePresence>
        <m.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${tool.nombre}: imagen ${index + 1} de ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <m.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full"
              style={{ transform: `scale(${zoom})` }}
            >
              <Image
                src={currentImage}
                alt={`${tool.nombre}, imagen ${index + 1}`}
                width={1200}
                height={800}
                sizes="100vw"
                quality={80}
                unoptimized={!isOptimizable(currentImage)}
                className="object-contain max-w-full max-h-full"
              />
            </m.div>

            {/* Controles de pantalla completa */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white hover:bg-black/90 transition"
                aria-label="Alejar"
              >
                −
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white hover:bg-black/90 transition"
                aria-label="Acercar"
              >
                +
              </button>
              <button
                type="button"
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
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg text-white hover:bg-black/90 transition"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg text-white hover:bg-black/90 transition"
                  aria-label="Imagen siguiente"
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
        </m.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <m.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby={titleId}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <m.div
          className="absolute inset-0 bg-black/40 dark:bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <m.div
          className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
        >
          {/* Header con botón cerrar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <h2 id={titleId} className="text-xl font-semibold text-gray-900 dark:text-white">{tool.nombre}</h2>
              {tool.etiquetas?.includes("Destacada") && (
                <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400">
                  <span aria-hidden="true">⭐ </span>Destacada
                </span>
              )}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg border border-gray-300 dark:border-white/15 p-2 hover:bg-red-500/20 hover:border-red-500/50 transition text-gray-700 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40"
              aria-label="Cerrar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Columna izquierda: Galería */}
            <div className="relative p-3 bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl aspect-[18/9] shadow-xl border border-gray-200 dark:border-white/10 w-full h-full">
                {loadingDetails ? (
                  <div className="absolute inset-0 animate-pulse bg-gray-200/70 dark:bg-white/5" role="status">
                    <span className="sr-only">Cargando imágenes…</span>
                  </div>
                ) : (
                  <m.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-full w-full flex items-center justify-center p-2"
                  >
                    <Image
                      src={currentImage}
                      alt={`${tool.nombre}, imagen ${index + 1} de ${images.length}`}
                      fill
                      sizes="(min-width: 1152px) 750px, (min-width: 1024px) 66vw, 100vw"
                      quality={80}
                      unoptimized={!isOptimizable(currentImage)}
                      className="object-contain"
                    />
                  </m.div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-lg text-white hover:bg-black/90 transition shadow-lg"
                      aria-label="Imagen anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-lg text-white hover:bg-black/90 transition shadow-lg"
                      aria-label="Imagen siguiente"
                    >
                      ›
                    </button>
                  </>
                )}
                {/* Botón de pantalla completa */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="absolute top-2 right-2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1.5 text-sm text-white hover:bg-black/90 transition shadow-lg"
                  aria-label="Ver en pantalla completa"
                >
                  ⛶
                </button>
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSlide(i)}
                        className={
                          "h-1.5 rounded-full transition-all " +
                          (i === index ? "w-6 bg-white shadow-lg" : "w-1.5 bg-white/40 hover:bg-white/60")
                        }
                        aria-label={`Ver imagen ${i + 1}`}
                        aria-current={i === index ? "true" : undefined}
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
                <h3 className="text-xs font-semibold text-gray-600 dark:text-white/50 uppercase tracking-wide mb-1.5">Descripción</h3>
                <p className="text-sm text-gray-700 dark:text-white/90 leading-snug">{tool.descripcion}</p>
              </div>

              {/* Metadatos */}
              <div>
                <h3 className="text-xs font-semibold text-gray-600 dark:text-white/50 uppercase tracking-wide mb-1.5">Información</h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 text-gray-900 dark:text-white/90">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {tool.categoria}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 text-gray-900 dark:text-white/90">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tool.precio === "gratis" ? "Gratis" : tool.precio === "pago" ? "De pago" : tool.precio}
                  </span>
                  {tool.pruebaGratis && (
                    <span className="inline-flex items-center gap-1.5 text-xs rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-green-700 dark:text-green-400">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              {loadingDetails ? (
                <div className="space-y-2" aria-hidden="true">
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                  <div className="h-3 w-full rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                </div>
              ) : (
                details?.descripcionDetallada && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 dark:text-white/50 uppercase tracking-wide mb-1.5">Detalles</h3>
                    <p className="text-sm text-gray-700 dark:text-white/75 leading-snug">{details.descripcionDetallada}</p>
                  </div>
                )
              )}

              {/* Página completa: capturas, preguntas frecuentes y alternativas */}
              <Link
                href={toolPath(tool.id)}
                replace
                className="group inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-cyan-800 transition hover:text-cyan-950 dark:text-[#00d4ff] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
              >
                Ver ficha completa y alternativas
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Footer acciones */}
              <div className="mt-auto pt-2.5 border-t border-gray-200 dark:border-white/10 flex items-center gap-1.5">
                <a
                  href={tool.enlace}
                  target="_blank"
                  rel={outboundRel(tool.enlace)}
                  className="inline-flex items-center justify-center rounded-lg px-1.5 py-1 text-[14px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-[#00d4ff]/30 hover:bg-[#00d4ff]/30 hover:text-white border border-cyan-700/40 dark:border-[#00d4ff]/30 bg-[#00d4ff]/20 text-cyan-800 dark:text-[#00d4ff] flex-1 mx-0.5 mb-0.5 active:scale-95 active:transform"
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
                  title={isToolFavorite ? "Quitar de guardadas" : "Guardar herramienta"}
                >
                  {isToolFavorite ? "Guardada" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}
