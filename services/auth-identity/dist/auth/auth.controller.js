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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const token_exchange_dto_1 = require("./dto/token-exchange.dto");
const keycloak_auth_guard_1 = require("./guards/keycloak-auth.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const user_profile_dto_1 = require("./dto/user-profile.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getLoginUrl(dto) {
        return this.authService.getLoginUrl(dto);
    }
    async exchangeCode(dto) {
        return this.authService.exchangeCodeForTokens(dto);
    }
    async refreshToken(dto) {
        return this.authService.refreshToken(dto);
    }
    async directLogin(dto) {
        return this.authService.directGrantLogin(dto);
    }
    async logout(dto) {
        return this.authService.logout(dto.refreshToken);
    }
    async getUserInfo(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or invalid Bearer token header');
        }
        const token = authHeader.split(' ')[1];
        return this.authService.getUserInfo(token);
    }
    getProfile(user) {
        return user;
    }
    getAdminData(user) {
        return {
            message: 'Access granted to Tajikistan Government Administrative System',
            adminUser: user.preferredUsername,
            tin: user.govAttributes.tin,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login-url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate Keycloak OIDC login authorization URL' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Redirect URL and state parameter generated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.GetLoginUrlDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLoginUrl", null);
__decorate([
    (0, common_1.Post)('token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Exchange OIDC Authorization Code for Keycloak JWT tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tokens issued successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid authorization code or redirect URI' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_exchange_dto_1.TokenExchangeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "exchangeCode", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh Keycloak JWT Access Token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'New access token and refresh token issued' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Expired or invalid refresh token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_exchange_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('direct-login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Direct credentials grant login for authorized E-Gov internal services' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Credentials verified and tokens issued' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.DirectGrantLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "directLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Invalidate Keycloak session and logout user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Session terminated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_exchange_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('userinfo'),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch user profile from Keycloak UserInfo endpoint' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user profile & Tajikistan E-Gov attributes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profile_dto_1.UserProfileDto]),
    __metadata("design:returntype", user_profile_dto_1.UserProfileDto)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('admin-only'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('gov_admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Government Admin Protected Route' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin access granted' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden: requires gov_admin role' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profile_dto_1.UserProfileDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAdminData", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Keycloak OIDC Authentication (auth.gov.tj)'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map