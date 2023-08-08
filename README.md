# 前置知识

要学习 Nest.js，首先需要了解一些基础的知识:

- [Node.js](https://nodejs.org/zh-cn)
- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/) | [Nest.js 中文文档](https://docs.nestjs.cn/)

# 安装

全局安装 Nest.js CLI 工具

```shell
npm i -g @nestjs/cli
```

创建项目,可以选择使用 yarn 或者 npm 或者 pnpm，我这里以使用 pnpm 为例

```shell
nest new [name] # 也可以使用 nest new
```

# 启动

```shell
pnpm run start
```

上面启动命令在我们修改代码的时候，不会自动重启服务，这时候我们可以使用下面的命令启动服务，这样在修改代码的时候，服务会自动重启。

```shell
pnpm run start:dev
```

网页打开 http://localhost:3000/ 就可以看到我们的应用了。

# 目录介绍

这里主要核心目录在于 `src` 下：

```shell
src
├── app.controller.spec.ts  # 控制器测试
├── app.controller.ts       # 控制器
├── app.module.ts           # 模块
├── app.service.ts          # 服务
├── main.ts                 # 入口文件
```

## 入口文件

`main.ts` 是应用的入口文件，主要用于创建应用实例，启动应用，监听端口等。后续可能会有一些全局的配置，也会在这里进行配置。如：全局的拦截器，全局的管道等。

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  // 创建应用
  const app = await NestFactory.create(AppModule)
  // 监听端口
  await app.listen(3000)
}

// 启动应用
bootstrap()
```

## 模块

`app.module.ts` 是应用的模块文件，主要用于配置应用的模块，以及模块之间的依赖关系。

```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

## 控制器

`app.controller.ts` 是应用的控制器文件，主要用于处理请求，返回响应。

```ts
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
```

## 服务

`app.service.ts` 是应用的服务文件，主要用于处理业务逻辑。

```ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
```

## 测试

`app.controller.spec.ts` 是应用的测试文件，主要用于测试控制器。可以先不用管这个文件，对于一些简单的应用，可能不需要测试，但是对于一些复杂的应用，测试是必不可少的。对于测试，我这里就不多说了，可以自行学习。

这里需要的前置知识：

- [Jest](https://jestjs.io/)
- [Jest 中文文档](https://jestjs.io/docs/zh-Hans/getting-started)

这个是一个测试框架，可以用于测试 JavaScript 和 TypeScript 代码。当然，你也可以选择忽略这个文件，不进行测试。

```ts
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
```

# 配置

## 配置文件

Nest.js 的配置文件是 `nest-cli.json`，这个文件是在创建项目的时候自动生成的，这里可以配置一些项目的信息，如：项目名称，项目描述，作者，语言，包管理工具等。

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

初始就按照这个原本配置就行了，后续有需要再进行修改。具体更多内容请查看 [Nest.js 配置文件](https://docs.nestjs.cn/9/cli?id=%e5%b7%a5%e4%bd%9c%e7%a9%ba%e9%97%b4)

## 环境变量

Nest.js 的环境变量是 `.env` 文件，这里可以配置一些环境变量，如：数据库地址，数据库用户名，数据库密码等。

如果你要使用它，那么你要先安装一个依赖包：

```shell
pnpm i --save @nestjs/config
```

然后在 `app.module.ts` 中引入：

```ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()]
})
export class AppModule {}
```

上述代码将从默认位置（项目根目录）载入并解析一个.env 文件，从.env 文件和 process.env 合并环境变量键值对，并将结果存储到一个可以通过 ConfigService 访问的私有结构。具体更多内容请查看 [Nest.js 环境变量](https://docs.nestjs.cn/9/techniques?id=%e7%8e%af%e5%a2%83%e5%8f%98%e9%87%8f)

# 路由

`Nest.js` 的路由是通过 `@nestjs/common` 中的 `@Controller` 装饰器来实现的，这个装饰器可以接收一个参数，这个参数就是路由的前缀，如果不传参数，那么默认就是 `/`。 `@nestjs/common` 导出有多个不同应用的装饰器，下面一张表格形式做一个简单介绍：

| 装饰器     | 说明              |
| ---------- | ----------------- |
| @Body()    | 获取请求体        |
| @Query()   | 获取查询参数      |
| @Param()   | 获取路由参数      |
| @Headers() | 获取请求头        |
| @Req()     | 获取请求对象      |
| @Res()     | 获取响应对象      |
| @Session() | 获取 session 对象 |

以下是一个简单的例子`src/app.controller.ts`：

```ts
import { Controller, Get，Param } from '@nestjs/common'

@Controller('user')
export class AppController {
 constructor(private readonly appService: AppService) {}

   @Get()  // 这里的路由就是 /user
   getHello(): string {
     return 'Hello World!'
   }

   @Get('info')  // 这里的路由就是 /user/info
    getInfo(): string {
      return 'Hello World!'
    }

    @Get(':id') // id 为任意字符串，如：/user/1
    getParams(@Param('id') id: string): string {
        return `Hello World! ${id}`
    }

}
```

# 常用命令

最后再介绍一些常用的命令，这些命令可以帮助我们快速生成一些代码。

```shell
nest application [name]     # 创建工作空间
nest g co [name]            # 创建控制器
nest g s [name]             # 创建服务
nest g mo [name]            # 创建模块
nest g mi [name]            # 创建中间件
nest g f [name]             # 创建过滤器
nest g pi [name]            # 创建管道
nest g ga [name]            # 创建网关
nest g d [name]             # 创建装饰器
nest g in [name]            # 创建拦截器
nest g cl [name]            # 创建实体
nest g i [name]             # 创建接口
```

快捷生成资源，可以生成控制器，服务，模块，实体，接口，管道，拦截器，过滤器，中间件，网关，装饰器等。

```shell
nest g res [name]           # 创建资源
```
