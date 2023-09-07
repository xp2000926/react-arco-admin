import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { CorsMiddleware } from './cors.middleware'
import { CMSModule } from './cms/cms.module'

@Module({
  imports: [UserModule, CMSModule],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CorsMiddleware).forRoutes('*') //设置需要应用中间件的路由路径，此处为所有路由
//   }
// }
export class AppModule {}
