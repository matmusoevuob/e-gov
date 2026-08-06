import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { UserProfileDto } from '../dto/user-profile.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'keycloak-jwt') {
  constructor(configService: ConfigService) {
    const jwksUri = configService.get<string>('keycloak.jwksUri');
    const issuer = configService.get<string>('keycloak.issuer');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: jwksUri || 'https://auth.gov.tj/auth/realms/egov-tj/protocol/openid-connect/certs',
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: issuer || 'https://auth.gov.tj/auth/realms/egov-tj',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any): Promise<UserProfileDto> {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid or missing JWT token subject claim');
    }

    // Extract realm roles & client resource roles from Keycloak JWT payload
    const realmRoles = payload.realm_access?.roles || [];
    const clientRoles = payload.resource_access?.[payload.azp]?.roles || [];
    const roles = Array.from(new Set([...realmRoles, ...clientRoles]));

    // Extract Tajikistan e-Gov specific attributes from claims
    const tin = payload.tin || payload.attributes?.tin?.[0] || payload.inn;
    const pinfl = payload.pinfl || payload.attributes?.pinfl?.[0];
    const passportNumber = payload.passport_number || payload.attributes?.passport_number?.[0];

    return {
      sub: payload.sub,
      preferredUsername: payload.preferred_username || payload.username || payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
      givenName: payload.given_name,
      familyName: payload.family_name,
      name: payload.name || `${payload.given_name || ''} ${payload.family_name || ''}`.trim(),
      roles,
      govAttributes: {
        tin,
        pinfl,
        passportNumber,
        citizenship: payload.citizenship || 'TJ',
        governanceRole: roles.includes('gov_admin')
          ? 'ADMIN'
          : roles.includes('civil_servant')
          ? 'CIVIL_SERVANT'
          : 'CITIZEN',
      },
    };
  }
}
