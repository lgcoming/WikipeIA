# 🚀 Sistema de Imágenes para WikipeIA

¡Todo está listo! He creado un sistema completo para subir y mostrar las imágenes de las herramientas desde Vercel Blob Storage.

## 📁 Archivos Creados

### Scripts (`scripts/`)
- **`blob-upload.js`** - Sube todas las imágenes a Vercel Blob
- **`update-tools-images.js`** - Actualiza tools.json con URLs de imágenes  
- **`upload-all.js`** - Script maestro que ejecuta todo el proceso
- **`README.md`** - Documentación completa de los scripts

### Componentes (`components/tool/`)
- **`ToolImage.tsx`** - Componente para mostrar imágenes con galería y modal

### Tipos (`lib/types.ts`)
- Actualizado el tipo `Tool` para incluir el campo `images`

### Componentes Actualizados
- **`ToolCard.tsx`** - Ahora usa ToolImage cuando hay imágenes disponibles

## 🎯 Cómo Usar

### 1. Ejecutar el Script de Subida

```bash
BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN node scripts/upload-all.js
```

Este comando:
- ✅ Sube todas las imágenes de `assets/wikipeia/` a Vercel Blob
- ✅ Guarda las URLs en `data/image-urls.json`
- ✅ Actualiza `data/tools.json` con las URLs de imágenes
- ✅ Crea un backup de `tools.json`

### 2. Verificar Resultados

Después de ejecutar el script, verifica:

- **`data/image-urls.json`** - Contiene todas las URLs de imágenes subidas
- **`data/tools.json`** - Cada herramienta ahora tiene un campo `images` con las URLs
- **`data/tools-backup.json`** - Backup del archivo original

### 3. Usar en la Aplicación

El componente `ToolCard` ya está configurado para usar las imágenes automáticamente. Si una herramienta tiene imágenes en Vercel Blob, se mostrarán; si no, se usará la imagen por defecto.

## 🔧 Características del Sistema

### Componente ToolImage
- **Galería de imágenes** con miniaturas
- **Modal de imagen completa** con navegación
- **Lazy loading** para mejor rendimiento
- **Responsive design** que se adapta a diferentes tamaños
- **Fallback** cuando no hay imágenes disponibles

### Scripts Inteligentes
- **Coincidencia automática** de nombres de herramientas
- **Backup automático** antes de modificar archivos
- **Manejo de errores** con información detallada
- **Rate limiting** para evitar problemas con Vercel Blob
- **Progreso detallado** durante la ejecución

## 📊 Estructura de Datos

### En tools.json:
```json
{
  "name": "Copy.ai",
  "imagenes": [
    "https://blob.vercel-storage.com/copy.ai/1.jpg",
    "https://blob.vercel-storage.com/copy.ai/2.jpg",
    "https://blob.vercel-storage.com/copy.ai/3.jpg"
  ]
}
```

## 🎨 Personalización

### ToolImage Props:
```tsx
<ToolImage 
  toolName="Nombre de la herramienta"
  images={tool.imagenes}
  className="w-full"           // Clases CSS adicionales
  showGallery={true}          // Mostrar galería de miniaturas
  maxImages={3}               // Máximo de miniaturas a mostrar
/>
```

## 🚨 Solución de Problemas

### Si hay errores de coincidencia:
1. Revisa `data/image-urls.json` para ver qué imágenes se subieron
2. Verifica que los nombres de las carpetas coincidan con los nombres de las herramientas
3. Si es necesario, ajusta la función `normalizeToolName` en `update-tools-images.js`

### Si hay problemas de rate limiting:
- El script incluye pausas automáticas
- Si persisten los problemas, aumenta el tiempo de pausa en `blob-upload.js`

## 🎉 ¡Listo para Usar!

Una vez ejecutado el script, tu aplicación mostrará automáticamente las imágenes de alta calidad de las herramientas, mejorando significativamente la experiencia visual de WikipeIA.

Las imágenes se cargan desde Vercel Blob Storage, lo que garantiza:
- ⚡ **Carga rápida** con CDN global
- 🔒 **Almacenamiento seguro** y confiable  
- 📱 **Optimización automática** para diferentes dispositivos
- 💰 **Costo eficiente** para tu proyecto
