"use client";

import { memo } from "react";
import type { TabKey } from "@/lib/types";

function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: TabKey[];
  value: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const getActiveStyles = (tab: TabKey) => {
    switch (tab) {
      case "Gratis":
        return "border border-green-600 dark:border-green-500/30 bg-green-500/10 dark:bg-green-500/10 text-green-700 dark:text-green-400 focus-visible:ring-green-600 dark:focus-visible:ring-green-400/40";
      case "Guardadas":
        return "border border-black bg-black text-white dark:border-white dark:bg-white dark:text-black focus-visible:ring-white/40";
      case "Destacadas":
        return "border border-yellow-600 dark:border-yellow-500/30 bg-yellow-500/10 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 focus-visible:ring-yellow-600 dark:focus-visible:ring-yellow-400/40";
      case "Nuevas":
        return "border border-cyan-600 dark:border-[#00d4ff] bg-cyan-500/10 dark:bg-[#00d4ff]/20 text-cyan-700 dark:text-[#00d4ff] focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/40";
      case "Todas":
        return "border-gray-400 dark:border-white/15 bg-white dark:bg-zinc-900/70 text-gray-900 dark:text-white/85";
      default:
        return "border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30";
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-wrap gap-3 justify-center" role="tablist" aria-label="Filtrar por tipo">
      {tabs.map((t) => {
        const active = t === value;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`rounded-full px-5 py-2.5 text-base border transition focus-visible:outline-none focus-visible:ring-2 tab-neon ${active
              ? getActiveStyles(t)
              : "border-gray-400 dark:border-white/15 text-gray-800 dark:text-white/85 hover:bg-gray-100 dark:hover:bg-white/5 focus-visible:ring-blue-500 dark:focus-visible:ring-white/30"
              }`}
            role="tab"
            aria-selected={active}

            tabIndex={active ? 0 : -1}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default memo(Tabs);

