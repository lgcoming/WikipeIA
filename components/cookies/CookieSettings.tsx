"use client";

import { useCookies } from "@/lib/cookieContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function CookieSettings() {
  const { 
    showSettings, 
    preferences, 
    updatePreferences, 
    closeSettings, 
    acceptAll, 
    denyAll 
  } = useCookies();

  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleToggle = (key: keyof typeof localPreferences) => {
    if (key === "essential") return; // No se puede desactivar
    
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      personalization: true,
    };
    setLocalPreferences(allAccepted);
    updatePreferences(allAccepted);
  };

  const handleDenyAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      personalization: false,
    };
    setLocalPreferences(onlyEssential);
    updatePreferences(onlyEssential);
  };

  if (!showSettings) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={closeSettings}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 backdrop-blur-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Configuración de Cookies</h2>
                  <p className="text-sm text-white/60">Personaliza tus preferencias de privacidad</p>
                </div>
              </div>
              <button
                onClick={closeSettings}
                className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Cerrar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Essential Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <h3 className="font-semibold text-white">Cookies Esenciales</h3>
                    <p className="text-sm text-white/70">Necesarias para el funcionamiento básico</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-green-500/20 border border-green-500/30">
                    <div className="h-5 w-5 rounded-full bg-green-500 transform translate-x-5 transition-transform" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/60 ml-11">
                Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="font-semibold text-white">Cookies Analíticas</h3>
                    <p className="text-sm text-white/70">Ayudan a mejorar nuestro sitio web</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("analytics")}
                  className="relative focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-full"
                >
                  <div className={`h-6 w-11 rounded-full border transition-colors ${
                    localPreferences.analytics 
                      ? "bg-blue-500/20 border-blue-500/30" 
                      : "bg-white/10 border-white/20"
                  }`}>
                    <div className={`h-5 w-5 rounded-full transition-all duration-200 ${
                      localPreferences.analytics 
                        ? "bg-blue-500 transform translate-x-5" 
                        : "bg-white/60 transform translate-x-0"
                    }`} />
                  </div>
                </button>
              </div>
              <p className="text-xs text-white/60 ml-11">
                Recopilan información anónima sobre cómo usa el sitio web para ayudarnos a mejorarlo.
              </p>
            </div>

            {/* Personalization Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-white">Cookies de Personalización</h3>
                    <p className="text-sm text-white/70">Personalizan su experiencia</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle("personalization")}
                  className="relative focus:outline-none focus:ring-2 focus:ring-purple-400/50 rounded-full"
                >
                  <div className={`h-6 w-11 rounded-full border transition-colors ${
                    localPreferences.personalization 
                      ? "bg-purple-500/20 border-purple-500/30" 
                      : "bg-white/10 border-white/20"
                  }`}>
                    <div className={`h-5 w-5 rounded-full transition-all duration-200 ${
                      localPreferences.personalization 
                        ? "bg-purple-500 transform translate-x-5" 
                        : "bg-white/60 transform translate-x-0"
                    }`} />
                  </div>
                </button>
              </div>
              <p className="text-xs text-white/60 ml-11">
                Guardan sus preferencias y configuraciones para personalizar su experiencia.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex gap-3">
                <button
                  onClick={handleDenyAll}
                  className="rounded-lg border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Solo Esenciales
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-lg border border-white/60 bg-[#007aa3]/80 hover:bg-[#007aa3] px-4 py-2 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Aceptar Todo
                </button>
              </div>
              <button
                onClick={handleSave}
                className="rounded-lg border border-white/60 bg-[#007aa3]/80 hover:bg-[#007aa3] px-6 py-2 text-sm font-medium text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
