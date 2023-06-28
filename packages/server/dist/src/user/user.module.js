"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const shared_module_1 = require("./../shared/shared.module");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controllers/user.controller");
const user_providers_1 = require("./user.providers");
const role_controller_1 = require("./controllers/role.controller");
const role_service_1 = require("./services/role.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController, role_controller_1.RoleController],
        providers: [user_service_1.UserService, ...user_providers_1.UserProviders, role_service_1.RoleService],
        imports: [shared_module_1.SharedModule],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map