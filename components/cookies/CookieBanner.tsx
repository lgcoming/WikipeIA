"use client";

import { useCookies } from "@/lib/cookieContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const { showBanner, acceptAll, denyAll, closeBanner } = useCookies();

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(88vw,560px)] sm:w-[min(92vw,820px)] lg:w-[min(92vw,960px)]"
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-zinc-950 backdrop-blur-xl shadow-2xl">
            {/* Content */}
            <div className="relative p-4 pr-10 sm:pr-12">
              {/* Close button absolute */}
              <button
                onClick={closeBanner}
                className="absolute top-2 right-2 rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Cerrar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Text content */}
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-sm text-white/90 text-center sm:text-left sm:whitespace-nowrap">
                    Utilizamos las cookies para ofrecerte la mejor experiencia en nuestra web.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end sm:flex-nowrap">
                  <button
                    onClick={denyAll}
                    className="rounded-lg px-2.5 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 hover:ring-1 hover:ring-white/25 border border-white/20 bg-white/10 text-white hover:bg-white/15"
                  >
                    Solo Esenciales
                  </button>
                  
                  <button
                    onClick={acceptAll}
                    className="rounded-lg px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-[#00d4ff]/30 border border-[#00d4ff]/30 bg-[#00d4ff]/20 text-[#00d4ff]"
                  >
                    Aceptar
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
