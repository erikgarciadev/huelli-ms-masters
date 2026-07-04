import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as http from "http";
import * as https from "https";
import { buildHttpsOptions } from "./ssl/ssl-config.util";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix("api", { exclude: ["health"] });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: "v",
  });

  if (process.env.ENABLE_SWAGGER === "true") {
    const config = new DocumentBuilder()
      .setTitle("ms-bs-huelli")
      .setDescription("Microservicio CRUD huelli_db")
      .setVersion("1.0")
      .build();

    SwaggerModule.setup(
      "api/docs",
      app,
      SwaggerModule.createDocument(app, config),
    );
  }

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  console.log(`[ms-bs-huelli] running on port ${port}`);
}

bootstrap();
