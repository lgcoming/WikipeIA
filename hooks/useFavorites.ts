"use client";

import { useContext } from "react";
import { FavsContext } from "@/lib/favoritesContext";

export function useFavorites() {
  const ctx = useContext(FavsContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  return ctx;
}
