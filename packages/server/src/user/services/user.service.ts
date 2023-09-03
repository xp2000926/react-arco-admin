import { AppLogger } from '../../shared/logger/logger.service'
import { SystemService } from '../../shared/system.service'
import { MongoRepository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { Inject, Injectable } from '@nestjs/common'
import { User } from '../entities/user.mongo.entity'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto'
import { encryptPassword, makeSalt } from 'src/shared/utils/cryptogram.util'
import { UploadService } from 'src/shared/upload/upload.service'

@Injectable()
export class UserService {
  constructor(
    private readonly systemService: SystemService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
    private readonly logger: AppLogger,
    private readonly uploadService: UploadService,
  ) {
    this.logger.setContext(UserService.name)
  }
  create(user: CreateUserDto) {
    //调用Modle
    // 加密处理
    if (user.password) {
      const { salt, hashPassword } = this.getPassword(user.password)
      user.salt = salt
      user.password = hashPassword
    }
    return this.userRepository.save(user)
  }
  async findAll({
    pageSize,
    page,
  }: PaginationParamsDto): Promise<{ data: User[]; total: number }> {
    const [data, count] = await this.userRepository.findAndCount({
      order: {
        name: 'DESC',
      }, //排序
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true, //在家缓存优化
    })
    return {
      data,
      total: count,
    }
  }

  findOne(id: string) {
    return this.userRepository.findOneBy(id)
  }

  update(id: string, user: UpdateUserDto) {
    // 加密处理
    if (user.password) {
      const { salt, hashPassword } = this.getPassword(user.password)
      user.salt = salt
      user.password = hashPassword
    }
    return this.userRepository.update(id, user)
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }
  /**
   * 上传头像
   * @param {*} file
   */
  async uploadAvatar(file) {
    const { url } = await this.uploadService.upload(file)
    return { data: url }
  }
  getPassword(password: string) {
    const salt = makeSalt() // 制作密码盐
    const hashPassword = encryptPassword(password, salt) // 加密密码
    return { salt, hashPassword }
  }
}
