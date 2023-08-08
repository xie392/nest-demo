import { Request, Response, NextFunction } from 'express'

/**
 * 全局日志中间件
 * @param req   请求
 * @param res   响应
 * @param next  下一个中间件
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`日志中间件：${req.method} ${req.url}`)
  next()
}
