# Scripts de Subida de Imágenes a Vercel Blob

Este directorio contiene scripts para subir las imágenes de las herramientas a Vercel Blob Storage y actualizar el archivo `tools.json` con las URLs correspondientes.

## Archivos

- `blob-upload.js` - Script principal para subir imágenes a Vercel Blob
- `update-tools-images.js` - Script para actualizar tools.json con URLs de imágenes
- `upload-all.js` - Script maestro que ejecuta todo el proceso

## Requisitos Previos

1. **Token de Vercel Blob**: Necesitas tener configurado el token `BLOB_READ_WRITE_TOKEN` en tu archivo `.env.local`
2. **Estructura de carpetas**: Las imágenes deben estar organizadas en `assets/wikipeia/[nombre-herramienta]/[imagen].jpg`
3. **Dependencias**: Asegúrate de tener instaladas las dependencias necesarias:
   ```bash
   npm install @vercel/blob fast-glob image-size
   ```

## Uso

### Opción 1: Proceso Completo (Recomendado)

```bash
BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN node scripts/upload-all.js
```

Este comando ejecuta todo el proceso automáticamente:
1. Sube todas las imágenes a Vercel Blob
2. Actualiza `tools.json` con las URLs de las imágenes
3. Crea un backup de `tools.json`

### Opción 2: Proceso Paso a Paso

#### Paso 1: Subir imágenes
```bash
BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN node scripts/blob-upload.js
```

#### Paso 2: Actualizar tools.json
```bash
node scripts/update-tools-images.js
```

## Estructura de Datos

### Archivo de salida: `data/image-urls.json`
```json
{
  "uploadDate": "2025-10-07T00:00:00.000Z",
  "totalTools": 150,
  "totalImages": 450,
  "errors": 0,
  "results": [
    {
      "toolName": "Copy.ai",
      "images": [
        {
          "number": 1,
          "url": "https://blob.vercel-storage.com/copy.ai/1.jpg",
          "filename": "Copy.ai/1.jpg"
        }
      ]
    }
  ]
}
```

### Actualización de `tools.json`
Cada herramienta en `tools.json` tendrá el campo `imagenes` actualizado con las URLs:
```json
{
  "name": "Copy.ai",
  "description": "...",
  "imagenes": [
    "https://blob.vercel-storage.com/copy.ai/1.jpg",
    "https://blob.vercel-storage.com/copy.ai/2.jpg",
    "https://blob.vercel-storage.com/copy.ai/3.jpg"
  ]
}
```

## Componente ToolImage

Después de ejecutar los scripts, puedes usar el componente `ToolImage` en tu aplicación:

```tsx
import ToolImage from '@/components/tool/ToolImage';

// En tu componente
<ToolImage 
  toolName={tool.name}
  images={tool.imagenes}
  className="w-full"
  showGallery={true}
  maxImages={3}
/>
```

## Solución de Problemas

### Error: "BLOB_READ_WRITE_TOKEN no está definido"
- Asegúrate de tener el token configurado en `.env.local`
- Verifica que estás ejecutando el comando con la variable de entorno

### Error: "El directorio assets/wikipeia no existe"
- Verifica que la estructura de carpetas esté correcta
- Asegúrate de estar ejecutando el script desde la raíz del proyecto

### Imágenes sin coincidencia
- El script intenta hacer coincidir los nombres de las carpetas con los nombres de las herramientas
- Si hay problemas de coincidencia, revisa la función `normalizeToolName` en `update-tools-images.js`

### Rate Limiting
- El script incluye pausas entre subidas para evitar rate limiting
- Si experimentas errores de rate limiting, aumenta el tiempo de pausa en `blob-upload.js`

## Backup y Seguridad

- Se crea automáticamente un backup de `tools.json` antes de modificarlo
- El backup se guarda como `data/tools-backup.json`
- Si algo sale mal, puedes restaurar el archivo original desde el backup

## Monitoreo

El script proporciona información detallada sobre:
- Progreso de subida de imágenes
- Errores encontrados
- Estadísticas finales
- Imágenes que no pudieron ser emparejadas con herramientas

Revisa la consola durante la ejecución para monitorear el progreso.
