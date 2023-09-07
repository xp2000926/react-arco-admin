import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpException,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import {
  ApiBasicAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto'
import { UploadDTO } from '../dtos/upload.dto'
import { FileInterceptor } from '@nestjs/platform-express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { encryptFileMD5 } from 'src/shared/utils/cryptogram.util'

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // 注入环境变量
    private readonly configService: ConfigService,
  ) {}

  // Post： /user
  @Post()
  @ApiOperation({
    summary: '新增用户',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserDto,
  })
  @ApiBasicAuth() //鉴权
  create(@Body() createUserDto: CreateUserDto) {
    // throw '异常' // 异常
    // throw new HttpException('自定义异常', HttpStatus.CONFLICT); // 抛出异常
    // console.log('环境变量：', this.configService.get<string>('database.url'));
    return this.userService.create(createUserDto)
  }
  //  GET: /user
  @Get()
  @ApiOperation({
    summary: '查找所有用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
  })
  async findAll(@Query() query: PaginationParamsDto) {
    console.log('query', query)
    const { data, total } = await this.userService.findAll(query)
    return {
      data,
      meta: {
        total,
      },
    }
  }
  // GET:  /user/:id
  // GET:  /user/123
  @Get(':id')
  @ApiOperation({
    summary: '查找单个用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }
  // PATCH:  /user/:id
  // PATCH:  /users/123
  @Patch(':id')
  @ApiOperation({
    summary: '更新单个用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }
  // DELETE:  /user/:id
  // DELETE:  /user/123
  @Delete(':id')
  @ApiOperation({
    summary: '删除单个用户',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
  
  @Post('upload')
  @ApiOperation({
    summary: '上传头像',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req: any,
    @Body() uploadDto: UploadDTO,
    @UploadedFile() file,
  ) {
    // console.log('upload', file)
    // console.log('hash', encryptFileMD5(file.buffer))
    return this.userService.uploadAvatar(file)
  }
}
