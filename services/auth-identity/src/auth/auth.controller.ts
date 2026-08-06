import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetLoginUrlDto, DirectGrantLoginDto } from './dto/login.dto';
import { TokenExchangeDto, RefreshTokenDto } from './dto/token-exchange.dto';
import { KeycloakAuthGuard } from './guards/keycloak-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserProfileDto } from './dto/user-profile.dto';

@ApiTags('Keycloak OIDC Authentication (auth.gov.tj)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-url')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate Keycloak OIDC login authorization URL' })
  @ApiResponse({ status: 200, description: 'Redirect URL and state parameter generated' })
  getLoginUrl(@Body() dto: GetLoginUrlDto) {
    return this.authService.getLoginUrl(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Exchange OIDC Authorization Code for Keycloak JWT tokens' })
  @ApiResponse({ status: 200, description: 'Tokens issued successfully' })
  @ApiResponse({ status: 400, description: 'Invalid authorization code or redirect URI' })
  async exchangeCode(@Body() dto: TokenExchangeDto) {
    return this.authService.exchangeCodeForTokens(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh Keycloak JWT Access Token' })
  @ApiResponse({ status: 200, description: 'New access token and refresh token issued' })
  @ApiResponse({ status: 401, description: 'Expired or invalid refresh token' })
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @Post('direct-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Direct credentials grant login for authorized E-Gov internal services' })
  @ApiResponse({ status: 200, description: 'Credentials verified and tokens issued' })
  async directLogin(@Body() dto: DirectGrantLoginDto) {
    return this.authService.directGrantLogin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate Keycloak session and logout user' })
  @ApiResponse({ status: 200, description: 'Session terminated' })
  async logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Get('userinfo')
  @ApiOperation({ summary: 'Fetch user profile from Keycloak UserInfo endpoint' })
  async getUserInfo(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Bearer token header');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getUserInfo(token);
  }

  @Get('me')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile & Tajikistan E-Gov attributes' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: UserProfileDto): UserProfileDto {
    return user;
  }

  @Get('admin-only')
  @UseGuards(KeycloakAuthGuard, RolesGuard)
  @Roles('gov_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Government Admin Protected Route' })
  @ApiResponse({ status: 200, description: 'Admin access granted' })
  @ApiResponse({ status: 403, description: 'Forbidden: requires gov_admin role' })
  getAdminData(@CurrentUser() user: UserProfileDto) {
    return {
      message: 'Access granted to Tajikistan Government Administrative System',
      adminUser: user.preferredUsername,
      tin: user.govAttributes.tin,
    };
  }
}
