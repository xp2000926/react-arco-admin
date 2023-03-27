import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders], // 提供者注册
  imports: [SharedModule],
})
export class UserModule {}
