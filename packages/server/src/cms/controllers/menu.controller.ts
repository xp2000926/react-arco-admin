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
import { UploadDTO } from 'src/user/dtos/upload.dto'

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
  async articleImport(@UploadedFile() file, @Body() uploadDTO: UploadDTO) {
    // 执行上传
    this.menuService.import(file)
    return {
      ok: 1,
    }
  }
}
