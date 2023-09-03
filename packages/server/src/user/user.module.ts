import { SharedModule } from './../shared/shared.module'
import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { UserProviders } from './user.providers'
import { RoleController } from './controllers/role.controller'
import { RoleService } from './services/role.service'
import { AuthService } from './services/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthController } from './controllers/auth.controller'
@Module({
  controllers: [UserController, RoleController, AuthController],
  providers: [UserService, ...UserProviders, RoleService, AuthService], // 提供者注册
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService], // 注入 ConfigService
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.get('jwt'),
    }),
    SharedModule,
  ],
})
export class UserModule {}
