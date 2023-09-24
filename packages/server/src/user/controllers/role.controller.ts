import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { RoleService } from '../services/role.service'
import { CreateRoleDto } from '../dtos/role.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PaginationParamsDto } from '@/shared/dtos/pagination-params.dto'
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from '@/shared/dtos/base-api-response.dto'
import { AuthGuard } from '@nestjs/passport'
@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({
    summary: '新增角色',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @ApiOperation({
    summary: '查找所有角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateRoleDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Get()
  async findAll(@Query() query: PaginationParamsDto) {
    const { data, total } = await this.roleService.findAll(query)
    return {
      data,
      meta: { total: total },
    }
  }

  @ApiOperation({
    summary: '查找单个角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id)
  }

  @ApiOperation({
    summary: '更新单个角色',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateRoleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
    return {
      data: await this.roleService.update(id, updateRoleDto),
    }
  }

  @ApiOperation({
    summary: '删除单个角色',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id)
  }
}
