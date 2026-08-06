import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenExchangeDto {
  @ApiProperty({
    description: 'Authorization code returned from Keycloak redirect',
    example: '8b7a6d5c-4b3a-2a1f-0e9d-8c7b6a5f4e3d',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Redirect URI used during initial login request',
    example: 'https://gov.tj/auth/callback',
  })
  @IsNotEmpty()
  @IsString()
  redirectUri: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Keycloak Refresh Token string',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
