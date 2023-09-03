import { ApiProperty } from '@nestjs/swagger'
export class UploadDTO {
  @ApiProperty({ example: 'xxx文件' })
  name: string

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: Express.Multer.File
}
