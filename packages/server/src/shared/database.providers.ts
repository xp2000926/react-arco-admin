import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    inject: [ConfigService], // url地地址 用户名，
    useFactory: async (configService: ConfigService) => {
      console.log('开始连接 mongodb 数据库');
      const config = {
        type: databaseType,
        url: configService.get<string>('database.url'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        entities: [path.join(__dirname, `../../**/*.mongo.entity{.ts,.js}`)],
        logging: configService.get<boolean>('database.logging'),
        synchronize: configService.get<boolean>('database.synchronize'),
        useUnifiedTopology: true,
      };
      const ds = new DataSource(config);
      await ds.initialize();
      console.log('数据库连 mongodb 接成功');
      return ds;
    },
  },
];
