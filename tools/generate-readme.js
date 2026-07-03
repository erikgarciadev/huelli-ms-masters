const fs = require('fs');
const path = require('path');
const schema = require('./schema.json');

const lines = [];
lines.push(`# ms-bs-huelli`);
lines.push('');
lines.push(`> Generado por **Jarvis Platform** a partir del esquema de \`huelli_db\` (${new Date().toISOString().slice(0, 10)})`);
lines.push('');
lines.push(`## Estrategia`);
lines.push(`Microservicio de mantenimiento (CRUD) — replica la arquitectura hexagonal de \`ms-bs-catalogs\`, adaptada a PostgreSQL.`);
lines.push('');
lines.push(`## Stack Tecnológico`);
lines.push(`- **Runtime**: Node.js 20 + TypeScript`);
lines.push(`- **Framework**: NestJS 11`);
lines.push(`- **Arquitectura**: hexagonal (domain / application / infrastructure)`);
lines.push(`- **ORM**: TypeORM (driver \`pg\`)`);
lines.push(`- **Base de datos**: PostgreSQL (\`huelli_db\`, esquema \`public\`)`);
lines.push(`- **Auth**: none (a nivel de este ms; se asume gateway/BFF delante)`);
lines.push(`- **API Docs**: Swagger UI (\`/api/docs\`)`);
lines.push('');
lines.push(`## Convención de mantenimiento por tabla`);
lines.push(`- Tablas con columna \`is_active\`: \`GET / :id\`, \`POST\`, \`PUT :id\`, \`PATCH :id/estado\` (activar/desactivar).`);
lines.push(`- Tablas con columna \`deleted_at\`: \`GET / :id\`, \`POST\`, \`PUT :id\`, \`DELETE :id\` (soft delete, marca \`deleted_at\`).`);
lines.push(`- Resto de tablas (sin bandera de estado): \`GET / :id\`, \`POST\`, \`PUT :id\`, \`DELETE :id\` (delete físico).`);
lines.push(`- Vistas SQL (\`vw_*\`): solo lectura, \`GET / :id\` (no admiten create/update/delete).`);
lines.push('');
lines.push(`## Endpoints`);
lines.push('');

for (const t of schema.tables) {
  const base = `/${t.routePath}`;
  lines.push(`### ${t.entityName} (\`${t.table_name}\`)`);
  lines.push(`- \`GET    ${base}\` — Listar`);
  lines.push(`- \`GET    ${base}/:id\` — Obtener`);
  if (!t.isView) {
    lines.push(`- \`POST   ${base}\` — Crear`);
    lines.push(`- \`PUT    ${base}/:id\` — Actualizar`);
    if (t.hasIsActive) lines.push(`- \`PATCH  ${base}/:id/estado\` — Activar/desactivar`);
    else if (t.hasDeletedAt) lines.push(`- \`DELETE ${base}/:id\` — Eliminar (soft delete)`);
    else lines.push(`- \`DELETE ${base}/:id\` — Eliminar`);
  }
  lines.push('');
}

lines.push(`## Instalación`);
lines.push('');
lines.push('```bash');
lines.push('npm install');
lines.push('cp .env.example .env');
lines.push('# Editar .env con tus valores reales (host/puerto de huelli-postgres, etc.)');
lines.push('npm run start:dev');
lines.push('```');
lines.push('');
lines.push(`## Docker`);
lines.push('');
lines.push('```bash');
lines.push('docker build -t ms-bs-huelli .');
lines.push('docker run -p 10420:10420 --env-file .env ms-bs-huelli');
lines.push('```');
lines.push('');
lines.push(`Para que este contenedor alcance \`huelli-postgres\`, conéctalo a la red \`huelli-network\` (creada por huelli_database/docker-compose.yml) y usa \`DB_HOST=huelli-postgres\`.`);
lines.push('');
lines.push(`## Swagger UI`);
lines.push('');
lines.push('Disponible en: `http://localhost:10420/api/docs`');
lines.push('');

fs.writeFileSync(path.join(__dirname, '..', 'README.md'), lines.join('\n'), 'utf8');
console.log('README.md generado');
