import type { ReactNode } from "react";
import Icon, { IconBadge, type IconName } from "./Icon";

/** Lista con viñetas de acento, con buena alineación cuando el texto ocupa varias líneas. */
export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-600 dark:before:bg-[#00d4ff]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Lista con iconos de verificación, en dos columnas desde tamaño tablet. */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-[#00d4ff]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type TileProps = {
  icon: IconName;
  title: string;
  children: ReactNode;
  /** "row": icono a la izquierda; "stack": icono encima del texto. */
  layout?: "row" | "stack";
};

/** Bloque con icono, título y texto para agrupar ideas relacionadas. */
export function Tile({ icon, title, children, layout = "row" }: TileProps) {
  return (
    <div
      className={`h-full rounded-xl border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03] ${
        layout === "row" ? "flex items-start gap-4" : "flex flex-col gap-4"
      }`}
    >
      <IconBadge name={icon} size="sm" />
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-white/70">{children}</div>
      </div>
    </div>
  );
}

/** Tarjeta base de las páginas de contenido. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-reveal
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none ${className}`}
    >
      {children}
    </div>
  );
}

/** Encabezado de sección con icono, usado en la página de información. */
export function SectionHeading({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
      <IconBadge name={icon} />
      {children}
    </h2>
  );
}
