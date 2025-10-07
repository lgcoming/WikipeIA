const fs = require('fs');
const path = require('path');

// Rutas de archivos
const IMAGE_URLS_FILE = path.join(__dirname, '..', 'data', 'image-urls.json');
const TOOLS_FILE = path.join(__dirname, '..', 'data', 'tools.json');
const BACKUP_FILE = path.join(__dirname, '..', 'data', 'tools-backup.json');

// Función para normalizar nombres de herramientas
function normalizeToolName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

// Función para encontrar coincidencias entre nombres
function findToolMatch(imageToolName, tools) {
  const normalizedImageName = normalizeToolName(imageToolName);
  
  // Buscar coincidencia exacta
  for (const tool of tools) {
    const normalizedToolName = normalizeToolName(tool.nombre);
    if (normalizedImageName === normalizedToolName) {
      return tool;
    }
  }
  
  // Buscar coincidencia parcial
  for (const tool of tools) {
    const normalizedToolName = normalizeToolName(tool.nombre);
    if (normalizedImageName.includes(normalizedToolName) || normalizedToolName.includes(normalizedImageName)) {
      return tool;
    }
  }
  
  return null;
}

// Función principal
function updateToolsWithImages() {
  console.log('🔄 Actualizando tools.json con URLs de imágenes...');
  
  // Verificar que existen los archivos necesarios
  if (!fs.existsSync(IMAGE_URLS_FILE)) {
    console.error(`❌ El archivo ${IMAGE_URLS_FILE} no existe. Ejecuta primero el script blob-upload.js`);
    process.exit(1);
  }
  
  if (!fs.existsSync(TOOLS_FILE)) {
    console.error(`❌ El archivo ${TOOLS_FILE} no existe`);
    process.exit(1);
  }
  
  // Cargar datos
  const imageData = JSON.parse(fs.readFileSync(IMAGE_URLS_FILE, 'utf8'));
  const tools = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log(`📊 Cargados ${tools.length} herramientas y ${imageData.totalImages} imágenes`);
  
  // Crear backup
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(tools, null, 2));
  console.log(`💾 Backup creado en: ${BACKUP_FILE}`);
  
  let updatedCount = 0;
  let unmatchedImages = [];
  
  // Procesar cada grupo de imágenes
  for (const imageGroup of imageData.results) {
    const tool = findToolMatch(imageGroup.toolName, tools);
    
    if (tool) {
      // Agregar URLs de imágenes al campo imagenes existente
      tool.imagenes = imageGroup.images.map(img => img.url);
      
      updatedCount++;
      console.log(`✅ ${tool.nombre} -> ${imageGroup.images.length} imágenes`);
    } else {
      unmatchedImages.push(imageGroup.toolName);
      console.log(`⚠️  No se encontró coincidencia para: ${imageGroup.toolName}`);
    }
  }
  
  // Guardar tools.json actualizado
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(tools, null, 2));
  
  console.log('\n📊 Resumen de la actualización:');
  console.log(`✅ Herramientas actualizadas: ${updatedCount}`);
  console.log(`⚠️  Imágenes sin coincidencia: ${unmatchedImages.length}`);
  console.log(`💾 Archivo actualizado: ${TOOLS_FILE}`);
  
  if (unmatchedImages.length > 0) {
    console.log('\n🔍 Imágenes sin coincidencia:');
    unmatchedImages.forEach(name => console.log(`  - ${name}`));
    console.log('\n💡 Sugerencias:');
    console.log('  1. Verifica que los nombres de las carpetas coincidan con los nombres de las herramientas');
    console.log('  2. Revisa la función normalizeToolName en este script si necesitas ajustar la lógica de coincidencia');
  }
  
  console.log('\n🎉 ¡Actualización completada!');
}

// Ejecutar el script
if (require.main === module) {
  updateToolsWithImages();
}

module.exports = { updateToolsWithImages };
