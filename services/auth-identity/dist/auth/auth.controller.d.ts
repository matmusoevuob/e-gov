import { AuthService } from './auth.service';
import { GetLoginUrlDto, DirectGrantLoginDto } from './dto/login.dto';
import { TokenExchangeDto, RefreshTokenDto } from './dto/token-exchange.dto';
import { UserProfileDto } from './dto/user-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getLoginUrl(dto: GetLoginUrlDto): {
        loginUrl: string;
        state: string;
    };
    exchangeCode(dto: TokenExchangeDto): Promise<import("./auth.service").KeycloakTokenResponse>;
    refreshToken(dto: RefreshTokenDto): Promise<import("./auth.service").KeycloakTokenResponse>;
    directLogin(dto: DirectGrantLoginDto): Promise<import("./auth.service").KeycloakTokenResponse>;
    logout(dto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getUserInfo(authHeader: string): Promise<any>;
    getProfile(user: UserProfileDto): UserProfileDto;
    getAdminData(user: UserProfileDto): {
        message: string;
        adminUser: string;
        tin: string;
    };
}
