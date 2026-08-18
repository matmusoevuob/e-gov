"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const jwks_rsa_1 = require("jwks-rsa");
const config_1 = require("@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'keycloak-jwt') {
    constructor(configService) {
        const jwksUri = configService.get('keycloak.jwksUri');
        const issuer = configService.get('keycloak.issuer');
        super({
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 10,
                jwksUri: jwksUri || 'https://auth.gov.tj/auth/realms/egov-tj/protocol/openid-connect/certs',
            }),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: issuer || 'https://auth.gov.tj/auth/realms/egov-tj',
            algorithms: ['RS256'],
        });
    }
    async validate(payload) {
        if (!payload || !payload.sub) {
            throw new common_1.UnauthorizedException('Invalid or missing JWT token subject claim');
        }
        const realmRoles = payload.realm_access?.roles || [];
        const clientRoles = payload.resource_access?.[payload.azp]?.roles || [];
        const roles = Array.from(new Set([...realmRoles, ...clientRoles]));
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
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map