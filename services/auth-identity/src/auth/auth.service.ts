import { Injectable, Logger, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetLoginUrlDto, DirectGrantLoginDto } from './dto/login.dto';
import { TokenExchangeDto, RefreshTokenDto } from './dto/token-exchange.dto';

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: string;
  session_state?: string;
  scope: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Build Keycloak OIDC login redirect URL for auth.gov.tj.
   */
  public getLoginUrl(dto: GetLoginUrlDto): { loginUrl: string; state: string } {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');
    const clientId = this.configService.get<string>('keycloak.clientId');

    const state = dto.state || Math.random().toString(36).substring(2, 15);
    const scope = dto.scope || 'openid profile email address egov_identity';

    const authEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: dto.redirectUri,
      response_type: 'code',
      scope,
      state,
    });

    const loginUrl = `${authEndpoint}?${params.toString()}`;

    return {
      loginUrl,
      state,
    };
  }

  /**
   * Exchange authorization code for Keycloak OIDC tokens.
   */
  public async exchangeCodeForTokens(dto: TokenExchangeDto): Promise<KeycloakTokenResponse> {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');
    const clientId = this.configService.get<string>('keycloak.clientId');
    const clientSecret = this.configService.get<string>('keycloak.clientSecret');

    const tokenEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: dto.code,
      redirect_uri: dto.redirectUri,
    });

    try {
      const response = await axios.post<KeycloakTokenResponse>(tokenEndpoint, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Token exchange failed for code: ${dto.code}`, error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to exchange authorization code with Keycloak OIDC server',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Refresh Keycloak OIDC access token.
   */
  public async refreshToken(dto: RefreshTokenDto): Promise<KeycloakTokenResponse> {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');
    const clientId = this.configService.get<string>('keycloak.clientId');
    const clientSecret = this.configService.get<string>('keycloak.clientSecret');

    const tokenEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: dto.refreshToken,
    });

    try {
      const response = await axios.post<KeycloakTokenResponse>(tokenEndpoint, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to refresh token with Keycloak', error.response?.data || error.message);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  /**
   * Direct Grant (Resource Owner Password Credentials) for trusted services.
   */
  public async directGrantLogin(dto: DirectGrantLoginDto): Promise<KeycloakTokenResponse> {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');
    const clientId = this.configService.get<string>('keycloak.clientId');
    const clientSecret = this.configService.get<string>('keycloak.clientSecret');

    const tokenEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: clientId,
      client_secret: clientSecret,
      username: dto.username,
      password: dto.password,
      scope: 'openid profile email egov_identity',
    });

    try {
      const response = await axios.post<KeycloakTokenResponse>(tokenEndpoint, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Direct grant login failed for user ${dto.username}`, error.response?.data || error.message);
      throw new UnauthorizedException('Invalid username or password credentials');
    }
  }

  /**
   * Fetch UserInfo from Keycloak OIDC endpoint.
   */
  public async getUserInfo(accessToken: string): Promise<any> {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');

    const userinfoEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/userinfo`;

    try {
      const response = await axios.get(userinfoEndpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch userinfo from Keycloak', error.response?.data || error.message);
      throw new UnauthorizedException('Failed to retrieve user profile from Keycloak identity provider');
    }
  }

  /**
   * Logout session at Keycloak.
   */
  public async logout(refreshToken: string): Promise<{ success: boolean; message: string }> {
    const baseUrl = this.configService.get<string>('keycloak.baseUrl');
    const realm = this.configService.get<string>('keycloak.realm');
    const clientId = this.configService.get<string>('keycloak.clientId');
    const clientSecret = this.configService.get<string>('keycloak.clientSecret');

    const logoutEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/logout`;

    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    });

    try {
      await axios.post(logoutEndpoint, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return { success: true, message: 'Session logged out successfully' };
    } catch (error) {
      this.logger.warn('Keycloak logout request warning:', error.response?.data || error.message);
      // Return success true anyway to let client clear local tokens
      return { success: true, message: 'Local session cleared' };
    }
  }
}
