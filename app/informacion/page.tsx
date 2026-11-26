import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Image from "next/image";
import PageHero from "@/components/content/PageHero";
import RelatedPages from "@/components/content/RelatedPages";
import { Card, SectionHeading, Tile } from "@/components/content/blocks";
import { IconBadge, type IconName } from "@/components/content/Icon";
import ContactButton from "@/components/ui/ContactButton";

export const metadata: Metadata = pageMetadata({
  title: "Acerca de WikipeIA | Directorio de herramientas de IA",
  absoluteTitle: true,
  description:
    "Qué es WikipeIA, nuestra misión y cómo seleccionamos las herramientas de inteligencia artificial del directorio.",
  path: "/informacion",
});

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "checkCircle",
    title: "Revisión experta",
    text: "Seleccionamos y evaluamos cada herramienta para garantizar calidad y relevancia.",
  },
  {
    icon: "document",
    title: "Descripciones detalladas",
    text: "Información completa sobre funciones, precios y casos de uso.",
  },
  {
    icon: "search",
    title: "Búsqueda inteligente",
    text: "Filtra por categoría, precio y características para encontrar lo que buscas.",
  },
  {
    icon: "refresh",
    title: "Actualización constante",
    text: "Añadimos nuevas herramientas y actualizamos información regularmente.",
  },
];

const VALUES: { icon: IconName; title: string; text: string }[] = [
  { icon: "star", title: "Calidad", text: "Solo incluimos herramientas que han demostrado su valor y utilidad." },
  {
    icon: "eye",
    title: "Transparencia",
    text: "Información clara y honesta sobre cada herramienta y sus características.",
  },
  { icon: "globe", title: "Accesibilidad", text: "Hacemos la IA accesible para la comunidad hispanohablante." },
];

const STATS = [
  { value: "+200", label: "Herramientas" },
  { value: "+40", label: "Subcategorías" },
  { value: "100%", label: "Gratuito" },
  { value: "24/7", label: "Disponible" },
];

export default function InformacionPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nosotros"
        title="Acerca de WikipeIA"
        description="Tu directorio de confianza para descubrir las mejores herramientas de inteligencia artificial."
        leading={
          <>
            <Image src="/logo negro.png" alt="" width={56} height={56} className="h-14 w-14 shrink-0 dark:hidden" />
            <Image src="/logo.png" alt="" width={56} height={56} className="hidden h-14 w-14 shrink-0 dark:block" />
          </>
        }
      />

      <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeading icon="lightBulb">Nuestra misión</SectionHeading>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg dark:text-white/80">
            En WikipeIA, creemos que la inteligencia artificial debe ser accesible para todos. Nuestra misión es
            facilitar el acceso a herramientas de IA proporcionando un directorio amplio, cuidado y fácil de navegar
            que ayude a usuarios, empresas y desarrolladores a encontrar exactamente lo que necesitan.
          </p>
        </Card>

        <Card>
          <SectionHeading icon="chart">Nuestros números</SectionHeading>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <dt className="text-sm text-gray-600 dark:text-white/60">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="lg:col-span-3">
          <SectionHeading icon="sparkles">Lo que hacemos</SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <Tile key={feature.title} icon={feature.icon} title={feature.title}>
                {feature.text}
              </Tile>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <SectionHeading icon="shieldCheck">Nuestros valores</SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {VALUES.map((value) => (
              <Tile key={value.title} icon={value.icon} title={value.title} layout="stack">
                {value.text}
              </Tile>
            ))}
          </div>
        </Card>

        <section data-reveal className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12 lg:col-span-3 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
          <div aria-hidden="true" className="page-hero-glow absolute inset-0 rotate-180" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <IconBadge name="envelope" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white text-balance">
              ¿Tienes una herramienta que sugerir?
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600 dark:text-white/70 text-pretty">
              Si conoces una herramienta de IA que debería estar en nuestro directorio, nos encantaría conocerla.
              Contáctanos y la evaluaremos para su inclusión.
            </p>
            <div className="mt-7">
              <ContactButton label="Contáctanos" showIcon iconClassName="h-5 w-5" variant="solid" />
            </div>
          </div>
        </section>
      </div>

      <RelatedPages current="informacion" />
    </>
  );
}
