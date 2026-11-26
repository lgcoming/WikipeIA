import type { CSSProperties } from "react";
import SearchBar from "@/components/ui/SearchBar";
import HeroBackground from "./HeroBackground";

type Stat = { value: number; label: string };

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Número tipo odómetro: cada dígito es una tira 0-9 que rueda hasta su valor con transform
 * (lo anima la GPU). El número real queda en el DOM para lectores de pantalla y buscadores.
 */
function AnimatedNumber({ value }: { value: number }) {
  return (
    <>
      <span aria-hidden="true" className="odometer">
        {String(value)
          .split("")
          .map((digit, i) => (
            <span key={i} className="odometer-digit">
              <span className="odometer-strip" style={{ "--d": digit, "--i": i } as CSSProperties}>
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ))}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export default function HomeHero({
  query,
  onQueryChange,
  stats,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  stats: Stat[];
}) {
  return (
    <div className="full-bleed relative">
      <section className="home-hero relative isolate overflow-hidden border-b border-gray-300 dark:border-white/10">
        <HeroBackground />

        <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-12 text-center sm:pt-20 sm:pb-16 md:pt-24">
          <p className="hero-enter inline-flex items-center gap-2.5 rounded-full border border-cyan-700/20 bg-white/85 px-3.5 py-1.5 text-xs font-medium text-gray-700 sm:text-sm dark:border-[#00d4ff]/25 dark:bg-white/[0.04] dark:text-white/80">
            <span className="pulse-dot" aria-hidden="true" />
            Directorio de IA en español
          </p>

          <h1 className="hero-enter-title mt-6 font-display text-[1.65rem] leading-tight tracking-wide text-gray-900 text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.15] dark:text-white">
            Tu wikipedia de múltiples <span className="text-accent-gradient">herramientas IA</span>.
            <span className="mt-3 block text-lg font-normal tracking-wide text-gray-600 sm:text-2xl md:text-[1.7rem] dark:text-white/70">
              Filtra por categorías y descubre.
            </span>
          </h1>

          <div data-delay="1" className="hero-enter mt-9 flex justify-center sm:mt-11">
            <SearchBar value={query} onChange={onQueryChange} />
          </div>

          <dl data-delay="2" className="hero-enter mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm sm:gap-x-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5 sm:gap-2">
                <dt className="text-gray-600 dark:text-white/60">{stat.label}</dt>
                <dd className="order-first font-display text-lg font-semibold tracking-wide text-gray-900 sm:text-2xl dark:text-white">
                  <AnimatedNumber value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
