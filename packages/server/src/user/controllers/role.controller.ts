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
} from '@nestjs/common'
import { RoleService } from '../services/role.service'
import { CreateRoleDto } from '../dtos/role.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto'
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dtos/base-api-response.dto'
@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

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
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id)
  }
}
