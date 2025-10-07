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
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Parallax suave con el cursor para los difuminados del hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 100, damping: 20, mass: 0.3 });
  // Capas con distintos factores para dar profundidad
  const xLayer1 = useTransform(sx, (v) => v * 0.8);
  const yLayer1 = useTransform(sy, (v) => v * 0.8);
  const xLayer2 = useTransform(sx, (v) => v * -0.6);
  const yLayer2 = useTransform(sy, (v) => v * -0.4);

  return (
    <div className="min-h-screen w-full flex flex-col gap-8">
      <main className="w-full flex flex-col items-center gap-3">
        {/* Full-width hero centrado y compacto (sin desplazamientos) */}
        <div
          className="relative"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
        <section
          className="relative w-full overflow-hidden pt-16 sm:pt-24 pb-1 sm:pb-2 border-b border-black/10 dark:border-white/15"
          suppressHydrationWarning
          onMouseMove={(e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mx.set((e.clientX - cx) * 0.06);
            my.set((e.clientY - cy) * 0.08);
          }}
        >
          {/* Auroras / blobs animados */}
          <motion.div className="absolute inset-0" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.div
              className="aurora-layer absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-2xl"
              style={{
                background: "radial-gradient(closest-side, rgba(0,212,255,0.45), transparent)",
                x: xLayer1,
                y: yLayer1,
              }}
              animate={{ y: [0, -10, 0], x: [0, 8, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="aurora-layer absolute -top-24 right-[-120px] h-[28rem] w-[28rem] rounded-full blur-2xl"
              style={{
                background: "radial-gradient(closest-side, rgba(79,70,229,0.4), transparent)",
                x: xLayer2,
                y: yLayer2,
              }}
              animate={{ y: [0, 12, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Contenido hero: animación de entrada visible (sólo en cliente) */}
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9, duration: 0.55 }}
            className="relative z-10 mx-auto max-w-3xl px-4 text-center -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
          >
            <p className="text-lg sm:text-xl md:text-3xl leading-relaxed text-white/90 neon-text font-display tracking-wide">
            Tu wikipedia de multiples herramientas IA. Filtra por categorías y descubre.
            </p>
            <div className="mt-12 flex justify-center">
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

