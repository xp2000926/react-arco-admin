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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const logger_service_1 = require("../../shared/logger/logger.service");
const system_service_1 = require("../../shared/system.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let UserService = UserService_1 = class UserService {
    constructor(systemService, userRepository, logger) {
        this.systemService = systemService;
        this.userRepository = userRepository;
        this.logger = logger;
        this.logger.setContext(UserService_1.name);
    }
    create(createUserDto) {
        this.logger.info(null, '创建用户(info)', {
            a: 123,
        });
        this.logger.debug(null, '创建用户(debug)', {
            a: 123,
        });
        return this.userRepository.save({
            name: 'haha',
            email: '1@1.cpm',
        });
    }
    async findAll({ pageSize, page, }) {
        const [data, count] = await this.userRepository.findAndCount({
            order: {
                name: 'DESC',
            },
            skip: (page - 1) * pageSize,
            take: pageSize * 1,
            cache: true,
        });
        return {
            data,
            total: count,
        };
    }
    findOne(id) {
        return this.userRepository.findOneBy(id);
    }
    update(id, updateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [system_service_1.SystemService,
        typeorm_1.MongoRepository,
        logger_service_1.AppLogger])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map