# WikipeIA

Directorio en español de herramientas de inteligencia artificial: más de 200 herramientas
organizadas por categoría y subcategoría, con búsqueda, filtros y favoritos.

**Web en producción:** [wikipeia.es](https://wikipeia.es/)

## Qué resuelve

La mayoría de directorios de IA están en inglés y mezclan cientos de herramientas sin contexto.
WikipeIA las agrupa por uso (asistentes, diseño, marketing, desarrollo, multimedia, servicios),
explica cada una en español y permite guardar las que interesan.

## Funcionalidades

- Búsqueda en tiempo real con normalización de texto (tildes y mayúsculas).
- Filtros por categoría y subcategoría, y pestañas (todas, nuevas, destacadas, gratis, guardadas).
- Favoritos persistentes en `localStorage`.
- Ficha de cada herramienta con galería de imágenes, zoom y pantalla completa.
- Formulario de contacto con Resend: honeypot, tiempo mínimo de envío, límite por IP y
  escapado del contenido.
- Banner de cookies con preferencias, modo claro/oscuro, sitemap y `robots.txt`.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 · Framer Motion
- Resend (email) · Vercel Blob (imágenes) · Vercel (hosting)

## Estructura

```
app/            rutas: inicio, información, privacidad, términos, api/contact, sitemap
components/     ui/ (búsqueda, categorías, tema), tool/ (tarjetas, grid, ficha), cookies/
hooks/          useFavorites, useIsClient
lib/            filtros, tipos, constantes, contextos (favoritos, cookies)
data/tools.json catálogo de herramientas
scripts/        subida de imágenes a Vercel Blob (ver IMAGENES_SETUP.md)
```

## Puesta en marcha

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Variables de entorno (en `.env.local`, solo necesarias para el formulario y la subida de imágenes):

| Variable                | Uso                                              |
| ----------------------- | ------------------------------------------------ |
| `RESEND_API_KEY`        | Envío del formulario de contacto                 |
| `CONTACT_TO`            | Destinatario del formulario                      |
| `CONTACT_FROM`          | Remitente verificado en Resend                   |
| `NEXT_PUBLIC_SITE_URL`  | URL base para el sitemap (por defecto wikipeia.es) |
| `BLOB_READ_WRITE_TOKEN` | Scripts de subida de imágenes a Vercel Blob      |

## Scripts

- `npm run dev`: servidor de desarrollo.
- `npm run build` / `npm run start`: build y servidor de producción.
- `npm run lint` / `npm run lint:fix`: ESLint (configuración flat de `eslint-config-next`).

## Autor

Luis Gómez · [lgcomin.com](https://www.lgcomin.com/)
