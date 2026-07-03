// Script de uso único: parsea columns.csv (introspección de information_schema) y produce schema.json
// para alimentar generate.js. No se ejecuta en runtime del microservicio.
const fs = require('fs');
const path = require('path');

const SCRATCH = 'C:/Users/fpinedo/AppData/Local/Temp/claude/C--Users-fpinedo-Documents-TEMPLATE-JARVIS-pruebas/e6859385-d6f2-482d-99b4-3c86e216978d/scratchpad';
const columnsCsv = fs.readFileSync(path.join(SCRATCH, 'columns.csv'), 'utf8').trim().split('\n');

const IRREGULAR_SINGULAR = { status: 'status', audit: 'audit', gallery: 'gallery', blacklist: 'blacklist' };

function singularizeWord(word) {
  if (IRREGULAR_SINGULAR[word]) return IRREGULAR_SINGULAR[word];
  if (word.endsWith('ies') && word.length > 4) return word.slice(0, -3) + 'y';
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function pascalCase(tableName, { isView = false } = {}) {
  let name = tableName;
  if (isView) name = name.replace(/^vw_/, '');
  const tokens = name.split('_');
  const lastIdx = tokens.length - 1;
  tokens[lastIdx] = singularizeWord(tokens[lastIdx]);
  const pascal = tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join('');
  return isView ? pascal + 'View' : pascal;
}

function pluralizeWord(word) {
  if (/[^aeiou]y$/.test(word)) return word.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/.test(word)) return word + 'es';
  return word + 's';
}

function kebabRoute(tableName, { isView = false } = {}) {
  let name = tableName;
  if (isView) name = name.replace(/^vw_/, '');
  const tokens = name.split('_');
  const lastIdx = tokens.length - 1;
  tokens[lastIdx] = pluralizeWord(singularizeWord(tokens[lastIdx]));
  const kebab = tokens.join('-');
  return isView ? `views/${kebab}` : kebab;
}

// Mapeo tipo Postgres (udt_name) -> tipo de columna TypeORM + tipo TS
function mapType(udt, dataType, charMax, numPrecision, numScale) {
  switch (udt) {
    case 'uuid': return { typeorm: 'uuid', ts: 'string' };
    case 'varchar': return { typeorm: 'varchar', ts: 'string', length: charMax ? Number(charMax) : undefined };
    case 'bpchar': return { typeorm: 'char', ts: 'string', length: charMax ? Number(charMax) : undefined };
    case 'text': return { typeorm: 'text', ts: 'string' };
    case 'citext': return { typeorm: 'text', ts: 'string' };
    case 'bool': return { typeorm: 'boolean', ts: 'boolean' };
    case 'int2': return { typeorm: 'smallint', ts: 'number' };
    case 'int4': return { typeorm: 'int', ts: 'number' };
    case 'int8': return { typeorm: 'bigint', ts: 'string' };
    case 'numeric': return { typeorm: 'numeric', ts: 'number', precision: numPrecision ? Number(numPrecision) : undefined, scale: numScale ? Number(numScale) : undefined };
    case 'timestamp': return { typeorm: 'timestamp', ts: 'Date' };
    case 'timestamptz': return { typeorm: 'timestamptz', ts: 'Date' };
    case 'time': return { typeorm: 'time', ts: 'string' };
    case 'inet': return { typeorm: 'inet', ts: 'string' };
    case 'jsonb': return { typeorm: 'jsonb', ts: 'Record<string, any>' };
    default: return { typeorm: 'text', ts: 'string' };
  }
}

const tables = {};
for (const line of columnsCsv) {
  const [table_name, ordinal, column_name, data_type, udt_name, char_max, num_precision, num_scale, is_nullable, column_default] = line.split(',');
  if (!tables[table_name]) tables[table_name] = { table_name, columns: [] };
  const mapped = mapType(udt_name, data_type, char_max, num_precision, num_scale);
  tables[table_name].columns.push({
    name: column_name,
    nullable: is_nullable === 'YES',
    default: column_default || null,
    ...mapped,
  });
}

const schema = { tables: [] };
for (const table_name of Object.keys(tables)) {
  const isView = table_name.startsWith('vw_');
  const t = tables[table_name];
  const entityName = pascalCase(table_name, { isView });
  const routePath = kebabRoute(table_name, { isView });
  const hasIsActive = t.columns.some(c => c.name === 'is_active');
  const hasDeletedAt = t.columns.some(c => c.name === 'deleted_at');
  const hasUpdatedAt = t.columns.some(c => c.name === 'updated_at');
  schema.tables.push({
    table_name,
    entityName,
    routePath,
    isView,
    hasIsActive,
    hasDeletedAt,
    hasUpdatedAt,
    pkColumn: isView ? t.columns[0].name : 'id',
    columns: t.columns,
  });
}

schema.tables.sort((a, b) => a.isView === b.isView ? a.table_name.localeCompare(b.table_name) : (a.isView ? 1 : -1));

fs.writeFileSync(path.join(__dirname, 'schema.json'), JSON.stringify(schema, null, 2));
console.log(`Generado schema.json: ${schema.tables.length} tablas/vistas`);
