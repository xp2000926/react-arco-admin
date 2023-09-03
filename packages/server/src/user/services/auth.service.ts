import { LoginDTO } from '../dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '../entities/user.mongo.entity'
import { Inject, NotFoundException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { encryptPassword } from 'src/shared/utils/cryptogram.util'

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}
  async certificate(user: User) {
    const payload = {
      id: user._id,
    }
    const token = this.jwtService.sign(payload)
    return token
  }
  async checkLoginForm(loginDTO: LoginDTO) {
    const { phoneNumber, password } = loginDTO
    const user = await this.userRepository.findOneBy({ phoneNumber })
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    console.log('user', user)
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt)
    console.log({ currentHashPassword, dbPassword })
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('用户或密码错误')
    }
    return user
  }
  async login(login: LoginDTO) {
    //校验用户信息
    const user = await this.checkLoginForm(login)
    // 签发token
    const token = await this.certificate(user)
    return {
      data: {
        token,
      },
    }
  }
}
