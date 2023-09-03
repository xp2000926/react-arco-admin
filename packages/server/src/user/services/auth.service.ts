import { LoginDTO } from '../dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '../entities/user.mongo.entity'
import { Inject, NotFoundException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { encryptPassword } from 'src/shared/utils/cryptogram.util'
import { UserInfoDto } from '../dtos/auth.dto'
import { Role } from '../entities/role.mongo.entity'

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
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
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt)
    // console.log({ currentHashPassword, dbPassword })
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
  async info(id: string) {
    // 查询用户并获取权限
    const user = await this.userRepository.findOneBy(id)
    const data: UserInfoDto = Object.assign({}, user)
    if (user.role) {
      const role = await this.roleRepository.findOneBy(user.role)
      if (role) data.permissions = role.permissions
    }
    return data
  }
}
