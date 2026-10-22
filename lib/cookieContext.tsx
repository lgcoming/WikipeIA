"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, ReactNode } from "react";

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

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Siempre true, no se puede desactivar
  analytics: false,
  personalization: false,
};

// localStorage como store externo: el SSR lee null y el cliente lee el valor guardado
// sin setState dentro de un efecto.
const storageListeners = new Set<() => void>();
const subscribeStorage = (listener: () => void) => {
  storageListeners.add(listener);
  return () => {
    storageListeners.delete(listener);
  };
};
const writeStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
  storageListeners.forEach((listener) => listener());
};
const useStoredValue = (key: string) =>
  useSyncExternalStore(
    subscribeStorage,
    () => localStorage.getItem(key),
    () => null
  );

export function CookieProvider({ children }: { children: ReactNode }) {
  const savedConsent = useStoredValue(COOKIE_CONSENT_KEY);
  const savedPreferences = useStoredValue(COOKIE_PREFERENCES_KEY);

  const preferences = useMemo<CookiePreferences>(() => {
    if (!savedPreferences) return DEFAULT_PREFERENCES;
    try {
      return { ...JSON.parse(savedPreferences), essential: true }; // Essential siempre true
    } catch (error) {
      console.error("Error parsing cookie preferences:", error);
      return DEFAULT_PREFERENCES;
    }
  }, [savedPreferences]);

  const hasConsented = savedConsent === "true";
  const [bannerDelayElapsed, setBannerDelayElapsed] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const showBanner = !hasConsented && bannerDelayElapsed && !bannerClosed;

  // Mostrar banner después de un pequeño delay para mejor UX
  useEffect(() => {
    const id = setTimeout(() => setBannerDelayElapsed(true), 1000);
    return () => clearTimeout(id);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const prefsToSave = { ...prefs, essential: true };
    writeStorage(COOKIE_PREFERENCES_KEY, JSON.stringify(prefsToSave));
    writeStorage(COOKIE_CONSENT_KEY, "true");
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
    setBannerClosed(true);
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
