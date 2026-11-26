import type { ReactNode } from "react";
import Icon from "./Icon";
import TableOfContents from "./TableOfContents";

export type LegalSectionData = {
  id: string;
  title: string;
  content: ReactNode;
};

/**
 * Documento legal con índice lateral (escritorio) o desplegable (móvil)
 * y secciones numeradas a partir de una única lista.
 */
export default function LegalDocument({ sections }: { sections: LegalSectionData[] }) {
  const toc = sections.map(({ id, title }) => ({ id, title }));

  return (
    <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
      <aside className="hidden lg:block">
        <TableOfContents items={toc} />
      </aside>

      <div className="min-w-0">
        <details className="group mb-6 rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03] lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <Icon name="listBullet" className="h-5 w-5 text-cyan-700 dark:text-[#00d4ff]" />
              En esta página
            </span>
            <Icon name="chevronRight" className="h-4 w-4 transition-transform group-open:rotate-90" />
          </summary>
          <ol className="border-t border-gray-200 px-4 py-2 dark:border-white/10">
            {toc.map(({ id, title }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex gap-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
                >
                  <span className="font-mono text-xs leading-5 tabular-nums text-cyan-700 dark:text-[#00d4ff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </details>

        <article className="rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm sm:px-10 sm:py-4 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
          {sections.map(({ id, title, content }, index) => (
            <section
              key={id}
              id={id}
              aria-labelledby={`${id}-titulo`}
              data-reveal
              className="scroll-mt-24 border-t border-gray-200 py-8 first:border-t-0 dark:border-white/10"
            >
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-sm tabular-nums text-cyan-700 dark:text-[#00d4ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`${id}-titulo`}
                  className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl dark:text-white"
                >
                  {title}
                </h2>
              </div>
              <div className="space-y-4 leading-relaxed text-gray-700 dark:text-white/80">{content}</div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
