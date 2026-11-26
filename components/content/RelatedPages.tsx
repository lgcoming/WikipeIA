import Link from "next/link";
import Icon, { IconBadge, type IconName } from "./Icon";

const PAGES = [
  {
    key: "informacion",
    href: "/informacion",
    title: "Acerca de WikipeIA",
    description: "Nuestra misión, cómo trabajamos y qué nos guía.",
    icon: "info",
  },
  {
    key: "privacidad",
    href: "/privacidad",
    title: "Política de privacidad",
    description: "Qué datos tratamos, con qué finalidad y qué derechos existen.",
    icon: "shieldCheck",
  },
  {
    key: "terminos",
    href: "/terminos",
    title: "Términos y condiciones",
    description: "Las condiciones de uso del directorio.",
    icon: "document",
  },
] as const satisfies ReadonlyArray<{ key: string; href: string; title: string; description: string; icon: IconName }>;

type PageKey = (typeof PAGES)[number]["key"];

/** Enlaces al resto de páginas de contenido y vuelta al directorio. */
export default function RelatedPages({ current }: { current: PageKey }) {
  const others = PAGES.filter((page) => page.key !== current);

  return (
    <nav aria-label="Otras páginas" className="mt-12 sm:mt-16">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-white/50">
        También te puede interesar
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {others.map((page) => (
          <li key={page.key} data-reveal>
            <Link
              href={page.href}
              className="group flex h-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
            >
              <IconBadge name={page.icon} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-gray-900 dark:text-white">{page.title}</span>
                <span className="mt-0.5 block text-sm text-gray-600 dark:text-white/60">{page.description}</span>
              </span>
              <Icon
                name="arrowRight"
                className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-900 dark:text-white/40 dark:group-hover:text-white motion-reduce:transition-none"
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-white/60 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Volver al directorio
        </Link>
      </div>
    </nav>
  );
}
