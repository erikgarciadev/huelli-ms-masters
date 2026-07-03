import { NestFactory }    from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule }      from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as http  from 'http';
import * as https from 'https';
import { buildHttpsOptions } from './ssl/ssl-config.util';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'v' });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ms-bs-huelli')
      .setDescription('Microservicio de mantenimiento (CRUD) para huelli_db — Generado por Jarvis Platform')
      .setVersion('1.0')
      .build();
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  }

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();

  const port = Number(process.env.PORT ?? 10420);
  http.createServer(expressApp).listen(port, () => {
    console.log(`[ms-bs-huelli] HTTP  -> http://localhost:${port}`);
  });

  const httpsOptions = buildHttpsOptions();
  if (httpsOptions) {
    const sslPort = Number(process.env.SSL_PORT ?? 20420);
    try {
      https.createServer(httpsOptions, expressApp).listen(sslPort, () => {
        console.log(`[ms-bs-huelli] HTTPS -> https://localhost:${sslPort}`);
      });
    } catch (e: any) {
      console.error('Error al iniciar HTTPS:', e.message, '— solo HTTP activo');
    }
  }
}
bootstrap();
