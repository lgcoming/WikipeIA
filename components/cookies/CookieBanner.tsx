"use client";

import { useCookies } from "@/lib/cookieContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const { showBanner, acceptAll, denyAll, openSettings, closeBanner } = useCookies();

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-zinc-950 backdrop-blur-xl shadow-2xl">
            {/* Content */}
            <div className="relative p-4">
              <div className="flex items-center justify-between gap-4">
                
                {/* Text content */}
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">🍪</span>
                  <p className="text-sm text-white/90">
                    Utilizamos cookies para mejorar su experiencia.{" "}
                    <button 
                      onClick={openSettings}
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
                    >
                      Configurar
                    </button>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={denyAll}
                    className="rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    Solo Esenciales
                  </button>
                  
                  <button
                    onClick={acceptAll}
                    className="rounded-lg border border-white/60 bg-[#007aa3]/80 hover:bg-[#007aa3] px-4 py-1.5 text-xs font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    Aceptar
                  </button>

                  <button
                    onClick={closeBanner}
                    className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 ml-1"
                    aria-label="Cerrar"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
