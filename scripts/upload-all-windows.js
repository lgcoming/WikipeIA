#!/usr/bin/env node

// Script para Windows que carga variables de entorno desde .env.local
require('dotenv').config({ path: '.env.local' });

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando proceso completo de subida de imágenes...\n');

// Verificar que existe el token de Vercel Blob
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ Error: BLOB_READ_WRITE_TOKEN no está definido en .env.local');
  console.log('💡 Asegúrate de tener el token en tu archivo .env.local:');
  console.log('   BLOB_READ_WRITE_TOKEN=tu_token_aqui');
  process.exit(1);
}

console.log('✅ Token encontrado en .env.local');

// Verificar que existe el directorio de assets
const assetsDir = path.join(__dirname, '..', 'assets', 'wikipeia');
if (!fs.existsSync(assetsDir)) {
  console.error(`❌ Error: El directorio ${assetsDir} no existe`);
  process.exit(1);
}

try {
  // Paso 1: Subir imágenes a Vercel Blob
  console.log('📤 Paso 1: Subiendo imágenes a Vercel Blob...');
  execSync('node scripts/blob-upload.js', { stdio: 'inherit' });
  console.log('✅ Paso 1 completado\n');
  
  // Paso 2: Actualizar tools.json con URLs de imágenes
  console.log('🔄 Paso 2: Actualizando tools.json con URLs de imágenes...');
  execSync('node scripts/update-tools-images.js', { stdio: 'inherit' });
  console.log('✅ Paso 2 completado\n');
  
  console.log('🎉 ¡Proceso completo finalizado exitosamente!');
  console.log('\n📋 Resumen:');
  console.log('  ✅ Imágenes subidas a Vercel Blob');
  console.log('  ✅ URLs guardadas en data/image-urls.json');
  console.log('  ✅ tools.json actualizado con URLs de imágenes');
  console.log('  ✅ Backup de tools.json creado');
  
  console.log('\n🔧 Próximos pasos:');
  console.log('  1. Revisa data/image-urls.json para verificar las URLs');
  console.log('  2. Revisa data/tools.json para verificar que las imágenes se agregaron correctamente');
  console.log('  3. Usa el componente ToolImage en tu aplicación');
  console.log('  4. Haz commit y push de los cambios');
  
} catch (error) {
  console.error('💥 Error durante el proceso:', error.message);
  process.exit(1);
}
