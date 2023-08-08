import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { loggerMiddleware } from './common/middleware/logger.middleware'
import { HttpExceptionFilter } from './common/filter/http.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT || 3000

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 全局地址前加上 /api
  app.setGlobalPrefix('api')

  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'
  })

  // 设置 cookie
  app.use(cookieParser(process.env.COOKIES_SECRET))

  // 设置全局日志中间件
  app.use(loggerMiddleware)

  // 跨域
  app.use(cors())

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://localhost:${port}`)
  })
}
bootstrap()
