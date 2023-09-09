import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class BackupDto {
  @ApiProperty({ example: 'init' })
  @IsNotEmpty()
  file?: string
}
