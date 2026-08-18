"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PkiModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pki_controller_1 = require("./pki.controller");
const pki_service_1 = require("./pki.service");
let PkiModule = class PkiModule {
};
exports.PkiModule = PkiModule;
exports.PkiModule = PkiModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [pki_controller_1.PkiController],
        providers: [pki_service_1.PkiService],
        exports: [pki_service_1.PkiService],
    })
], PkiModule);
//# sourceMappingURL=pki.module.js.map