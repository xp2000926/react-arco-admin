"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const logger_module_1 = require("./logger/logger.module");
const module_options_1 = require("./configs/module-options");
const system_service_1 = require("./system.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_providers_1 = require("./database.providers");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Module)({
        exports: [system_service_1.SystemService, config_1.ConfigModule, logger_module_1.AppLoggerModule, ...database_providers_1.DatabaseProviders],
        providers: [system_service_1.SystemService, ...database_providers_1.DatabaseProviders],
        imports: [config_1.ConfigModule.forRoot(module_options_1.configModuleOptions), logger_module_1.AppLoggerModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map