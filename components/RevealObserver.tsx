"use client";

import { useEffect } from "react";

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 6;
const START_DELAY_MS = 2500;

/**
 * Aparición al hacer scroll para cualquier elemento con `data-reveal` (estilos en app/effects.css),
 * y arranque de las animaciones ambientales del hero (clase `fx-ready` en <html>).
 *
 * Nada de esto compite con la carga: empieza con el primer scroll o pasados unos segundos.
 * Solo se ocultan los bloques que siguen por debajo de la pantalla en ese momento, así que lo
 * visible nunca parpadea y sin JavaScript se ve todo. Los que entran a la vez aparecen escalonados.
 * Se monta una vez en el layout: el contenido de las páginas a las que se navega después lo
 * detecta el MutationObserver.
 */
export default function RevealObserver() {
  useEffect(() => {
    let cleanup = () => {};
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      window.removeEventListener("scroll", start);
      window.clearTimeout(timeoutId);
      document.documentElement.classList.add("fx-ready");
      if (!("IntersectionObserver" in window)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      cleanup = setupReveal();
    };

    const timeoutId = window.setTimeout(start, START_DELAY_MS);
    window.addEventListener("scroll", start, { passive: true, once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", start);
      cleanup();
    };
  }, []);

  return null;
}

function setupReveal() {
  // Elementos ya clasificados: la primera notificación del observador dice dónde está cada uno
  // (sin forzar cálculos de layout desde JavaScript).
  const classified = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      let step = 0;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;

        if (!classified.has(el)) {
          classified.add(el);
          const below = !entry.isIntersecting && entry.boundingClientRect.top > (entry.rootBounds?.bottom ?? window.innerHeight);
          if (below) el.classList.add("reveal-pending");
          else observer.unobserve(el);
          continue;
        }

        if (!entry.isIntersecting) continue;
        observer.unobserve(el);
        el.style.transitionDelay = `${Math.min(step++, MAX_STAGGER_STEPS) * STAGGER_MS}ms`;
        el.classList.remove("reveal-pending");
        el.addEventListener("transitionend", () => el.style.removeProperty("transition-delay"), { once: true });
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );

  const observe = (el: HTMLElement) => {
    if (el.dataset.revealReady !== undefined) return;
    el.dataset.revealReady = "";
    observer.observe(el);
  };

  const collect = (root: ParentNode) => root.querySelectorAll<HTMLElement>("[data-reveal]");
  collect(document).forEach(observe);

  // Elementos que aparecen después (por ejemplo, tarjetas nuevas al filtrar).
  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches("[data-reveal]")) observe(node);
        collect(node).forEach(observe);
      });
    }
  });
  mutations.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutations.disconnect();
  };
}
