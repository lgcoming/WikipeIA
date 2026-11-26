import type { Metadata } from "next";

// Datos del sitio compartidos por metadatos, sitemap y robots.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://wikipeia.es").replace(/\/$/, "");

export const SITE_NAME = "WikipeIA";

export const SITE_DESCRIPTION =
  "Descubre más de 200 herramientas de inteligencia artificial organizadas por categoría, con descripciones en español, filtros y favoritos.";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const DEFAULT_OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME, type: "image/png" };

/**
 * Metadatos de una página interior: título, descripción, URL canónica y tarjetas para redes
 * (Open Graph y X) con los mismos textos, para que al compartir no aparezcan los de la portada.
 *
 * `ownImage`: la página tiene su propio opengraph-image en la carpeta de la ruta; si no, se repite
 * la imagen general (al definir openGraph en la página se pierde la heredada de app/opengraph-image).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ownImage?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  // Sin la clave `images` (ni siquiera vacía): si existe, Next descarta el opengraph-image de la ruta.
  const images = ownImage ? {} : { images: [DEFAULT_OG_IMAGE] };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "es_ES", siteName: SITE_NAME, url: path, title: fullTitle, description, ...images },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...images },
  };
}

/** Recorta un texto para la meta descripción sin cortar palabras. */
export function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
