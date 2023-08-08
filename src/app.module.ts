import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user/user.controller'
import { UploadController } from './upload/upload.controller'
import { userMiddleware } from './common/middleware/user.middleware'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, UserController, UploadController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userMiddleware).forRoutes(UserController)
  }
}
