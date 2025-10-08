"use client";

import type { Tool } from "@/lib/types";
import ToolCard from "./ToolCard";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";

function ToolsGrid({ tools, onSelect }: { tools: Tool[]; onSelect?: (tool: Tool) => void }) {
  if (!tools?.length) {
    return (
      <div className="text-sm text-black/70 dark:text-white/80">No hay herramientas para mostrar.</div>
    );
  }
  return (
    <div className="grid w-full max-w-[69rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-5 items-stretch px-8 sm:px-0">
      <AnimatePresence initial={false} mode="popLayout">
        {tools.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.6 }}
            className="h-full"
          >
            <ToolCard tool={t} onSelect={onSelect} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default memo(ToolsGrid);
