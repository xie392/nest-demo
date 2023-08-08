import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Query,
  Request,
  Body,
  Response,
  UsePipes,
  HttpException
} from '@nestjs/common'
import { AppService } from './app.service'
import { AppPipePipe } from './common/pipe/app.pipe'
import { PipeSchema } from './shared'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // 获取参数
  @Get('get/:id')
  getParams(@Param() params): string {
    return `get params: ${params.id}`
  }

  // 获取请求头
  @Get('header')
  getHeader(@Request() req): string {
    return `get header: ${req.headers.host}`
  }

  // 获取请求参数
  @Get('query')
  getQuery(@Query() query): string {
    return query
  }

  // post
  @Post('post')
  post(@Body('id') id: string): string {
    return 'post' + id
  }

  // put
  @Put('put')
  put(): string {
    return 'put'
  }

  // delete
  @Delete('delete')
  delete(): string {
    return 'delete'
  }

  // patch
  @Patch('patch')
  patch(): string {
    return 'patch'
  }

  // response
  @Get('response')
  response(@Response() res): string {
    return res.status(200).send('response---')
  }

  // 测试管道
  @Get('pipe')
  @UsePipes(new AppPipePipe(PipeSchema))
  pipe(@Query() query): string {
    return JSON.stringify(query)
  }

  // 测试异常
  @Get('exception')
  exception(): string {
    throw new HttpException('Error Exception', 403)
  }
}
