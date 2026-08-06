import { Controller, Post, Body, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PkiService } from './pki.service';
import { ValidateCertificateDto } from './dto/validate-cert.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';
import { RequestAuthChallengeDto, VerifyAuthChallengeDto } from './dto/pki-auth.dto';

@ApiTags('PKI & Digital Signatures (auth.gov.tj)')
@Controller('pki')
export class PkiController {
  constructor(private readonly pkiService: PkiService) {}

  @Post('validate-certificate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate X.509 Certificate for Government Services' })
  @ApiResponse({ status: 200, description: 'Certificate validation details & identity payload' })
  @ApiResponse({ status: 400, description: 'Malformed certificate PEM' })
  async validateCertificate(@Body() dto: ValidateCertificateDto) {
    return this.pkiService.validateCertificate(dto);
  }

  @Post('verify-signature')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify Digital Signature of data using X.509 Certificate' })
  @ApiResponse({ status: 200, description: 'Signature verification result' })
  async verifySignature(@Body() dto: VerifySignatureDto) {
    return this.pkiService.verifySignature(dto);
  }

  @Post('challenge')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request PKI authentication challenge nonce' })
  @ApiResponse({ status: 200, description: 'Generated challenge ID and nonce' })
  async requestChallenge(@Body() _dto: RequestAuthChallengeDto) {
    return this.pkiService.generateAuthChallenge();
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate citizen or official using PKI Hardware Token / Smartcard signature' })
  @ApiResponse({ status: 200, description: 'Authentication successful and identity verified' })
  @ApiResponse({ status: 401, description: 'Invalid challenge signature or expired challenge' })
  async authenticateWithPki(@Body() dto: VerifyAuthChallengeDto) {
    return this.pkiService.authenticateWithPki(dto);
  }

  @Get('ca-certificates')
  @ApiOperation({ summary: 'Retrieve list of trusted Republic of Tajikistan Root CAs' })
  async getCaCertificates() {
    return this.pkiService.getCaCertificates();
  }

  @Post('generate-test-cert')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate test government X.509 certificate pair for sandbox / testing' })
  async generateTestCert(
    @Query('cn') cn = 'Citizen Test Person',
    @Query('tin') tin = '987654321',
  ) {
    return this.pkiService.generateMockCert(cn, tin);
  }
}
