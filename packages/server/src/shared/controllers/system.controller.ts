import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { spawn } from 'child_process'
import { BackupDto } from './../dtos/backup.dto'
import * as moment from 'moment'

@ApiTags('系统维护')
@Controller('system')
export class SystemController {
  constructor() {}

  @ApiOperation({
    summary: '数据库备份列表',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/database')
  async list() {
    //docker-compose exec -T mongo ls /dump
    const ret = await this.spawn(
      'docker-compose',
      ['exec', '-T', 'mongo', 'ls', '/dump'],
      { cwd: './' },
    )
    const data = ('' + ret).split('\n')
    data.pop()
    return {
      ok: 1,
      data,
    }
  }
  @ApiOperation({
    summary: '数据库备份',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/database/dump')
  async dump(@Body() data) {
    const ret = await this.spawn(
      'docker-compose',
      [
        'exec',
        '-T',
        'mongo',
        'mongodump',
        '--db',
        'nest-server',
        '--out',
        '/dump/' + moment().format('YYYYMMDDhhmmss'),
      ],
      { cwd: './' },
    )
    return {
      ok: 1,
    }
  }
  @ApiOperation({
    summary: '数据库恢复',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/database/restore')
  async restore(@Body() dto: BackupDto) {
    console.log('恢复数据', dto.file)
    const ret = await this.spawn(
      'docker-compose',
      [
        'exec',
        '-T',
        'mongo',
        'mongorestore',
        '--db',
        'nest-server',
        `/dump/${dto.file}/nest-server`,
      ],
      { cwd: './' },
    )

    return {
      ok: 1,
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
  getTime() {
    //转毫秒
    const n = new Date()
    console.log(n)
    return (
      n.getFullYear() +
      (n.getMonth() + 1) +
      n.getDate() +
      n.getHours() +
      n.getMinutes() +
      n.getSeconds()
    )
  }
}
