import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './user.providers';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

@Module({
  controllers: [UserController, RoleController],
  providers: [UserService, ...UserProviders, RoleService], // 提供者注册
  imports: [SharedModule],
})
export class UserModule {}
