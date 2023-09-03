import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IdDTO } from '../../shared/dtos/id.dto'

export class CreateRoleDto extends IdDTO {
  @ApiProperty({ example: 'admin', description: '角色名' })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: {
      'dashboard/workplace': ['write', 'read'],
      user: ['read', 'write'],
      course: ['write', 'read'],
      role: ['read', 'write'],
    },
    description: '权限',
  })
  @IsNotEmpty()
  permissions: object
}
