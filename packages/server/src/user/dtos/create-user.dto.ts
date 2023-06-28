import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  /**
   * 手机号（系统唯一）
   */
  @Matches(/^1\d{10}$/g, { message: '请输入手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '18715147473', description: '手机号' })
  readonly phoneNumber: string;

  @ApiProperty({ example: '然叔' })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  @IsNotEmpty()
  @Length(6, 10)
  password: string;

  salt?: string;

  @ApiProperty({ example: '3053949745@qq.com', description: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  avatar?: string;

  @ApiProperty({ example: 'frontend' })
  @IsNotEmpty()
  job?: string;

  @ApiProperty({ example: '前端开发工程师' })
  @IsNotEmpty()
  jobName?: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  organization?: string;

  @ApiProperty({ example: 'beijing' })
  @IsNotEmpty()
  location?: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  personalWebsite?: string;
  
  @ApiProperty({ example: '637855e9e8c408970ef9f4de' })
  role?;
}
