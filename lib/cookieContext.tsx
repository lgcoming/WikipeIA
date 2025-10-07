"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  personalization: boolean;
};

type CookieContextType = {
  preferences: CookiePreferences;
  hasConsented: boolean;
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  denyAll: () => void;
  updatePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_PREFERENCES_KEY = "cookie-preferences";

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Siempre true, no se puede desactivar
    analytics: false,
    personalization: false,
  });

  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cargar preferencias guardadas al inicializar
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedConsent === "true") {
      setHasConsented(true);
      setShowBanner(false);
    } else {
      // Mostrar banner después de un pequeño delay para mejor UX
      setTimeout(() => setShowBanner(true), 1000);
    }

    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...parsed, essential: true }); // Essential siempre true
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const prefsToSave = { ...prefs, essential: true };
    setPreferences(prefsToSave);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefsToSave));
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Aplicar preferencias de cookies
    applyPreferences(prefsToSave);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Aquí puedes integrar con servicios de analytics
    if (prefs.analytics) {
      // Habilitar Google Analytics, etc.
      console.log("Analytics cookies enabled");
    } else {
      // Deshabilitar analytics
      console.log("Analytics cookies disabled");
    }

    if (prefs.personalization) {
      // Habilitar cookies de personalización
      console.log("Personalization cookies enabled");
    } else {
      // Deshabilitar personalización
      console.log("Personalization cookies disabled");
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      personalization: true,
    };
    savePreferences(allAccepted);
  };

  const denyAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      personalization: false,
    };
    savePreferences(onlyEssential);
  };

  const updatePreferences = (prefs: CookiePreferences) => {
    savePreferences(prefs);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  const value: CookieContextType = {
    preferences,
    hasConsented,
    showBanner,
    showSettings,
    acceptAll,
    denyAll,
    updatePreferences,
    openSettings,
    closeSettings,
    closeBanner,
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookies must be used within a CookieProvider");
  }
  return context;
}
