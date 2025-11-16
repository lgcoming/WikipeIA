"use client";

import Tabs from "@/components/ui/Tabs";
import CategorySelect from "@/components/ui/CategorySelect";
import type { TabKey } from "@/lib/types";
import type { Tool } from "@/lib/types";

export default function FilterBar({
  tabs,
  tab,
  onTabChange,
  categories,
  categoria,
  onCategoriaChange,
  tools,
  onSubcategoryChange,
  selectedSubcategory,
}: {
  tabs: TabKey[];
  tab: TabKey;
  onTabChange: (t: TabKey) => void;
  categories: string[];
  categoria: string;
  onCategoriaChange: (c: string) => void;
  tools: Tool[];
  onSubcategoryChange: (s: string | null) => void;
  selectedSubcategory: string | null;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <CategorySelect
        categories={categories}
        value={categoria}
        onChange={onCategoriaChange}
        tools={tools}
        onSubcategoryChange={onSubcategoryChange}
        selectedSubcategory={selectedSubcategory}
      />
      <Tabs tabs={tabs} value={tab} onChange={onTabChange} />
    </div>
  );
}
