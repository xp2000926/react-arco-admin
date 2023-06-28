import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Role } from '../entities/role.mongo.entity';
import { CreateRoleDto } from '../dtos/role.dto';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: MongoRepository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    console.log('create/RoleDto', createRoleDto);
    return this.roleRepository.save(createRoleDto);
  }

  async findAll({
    pageSize,
    page,
  }: PaginationParamsDto): Promise<{ data: Role[]; total: number }> {
    const [data, count] = await this.roleRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true,
    });
    return {
      data,
      total: count,
    };
  }

  async findOne(id: string) {
    return await this.roleRepository.findOneBy(id);
  }

  async update(id: string, Role: CreateRoleDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach((k) => delete Role[k]);
    return await this.roleRepository.update(id, Role);
  }

  async remove(id: string): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
