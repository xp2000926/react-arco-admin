import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { MenuService } from '../services/menu.service'

import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger'

import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from '../../shared/dtos/base-api-response.dto'

import { CreateMenuDto, UpdateMenuDto } from '../dtos/menu.dto'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { spawn } from 'child_process'
@ApiTags('菜单')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '新增菜单',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(UpdateMenuDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() updateMenuDto: UpdateMenuDto) {
    return {
      data: await this.menuService.update(updateMenuDto),
    }
  }

  @ApiOperation({
    summary: '查找所有菜单',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateMenuDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get()
  async find() {
    const { data } = await this.menuService.find()
    return {
      data,
    }
  }

  @ApiOperation({
    summary: '文章导入',
  })
  @Post('/article/import')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async articleImport(@UploadedFile() file) {
    // 执行上传
    this.menuService.import(file)
    return {
      ok: 1,
    }
  }

  @ApiOperation({
    summary: '刷新全部内容',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh() {
    console.log('刷新全部内容...')
    // 支持 await
    // 日志流的对接
    const log = await this.spawn('ls', ['-l'], { cwd: './' })
    return {
      ok: 1,
      log,
    }
  }
  async spawn(cmd, ...args) {
    return new Promise(res => {
      const child = spawn(cmd, ...args)
      // 日志流的对接
      child.stdout.pipe(process.stdout) //终端正常流
      child.stderr.pipe(process.stderr) //终端异常流
      let ret = ''
      child.stdout.on('data', data => {
        ret += data.toString()
      })
      child.on('close', () => res(ret))
    })
  }
}
