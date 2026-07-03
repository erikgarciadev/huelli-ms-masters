const fs = require('fs');
const path = require('path');
const schema = require('./schema.json');

const lines = [];
lines.push(`import { Module } from '@nestjs/common';`);
lines.push(`import { ConfigModule, ConfigService } from '@nestjs/config';`);
lines.push(`import { TypeOrmModule } from '@nestjs/typeorm';`);
lines.push(`import { dbConfig } from './config/db.config';`);
lines.push('');

for (const t of schema.tables) {
  lines.push(`import { ${t.entityName}Controller } from './infrastructure/controllers/${t.entityName}.controller';`);
}
lines.push('');
for (const t of schema.tables) {
  lines.push(`import { ${t.entityName} } from './domain/entities/${t.entityName}.entity';`);
}
lines.push('');
for (const t of schema.tables) {
  lines.push(`import { ${t.entityName}TypeOrmRepository } from './infrastructure/persistence/${t.entityName}.typeorm.repository';`);
}
lines.push('');
lines.push(`import { APP_INTERCEPTOR } from '@nestjs/core';`);
lines.push(`import { ResponseInterceptor } from './common/interceptors/response.interceptor';`);
lines.push('');
lines.push(`import { HealthModule } from './health/health.module';`);
lines.push('');

const entityNames = schema.tables.map(t => t.entityName);
const controllerNames = schema.tables.map(t => t.entityName + 'Controller');
const repoNames = schema.tables.map(t => t.entityName + 'TypeOrmRepository');

function chunked(arr, perLine = 4) {
  const rows = [];
  for (let i = 0; i < arr.length; i += perLine) rows.push('    ' + arr.slice(i, i + perLine).join(', ') + ',');
  return rows.join('\n');
}

lines.push(`@Module({`);
lines.push(`  imports: [HealthModule,`);
lines.push(`    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),`);
lines.push(`    TypeOrmModule.forRootAsync({`);
lines.push(`      imports: [HealthModule, ConfigModule],`);
lines.push(`      useFactory: (cfg: ConfigService) => dbConfig(cfg),`);
lines.push(`      inject: [ConfigService],`);
lines.push(`    }),`);
lines.push(`    TypeOrmModule.forFeature([`);
lines.push(chunked(entityNames));
lines.push(`    ]),`);
lines.push(`  ],`);
lines.push(`  controllers: [`);
lines.push(chunked(controllerNames));
lines.push(`  ],`);
lines.push(`  providers: [`);
lines.push(chunked(repoNames));
lines.push(`    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },`);
lines.push(`  ],`);
lines.push(`})`);
lines.push(`export class AppModule {}`);
lines.push('');

fs.writeFileSync(path.join(__dirname, '..', 'src', 'app.module.ts'), lines.join('\n'), 'utf8');
console.log('app.module.ts generado');
