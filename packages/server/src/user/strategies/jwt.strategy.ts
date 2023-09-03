// JWT 策略
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //jwt来源于哪里
      ignoreExpiration: false, //是否检查过期时间
      secretOrKey: process.env.JWT_SECRET, //jwt密钥
    })
  }

  async validate(payload: any) {
    return {
      id: payload.id,
    }
  }
}
