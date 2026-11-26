import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/content/PageHero";
import Icon from "@/components/content/Icon";
import JsonLd from "@/components/seo/JsonLd";
import ToolsGrid from "@/components/tool/ToolsGrid";
import { CATEGORIES, categoryPath, getCategoryBySlug, toolPath } from "@/lib/categories";
import { absoluteUrl, pageMetadata, SITE_NAME } from "@/lib/site";
import { getToolsByCategory, sortForListing, toSummary } from "@/lib/tools";
import type { Tool } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: category.description,
    path: categoryPath(category.slug),
  });
}

const OTHERS = "Otras";

/** Agrupa por uso (subcategoría), de más a menos herramientas. */
function groupByUse(tools: Tool[]) {
  const groups = new Map<string, Tool[]>();
  for (const tool of tools) {
    const uses = tool.subcategoria?.length ? tool.subcategoria : [OTHERS];
    for (const use of uses) groups.set(use, [...(groups.get(use) ?? []), tool]);
  }
  return [...groups.entries()]
    .map(([use, list]) => ({ use, id: `uso-${slugify(use)}`, tools: sortForListing(list) }))
    .sort((a, b) => Number(a.use === OTHERS) - Number(b.use === OTHERS) || b.tools.length - a.tools.length || a.use.localeCompare(b.use, "es"));
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = sortForListing(getToolsByCategory(category.name));
  const groups = groupByUse(tools);
  const free = tools.filter((tool) => tool.precio === "gratis").length;
  const url = absoluteUrl(categoryPath(category.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: category.name, item: url },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": url,
        name: category.title,
        description: category.description,
        url,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: tools.length,
          itemListElement: tools.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.nombre,
            url: absoluteUrl(toolPath(tool.id)),
          })),
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero eyebrow="Categoría" title={category.title} crumbLabel={category.name} description={category.intro}>
        <p className="text-sm text-gray-600 dark:text-white/60">
          <strong className="font-semibold text-gray-900 dark:text-white">{tools.length} herramientas</strong>, {free} de
          ellas gratuitas.
        </p>
        {groups.length > 1 && (
          <nav aria-label="Usos de la categoría" className="mt-5">
            <ul className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white/70 px-3 py-1 text-sm text-gray-700 transition hover:border-gray-400 hover:text-gray-900 dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/30 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
                  >
                    {group.use}
                    <span className="text-gray-500 dark:text-white/60">{group.tools.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageHero>

      <div className="mt-12 space-y-16">
        {groups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-titulo`} className="scroll-mt-24">
            <h2 id={`${group.id}-titulo`} className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {group.use === OTHERS ? "Otras herramientas" : `${category.name}: ${group.use}`}
              <span className="ml-2 text-base font-normal text-gray-500 dark:text-white/60">{group.tools.length}</span>
            </h2>
            <div className="mt-6 flex justify-center">
              <ToolsGrid tools={group.tools.map(toSummary)} />
            </div>
          </section>
        ))}
      </div>

      <nav aria-labelledby="otras-categorias" className="mt-20">
        <h2 id="otras-categorias" className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-white/50">
          Otras categorías
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.filter((other) => other.slug !== category.slug).map((other) => (
            <li key={other.slug}>
              <Link
                href={categoryPath(other.slug)}
                className="group flex h-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-[#00d4ff]/60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900 dark:text-white">{other.name}</span>
                  <span className="mt-0.5 block text-sm text-gray-600 dark:text-white/60">{other.title}</span>
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
    </>
  );
}
