import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AuthIdentityService');
  const app = await NestFactory.create(AppModule);

  // Global prefix for API endpoints
  app.setGlobalPrefix('api/v1');

  // Enable ValidationPipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for e-Gov domains
  app.enableCors({
    origin: ['https://auth.gov.tj', 'https://gov.tj', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Auth & Identity Gateway API (auth.gov.tj)')
    .setDescription(
      'Unified E-Government Authentication & Identity Gateway supporting Keycloak OIDC and PKI X.509 Digital Signature Validation.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Keycloak OIDC Authentication (auth.gov.tj)')
    .addTag('PKI & Digital Signatures (auth.gov.tj)')
    .addTag('Service Health & Probes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Auth & Identity Gateway running on port ${port} (Swagger docs: http://localhost:${port}/api/docs)`);
}

bootstrap();
