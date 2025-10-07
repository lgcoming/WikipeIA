export type TabKey = "Nuevas" | "Destacadas" | "Gratis" | "Guardadas" | "Todas";

// Dominio principal: Tool
export type Tool = {
  id: string;
  nombre: string;
  categoria: string;
  precio: "gratis" | "pago" | "freemium";
  etiquetas?: string[];     // ej: ["Destacada","Nueva"]
  enlace: string;
  imagen?: string;
  imagenes?: string[];      // URLs de imágenes desde Vercel Blob para galería
  descripcion: string;
  descripcionDetallada?: string; // descripción extendida para el modal
  pruebaGratis?: boolean;   // indica si ofrece prueba gratis (sólo relevante para pago)
  fechaAlta?: string;        // ISO (YYYY-MM-DD), opcional; usado para la lógica de "Nuevas"
};
