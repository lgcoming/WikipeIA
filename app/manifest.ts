import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// Nombre e icono al añadir la web a la pantalla de inicio del móvil.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Directorio de herramientas de IA`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "es",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
