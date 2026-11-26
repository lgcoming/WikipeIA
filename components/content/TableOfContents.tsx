"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; title: string };

/** Índice lateral fijo que resalta la sección visible mientras se lee. */
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const order = items.map(({ id }) => id);
    const lastId = order[order.length - 1];
    const visible = new Set<string>();
    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    // Activa la primera sección (en orden del documento) que ocupa la franja superior de la
    // ventana. El observador solo informa de los cambios, así que se guarda el conjunto visible.
    // La franja empieza 4 px por debajo de scroll-mt-24 para que la sección anterior, que solo
    // roza el borde, no cuente como visible al saltar a un ancla.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = isAtBottom() ? lastId : order.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Al llegar al final, la última sección puede no alcanzar la franja: se marca igualmente.
    const onScroll = () => {
      if (isAtBottom()) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav aria-label="En esta página" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-white/50">
        En esta página
      </p>
      <ol className="border-l border-gray-200 dark:border-white/10">
        {items.map(({ id, title }, index) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => goTo(event, id)}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex gap-2 border-l-2 py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60 ${
                  isActive
                    ? "border-cyan-600 font-medium text-gray-900 dark:border-[#00d4ff] dark:text-white"
                    : "border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-900 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white"
                }`}
              >
                <span className="font-mono text-xs leading-5 tabular-nums text-gray-500 dark:text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
