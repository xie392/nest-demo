import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AuthGuard')
    // 获取 cookie
    const request = context.switchToHttp().getRequest()

    // 获取 cookie
    const cookie = request.signedCookies
    // 无密钥
    // const cookie = request.cookies

    console.log('cookie', cookie)

    // 判断 cookie 是否存在
    if (!cookie['name']) {
      return false
    }

    // 获取 session
    // const session = request.session

    return true
  }
}
