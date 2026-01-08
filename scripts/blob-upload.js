const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Configuración
const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'wikipeia');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'image-urls.json');

// Extensiones soportadas
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Función para obtener el nombre de la herramienta desde la ruta
function getToolName(folderPath) {
  return path.basename(folderPath);
}

// Función para obtener el número de imagen desde el nombre del archivo
function getImageNumber(filename) {
  // Busca un número al final del nombre del archivo (antes de la extensión)
  const match = filename.match(/(\d+)\.[^.]+$/);
  return match ? parseInt(match[1]) : 1;
}

// Función para obtener el content type según extensión
function getContentType(extension) {
  switch (extension.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}

// Función para subir una imagen
async function uploadImage(imagePath, toolName, imageNumber) {
  try {
    const fileBuffer = fs.readFileSync(imagePath);
    const extension = path.extname(imagePath).toLowerCase();
    const filename = `${toolName}/${imageNumber}${extension}`;

    console.log(`Subiendo: ${filename}`);

    const blob = await put(filename, fileBuffer, {
      access: 'public',
      contentType: getContentType(extension)
    });

    return {
      toolName,
      imageNumber,
      url: blob.url,
      filename: filename
    };
  } catch (error) {
    console.error(`Error subiendo ${imagePath}:`, error.message);
    return null;
  }
}

// Función principal
async function uploadAllImages() {
  console.log('🚀 Iniciando subida de imágenes a Vercel Blob...');
  console.log(`📁 Directorio de assets: ${ASSETS_DIR}`);

  // Verificar que existe el directorio de assets
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`❌ El directorio ${ASSETS_DIR} no existe`);
    process.exit(1);
  }

  // Buscar todas las carpetas de herramientas
  const toolFolders = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`📊 Encontradas ${toolFolders.length} herramientas`);

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  // Procesar cada herramienta
  for (const toolFolder of toolFolders) {
    const toolPath = path.join(ASSETS_DIR, toolFolder);
    const images = fs.readdirSync(toolPath)
      .filter(file => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .sort((a, b) => getImageNumber(a) - getImageNumber(b));

    console.log(`\n🔧 Procesando ${toolFolder} (${images.length} imágenes)`);

    const toolResults = {
      toolName: toolFolder,
      images: []
    };

    // Subir cada imagen de la herramienta
    for (const imageFile of images) {
      const imagePath = path.join(toolPath, imageFile);
      const imageNumber = getImageNumber(imageFile);

      const result = await uploadImage(imagePath, toolFolder, imageNumber);

      if (result) {
        toolResults.images.push({
          number: imageNumber,
          url: result.url,
          filename: result.filename
        });
        successCount++;
        console.log(`  ✅ ${imageFile} -> ${result.url}`);
      } else {
        errorCount++;
        console.log(`  ❌ Error con ${imageFile}`);
      }

      // Pequeña pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (toolResults.images.length > 0) {
      results.push(toolResults);
    }
  }

  // Guardar resultados en archivo JSON
  const outputData = {
    uploadDate: new Date().toISOString(),
    totalTools: toolFolders.length,
    totalImages: successCount,
    errors: errorCount,
    results: results
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));

  console.log('\n📊 Resumen de la subida:');
  console.log(`✅ Imágenes subidas exitosamente: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📁 Herramientas procesadas: ${toolFolders.length}`);
  console.log(`💾 Resultados guardados en: ${OUTPUT_FILE}`);

  if (errorCount > 0) {
    console.log('\n⚠️  Algunas imágenes no se pudieron subir. Revisa los errores arriba.');
    process.exit(1);
  } else {
    console.log('\n🎉 ¡Todas las imágenes se subieron exitosamente!');
  }
}

// Ejecutar el script
if (require.main === module) {
  uploadAllImages().catch(error => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
}

module.exports = { uploadAllImages };
