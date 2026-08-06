import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Service Health & Probes')
@Controller()
export class HealthController {
  @Get('health')
  @ApiOperation({ summary: 'Liveness Probe' })
  getLiveness() {
    return {
      status: 'UP',
      service: 'auth-identity',
      domain: 'auth.gov.tj',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness Probe' })
  getReadiness() {
    return {
      status: 'READY',
      service: 'auth-identity',
      domain: 'auth.gov.tj',
      components: {
        keycloakOidc: 'OK',
        pkiValidationEngine: 'OK',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
