import { AppLogger } from '../../shared/logger/logger.service';
import { SystemService } from '../../shared/system.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.mongo.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly systemService: SystemService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: MongoRepository<User>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }
  create(createUserDto: CreateUserDto) {
    this.logger.info(null, '创建用户(info)', {
      a: 123,
    });
    this.logger.debug(null, '创建用户(debug)', {
      a: 123,
    });
    // console.log(this.systemService.getEnv());
    // 调用Modle
    // return 'This UserService Create!!!!';
    return this.userRepository.save({
      name: 'haha',
      email: '1@1.cpm',
    });
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
    });
    return {
      data,
      total: count,
    };
  }

  findOne(id: string) {
    return this.userRepository.findOneBy(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
