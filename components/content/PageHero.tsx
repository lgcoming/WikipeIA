import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";

type PageHeroProps = {
  /** Texto de la miga de pan y etiqueta superior (p. ej. "Legal"). */
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Contenido extra bajo la descripción: fecha de actualización, logotipo, etc. */
  children?: ReactNode;
  /** Elemento opcional a la izquierda del título (p. ej. el logotipo). */
  leading?: ReactNode;
  /** Niveles intermedios de la miga de pan, entre la portada y la página actual. */
  trail?: { href: string; label: string }[];
  /** Texto de la página actual en la miga de pan (por defecto, el título). */
  crumbLabel?: string;
};

/**
 * Cabecera a todo el ancho para las páginas de contenido, con el mismo lenguaje visual
 * que la portada: fondo azul noche, resplandor cian y retícula sutil.
 */
const CRUMB_LINK =
  "rounded transition hover:text-gray-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60";

export default function PageHero({ eyebrow, title, description, children, leading, trail = [], crumbLabel }: PageHeroProps) {
  return (
    <div className="full-bleed">
      <section className="relative overflow-hidden border-b border-gray-300 dark:border-white/10 bg-gradient-to-b from-blue-50 to-white dark:from-[#020617] dark:to-[#0a0a0a]">
        <div aria-hidden="true" className="page-hero-glow absolute inset-0" />
        <div aria-hidden="true" className="page-hero-grid absolute inset-0" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16">
          <nav aria-label="Ruta de navegación" className="mb-8 sm:mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-600 dark:text-white/60">
              <li>
                <Link href="/" className={`inline-flex items-center gap-1.5 ${CRUMB_LINK}`}>
                  <Icon name="arrowLeft" className="h-4 w-4" />
                  WikipeIA
                </Link>
              </li>
              {trail.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
                  <Link href={crumb.href} className={CRUMB_LINK}>
                    {crumb.label}
                  </Link>
                </li>
              ))}
              <li className="flex min-w-0 items-center gap-1.5">
                <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
                <span aria-current="page" className="truncate text-gray-900 dark:text-white/90">
                  {crumbLabel ?? title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex items-start gap-4 sm:gap-5">
            {leading}
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00d4ff]">
                {eyebrow}
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-wide text-gray-900 dark:text-white text-balance">
                {title}
              </h1>
            </div>
          </div>

          {description && (
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-700 dark:text-white/70 text-pretty">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </section>
    </div>
  );
}

/** Chip con la fecha de la última actualización de un documento. */
export function UpdatedAt({ date, dateTime }: { date: string; dateTime: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/70 px-3 py-1 text-sm text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-white/75">
      <Icon name="calendar" className="h-4 w-4 text-cyan-700 dark:text-[#00d4ff]" />
      Última actualización: <time dateTime={dateTime}>{date}</time>
    </p>
  );
}
