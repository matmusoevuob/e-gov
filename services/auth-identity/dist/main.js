"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('AuthIdentityService');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: ['https://auth.gov.tj', 'https://gov.tj', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Auth & Identity Gateway API (auth.gov.tj)')
        .setDescription('Unified E-Government Authentication & Identity Gateway supporting Keycloak OIDC and PKI X.509 Digital Signature Validation.')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Keycloak OIDC Authentication (auth.gov.tj)')
        .addTag('PKI & Digital Signatures (auth.gov.tj)')
        .addTag('Service Health & Probes')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Auth & Identity Gateway running on port ${port} (Swagger docs: http://localhost:${port}/api/docs)`);
}
bootstrap();
//# sourceMappingURL=main.js.map