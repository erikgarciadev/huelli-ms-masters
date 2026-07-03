// db.config.ts — Configuración de base de datos (PostgreSQL)
// Las credenciales se leen desde variables de entorno en tiempo de ejecución
//
// ─── Fuentes de variables según ambiente ──────────────────
// Local dev  : archivo .env (solo desarrollo)
// Docker     : variables en docker run / docker-compose
// Kubernetes : Secrets de K8s montados como env vars
// ──────────────────────────────────────────────────────────
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function dbConfig(cfg: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host:     cfg.get<string>('DB_HOST', 'localhost'),
    port:     cfg.get<number>('DB_PORT', 5432),
    username: cfg.get<string>('DB_USER'),
    password: cfg.get<string>('DB_PASS'),
    database: cfg.get<string>('DB_NAME'),
    schema:   'public',
    ssl: cfg.get<string>('DB_SSL', 'false').trim().toLowerCase() === 'true'
      ? { rejectUnauthorized: false }
      : false,
    extra: { max: 25 },
    autoLoadEntities: true,
    synchronize: false,
    logging: cfg.get('NODE_ENV') === 'development',
  };
}
