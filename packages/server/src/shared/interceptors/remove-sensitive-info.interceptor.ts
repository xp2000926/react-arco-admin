import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
/**
 * 删除敏感信息
 */
@Injectable()
export class RemoveSensitiveInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('RemoveSensitiveInfoInterceptor:')
    // console.log(`Controller: ${context.getClass().name}`) // 输出
    // console.log(`Method: ${context.getHandler().name}`)
    const request = context.switchToHttp().getRequest()
    // console.log('request', request)
    return next.handle().pipe(
      map(res => {
        //全局消除
        res = JSON.parse(JSON.stringify(res))
        this.delValue(res, 'password')
        this.delValue(res, 'salt')
        // console.log(res)
        return res
      }),
    )
  }
  delValue(data, targetKey) {
    for (const key in data) {
      if (key === targetKey) {
        delete data[key]
      } else if (typeof data[key] === 'object') {
        this.delValue(data[key], targetKey)
      }
    }
  }
}
