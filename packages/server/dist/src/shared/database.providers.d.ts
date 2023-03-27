import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
export declare const DatabaseProviders: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<DataSource>;
}[];
