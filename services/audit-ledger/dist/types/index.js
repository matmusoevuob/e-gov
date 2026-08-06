"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuditLogSchema = void 0;
const zod_1 = require("zod");
exports.CreateAuditLogSchema = zod_1.z.object({
    action: zod_1.z.string().min(2),
    actorId: zod_1.z.string().min(2),
    subsystem: zod_1.z.string().min(2),
    details: zod_1.z.record(zod_1.z.any()).default({})
});
