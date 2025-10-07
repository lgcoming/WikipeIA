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

  const filtered = useMemo(() => {
    // 1) Búsqueda
    const byQuery = filterByQuery(tools, query);
    // 2) Categoría
    const byCategory = filterByCategory(byQuery, category);
    // 3) Tab
    const byTab = applyTab(byCategory, tab, favIds);
    return byTab;
  }, [tools, tab, category, query, favIds]);

  // Evitar discrepancias de hidratación para animaciones framer-motion
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-8">
      <main className="w-full flex flex-col items-center gap-3">
        {/* Full-width hero centrado y compacto (sin desplazamientos) */}
        <div
          className="relative"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
        <section
          className="relative w-full overflow-hidden pt-16 sm:pt-24 pb-1 sm:pb-2 border-b border-black/10 dark:border-white/15 bg-gradient-to-br from-black via-blue-950 to-black dark:from-black dark:via-blue-900 dark:to-black"
          suppressHydrationWarning
        >
          {/* Efectos futuristas neon eléctricos AMOLED */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Base AMOLED profunda */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black dark:from-black dark:via-blue-900 dark:to-black" />
            
            {/* Capa de cristal oscuro */}
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
            
            {/* Capa de profundidad con neon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Gradientes neon laterales */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/15 via-transparent to-[#00d4ff]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00a8cc]/10 to-transparent" />
            
            {/* Efectos de brillo central */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#00d4ff]/8 to-transparent" />
            
            {/* Partículas neon sutiles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00d4ff]/40 rounded-full blur-sm" />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#00a8cc]/50 rounded-full blur-sm" />
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#00d4ff]/60 rounded-full blur-sm" />
              <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-[#00a8cc]/30 rounded-full blur-sm" />
            </div>
            
            {/* Efecto de grid sutil */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }} />
            </div>
          </div>

          {/* Contenido hero: animación de entrada visible (sólo en cliente) */}
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9, duration: 0.55 }}
            className="relative z-10 mx-auto max-w-3xl px-4 text-center -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
          >
            <p className="text-lg sm:text-xl md:text-3xl leading-relaxed text-white/95 font-display tracking-wide drop-shadow-lg">
            Tu wikipedia de multiples herramientas IA. Filtra por categorías y descubre.
            </p>
            <div className="mt-8 flex justify-center">
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
              onCategoriaChange={setCategory}
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

