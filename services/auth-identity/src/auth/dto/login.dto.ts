import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class GetLoginUrlDto {
  @ApiProperty({
    description: 'Redirect URI after successful Keycloak authentication',
    example: 'https://gov.tj/auth/callback',
  })
  @IsNotEmpty()
  @IsString()
  redirectUri: string;

  @ApiPropertyOptional({
    description: 'OIDC state parameter to prevent CSRF attacks',
    example: 'xyz123abc',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'OIDC scope string',
    example: 'openid profile email address egov_identity',
  })
  @IsOptional()
  @IsString()
  scope?: string;
}

export class DirectGrantLoginDto {
  @ApiProperty({
    description: 'Username or Passport / PIN / TIN identifier',
    example: 'citizen_123456789',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'SuperSecretPass123!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
