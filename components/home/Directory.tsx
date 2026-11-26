"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import FilterBar from "@/components/tool/FilterBar";
import ToolsGrid from "@/components/tool/ToolsGrid";
import type { TabKey, ToolSummary } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import { applyTab, filterByCategory, filterByQuery } from "@/lib/filters";
import { TABS } from "@/lib/constants";
import { toolPath } from "@/lib/categories";

// La ficha solo se descarga cuando se abre por primera vez.
const ToolModal = dynamic(() => import("@/components/tool/ToolModal"));

const ALL_CATEGORIES = "Todas las categorías";

const TOOL_PATH = /^\/herramientas\/([^/]+)\/?$/;

export default function Directory({ tools }: { tools: ToolSummary[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("Todas");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<ToolSummary | null>(null);
  const { ids: favIds } = useFavorites();

  // El campo de búsqueda se actualiza al instante; la rejilla se recalcula con prioridad baja
  // para que escribir no se trabe en móviles.
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const set = new Set<string>();
    tools.forEach((t) => t.categoria && set.add(t.categoria));
    return [ALL_CATEGORIES, ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [tools]);

  // Cifras reales del catálogo para el hero
  const stats = useMemo(
    () => [
      { value: tools.length, label: "herramientas" },
      { value: categories.length - 1, label: "categorías" },
      { value: tools.filter((t) => t.precio === "gratis").length, label: "gratuitas" },
    ],
    [tools, categories],
  );

  // Resetear subcategoría cuando se cambia la categoría
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      if (category !== newCategory) {
        setCategory(newCategory);
        setSelectedSubcategory(null);
      }
    },
    [category],
  );

  const filtered = useMemo(() => {
    const byQuery = filterByQuery(tools, deferredQuery);
    const byCategory = filterByCategory(byQuery, category, selectedSubcategory || undefined);
    return applyTab(byCategory, tab, favIds);
  }, [tools, tab, category, selectedSubcategory, deferredQuery, favIds]);

  // La ficha rápida cambia la URL a la de la página de la herramienta (se puede copiar y compartir)
  // y el botón Atrás la cierra. La página de fondo no cambia: Next solo actualiza la URL.
  const pushedRef = useRef(false);

  const handleSelect = useCallback((tool: ToolSummary) => {
    setSelected(tool);
    const path = toolPath(tool.id);
    if (window.location.pathname === path) return;
    if (pushedRef.current) {
      window.history.replaceState(window.history.state, "", path);
    } else {
      window.history.pushState(null, "", path);
      pushedRef.current = true;
    }
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
    if (!TOOL_PATH.test(window.location.pathname)) return;
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      window.history.replaceState(window.history.state, "", "/");
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const match = TOOL_PATH.exec(window.location.pathname);
      const tool = match ? tools.find((t) => t.id === decodeURIComponent(match[1])) : undefined;
      // Si se vuelve a una ficha con Adelante, detrás queda el directorio: cerrar será volver atrás.
      pushedRef.current = Boolean(tool);
      setSelected(tool ?? null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [tools]);

  // Título de la pestaña mientras la ficha está abierta (lo usan marcadores e historial).
  useEffect(() => {
    if (!selected) return;
    const previous = document.title;
    document.title = `${selected.nombre}: qué es, precio y alternativas | WikipeIA`;
    return () => {
      document.title = previous;
    };
  }, [selected]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-8">
      <div className="w-full flex flex-col items-center gap-5">
        <HomeHero query={query} onQueryChange={setQuery} stats={stats} />

        <div className="w-full mt-6 sm:mt-8">
          <FilterBar
            tabs={TABS}
            tab={tab}
            onTabChange={setTab}
            categories={categories}
            categoria={category}
            onCategoriaChange={handleCategoryChange}
            tools={tools}
            onSubcategoryChange={setSelectedSubcategory}
            selectedSubcategory={selectedSubcategory}
          />

          <div className="w-full mt-10">
            <h2 className="sr-only">Herramientas</h2>
            <ToolsGrid tools={filtered} onSelect={handleSelect} />
          </div>
        </div>
      </div>
      {selected && <ToolModal tool={selected} open onClose={handleClose} />}
    </div>
  );
}
