"use client";

import Tabs from "@/components/ui/Tabs";
import CategorySelect from "@/components/ui/CategorySelect";
import type { TabKey } from "@/lib/types";

export default function FilterBar({
  tabs,
  tab,
  onTabChange,
  categories,
  categoria,
  onCategoriaChange,
}: {
  tabs: TabKey[];
  tab: TabKey;
  onTabChange: (t: TabKey) => void;
  categories: string[];
  categoria: string;
  onCategoriaChange: (c: string) => void;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <CategorySelect
        categories={categories}
        value={categoria}
        onChange={onCategoriaChange}
      />
      <Tabs tabs={tabs} value={tab} onChange={onTabChange} />
    </div>
  );
}
