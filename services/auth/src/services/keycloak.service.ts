import jwt from 'jsonwebtoken';
import { User, UserRole } from '../types/index.js';

export interface KeycloakTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export class KeycloakService {
  private keycloakIssuer = process.env.KEYCLOAK_ISSUER || 'https://auth.egov.gov/auth/realms/egov-realm';
  private secretKey = process.env.JWT_SECRET || 'super-secret-egov-keycloak-key-2026';

  /**
   * Exchanges authorization code from Keycloak OIDC SSO
   */
  public async exchangeCode(code: string, redirectUri: string, clientId: string): Promise<{ tokenResponse: KeycloakTokenResponse; user: User }> {
    // Simulated OIDC Code exchange logic with Keycloak Realm
    if (!code || code === 'INVALID_CODE') {
      throw new Error('Invalid or expired Keycloak authorization code');
    }

    const mockUser: User = {
      id: 'usr_kc_987654321',
      nationalId: 'AA9876543',
      fullName: 'Elena Rostova',
      email: 'elena.rostova@egov.gov',
      phoneNumber: '+998901234567',
      role: UserRole.OFFICER,
      mfaEnabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const payload = {
      iss: this.keycloakIssuer,
      sub: mockUser.id,
      aud: clientId,
      national_id: mockUser.nationalId,
      email: mockUser.email,
      name: mockUser.fullName,
      preferred_username: mockUser.email,
      realm_access: {
        roles: ['egov_user', 'egov_officer']
      }
    };

    const accessToken = jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    const idToken = jwt.sign({ ...payload, nonce: 'nonce_12345' }, this.secretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ sub: mockUser.id, typ: 'Refresh' }, this.secretKey, { expiresIn: '1d' });

    return {
      tokenResponse: {
        access_token: accessToken,
        id_token: idToken,
        refresh_token: refreshToken,
        expires_in: 3600,
        token_type: 'Bearer'
      },
      user: mockUser
    };
  }

  /**
   * Verifies incoming Keycloak JWT token
   */
  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err: any) {
      throw new Error(`Invalid Keycloak Token: ${err.message}`);
    }
  }
}
