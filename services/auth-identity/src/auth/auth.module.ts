import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KeycloakAuthGuard } from './guards/keycloak-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'keycloak-jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, KeycloakAuthGuard, RolesGuard],
  exports: [AuthService, KeycloakAuthGuard, RolesGuard],
})
export class AuthModule {}
