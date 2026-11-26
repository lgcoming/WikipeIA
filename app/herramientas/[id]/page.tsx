import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/content/PageHero";
import Icon from "@/components/content/Icon";
import JsonLd from "@/components/seo/JsonLd";
import SaveButton from "@/components/tool/SaveButton";
import ToolLogo from "@/components/tool/ToolLogo";
import ToolsGrid from "@/components/tool/ToolsGrid";
import { categoryPath, getCategoryByName, toolPath } from "@/lib/categories";
import { absoluteUrl, clampDescription, pageMetadata, SITE_NAME } from "@/lib/site";
import { hostname, officialUrl, outboundRel } from "@/lib/toolLinks";
import { buildFaq, ensurePeriod, priceLabel } from "@/lib/toolText";
import { getRelatedTools, getTool, getToolIds, getToolsByCategory, toSummary } from "@/lib/tools";

// Una página estática por herramienta, generada en el build. Las demás URLs dan 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getToolIds().map((id) => ({ id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = getTool(id);
  if (!tool) return {};
  const price =
    tool.precio === "gratis" ? "Gratis." : tool.pruebaGratis ? "De pago, con prueba gratis." : "De pago.";
  return pageMetadata({
    title: `${tool.nombre}: qué es, precio y alternativas`,
    description: clampDescription(`${ensurePeriod(tool.descripcion)} ${price} Funciones y alternativas en español.`),
    path: toolPath(tool.id),
    ownImage: true,
  });
}

