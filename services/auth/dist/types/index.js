"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsoSchema = exports.VerifyCertSchema = exports.LoginSchema = exports.UserRole = void 0;
const zod_1 = require("zod");
var UserRole;
(function (UserRole) {
    UserRole["CITIZEN"] = "CITIZEN";
    UserRole["OFFICER"] = "OFFICER";
    UserRole["SYSTEM_ADMIN"] = "SYSTEM_ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
// Input validation schemas
exports.LoginSchema = zod_1.z.object({
    nationalId: zod_1.z.string().min(5, 'National ID must be at least 5 characters').max(20),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    mfaCode: zod_1.z.string().length(6, 'MFA Code must be 6 digits').optional()
});
exports.VerifyCertSchema = zod_1.z.object({
    certificatePem: zod_1.z.string().min(20, 'Invalid Certificate PEM format'),
    signaturePem: zod_1.z.string().optional(),
    challengeData: zod_1.z.string().optional()
});
exports.SsoSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, 'SSO Authorization Code is required'),
    redirectUri: zod_1.z.string().url('Valid redirect URI required'),
    clientId: zod_1.z.string().default('egov-citizen-portal')
});
