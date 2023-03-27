import { AppLoggerModule } from './logger/logger.module';
import { configModuleOptions } from './configs/module-options';
import { SystemService } from './system.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from './database.providers';

@Module({
  exports: [SystemService, ConfigModule, AppLoggerModule, ...DatabaseProviders],
  providers: [SystemService, ...DatabaseProviders],
  imports: [ConfigModule.forRoot(configModuleOptions), AppLoggerModule],
})
export class SharedModule {}
