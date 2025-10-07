# WikipeIA

Tu wikipedia de múltiples herramientas de IA. Directorio en español construido con Next.js 15, React 19 y Tailwind CSS.

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

## Scripts útiles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera el build de producción.
- `npm run start`: arranca el servidor con el build de producción.
- `npm run lint`: revisa el código con ESLint.
- `npm run lint:fix`: corrige automáticamente problemas detectados por ESLint.

## Estructura de carpetas

```
app/
  layout.tsx
  page.tsx
  globals.css
  sitemap.ts
components/
  ui/
    CategorySelect.tsx
    SearchBar.tsx
    Tabs.tsx
    ContactButton.tsx
  tool/
    FilterBar.tsx
    ToolCard.tsx
    ToolsGrid.tsx
    ToolModal.tsx
lib/
  constants.ts
  filters.ts
  favoritesContext.tsx
  types.ts
hooks/
  useFavorites.ts
data/
  tools.json
public/
  logo.png
  favicon.ico
  robots.txt
```

## Favoritos ("Guardadas")

- Estado global mediante `FavoritesProvider` en `lib/favoritesContext.tsx` (cliente):
  - Inicializa SINCRÓNICAMENTE desde `localStorage` (clave: `wikipeia:favs`).
  - Persiste en cada cambio y sincroniza en vivo entre componentes.
- Hook `useFavorites` en `hooks/useFavorites.ts` que consume el contexto.
- Botón "Guardar/Guardada" en `components/tool/ToolCard.tsx`.
- Pestaña "Guardadas" disponible, con tabs centralizados en `lib/constants.ts`.

## Características

- 🎨 **Diseño moderno y futurista** con efectos neón y animaciones suaves
- 🔍 **Búsqueda en tiempo real** con normalización de texto
- 🏷️ **Filtrado por categorías** con 9 categorías únicas
- ⭐ **Sistema de favoritos** con persistencia en localStorage
- 📱 **Responsive** y optimizado para todos los dispositivos
- ♿ **Accesible** con navegación por teclado y ARIA labels
- ⚡ **Optimizado** con memoización y animaciones eficientes

## Notas técnicas

- Assets servidos desde `public/` (ej: `/logo.png`, `/favicon.ico`)
- `robots.txt` y sitemap generado automáticamente
- Animaciones con `framer-motion` para UX fluida
- Componentes memoizados para performance óptima
- Estilo futurista con Tailwind CSS y variables CSS personalizadas

## Licencia

Este proyecto es de uso interno. Ajusta la licencia según tus necesidades.
