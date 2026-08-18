"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
describe('AuthService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: (key) => {
                            if (key === 'keycloak.baseUrl')
                                return 'https://auth.gov.tj/auth';
                            if (key === 'keycloak.realm')
                                return 'egov-tj';
                            if (key === 'keycloak.clientId')
                                return 'egov-portal-client';
                            if (key === 'keycloak.clientSecret')
                                return 'test-secret';
                            return null;
                        },
                    },
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getLoginUrl', () => {
        it('should generate valid Keycloak OIDC redirect URL', () => {
            const redirectUri = 'https://gov.tj/auth/callback';
            const result = service.getLoginUrl({ redirectUri });
            expect(result.loginUrl).toContain('https://auth.gov.tj/auth/realms/egov-tj/protocol/openid-connect/auth');
            expect(result.loginUrl).toContain(`redirect_uri=${encodeURIComponent(redirectUri)}`);
            expect(result.loginUrl).toContain('client_id=egov-portal-client');
            expect(result.loginUrl).toContain('response_type=code');
            expect(result.state).toBeDefined();
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map