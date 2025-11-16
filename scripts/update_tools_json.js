const fs = require('fs');
const path = require('path');

function randomDateInLastDays(days) {
  const now = new Date();
  const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const rand = new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
  // Solo fecha en formato estándar YYYY-MM-DD
  return rand.toISOString().slice(0, 10);
}

function reassignTecnologia(tool) {
  // Mapeos manuales conocidos; si no, "no"
  const id = (tool.id || '').toLowerCase();
  switch (id) {
    case 'mutiny':
      return 'Marketing';
    case 'magicform':
      return 'Productividad';
    case 'deepl':
      return 'Productividad';
    // Posibles candidatos a productividad, pero si prefieres revisarlos, comenta y quedarán como "no"
    case 'humataai':
    case 'cody':
      return 'Productividad';
    default:
      return 'no';
  }
}

(function main() {
  const filePath = path.resolve(__dirname, '..', 'data', 'tools.json');
  const backupPath = path.resolve(__dirname, '..', 'data', `tools.backup.${Date.now()}.json`);

  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) {
    throw new Error('El JSON raíz no es un array');
  }

  const updated = data.map((tool) => {
    const t = { ...tool };

    if (t.categoria === 'Negocios') {
      t.categoria = 'Productividad';
    }

    if (t.categoria === 'Tecnología') {
      t.categoria = reassignTecnologia(t);
    }

    // Añadir fechaAlta si no existe o sobrescribir según requisito
    t.fechaAlta = randomDateInLastDays(45);

    return t;
  });

  // Backup antes de escribir
  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), 'utf8');
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');

  // Resumen simple por consola
  const counts = updated.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + 1;
    return acc;
  }, {});

  console.log('Backup creado en:', backupPath);
  console.log('Categorías resultantes:', counts);
})();
