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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let AuthService = AuthService_1 = class AuthService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    getLoginUrl(dto) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const clientId = this.configService.get('keycloak.clientId');
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
    async exchangeCodeForTokens(dto) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const clientId = this.configService.get('keycloak.clientId');
        const clientSecret = this.configService.get('keycloak.clientSecret');
        const tokenEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: dto.code,
            redirect_uri: dto.redirectUri,
        });
        try {
            const response = await axios_1.default.post(tokenEndpoint, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error(`Token exchange failed for code: ${dto.code}`, error.response?.data || error.message);
            throw new common_1.HttpException(error.response?.data || 'Failed to exchange authorization code with Keycloak OIDC server', error.response?.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refreshToken(dto) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const clientId = this.configService.get('keycloak.clientId');
        const clientSecret = this.configService.get('keycloak.clientSecret');
        const tokenEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;
        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: dto.refreshToken,
        });
        try {
            const response = await axios_1.default.post(tokenEndpoint, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to refresh token with Keycloak', error.response?.data || error.message);
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async directGrantLogin(dto) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const clientId = this.configService.get('keycloak.clientId');
        const clientSecret = this.configService.get('keycloak.clientSecret');
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
            const response = await axios_1.default.post(tokenEndpoint, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error(`Direct grant login failed for user ${dto.username}`, error.response?.data || error.message);
            throw new common_1.UnauthorizedException('Invalid username or password credentials');
        }
    }
    async getUserInfo(accessToken) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const userinfoEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/userinfo`;
        try {
            const response = await axios_1.default.get(userinfoEndpoint, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to fetch userinfo from Keycloak', error.response?.data || error.message);
            throw new common_1.UnauthorizedException('Failed to retrieve user profile from Keycloak identity provider');
        }
    }
    async logout(refreshToken) {
        const baseUrl = this.configService.get('keycloak.baseUrl');
        const realm = this.configService.get('keycloak.realm');
        const clientId = this.configService.get('keycloak.clientId');
        const clientSecret = this.configService.get('keycloak.clientSecret');
        const logoutEndpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/logout`;
        const body = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
        });
        try {
            await axios_1.default.post(logoutEndpoint, body.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            return { success: true, message: 'Session logged out successfully' };
        }
        catch (error) {
            this.logger.warn('Keycloak logout request warning:', error.response?.data || error.message);
            return { success: true, message: 'Local session cleared' };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map