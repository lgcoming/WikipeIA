// Categorías del catálogo con sus textos para buscadores. Sin datos del JSON: se puede importar
// desde componentes cliente.

export type CategoryInfo = {
  /** Nombre tal y como aparece en data/tools.json. */
  name: string;
  slug: string;
  /** Título de la página (y su <h1>). */
  title: string;
  /** Texto introductorio visible bajo el título. */
  intro: string;
  /** Descripción para buscadores (se completa con el número de herramientas). */
  description: string;
  /** Tipo de aplicación de schema.org para las fichas de esta categoría. */
  schemaType: string;
};

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Asistentes",
    slug: "asistentes",
    title: "Asistentes de IA y chatbots en español",
    intro:
      "Chatbots conversacionales, asistentes de escritura, correctores, traductores y herramientas de estudio. Desde modelos de uso general como ChatGPT, Claude o Gemini hasta asistentes especializados para redactar, resumir o aprender idiomas.",
    description:
      "Compara asistentes de inteligencia artificial y chatbots como ChatGPT, Claude, Gemini o Perplexity, y herramientas para escribir, traducir y estudiar.",
    schemaType: "UtilitiesApplication",
  },
  {
    name: "Marketing",
    slug: "marketing",
    title: "Herramientas de IA para marketing y SEO",
    intro:
      "Redacción de textos y anuncios, SEO, programación de redes sociales, email marketing y análisis. Herramientas para crear más contenido en menos tiempo y medir lo que funciona.",
    description:
      "Herramientas de IA para marketing: redacción de contenidos, SEO, redes sociales, email y publicidad, con descripciones y precios en español.",
    schemaType: "BusinessApplication",
  },
  {
    name: "Multimedia",
    slug: "multimedia",
    title: "IA para vídeo, voz y música",
    intro:
      "Generadores y editores de vídeo, síntesis y clonación de voz, creación musical y mejora de imágenes. Desde recortar clips para redes sociales hasta generar escenas completas a partir de texto.",
    description:
      "Herramientas de IA para crear y editar vídeo, voz, audio y música, como Runway, ElevenLabs, CapCut o Suno, con descripciones en español.",
    schemaType: "MultimediaApplication",
  },
  {
    name: "Diseño",
    slug: "diseno",
    title: "IA para diseño, imágenes y logotipos",
    intro:
      "Generación de imágenes, logotipos e iconos, fotografía de producto, presentaciones y modelos 3D. Herramientas para pasar de una idea a un diseño listo para usar.",
    description:
      "Generadores de imágenes, logotipos, presentaciones y modelos 3D con IA, como Midjourney, Canva, Adobe Firefly o Leonardo AI, en español.",
    schemaType: "DesignApplication",
  },
  {
    name: "Desarrollo",
    slug: "desarrollo",
    title: "IA para programar y crear webs y apps",
    intro:
      "Asistentes de código, editores con IA, creadores de webs y aplicaciones a partir de texto y plataformas de modelos de IA, junto con generadores de contenido para webs.",
    description:
      "Asistentes de programación y creadores de webs y apps con IA, como GitHub Copilot, Cursor, v0, Lovable o Bolt. Compara sus funciones en español.",
    schemaType: "DeveloperApplication",
  },
  {
    name: "Servicios",
    slug: "servicios",
    title: "IA para automatizar tareas y flujos de trabajo",
    intro:
      "Automatización de procesos, agentes de IA, análisis de documentos y hojas de cálculo, y asistentes para el correo. Para delegar tareas repetitivas y conectar tus aplicaciones.",
    description:
      "Automatiza tareas con IA: Zapier, Make, n8n, agentes y asistentes para documentos, hojas de cálculo y email. Compara herramientas en español.",
    schemaType: "BusinessApplication",
  },
];

const BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c]));
const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategoryByName(name: string): CategoryInfo | undefined {
  return BY_NAME.get(name);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return BY_SLUG.get(slug);
}

export const toolPath = (id: string) => `/herramientas/${id}`;
export const categoryPath = (slug: string) => `/categorias/${slug}`;
