// Generador de código: produce entity/repository/typeorm-repository/use-case/controller/dto
// para cada tabla de schema.json, replicando la arquitectura hexagonal de ms-bs-catalogs
// adaptada a PostgreSQL. Uso único (no forma parte del runtime del microservicio).
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const schema = require('./schema.json');

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(relPath, content) {
  const full = path.join(SRC, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}

function defaultExpr(col) {
  if (!col.default) return null;
  if (col.default === 'true') return 'true';
  if (col.default === 'false') return 'false';
  if (col.default === 'now()') return `() => 'now()'`;
  if (col.default === 'gen_random_uuid()') return `() => 'gen_random_uuid()'`;
  if (/^-?\d+(\.\d+)?$/.test(col.default)) return col.default;
  return null; // defaults de texto complejos: se omiten (synchronize:false, no afecta funcionalidad)
}

function columnDecorator(col, { isPk = false } = {}) {
  const parts = [`name: '${col.name}'`, `type: '${col.typeorm}'`];
  if (col.length) parts.push(`length: ${col.length}`);
  if (col.precision !== undefined && col.precision !== null && col.typeorm === 'numeric') parts.push(`precision: ${col.precision}`);
  if (col.scale !== undefined && col.scale !== null && col.typeorm === 'numeric') parts.push(`scale: ${col.scale}`);
  if (!isPk && col.nullable) parts.push(`nullable: true`);
  const def = defaultExpr(col);
  if (def) parts.push(`default: ${def}`);
  return `{ ${parts.join(', ')} }`;
}

function fieldDecl(col) {
  const optional = col.nullable ? '?' : '!';
  return `  ${col.name}${optional}: ${col.ts};`;
}

// ─────────────────────────────── ENTIDADES ───────────────────────────────
function genEntity(t) {
  const lines = [];
  const typeormImports = ['Entity', 'Column'];
  if (t.isView) typeormImports.splice(1, 0, 'PrimaryColumn');
  else typeormImports.splice(1, 0, 'PrimaryGeneratedColumn');
  lines.push(`import { ${typeormImports.join(', ')} } from 'typeorm';`);
  lines.push('');
  lines.push(`@Entity({ schema: 'public', name: '${t.table_name}' })`);
  lines.push(`export class ${t.entityName} {`);
  for (const col of t.columns) {
    const isPk = !t.isView && col.name === t.pkColumn;
    const isViewPk = t.isView && col.name === t.pkColumn;
    if (isPk && col.typeorm === 'uuid') {
      lines.push(`  @PrimaryGeneratedColumn('uuid', { name: '${col.name}' })`);
      lines.push(`  ${col.name}!: string;`);
    } else if (isViewPk) {
      lines.push(`  @PrimaryColumn(${columnDecorator(col, { isPk: true })})`);
      lines.push(fieldDecl({ ...col, nullable: false }));
    } else {
      lines.push(`  @Column(${columnDecorator(col)})`);
      lines.push(fieldDecl(col));
    }
    lines.push('');
  }
  lines.push('}');
  return lines.join('\n') + '\n';
}

// ────────────────────────── REPOSITORY (interfaz) ─────────────────────────
function genRepoInterface(t) {
  const lines = [];
  lines.push(`import { ${t.entityName} } from '../entities/${t.entityName}.entity';`);
  lines.push('');
  lines.push(`export interface ${t.entityName}Repository {`);
  lines.push(`  findAll(): Promise<${t.entityName}[]>;`);
  lines.push(`  findById(id: string): Promise<${t.entityName} | null>;`);
  if (!t.isView) {
    lines.push(`  save(entity: Partial<${t.entityName}>): Promise<${t.entityName}>;`);
    if (t.hasIsActive) {
      lines.push(`  setActive(id: string, isActive: boolean): Promise<${t.entityName} | null>;`);
    } else if (t.hasDeletedAt) {
      lines.push(`  softDelete(id: string): Promise<void>;`);
    } else {
      lines.push(`  delete(id: string): Promise<void>;`);
    }
  }
  lines.push('}');
  return lines.join('\n') + '\n';
}

// ──────────────────────── TYPEORM REPOSITORY (impl) ────────────────────────
function genTypeOrmRepo(t) {
  const lines = [];
  lines.push(`import { Injectable } from '@nestjs/common';`);
  lines.push(`import { InjectRepository } from '@nestjs/typeorm';`);
  lines.push(`import { Repository, IsNull } from 'typeorm';`);
  lines.push(`import { ${t.entityName} } from '../../domain/entities/${t.entityName}.entity';`);
  lines.push(`import { ${t.entityName}Repository } from '../../domain/repositories/${t.entityName}.repository';`);
  lines.push('');
  lines.push(`@Injectable()`);
  lines.push(`export class ${t.entityName}TypeOrmRepository implements ${t.entityName}Repository {`);
  lines.push(`  constructor(`);
  lines.push(`    @InjectRepository(${t.entityName})`);
  lines.push(`    private readonly repo: Repository<${t.entityName}>,`);
  lines.push(`  ) {}`);
  lines.push('');

  if (t.isView) {
    lines.push(`  findAll(): Promise<${t.entityName}[]> { return this.repo.find(); }`);
    lines.push(`  findById(id: string): Promise<${t.entityName} | null> {`);
    lines.push(`    return this.repo.findOne({ where: { ${t.pkColumn}: id } as any });`);
    lines.push(`  }`);
  } else if (t.hasIsActive) {
    lines.push(`  findAll(): Promise<${t.entityName}[]> { return this.repo.find({ where: { is_active: true } as any }); }`);
    lines.push(`  findById(id: string): Promise<${t.entityName} | null> {`);
    lines.push(`    return this.repo.findOne({ where: { ${t.pkColumn}: id, is_active: true } as any });`);
    lines.push(`  }`);
    lines.push(`  save(entity: Partial<${t.entityName}>): Promise<${t.entityName}> { return this.repo.save(entity as ${t.entityName}); }`);
    lines.push('');
    lines.push(`  async setActive(id: string, isActive: boolean): Promise<${t.entityName} | null> {`);
    const patch = t.hasUpdatedAt ? `{ is_active: isActive, updated_at: new Date() }` : `{ is_active: isActive }`;
    lines.push(`    await this.repo.update(id, ${patch} as any);`);
    lines.push(`    return this.repo.findOne({ where: { ${t.pkColumn}: id } as any });`);
    lines.push(`  }`);
  } else if (t.hasDeletedAt) {
    lines.push(`  findAll(): Promise<${t.entityName}[]> { return this.repo.find({ where: { deleted_at: IsNull() } as any }); }`);
    lines.push(`  findById(id: string): Promise<${t.entityName} | null> {`);
    lines.push(`    return this.repo.findOne({ where: { ${t.pkColumn}: id, deleted_at: IsNull() } as any });`);
    lines.push(`  }`);
    lines.push(`  save(entity: Partial<${t.entityName}>): Promise<${t.entityName}> { return this.repo.save(entity as ${t.entityName}); }`);
    lines.push('');
    lines.push(`  async softDelete(id: string): Promise<void> {`);
    lines.push(`    await this.repo.update(id, { deleted_at: new Date() } as any);`);
    lines.push(`  }`);
  } else {
    lines.push(`  findAll(): Promise<${t.entityName}[]> { return this.repo.find(); }`);
    lines.push(`  findById(id: string): Promise<${t.entityName} | null> {`);
    lines.push(`    return this.repo.findOne({ where: { ${t.pkColumn}: id } as any });`);
    lines.push(`  }`);
    lines.push(`  save(entity: Partial<${t.entityName}>): Promise<${t.entityName}> { return this.repo.save(entity as ${t.entityName}); }`);
    lines.push('');
    lines.push(`  async delete(id: string): Promise<void> {`);
    lines.push(`    await this.repo.delete(id);`);
    lines.push(`  }`);
  }
  lines.push(`}`);
  return lines.join('\n') + '\n';
}

// ────────────────────────────── USE CASE ──────────────────────────────
function genUseCase(t) {
  const lines = [];
  lines.push(`import { ${t.entityName} } from '../../domain/entities/${t.entityName}.entity';`);
  lines.push(`import { ${t.entityName}Repository } from '../../domain/repositories/${t.entityName}.repository';`);
  lines.push('');
  lines.push(`export class ${t.entityName}UseCase {`);
  lines.push(`  constructor(private readonly repo: ${t.entityName}Repository) {}`);
  lines.push('');
  lines.push(`  findAll(): Promise<${t.entityName}[]> { return this.repo.findAll(); }`);
  lines.push(`  findById(id: string): Promise<${t.entityName} | null> { return this.repo.findById(id); }`);
  if (!t.isView) {
    lines.push(`  create(data: Partial<${t.entityName}>): Promise<${t.entityName}> { return this.repo.save(data); }`);
    lines.push(`  update(id: string, data: Partial<${t.entityName}>): Promise<${t.entityName}> {`);
    lines.push(`    return this.repo.save({ ...data, ${t.pkColumn}: id });`);
    lines.push(`  }`);
    if (t.hasIsActive) {
      lines.push(`  setActive(id: string, isActive: boolean): Promise<${t.entityName} | null> { return this.repo.setActive(id, isActive); }`);
    } else if (t.hasDeletedAt) {
      lines.push(`  softDelete(id: string): Promise<void> { return this.repo.softDelete(id); }`);
    } else {
      lines.push(`  remove(id: string): Promise<void> { return this.repo.delete(id); }`);
    }
  }
  lines.push(`}`);
  return lines.join('\n') + '\n';
}

// ──────────────────────────────── DTOs ────────────────────────────────
function tsToValidator(col) {
  switch (col.typeorm) {
    case 'uuid': return { deco: ['IsUUID()'], type: 'string' };
    case 'varchar': case 'char': case 'text':
      return { deco: col.length ? ['IsString()', `MaxLength(${col.length})`] : ['IsString()'], type: 'string' };
    case 'boolean': return { deco: ['IsBoolean()'], type: 'boolean' };
    case 'smallint': case 'int': return { deco: ['IsInt()'], type: 'number' };
    case 'bigint': return { deco: ['IsString()'], type: 'string' };
    case 'numeric': return { deco: ['IsNumber()'], type: 'number' };
    case 'timestamp': case 'timestamptz': return { deco: ['IsDateString()'], type: 'string' };
    case 'time': return { deco: ['IsString()'], type: 'string' };
    case 'inet': return { deco: ['IsString()'], type: 'string' };
    default: return { deco: ['IsString()'], type: 'string' };
  }
}

const EXCLUDE_FROM_CREATE = new Set(['created_at', 'updated_at', 'deleted_at']);

function genCreateDto(t) {
  const importsValidators = new Set();
  const fields = [];
  for (const col of t.columns) {
    if (col.name === t.pkColumn) continue;
    if (EXCLUDE_FROM_CREATE.has(col.name)) continue;
    const { deco, type } = tsToValidator(col);
    const isOptional = col.nullable || !!col.default;
    deco.forEach(d => importsValidators.add(d.replace(/\(.*\)/, '')));
    const apiDeco = isOptional
      ? `@ApiPropertyOptional(${col.length ? `{ maxLength: ${col.length} }` : ''})`
      : `@ApiProperty(${col.length ? `{ maxLength: ${col.length} }` : ''})`;
    const decoLine = [
      isOptional ? '@IsOptional()' : (type === 'string' ? '@IsNotEmpty()' : ''),
      ...deco.map(d => `@${d}`),
    ].filter(Boolean).join(' ');
    if (isOptional) importsValidators.add('IsOptional');
    else if (type === 'string') importsValidators.add('IsNotEmpty');
    fields.push(`  ${apiDeco}\n  ${decoLine}\n  ${col.name}${isOptional ? '?' : '!'}: ${type};\n`);
  }
  const lines = [];
  const validatorImports = Array.from(importsValidators).sort().join(', ');
  lines.push(`import { ${validatorImports} } from 'class-validator';`);
  lines.push(`import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';`);
  lines.push('');
  lines.push(`export class Create${t.entityName}Dto {`);
  lines.push(fields.join('\n'));
  lines.push(`}`);
  return lines.join('\n') + '\n';
}

function genUpdateDto(t) {
  const lines = [];
  lines.push(`import { PartialType } from '@nestjs/swagger';`);
  lines.push(`import { Create${t.entityName}Dto } from './create-${t.entityName}.dto';`);
  lines.push('');
  lines.push(`export class Update${t.entityName}Dto extends PartialType(Create${t.entityName}Dto) {}`);
  return lines.join('\n') + '\n';
}

// ─────────────────────────────── CONTROLLER ───────────────────────────────
function genController(t) {
  const lines = [];
  const imports = ['Controller', 'Get'];
  if (!t.isView) imports.push('Post', 'Put', 'Body');
  imports.push('Param', 'NotFoundException', 'ParseUUIDPipe');
  if (t.hasIsActive) imports.push('Patch');
  if (!t.isView && !t.hasIsActive) imports.push('Delete', 'HttpCode');

  lines.push(`import { ${Array.from(new Set(imports)).join(', ')} } from '@nestjs/common';`);
  lines.push(`import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';`);
  lines.push(`import { ${t.entityName}UseCase } from '../../application/use-cases/${t.entityName}.use-case';`);
  lines.push(`import { ${t.entityName}TypeOrmRepository } from '../persistence/${t.entityName}.typeorm.repository';`);
  if (!t.isView) {
    lines.push(`import { Create${t.entityName}Dto } from '../../dto/create-${t.entityName}.dto';`);
    lines.push(`import { Update${t.entityName}Dto } from '../../dto/update-${t.entityName}.dto';`);
  }
  if (t.hasIsActive) lines.push(`import { SetActiveDto } from '../../dto/set-active.dto';`);
  lines.push('');
  lines.push(`@ApiTags('${t.table_name.replace(/_/g, '-')}')`);
  lines.push(`@Controller('${t.routePath}')`);
  lines.push(`export class ${t.entityName}Controller {`);
  lines.push(`  private readonly useCase: ${t.entityName}UseCase;`);
  lines.push('');
  lines.push(`  constructor(private readonly repo: ${t.entityName}TypeOrmRepository) {`);
  lines.push(`    this.useCase = new ${t.entityName}UseCase(repo);`);
  lines.push(`  }`);
  lines.push('');
  lines.push(`  @Get()`);
  lines.push(`  @ApiOperation({ summary: 'Listar ${t.table_name}' })`);
  lines.push(`  findAll() {`);
  lines.push(`    return this.useCase.findAll();`);
  lines.push(`  }`);
  lines.push('');
  lines.push(`  @Get(':id')`);
  lines.push(`  @ApiOperation({ summary: 'Obtener ${t.table_name} por id' })`);
  lines.push(`  @ApiParam({ name: 'id', type: String })`);
  lines.push(`  async findOne(@Param('id', ParseUUIDPipe) id: string) {`);
  lines.push(`    const result = await this.useCase.findById(id);`);
  lines.push(`    if (!result) throw new NotFoundException(\`Registro no encontrado: \${id}\`);`);
  lines.push(`    return result;`);
  lines.push(`  }`);

  if (!t.isView) {
    lines.push('');
    lines.push(`  @Post()`);
    lines.push(`  @ApiOperation({ summary: 'Crear ${t.table_name}' })`);
    lines.push(`  create(@Body() dto: Create${t.entityName}Dto) {`);
    lines.push(`    return this.useCase.create(dto as any);`);
    lines.push(`  }`);
    lines.push('');
    lines.push(`  @Put(':id')`);
    lines.push(`  @ApiOperation({ summary: 'Actualizar ${t.table_name}' })`);
    lines.push(`  @ApiParam({ name: 'id', type: String })`);
    lines.push(`  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: Update${t.entityName}Dto) {`);
    const patch = t.hasUpdatedAt ? `{ ...dto, updated_at: new Date() }` : `dto`;
    lines.push(`    return this.useCase.update(id, ${patch} as any);`);
    lines.push(`  }`);

    if (t.hasIsActive) {
      lines.push('');
      lines.push(`  @Patch(':id/estado')`);
      lines.push(`  @ApiOperation({ summary: 'Activar/desactivar ${t.table_name}' })`);
      lines.push(`  @ApiParam({ name: 'id', type: String })`);
      lines.push(`  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {`);
      lines.push(`    return this.useCase.setActive(id, dto.is_active === 1);`);
      lines.push(`  }`);
    } else if (t.hasDeletedAt) {
      lines.push('');
      lines.push(`  @Delete(':id')`);
      lines.push(`  @HttpCode(204)`);
      lines.push(`  @ApiOperation({ summary: 'Eliminar (soft delete) ${t.table_name}' })`);
      lines.push(`  @ApiParam({ name: 'id', type: String })`);
      lines.push(`  async softDelete(@Param('id', ParseUUIDPipe) id: string) {`);
      lines.push(`    await this.useCase.softDelete(id);`);
      lines.push(`  }`);
    } else {
      lines.push('');
      lines.push(`  @Delete(':id')`);
      lines.push(`  @HttpCode(204)`);
      lines.push(`  @ApiOperation({ summary: 'Eliminar ${t.table_name}' })`);
      lines.push(`  @ApiParam({ name: 'id', type: String })`);
      lines.push(`  async remove(@Param('id', ParseUUIDPipe) id: string) {`);
      lines.push(`    await this.useCase.remove(id);`);
      lines.push(`  }`);
    }
  }
  lines.push(`}`);
  return lines.join('\n') + '\n';
}

// ─────────────────────────────── GENERACIÓN ───────────────────────────────
for (const t of schema.tables) {
  write(`domain/entities/${t.entityName}.entity.ts`, genEntity(t));
  write(`domain/repositories/${t.entityName}.repository.ts`, genRepoInterface(t));
  write(`infrastructure/persistence/${t.entityName}.typeorm.repository.ts`, genTypeOrmRepo(t));
  write(`application/use-cases/${t.entityName}.use-case.ts`, genUseCase(t));
  write(`infrastructure/controllers/${t.entityName}.controller.ts`, genController(t));
  if (!t.isView) {
    write(`dto/create-${t.entityName}.dto.ts`, genCreateDto(t));
    write(`dto/update-${t.entityName}.dto.ts`, genUpdateDto(t));
  }
}

console.log(`Generados archivos para ${schema.tables.length} entidades.`);
