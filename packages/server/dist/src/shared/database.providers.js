"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProviders = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const path = require("path");
const databaseType = 'mongodb';
exports.DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            console.log('开始连接 mongodb 数据库');
            const config = {
                type: databaseType,
                url: configService.get('database.url'),
                username: configService.get('database.user'),
                password: configService.get('database.pass'),
                database: configService.get('database.name'),
                entities: [path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)],
                logging: configService.get('database.logging'),
                synchronize: configService.get('database.synchronize'),
                useUnifiedTopology: true,
            };
            const ds = new typeorm_1.DataSource(config);
            await ds.initialize();
            console.log('数据库连 mongodb 接成功');
            return ds;
        },
    },
];
//# sourceMappingURL=database.providers.js.map