import { LoginDTO } from '../dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '../entities/user.mongo.entity'
import { Inject, NotFoundException } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { encryptPassword, makeSalt } from 'src/shared/utils/cryptogram.util'
import {
  RegisterCodeDTO,
  RegisterDTO,
  RegisterSMSDTO,
  UserInfoDto,
} from '../dtos/auth.dto'
import { Role } from '../entities/role.mongo.entity'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { AppLogger } from 'src/shared/logger/logger.service'
import { CaptchaService } from 'src/shared/captcha/captcha.service'
import { UserService } from './user.service'

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,
    @InjectRedis()
    private readonly redis: Redis,
    private readonly logger: AppLogger,
    private readonly captchaService: CaptchaService,
    private userService: UserService,
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
  /**
   * 获取短信验证码
   */
  async registerCode(dto: RegisterCodeDTO) {
    const { phoneNumber, captchaCode, captchaId } = dto
    // 验证图形验证码
    const captcha = await this.redis.get('captcha' + captchaId)
    if (
      !captcha ||
      captcha.toLocaleLowerCase() !== captchaCode.toLocaleLowerCase()
    ) {
      throw new NotFoundException('图形验证码错误')
    }
    const rediscode = await this.redis.get('verifyCode' + phoneNumber)
    if (rediscode !== null) {
      // 验证码未过期
      throw new NotFoundException('验证码未过期,无需再次发送')
    }
    //获取随意验证码
    const code = this.generateCode()
    // redis存 手机号:验证码 附加一个过期时间 60s
    console.log('生成验证码：' + code)
    await this.redis.set('verifyCode' + dto.phoneNumber, code, 'EX', 60)
    //ToDo 调用短信api
    this.logger.info(null, '生成验证码：' + code)
    return ''
  }
  /**
   * 获取验证码（四位随机数字）
   * @returns
   */
  generateCode() {
    // 4位验证码
    return [0, 0, 0, 0].map(() => parseInt(Math.random() * 10 + '')).join('')
  }
  async getCaptcha() {
    const { data, text } = await this.captchaService.captche()
    const id = makeSalt(4)
    this.logger.info(null, '图形验证码:' + text)
    this.redis.set('captcha' + id, text, 'EX', 600)
    const image = `data:image/svg+xml;base64,${Buffer.from(data).toString(
      'base64',
    )}`
    return { id, image }
  }

  /**
   * 短信注册
   * @param {RegisterSMSDTO} registerDTO
   */
  async registerBySMS(registerDTO: RegisterSMSDTO): Promise<any> {
    const { phoneNumber, smsCode } = registerDTO
    // 短信验证码校验
    const code = await this.redis.get('verifyCode' + phoneNumber)
    if (smsCode !== code) {
      throw new NotFoundException('验证码不一致，或已过期')
    }
    let user = await this.userRepository.findOneBy({ phoneNumber })
    if (!user) {
      // 新用户注册
      const password = makeSalt(8)
      user = await this.register({
        phoneNumber,
        name: `手机用户${makeSalt(8)}`,
        password,
        passwordRepeat: password,
      })
    }
    const token = await this.certificate(user)
    return {
      data: {
        token,
      },
    }
  }
  /**
   *
   * @param {RegisterDTO} registerDTO
   */
  async register(registerDTO: RegisterDTO): Promise<any> {
    // 校验用户注册信息
    await this.checkRegisterForm(registerDTO)
    const { name, password, phoneNumber } = registerDTO
    // 产生一个新密码
    const { salt, hashPassword } = this.userService.getPassword(password)
    const newUser: User = new User()
    newUser.name = name
    newUser.phoneNumber = phoneNumber
    newUser.password = hashPassword
    newUser.salt = salt
    const data = await this.userRepository.save(newUser)
    return {
      data,
    }
  }
  /**
   * 校验注册信息
   * @param {RegisterDTO} registerDTO
   */
  async checkRegisterForm({
    password,
    passwordRepeat,
    phoneNumber,
  }: RegisterDTO) {
    if (password !== passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查')
    }
    const hasUser = await this.userRepository.findOneBy({ phoneNumber })
    if (hasUser) {
      throw new NotFoundException('用户已存在')
    }
  }
}
