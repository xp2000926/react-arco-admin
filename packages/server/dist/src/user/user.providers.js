"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProviders = void 0;
const role_mongo_entity_1 = require("./entities/role.mongo.entity");
const user_mongo_entity_1 = require("./entities/user.mongo.entity");
exports.UserProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(user_mongo_entity_1.User),
        inject: ['MONGODB_DATA_SOURCE'],
    },
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: async (AppDataSource) => await AppDataSource.getRepository(role_mongo_entity_1.Role),
        inject: ['MONGODB_DATA_SOURCE'],
    },
];
//# sourceMappingURL=user.providers.js.map