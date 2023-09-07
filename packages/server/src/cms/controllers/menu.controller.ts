import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common'
import { MenuService } from '../services/menu.service'

import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from '../../shared/dtos/base-api-response.dto'

import { CreateMenuDto, UpdateMenuDto } from '../dtos/menu.dto'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('菜单')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

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

  // @Delete(':id')
  // @ApiOperation({
  //   summary: '删除菜单',
  // })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // remove(@Param('id') id: string) {
  //   // return this.menuService.remove(id)
  // }
}
