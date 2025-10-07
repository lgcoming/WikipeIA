"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CategorySelect({
  categories,
  value,
  onChange,
}: {
  categories: string[]; // include "Todas las categorías" as first option from parent
  value: string;
  onChange: (c: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filtrar categorías (excluir "Todas las categorías")
  const categoryOptions = categories.filter(c => c !== "Todas las categorías");

  // Colores para cada categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      "Todas las categorías": "bg-blue-500/20 border-blue-400/50 text-blue-300",
      "Marketing": "bg-pink-500/20 border-pink-400/50 text-pink-300",
      "Multimedia": "bg-emerald-500/20 border-emerald-400/50 text-emerald-300",
      "Diseño": "bg-red-500/20 border-red-400/50 text-red-300",
      "Contenido": "bg-orange-500/20 border-orange-400/50 text-orange-300",
      "Asistentes": "bg-cyan-500/20 border-cyan-400/50 text-cyan-300",
      "Clientes": "bg-violet-500/20 border-violet-400/50 text-violet-300",
      "Tecnología": "bg-indigo-500/20 border-indigo-400/50 text-indigo-300",
      "Negocios": "bg-yellow-500/20 border-yellow-400/50 text-yellow-300",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 border-gray-400/50 text-gray-300";
  };

  const getSelectorColor = (value: string) => {
    if (value === "Todas las categorías") {
      return "border-white/15 bg-zinc-900/70 text-white/85";
    }
    return getCategoryColor(value);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Botón trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-xl border px-4 py-2 text-sm outline-none shadow-sm focus:ring-2 focus:ring-white/40 hover:ring-1 hover:ring-white/30 min-w-[100px] ${getSelectorColor(value)}`}
        aria-label="Selector de categoría"
      >
        {value === "Todas las categorías" ? "Categorías" : value}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Botones de categorías con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 max-w-4xl"
          >
            {/* Botón "Todas" */}
            <motion.button
              key="Todas las categorías"
              onClick={() => {
                onChange("Todas las categorías");
                setIsOpen(false);
              }}
              className={`rounded-full px-4 py-2 text-sm border transition focus-visible:outline-none focus-visible:ring-2 tab-neon ${
                value === "Todas las categorías"
                  ? getCategoryColor("Todas las categorías")
                  : "border-white/15 text-white/85 hover:bg-white/5 focus-visible:ring-white/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Todas
            </motion.button>

            {/* Botones de categorías */}
            {categoryOptions.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => {
                  onChange(category);
                  setIsOpen(false);
                }}
                className={`rounded-full px-4 py-2 text-sm border transition focus-visible:outline-none focus-visible:ring-2 tab-neon ${
                  value === category
                    ? getCategoryColor(category)
                    : "border-white/15 text-white/85 hover:bg-white/5 focus-visible:ring-white/30"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(CategorySelect);