const dateFormat = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const SECTION_TITLE = "text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white";
const CHIP =
  "inline-flex items-center rounded-full border border-gray-300 bg-white/70 px-3 py-1 text-sm text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-white/80";

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const tool = getTool(id);
  if (!tool) notFound();

  const category = getCategoryByName(tool.categoria);
  const related = getRelatedTools(tool, 8);
  const categoryCount = getToolsByCategory(tool.categoria).length;
  const images = (tool.imagenes ?? []).filter(Boolean);
  const faq = buildFaq(tool, related);
  const url = absoluteUrl(toolPath(tool.id));
  const site = officialUrl(tool.enlace);
  const featured = tool.etiquetas?.includes("Destacada");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
          ...(category
            ? [{ "@type": "ListItem", position: 2, name: tool.categoria, item: absoluteUrl(categoryPath(category.slug)) }]
            : []),
          { "@type": "ListItem", position: category ? 3 : 2, name: tool.nombre, item: url },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: tool.nombre,
        description: tool.descripcionDetallada || tool.descripcion,
        applicationCategory: category?.schemaType ?? "BusinessApplication",
        applicationSubCategory: tool.subcategoria?.join(", ") || undefined,
        operatingSystem: "Web",
        url: site,
        image: images[0],
        offers: tool.precio === "gratis" ? { "@type": "Offer", price: "0", priceCurrency: "EUR" } : undefined,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  const facts: { label: string; value: React.ReactNode }[] = [
    {
      label: "Categoría",
      value: category ? (
        <Link href={categoryPath(category.slug)} className="font-medium text-cyan-800 underline-offset-2 hover:underline dark:text-[#00d4ff]">
          {tool.categoria}
        </Link>
      ) : (
        tool.categoria
      ),
    },
    ...(tool.subcategoria?.length ? [{ label: "Uso", value: tool.subcategoria.join(", ") }] : []),
    { label: "Precio", value: tool.precio === "gratis" ? "Gratis" : "De pago" },
    ...(tool.precio === "pago" ? [{ label: "Prueba gratis", value: tool.pruebaGratis ? "Sí" : "No" }] : []),
    {
      label: "Web oficial",
      value: (
        <a href={tool.enlace} target="_blank" rel={outboundRel(tool.enlace)} className="break-all font-medium text-cyan-800 underline-offset-2 hover:underline dark:text-[#00d4ff]">
          {hostname(site)}
        </a>
      ),
    },
    ...(tool.fechaAlta
      ? [{ label: "En WikipeIA desde", value: <time dateTime={tool.fechaAlta}>{dateFormat.format(new Date(tool.fechaAlta))}</time> }]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow={tool.categoria}
        title={tool.nombre}
        trail={category ? [{ href: categoryPath(category.slug), label: tool.categoria }] : []}
        description={tool.descripcion}
        leading={
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm sm:h-16 sm:w-16 dark:border-white/15">
            <ToolLogo tool={tool} size={48} className="h-full w-full object-contain" />
          </span>
        }
      >
        <ul className="flex flex-wrap items-center gap-2" aria-label="Características">
          <li className={CHIP}>{priceLabel(tool)}</li>
          {featured && <li className={CHIP}>Destacada</li>}
          {tool.etiquetas?.includes("Nueva") && <li className={CHIP}>Nueva</li>}
          {tool.subcategoria?.map((sub) => (
            <li key={sub} className={CHIP}>
              {sub}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={tool.enlace}
            target="_blank"
            rel={outboundRel(tool.enlace)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 dark:bg-[#00d4ff] dark:text-black dark:hover:bg-[#5ce1ff] dark:focus-visible:ring-offset-black"
          >
            Visitar {tool.nombre}
            <Icon name="externalLink" className="h-4 w-4" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <SaveButton id={tool.id} name={tool.nombre} />
        </div>
      </PageHero>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="min-w-0 space-y-12 lg:col-span-2">
          <section aria-labelledby="que-es">
            <h2 id="que-es" className={SECTION_TITLE}>
              Qué es {tool.nombre}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg dark:text-white/75">
              {tool.descripcionDetallada || tool.descripcion}
            </p>
          </section>

          {images.length > 0 && (
            <section aria-labelledby="capturas">
              <h2 id="capturas" className="sr-only">
                Capturas de {tool.nombre}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {images.map((src, i) => {
                  const wide = i === 0 || (i === images.length - 1 && i % 2 === 1);
                  return (
                    <figure
                      key={src}
                      className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03] ${
                        wide ? "col-span-2 aspect-[16/9]" : "aspect-[16/10]"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Captura de ${tool.nombre} (${i + 1} de ${images.length})`}
                        fill
                        sizes={wide ? "(min-width: 1152px) 740px, (min-width: 1024px) 64vw, 100vw" : "(min-width: 1152px) 365px, (min-width: 1024px) 32vw, 50vw"}
                        preload={i === 0}
                        fetchPriority={i === 0 ? "high" : undefined}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="object-contain"
                      />
                    </figure>
                  );
                })}
              </div>
            </section>
          )}

          <section aria-labelledby="preguntas">
            <h2 id="preguntas" className={SECTION_TITLE}>
              Preguntas frecuentes sobre {tool.nombre}
            </h2>
            <div className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
              {faq.map(({ question, answer }) => (
                <div key={question} className="p-5 sm:p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{question}</h3>
                  <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside aria-labelledby="ficha" className="self-start lg:sticky lg:top-24">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            <h2 id="ficha" className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-white/50">
              Ficha de {tool.nombre}
            </h2>
            <dl className="mt-4 divide-y divide-gray-200 text-sm dark:divide-white/10">
              {facts.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <dt className="text-gray-600 dark:text-white/55">{label}</dt>
                  <dd className="text-right text-gray-900 dark:text-white/90">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="alternativas" className="mt-16">
          <h2 id="alternativas" className={SECTION_TITLE}>
            Alternativas a {tool.nombre}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-white/60">
            Otras herramientas de la categoría {tool.categoria} con usos parecidos.
          </p>
          <div className="mt-6 flex justify-center">
            <ToolsGrid tools={related.map(toSummary)} />
          </div>
          {category && (
            <div className="mt-8 text-center">
              <Link
                href={categoryPath(category.slug)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:text-white/85 dark:hover:border-white/35 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
              >
                <Icon name="squares" className="h-4 w-4" />
                Ver las {categoryCount} herramientas de {tool.categoria}
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
}
