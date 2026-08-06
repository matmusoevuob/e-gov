import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifySignatureDto {
  @ApiProperty({
    description: 'X.509 Certificate in PEM format used for signature verification',
    example: '-----BEGIN CERTIFICATE-----\nMIIDXzCCAkegAwIBAgIU...\n-----END CERTIFICATE-----',
  })
  @IsNotEmpty()
  @IsString()
  certificatePem: string;

  @ApiProperty({
    description: 'Raw text data or challenge string that was signed',
    example: 'AUTH_GOV_TJ_CHALLENGE_98234120',
  })
  @IsNotEmpty()
  @IsString()
  challengeData: string;

  @ApiProperty({
    description: 'Base64 encoded digital signature of challengeData',
    example: 'R292ZXJubWVudCBEaWdpdGFsIFNpZ25hdHVyZSAxMjM0NTY3ODkw...',
  })
  @IsNotEmpty()
  @IsString()
  signatureBase64: string;
}
