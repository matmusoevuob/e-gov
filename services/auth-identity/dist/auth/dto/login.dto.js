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
exports.DirectGrantLoginDto = exports.GetLoginUrlDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetLoginUrlDto {
}
exports.GetLoginUrlDto = GetLoginUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redirect URI after successful Keycloak authentication',
        example: 'https://gov.tj/auth/callback',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetLoginUrlDto.prototype, "redirectUri", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'OIDC state parameter to prevent CSRF attacks',
        example: 'xyz123abc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetLoginUrlDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'OIDC scope string',
        example: 'openid profile email address egov_identity',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetLoginUrlDto.prototype, "scope", void 0);
class DirectGrantLoginDto {
}
exports.DirectGrantLoginDto = DirectGrantLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username or Passport / PIN / TIN identifier',
        example: 'citizen_123456789',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DirectGrantLoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        example: 'SuperSecretPass123!',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DirectGrantLoginDto.prototype, "password", void 0);
//# sourceMappingURL=login.dto.js.map