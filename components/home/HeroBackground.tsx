"use client";

import { useEffect, useRef } from "react";

const LENS_RADIUS = 180; // la mitad del tamaño de .hero-lens (360px)

/**
 * Fondo animado del hero de la portada (estilos en app/effects.css).
 * La lente que ilumina los puntos sigue al ratón; en táctil o con movimiento reducido no se activa.
 */
export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensDotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = rootRef.current?.parentElement;
    const lens = lensRef.current;
    const lensDots = lensDotsRef.current;
    if (!section || !lens || !lensDots) return;

    // Con el hero fuera de la pantalla se pausan sus animaciones infinitas (ahorra batería y GPU).
    const visibility = new IntersectionObserver(([entry]) => {
      section.classList.toggle("is-offscreen", !entry.isIntersecting);
    });
    visibility.observe(section);

    const canTrack = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTrack || reduceMotion) return () => visibility.disconnect();

    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = 0;
      // La lente se coloca bajo el cursor y su retícula interior se desplaza al revés para
      // que los puntos cian queden exactamente encima de los de la retícula base.
      lens.style.transform = `translate3d(${x - LENS_RADIUS}px, ${y - LENS_RADIUS}px, 0)`;
      lensDots.style.transform = `translate3d(${LENS_RADIUS - x}px, ${LENS_RADIUS - y}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      lens.classList.add("is-active");
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => lens.classList.remove("is-active");

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-base absolute inset-0" />
      <div className="hero-aurora hero-aurora-a" />
      <div className="hero-aurora hero-aurora-b" />
      <div className="hero-dots absolute inset-0" />
      <div ref={lensRef} className="hero-lens">
        <div ref={lensDotsRef} className="hero-lens-dots" />
      </div>
      <div className="hero-horizon-glow" />
      <div className="hero-horizon" />
    </div>
  );
}
