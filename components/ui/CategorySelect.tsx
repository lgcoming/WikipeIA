"use client";

import { memo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { ToolSummary } from "@/lib/types";

// Mapa de subcategorías por categoría
const SUBCATEGORIES: Record<string, string[]> = {
  "Multimedia": ["Video", "Música", "Imagen", "Audio", "Redes Sociales"],
  "Diseño": ["Logos", "Realista", "3D", "Multimedia", "Documentos", "Presentaciones", "Tipografía"],
  "Marketing": ["Contenido", "Redes Sociales", "SEO", "Publicidad", "Análisis", "Email", "Multimedia", "Planificación", "Productividad", "Publicidad", "Texto"],
  "Asistentes": ["Texto", "Especializado", "Contenido", "Idiomas", "Navegador", "Reuniones"],
  "Servicios": ["Automatización", "Email", "Agentes", "Análisis", "Documentos", "Texto"],
  "Desarrollo": ["Programación", "LLM", "Contenido", "Diseño", "UI/UX"],
};

function CategorySelect({
  categories,
  value,
  onChange,
  tools,
  onSubcategoryChange,
  selectedSubcategory,
}: {
  categories: string[]; // include "Todas las categorías" as first option from parent
  value: string;
  onChange: (c: string) => void;
  tools: ToolSummary[];
  onSubcategoryChange: (s: string | null) => void;
  selectedSubcategory: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Derivada del value: el padre ya resetea la subcategoría al cambiar de categoría
  const selectedCategory = value && value !== "Todas las categorías" ? value : null;

  // Filtrar categorías (excluir "Todas las categorías")
  const categoryOptions = categories.filter(c => c !== "Todas las categorías");

  // Obtener subcategorías únicas para la categoría seleccionada
  const getSubcategories = (category: string | null): string[] => {
    if (!category || category === "Todas las categorías") return [];

    // Obtener subcategorías del mapa estático
    const staticSubcategories = SUBCATEGORIES[category] || [];

    // Obtener subcategorías de las herramientas existentes
    const toolSubcategories = new Set<string>();
    tools
      .filter(tool => tool.categoria === category && tool.subcategoria)
      .forEach(tool => {
        tool.subcategoria?.forEach(sub => toolSubcategories.add(sub));
      });

    // Combinar y eliminar duplicados
    const allSubcategories = [...new Set([...staticSubcategories, ...Array.from(toolSubcategories)])];

    return allSubcategories.sort();
  };

  const subcategories = getSubcategories(selectedCategory);

  // Colores para cada categoría (oscuros en light mode, claros en dark mode)
  const getCategoryColor = (category: string) => {
    const colors = {
      "Todas las categorías": "border-gray-400 dark:border-white/15 bg-white dark:bg-zinc-900/70 text-gray-900 dark:text-white/85",
      "Marketing": "bg-pink-500/20 dark:bg-pink-500/20 border-pink-600 dark:border-pink-400/50 text-pink-700 dark:text-pink-300",
      "Desarrollo": "bg-emerald-500/20 dark:bg-emerald-500/20 border-emerald-600 dark:border-emerald-400/50 text-emerald-700 dark:text-emerald-300",
      "Diseño": "bg-red-500/20 dark:bg-red-500/20 border-red-600 dark:border-red-400/50 text-red-700 dark:text-red-300",
      "Contenido": "bg-orange-500/20 dark:bg-orange-500/20 border-orange-600 dark:border-orange-400/50 text-orange-700 dark:text-orange-300",
      "Asistentes": "bg-violet-500/20 dark:bg-violet-500/20 border-violet-600 dark:border-violet-400/50 text-violet-700 dark:text-violet-300",
      "Multimedia": "bg-indigo-500/20 dark:bg-indigo-500/20 border-indigo-600 dark:border-indigo-400/50 text-indigo-700 dark:text-indigo-300",
      "Servicios": "bg-yellow-500/20 dark:bg-yellow-500/20 border-yellow-600 dark:border-yellow-400/50 text-yellow-700 dark:text-yellow-300",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 border-gray-600 dark:border-gray-400/50 text-gray-700 dark:text-gray-300";
  };

  const getSelectorColor = (value: string) => {
    if (value === "Todas las categorías") {
      return "border-gray-400 dark:border-white/15 bg-white dark:bg-zinc-900/70 text-gray-900 dark:text-white/85";
    }
    return getCategoryColor(value);
  };

  const handleCategorySelect = (category: string) => {
    if (category === "Todas las categorías") {
      onChange(category);
      onSubcategoryChange(null);
      // Mantener abierto para seguir viendo categorías si el usuario quiere
      return;
    }
    // Seleccionar categoría inmediatamente y mostrar subcategorías debajo
    onChange(category);
    // Cerrar el panel; las subcategorías se muestran fuera del panel
    setIsOpen(false);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    if (selectedCategory) {
      // Solo actualizamos la categoría si es diferente a la actual
      if (value !== selectedCategory) {
        onChange(selectedCategory);
      }
      // Actualizamos la subcategoría seleccionada
      onSubcategoryChange(subcategory);
    }
  };

  const handleClearSubcategory = () => {
    onSubcategoryChange(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Botón trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-xl border px-5 py-2.5 text-lg outline-none shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40 hover:ring-1 hover:ring-white/30 min-w-[100px] ${getSelectorColor(value)}`}
        aria-expanded={isOpen}
        aria-controls="panel-categorias"
      >
        {value === "Todas las categorías" ? "Categorías" : value}
        <span className="ml-2" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Botones de categorías con animación */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            id="panel-categorias"
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap justify-center gap-3 max-w-7xl">
                {/* Botón "Todas" */}
                <m.button
                  type="button"
                  aria-pressed={value === "Todas las categorías"}
                  key="Todas las categorías"
                  onClick={() => handleCategorySelect("Todas las categorías")}
                  className={`rounded-full px-5 py-2.5 text-base border transition focus-visible:outline-none focus-visible:ring-2 tab-neon min-w-[110px] ${value === "Todas las categorías"
                    ? getCategoryColor("Todas las categorías")
                    : "border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Todas
                </m.button>

                {/* Botones de categorías */}
                {categoryOptions.map((category, index) => (
                  <m.button
                    type="button"
                    aria-pressed={value === category}
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`rounded-full px-5 py-2.5 text-base border transition focus-visible:outline-none focus-visible:ring-2 tab-neon min-w-[110px] ${value === category
                      ? getCategoryColor(category)
                      : "border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30"
                      }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </m.button>
                ))}
              </div>
            </div>

            {/* Subcategorías dentro del panel: eliminado; ahora se renderizan fuera */}
          </m.div>
        )}
      </AnimatePresence>

      {/* Subcategorías: visibles aunque el panel esté cerrado */}
      {selectedCategory && subcategories.length > 0 && (
        <m.div
          role="group"
          aria-label={`Subcategorías de ${selectedCategory}`}
          className="flex flex-wrap justify-center gap-3 w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Botón para limpiar subcategoría */}
          <m.button
            type="button"
            aria-pressed={!selectedSubcategory}
            onClick={handleClearSubcategory}
            className={`rounded-full px-5 py-2.5 text-base border transition focus-visible:outline-none focus-visible:ring-2 tab-neon min-w-[110px] ${!selectedSubcategory
              ? getCategoryColor(selectedCategory)
              : `border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30`
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todas
          </m.button>

          {/* Botones de subcategorías */}
          {subcategories.map((subcategory, index) => {
            const isSelected = selectedSubcategory === subcategory;
            const baseClass = "rounded-full px-5 py-2.5 text-base border transition focus-visible:outline-none focus-visible:ring-2 tab-neon min-w-[110px]";
            const selectedClass = getCategoryColor(selectedCategory);
            const unselectedClass = "border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30";

            return (
              <m.button
                type="button"
                aria-pressed={isSelected}
                key={subcategory}
                onClick={() => handleSubcategorySelect(subcategory)}
                className={`${baseClass} ${isSelected ? selectedClass : unselectedClass}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subcategory}
              </m.button>
            );
          })}
        </m.div>
      )}
    </div>
  );
}

export default memo(CategorySelect);