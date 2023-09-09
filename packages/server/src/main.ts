import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { generateDocument } from './doc'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { RemoveSensitiveInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor'
import helmet from 'helmet'

const port = 4000
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(helmet({}))
  // 添加全局管道(数据校验)
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))
  const uploadDir =
    !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
      ? process.env.UPLOAD_DIR
      : join(__dirname, '..', 'static/upload')
  app.useGlobalInterceptors(new RemoveSensitiveInfoInterceptor())
  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload',
  })
  // 创建文档
  generateDocument(app)
  await app.listen(port, () => {
    console.log(`服务:                 http://localhost:${port}`)
    console.log(`swagger-ui 接口文档:  http://localhost:${port}/api/doc`)
    console.log(`knife4j 接口文档:     http://localhost:${port}/doc.html`)
    // console.log(`swagger-ui-json:     http://localhost:${port}/api/doc-json`);
  })
}
bootstrap()
