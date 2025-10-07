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
        return "border border-green-500/30 bg-green-500/10 text-green-400 focus-visible:ring-green-400/40";
      case "Guardadas":
        return "border border-black bg-black text-white dark:border-white dark:bg-white dark:text-black focus-visible:ring-white/40";
      case "Destacadas":
        return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 focus-visible:ring-yellow-400/40";
      default:
        return "border border-[#00d4ff] bg-[#00d4ff]/20 text-[#00d4ff] focus-visible:ring-[#00d4ff]/40";
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
            className={
              "rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 tab-neon " +
              (active
                ? getActiveStyles(t)
                : "border border-white/15 text-white/85 hover:bg-white/5 focus-visible:ring-white/30 hover:ring-1 hover:ring-white/30")
            }
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

