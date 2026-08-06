import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class ValidateCertificateDto {
  @ApiProperty({
    description: 'X.509 Certificate in PEM string or Base64 DER format',
    example: '-----BEGIN CERTIFICATE-----\nMIIDXzCCAkegAwIBAgIU...\n-----END CERTIFICATE-----',
  })
  @IsNotEmpty()
  @IsString()
  certificatePem: string;

  @ApiPropertyOptional({
    description: 'Require Digital Signature key usage attribute',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  requireDigitalSignatureUsage?: boolean = true;

  @ApiPropertyOptional({
    description: 'Check certificate against revocation lists (CRL/OCSP)',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  checkRevocation?: boolean = false;
}
