import { AppLoggerModule } from './logger/logger.module'
import { configModuleOptions } from './configs/module-options'
import { SystemService } from './system.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseProviders } from './database.providers'
import { UploadService } from './upload/upload.service'
import { CaptchaService } from './captcha/captcha.service'

@Module({
  exports: [
    SystemService,
    ConfigModule,
    AppLoggerModule,
    ...DatabaseProviders,
    UploadService,
    CaptchaService,
  ],
  providers: [
    SystemService,
    ...DatabaseProviders,
    UploadService,
    CaptchaService,
  ],
  imports: [ConfigModule.forRoot(configModuleOptions), AppLoggerModule],
})
export class SharedModule {}
