"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Los componentes usan `m.*` en lugar de `motion.*`: el núcleo de animación no va en el
 * JavaScript inicial y se descarga en segundo plano. `strict` avisa si alguien usa `motion.*`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
