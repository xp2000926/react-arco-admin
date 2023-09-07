import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 在这里配置跨域相关的逻辑
    // const allowedOrigins = ['http://example1.com', 'http://example2.com']; // 允许的源
    // if (allowedOrigins.includes(req.header('Origin'))) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // }
    next()
  }
}
