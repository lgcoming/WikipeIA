import type { NextConfig } from "next";

// Cabeceras de seguridad para todas las respuestas.
const SECURITY_HEADERS = [
  // Impide que el navegador "adivine" tipos de archivo distintos al declarado.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Al salir hacia otra web solo se envía el dominio, no la URL completa.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nadie puede incrustar la web en un iframe (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  // La web no usa cámara, micrófono ni ubicación.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Solo HTTPS durante dos años (los navegadores ignoran esta cabecera en http://localhost).
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No anunciar el framework en la cabecera X-Powered-By.
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    // AVIF primero (≈20 % más ligero que WebP); WebP como respaldo para navegadores sin AVIF.
    formats: ["image/avif", "image/webp"],
    // Las imágenes remotas apenas cambian: 30 días de caché evita reoptimizarlas cada 4 h.
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "qykyvqh1qam7ipk4.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // Las carpetas de fichas y categorías no tienen página propia: llevan al directorio.
  async redirects() {
    return [
      { source: "/herramientas", destination: "/", permanent: false },
      { source: "/categorias", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
