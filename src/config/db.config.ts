// db.config.ts — Configuración de base de datos (PostgreSQL)
// Las credenciales se leen desde variables de entorno en tiempo de ejecución
//
// ─── Fuentes de variables según ambiente ──────────────────
// Local dev  : archivo .env (solo desarrollo)
// Docker     : variables en docker run / docker-compose
// Kubernetes : Secrets de K8s montados como env vars
// ──────────────────────────────────────────────────────────
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function dbConfig(cfg: ConfigService): TypeOrmModuleOptions {
  const databaseUrl = cfg.get<string>("DATABASE_URL");

  const sslEnabled =
    cfg.get<string>("DB_SSL", "false").trim().toLowerCase() === "true";

  const baseConfig: TypeOrmModuleOptions = {
    type: "postgres",
    schema: "public",
    autoLoadEntities: true,
    synchronize: false,
    logging: cfg.get("NODE_ENV") === "development",
    extra: { max: 25 },
    ssl: sslEnabled ? { rejectUnauthorized: false } : false,
  };

  if (databaseUrl) {
    return {
      ...baseConfig,
      url: databaseUrl,
    };
  }

  return {
    ...baseConfig,
    host: cfg.get<string>("DB_HOST", "localhost"),
    port: cfg.get<number>("DB_PORT", 5432),
    username: cfg.get<string>("DB_USER"),
    password: cfg.get<string>("DB_PASS"),
    database: cfg.get<string>("DB_NAME"),
  };
}
