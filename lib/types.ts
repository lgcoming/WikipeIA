export type TabKey = "Nuevas" | "Destacadas" | "Gratis" | "Guardadas" | "Todas";

// Dominio principal: Tool
export type Tool = {
  id: string;
  nombre: string;
  categoria: string;
  subcategoria?: string[];   // Array de subcategorías a las que pertenece la herramienta
  precio: "gratis" | "pago";
  etiquetas?: string[];     // ej: ["Destacada","Nueva"]
  enlace: string;
  imagen?: string;
  imagenes?: string[];      // URLs de imágenes desde Vercel Blob para galería
  descripcion: string;
  descripcionDetallada?: string; // descripción extendida para el modal
  pruebaGratis?: boolean;   // indica si ofrece prueba gratis (sólo relevante para pago)
  fechaAlta?: string;        // ISO (YYYY-MM-DD), opcional; usado para la lógica de "Nuevas"
};

// Lo que necesita el directorio para pintar tarjetas, buscar y filtrar.
// La galería y la descripción extendida solo se usan en la ficha y se cargan al abrirla.
export type ToolSummary = Omit<Tool, "imagenes" | "descripcionDetallada">;

export type ToolDetails = Pick<Tool, "imagenes" | "descripcionDetallada">;
