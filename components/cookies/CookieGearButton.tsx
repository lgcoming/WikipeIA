"use client";

import { useCookies } from "@/lib/cookieContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieGearButton() {
  const { hasConsented, openSettings } = useCookies();

  // Solo mostrar si el usuario ya ha dado consentimiento
  if (!hasConsented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          delay: 0.5 // Pequeño delay para que aparezca después del banner
        }}
        className="fixed bottom-6 left-6 z-40"
      >
        <motion.button
          onClick={openSettings}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm shadow-lg transition-all hover:bg-black/60 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Configurar cookies"
          title="Configurar cookies"
        >
          {/* Icon */}
          <motion.svg
            className="h-5 w-5 text-white/70 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </motion.svg>

          {/* Tooltip */}
          <div className="absolute left-full ml-3 hidden group-hover:block">
            <div className="relative">
              <div className="rounded-lg bg-black/90 backdrop-blur-sm px-3 py-2 text-xs text-white whitespace-nowrap border border-white/20">
                Configurar cookies
              </div>
              <div className="absolute right-full top-1/2 -translate-y-1/2">
                <div className="border-4 border-transparent border-r-black/90" />
              </div>
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
