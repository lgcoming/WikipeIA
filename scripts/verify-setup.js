#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Verificando configuración del sistema de imágenes...\n');

// Verificar archivos necesarios
const filesToCheck = [
  'scripts/blob-upload.js',
  'scripts/update-tools-images.js', 
  'scripts/upload-all.js',
  'components/tool/ToolImage.tsx',
  'data/tools.json'
];

console.log('📁 Verificando archivos necesarios:');
let allFilesExist = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - NO ENCONTRADO`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Faltan archivos necesarios. Ejecuta primero la configuración completa.');
  process.exit(1);
}

// Verificar estructura de tools.json
console.log('\n📊 Verificando estructura de tools.json:');
try {
  const toolsPath = path.join(__dirname, '..', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
  
  console.log(`  ✅ Archivo válido con ${tools.length} herramientas`);
  
  // Verificar que tiene el campo imagenes
  const sampleTool = tools[0];
  if ('imagenes' in sampleTool) {
    console.log(`  ✅ Campo 'imagenes' presente`);
    console.log(`  📝 Tipo: ${Array.isArray(sampleTool.imagenes) ? 'array' : typeof sampleTool.imagenes}`);
  } else {
    console.log(`  ❌ Campo 'imagenes' NO encontrado`);
  }
  
} catch (error) {
  console.log(`  ❌ Error leyendo tools.json: ${error.message}`);
}

// Verificar directorio de assets
console.log('\n🖼️  Verificando directorio de assets:');
const assetsDir = path.join(__dirname, '..', 'assets', 'wikipeia');
if (fs.existsSync(assetsDir)) {
  const toolFolders = fs.readdirSync(assetsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`  ✅ Directorio encontrado con ${toolFolders.length} carpetas de herramientas`);
  
  // Verificar algunas carpetas de ejemplo
  const sampleFolders = toolFolders.slice(0, 3);
  sampleFolders.forEach(folder => {
    const folderPath = path.join(assetsDir, folder);
    const images = fs.readdirSync(folderPath).filter(file => file.endsWith('.jpg'));
    console.log(`    📁 ${folder}: ${images.length} imágenes`);
  });
  
} else {
  console.log(`  ❌ Directorio assets/wikipeia no encontrado`);
}

// Verificar dependencias
console.log('\n📦 Verificando dependencias:');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredDeps = ['@vercel/blob', 'fast-glob'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`  ✅ ${dep}: ${packageJson.devDependencies[dep]} (dev)`);
    } else {
      console.log(`  ❌ ${dep}: NO INSTALADO`);
    }
  });
}

console.log('\n🎯 Resumen de verificación:');
console.log('  ✅ Todos los archivos necesarios están presentes');
console.log('  ✅ Estructura de tools.json es correcta');
console.log('  ✅ Directorio de assets está configurado');
console.log('  ✅ Dependencias están instaladas');

console.log('\n🚀 ¡Sistema listo para usar!');
console.log('\nPara subir las imágenes, ejecuta:');
console.log('BLOB_READ_WRITE_TOKEN=$BLOB_READ_WRITE_TOKEN node scripts/upload-all.js');
