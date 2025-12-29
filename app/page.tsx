"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/tool/FilterBar";
import ToolsGrid from "@/components/tool/ToolsGrid";
import type { TabKey } from "@/lib/types";
import type { Tool } from "@/lib/types";
import toolsData from "@/data/tools.json";
import { useFavorites } from "@/hooks/useFavorites";
import { applyTab, filterByCategory, filterByQuery } from "@/lib/filters";
import ToolModal from "@/components/tool/ToolModal";
import { motion } from "framer-motion";
import { TABS } from "@/lib/constants";


export default function Home() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("Todas");
  const [category, setCategory] = useState<string>("Todas las categorías");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Tool | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { ids: favIds } = useFavorites();

  const tools: Tool[] = toolsData as Tool[];

  const categories = useMemo(() => {
    const set = new Set<string>();
    tools.forEach((t) => t.categoria && set.add(t.categoria));
    return ["Todas las categorías", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [tools]);

  // Resetear subcategoría cuando se cambia la categoría
  const handleCategoryChange = (newCategory: string) => {
    // Solo actualizar si la categoría es diferente
    if (category !== newCategory) {
      setCategory(newCategory);
      setSelectedSubcategory(null);
    }
  };

  const filtered = useMemo(() => {
    // 1) Búsqueda
    const byQuery = filterByQuery(tools, query);
    // 2) Categoría y subcategoría
    const byCategory = filterByCategory(byQuery, category, selectedSubcategory || undefined);
    // 3) Tab
    const byTab = applyTab(byCategory, tab, favIds);
    return byTab;
  }, [tools, tab, category, selectedSubcategory, query, favIds]);

  // Evitar discrepancias de hidratación para animaciones framer-motion
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-8">
      <main className="w-full flex flex-col items-center gap-5">
        {/* Full-width hero centrado y compacto (sin desplazamientos) */}
        <div
          className="relative"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
          <section
            className="relative w-full overflow-hidden pt-16 sm:pt-24 pb-6 sm:pb-8 border-b border-gray-400 dark:border-white/15 bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-[#020617] dark:via-[#0b1220] dark:to-[#020617]"
            suppressHydrationWarning
          >
            {/* Efectos futuristas neon eléctricos AMOLED - solo en dark mode */}
            <div className="absolute inset-0 overflow-hidden hidden dark:block">
              {/* Base AMOLED profunda */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0b1220] to-[#020617]" />

              {/* Capa de cristal oscuro */}
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />

              {/* Capa de profundidad con neon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Gradientes laterales eliminados para repartir color */}

              {/* Efectos de brillo central */}
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(900px 400px at 50% -15%, rgba(0,212,255,0.12), transparent 60%)`
              }} />
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, rgba(0,0,0,0) 60%)`
              }} />

              {/* Degradado fluido distribuido */}
              <div className="absolute inset-0 neon-flow" />

              {/* Partículas neon sutiles */}
              <div className="absolute inset-0">
                <div className="hidden" />
                <div className="hidden" />
                <div className="hidden" />
                <div className="hidden" />
              </div>

              {/* Efecto de grid sutil */}
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(35deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 28px)`,
                opacity: .06
              }} />
              <div className="absolute inset-0 pointer-events-none" style={{
                WebkitMaskImage: 'radial-gradient(65% 55% at 50% 10%, #000 60%, transparent 100%)',
                maskImage: 'radial-gradient(65% 55% at 50% 10%, #000 60%, transparent 100%)'
              }} />
            </div>

            {/* Efectos para light mode - versión sutil */}
            <div className="absolute inset-0 overflow-hidden block dark:hidden">
              {/* Efectos de brillo central - versión light */}
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(900px 400px at 50% -15%, rgba(0,140,200,0.06), transparent 60%)`
              }} />
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(120deg, rgba(100,150,200,0.03) 0%, rgba(150,180,220,0.02) 30%, transparent 60%)`
              }} />

              {/* Degradado fluido sutil para light mode */}
              <div className="absolute inset-0 neon-flow-light" />

              {/* Efecto de grid muy sutil */}
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(35deg, rgba(100,120,150,0.03) 0px, rgba(100,120,150,0.03) 1px, transparent 1px, transparent 28px)`,
                opacity: .08
              }} />
            </div>

            {/* Contenido hero: animación de entrada visible (sólo en cliente) */}
            <motion.div
              initial={false}
              animate={mounted ? { opacity: 1, y: 0 } : undefined}
              transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9, duration: 0.55 }}
              className="relative z-10 mx-auto max-w-3xl px-4 text-center -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
            >
              <p className="text-xl sm:text-xl md:text-3xl leading-relaxed text-gray-800 dark:text-white/95 font-display tracking-wide">
                Tu wikipedia de múltiples herramientas IA. Filtra por categorías y descubre.
              </p>
              <div className="mt-10 flex justify-center">
                <SearchBar value={query} onChange={setQuery} onChangeDebounced={setQuery} />
              </div>
            </motion.div>
          </section>
        </div>

        {/* Sección inferior con animaciones de entrada (activas sólo tras montar) */}
        <motion.div
          className="w-full mt-4"
          initial={false}
          whileInView={mounted ? "show" : undefined}
          viewport={mounted ? { once: true, amount: 0.2 } : undefined}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            initial={false}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
            }}
          >
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
          </motion.div>

          <motion.div
            initial={false}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="w-full mt-10"
          >
            <ToolsGrid
              tools={filtered}
              onSelect={(tool) => {
                setSelected(tool);
                setOpen(true);
              }}
            />
          </motion.div>
        </motion.div>
      </main>
      <ToolModal
        tool={selected}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
      />
    </div>
  );
}

