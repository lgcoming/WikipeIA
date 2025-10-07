"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

const KEY = "wikipeia:favs";
const EVT = "wikipeia:favs:update";

type FavsContextValue = {
  ids: string[];
  isFav: (id: string) => boolean;
  toggle: (id: string) => void;
  list: () => string[];
};

export const FavsContext = createContext<FavsContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Inicialización SINCRONA desde localStorage
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Persistencia + broadcast
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
      window.dispatchEvent(new CustomEvent<string[]>(EVT, { detail: ids }));
    } catch {
      // ignore
    }
  }, [ids]);

  // Suscripciones (cross-tab y misma pestaña)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) : [];
          setIds(Array.isArray(next) ? next : []);
        } catch {
          // ignore
        }
      }
    };
    const onCustom = (e: Event) => {
      try {
        const detail = (e as CustomEvent<string[]>).detail;
        if (Array.isArray(detail)) setIds(detail);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(EVT, onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVT, onCustom as EventListener);
    };
  }, []);

  const isFav = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);
  const list = useCallback(() => ids.slice(), [ids]);

  const value = useMemo(() => ({ ids, isFav, toggle, list }), [ids, isFav, toggle, list]);

  return <FavsContext.Provider value={value}>{children}</FavsContext.Provider>;
}

