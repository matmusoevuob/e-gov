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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAuthChallengeDto = exports.RequestAuthChallengeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RequestAuthChallengeDto {
}
exports.RequestAuthChallengeDto = RequestAuthChallengeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User Tax Identification Number (ТИН/ИНН) or Personal Identity Code if known',
        example: '123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAuthChallengeDto.prototype, "tinOrId", void 0);
class VerifyAuthChallengeDto {
}
exports.VerifyAuthChallengeDto = VerifyAuthChallengeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Challenge string previously received from /pki/challenge',
        example: 'TJ-GOV-AUTH-a8d7c491-3829-4f81',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyAuthChallengeDto.prototype, "challengeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'X.509 Certificate in PEM format',
        example: '-----BEGIN CERTIFICATE-----\n...',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyAuthChallengeDto.prototype, "certificatePem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base64 encoded digital signature of challengeId using private key',
        example: 'MEQCID...',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyAuthChallengeDto.prototype, "signatureBase64", void 0);
//# sourceMappingURL=pki-auth.dto.js.map