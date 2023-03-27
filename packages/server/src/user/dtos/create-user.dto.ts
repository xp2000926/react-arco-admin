import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  /**
   * 手机号（系统唯一）
   */
  @ApiProperty({ example: '18715147473', description: '手机号' })
  @Matches(/^1\d{10}$/g, { message: '请输入手机号' })
  phoneNumber: string;
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  @IsNotEmpty()
  @Length(6, 10)
  password: string;
  @ApiProperty({ example: '3053949745@qq.com', description: '邮箱' })
  @IsEmail()
  email: string;
}
