import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/common/guard/auth.guard'

@Controller('user')
// @UseGuards(AuthGuard)  // 只要有这个装饰器，就会执行 AuthGuard 的 canActivate 方法
export class UserController {
  // 设置 cookie
  @Get()
  index(@Res() res) {
    res.cookie('name', 'test-value', {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      signed: true
    })

    res.send('Hello World' + res.cookie)
  }

  // 获取 cookie
  @Get('cookie')
  getCookie(@Req() req) {
    return req.signedCookies
  }

  // 清除 cookie
  @Get('clear')
  clearCookie(@Res() res) {
    res.clearCookie('name')
    res.send('clear cookie')
  }

  // 获取用户信息
  @Get('info')
  @UseGuards(AuthGuard)
  getInfo(@Req() req) {
    return '用户信息'
  }
}
