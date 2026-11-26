import type { Tool, ToolSummary } from "@/lib/types";

// Textos derivados de los datos de una herramienta, comunes a la ficha, sus metadatos y su imagen.

type PriceFields = Pick<ToolSummary, "precio" | "pruebaGratis">;

export function priceLabel(tool: PriceFields): string {
  if (tool.precio === "gratis") return "Gratis";
  return tool.pruebaGratis ? "De pago · prueba gratis" : "De pago";
}

export function ensurePeriod(text: string): string {
  const trimmed = text.trim();
  return /[.!?…]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

const listFormat = new Intl.ListFormat("es", { style: "long", type: "conjunction" });
export const listEs = (items: string[]) => listFormat.format(items);

export function priceAnswer(tool: Tool): string {
  const n = tool.nombre;
  if (tool.precio === "gratis") {
    return `Sí, ${n} se puede usar gratis. Algunas funciones avanzadas pueden requerir un plan de pago, así que conviene revisar las condiciones actuales en su web oficial.`;
  }
  if (tool.pruebaGratis) {
    return `${n} es una herramienta de pago, pero ofrece una prueba gratuita para probarla antes de contratar un plan. Los precios actualizados están en su web oficial.`;
  }
  return `${n} es una herramienta de pago. Puedes consultar sus planes y precios actualizados en su web oficial.`;
}

/** Preguntas frecuentes de la ficha, construidas a partir de los datos del catálogo. */
export function buildFaq(tool: Tool, alternatives: Tool[]): { question: string; answer: string }[] {
  const subs = tool.subcategoria?.length ? ` (${tool.subcategoria.join(", ")})` : "";
  const faq = [
    {
      question: `¿Qué es ${tool.nombre} y para qué sirve?`,
      answer: `${ensurePeriod(tool.descripcion)} En WikipeIA la encontrarás en la categoría ${tool.categoria}${subs}.`,
    },
    { question: `¿${tool.nombre} es gratis?`, answer: priceAnswer(tool) },
  ];
  if (alternatives.length) {
    faq.push({
      question: `¿Qué alternativas a ${tool.nombre} hay?`,
      answer: `Algunas alternativas a ${tool.nombre} son ${listEs(alternatives.slice(0, 4).map((t) => t.nombre))}. Puedes compararlas en esta misma página o ver todas las herramientas de la categoría ${tool.categoria}.`,
    });
  }
  return faq;
}
