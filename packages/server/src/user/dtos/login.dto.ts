import { IsNotEmpty, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { regMobileCN } from 'src/shared/utils/regex.util'

export class LoginDTO {
  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '18715147473' })
  readonly phoneNumber: string

  /**
   * 用户密码
   */
  @IsNotEmpty({ message: '请输入密码' })
  @ApiProperty({ example: '123456' })
  readonly password: string
}
