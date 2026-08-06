import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RequestAuthChallengeDto {
  @ApiPropertyOptional({
    description: 'User Tax Identification Number (ТИН/ИНН) or Personal Identity Code if known',
    example: '123456789',
  })
  @IsOptional()
  @IsString()
  tinOrId?: string;
}

export class VerifyAuthChallengeDto {
  @ApiProperty({
    description: 'Challenge string previously received from /pki/challenge',
    example: 'TJ-GOV-AUTH-a8d7c491-3829-4f81',
  })
  @IsNotEmpty()
  @IsString()
  challengeId: string;

  @ApiProperty({
    description: 'X.509 Certificate in PEM format',
    example: '-----BEGIN CERTIFICATE-----\n...',
  })
  @IsNotEmpty()
  @IsString()
  certificatePem: string;

  @ApiProperty({
    description: 'Base64 encoded digital signature of challengeId using private key',
    example: 'MEQCID...',
  })
  @IsNotEmpty()
  @IsString()
  signatureBase64: string;
}
