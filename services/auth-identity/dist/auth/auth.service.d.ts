import { ConfigService } from '@nestjs/config';
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
export declare class AuthService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    getLoginUrl(dto: GetLoginUrlDto): {
        loginUrl: string;
        state: string;
    };
    exchangeCodeForTokens(dto: TokenExchangeDto): Promise<KeycloakTokenResponse>;
    refreshToken(dto: RefreshTokenDto): Promise<KeycloakTokenResponse>;
    directGrantLogin(dto: DirectGrantLoginDto): Promise<KeycloakTokenResponse>;
    getUserInfo(accessToken: string): Promise<any>;
    logout(refreshToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
