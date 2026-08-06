import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'keycloak.baseUrl') return 'https://auth.gov.tj/auth';
              if (key === 'keycloak.realm') return 'egov-tj';
              if (key === 'keycloak.clientId') return 'egov-portal-client';
              if (key === 'keycloak.clientSecret') return 'test-secret';
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
