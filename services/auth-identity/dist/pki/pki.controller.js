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
exports.PkiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pki_service_1 = require("./pki.service");
const validate_cert_dto_1 = require("./dto/validate-cert.dto");
const verify_signature_dto_1 = require("./dto/verify-signature.dto");
const pki_auth_dto_1 = require("./dto/pki-auth.dto");
let PkiController = class PkiController {
    constructor(pkiService) {
        this.pkiService = pkiService;
    }
    async validateCertificate(dto) {
        return this.pkiService.validateCertificate(dto);
    }
    async verifySignature(dto) {
        return this.pkiService.verifySignature(dto);
    }
    async requestChallenge(_dto) {
        return this.pkiService.generateAuthChallenge();
    }
    async authenticateWithPki(dto) {
        return this.pkiService.authenticateWithPki(dto);
    }
    async getCaCertificates() {
        return this.pkiService.getCaCertificates();
    }
    async generateTestCert(cn = 'Citizen Test Person', tin = '987654321') {
        return this.pkiService.generateMockCert(cn, tin);
    }
};
exports.PkiController = PkiController;
__decorate([
    (0, common_1.Post)('validate-certificate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Validate X.509 Certificate for Government Services' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Certificate validation details & identity payload' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Malformed certificate PEM' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_cert_dto_1.ValidateCertificateDto]),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "validateCertificate", null);
__decorate([
    (0, common_1.Post)('verify-signature'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Digital Signature of data using X.509 Certificate' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Signature verification result' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_signature_dto_1.VerifySignatureDto]),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "verifySignature", null);
__decorate([
    (0, common_1.Post)('challenge'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request PKI authentication challenge nonce' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Generated challenge ID and nonce' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pki_auth_dto_1.RequestAuthChallengeDto]),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "requestChallenge", null);
__decorate([
    (0, common_1.Post)('authenticate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate citizen or official using PKI Hardware Token / Smartcard signature' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Authentication successful and identity verified' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid challenge signature or expired challenge' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pki_auth_dto_1.VerifyAuthChallengeDto]),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "authenticateWithPki", null);
__decorate([
    (0, common_1.Get)('ca-certificates'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve list of trusted Republic of Tajikistan Root CAs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "getCaCertificates", null);
__decorate([
    (0, common_1.Post)('generate-test-cert'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Generate test government X.509 certificate pair for sandbox / testing' }),
    __param(0, (0, common_1.Query)('cn')),
    __param(1, (0, common_1.Query)('tin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PkiController.prototype, "generateTestCert", null);
exports.PkiController = PkiController = __decorate([
    (0, swagger_1.ApiTags)('PKI & Digital Signatures (auth.gov.tj)'),
    (0, common_1.Controller)('pki'),
    __metadata("design:paramtypes", [pki_service_1.PkiService])
], PkiController);
//# sourceMappingURL=pki.controller.js.map